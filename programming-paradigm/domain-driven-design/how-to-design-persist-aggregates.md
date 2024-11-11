> https://khalilstemmler.com/articles/typescript-domain-driven-design/aggregate-design-persistence/

이 글에서는 Aggregate Root를 식별하고 관련 엔터티들 주위에 경계를 설정하는 방법에 대해 배웁니다. 또한 White Label이라는 오픈 소스 바이닐 거래 앱에서 Sequelize ORM을 사용하여 Aggregate를 구성하고 영속성 계층을 관리하는 방법도 소개합니다.

---

예전에는 단순했을까?

앱이 단순했던 시절을 기억하나요? CRUD API 호출만으로 애플리케이션 상태를 변경할 수 있었던 때를 말입니다. 컨트롤러에서 Sequelize나 Mongoose ORM 모델을 직접 사용하여 간단하게 처리할 수 있었습니다.

그것이 바로 '좋았던 옛날'이었죠.

지금의 우리는 어떨까요? 이제 우리는 거의 비즈니스 자체를 소프트웨어로 구현하고 있습니다. 객체 지향 프로그래밍 원칙을 사용하여 풍부한 도메인 모델을 작성하고 있죠.

비즈니스에서 실재하는 규칙과 개념들이 이제 코드 속 엔터티와 값 객체로 나타나고 있습니다. 각 서브도메인에서 시스템의 여러 사용자 그룹이 무엇을 할 수 있는지 표현하기 위해 유스케이스를 사용하고 있습니다.

우리는 복잡한 실제 비즈니스 문제를 해결하기 위해 소프트웨어를 모델링하고 있습니다.

## The challenge

소프트웨어에서 자주 반복되는 주제 중 하나는 관계입니다.

프로그래밍(특히 객체 지향 프로그래밍)의 큰 부분은 관계에 관한 것입니다. 거대한 문제를 더 작은 클래스와 모듈로 분해함으로써, 우리는 복잡한 문제를 작은 단위로 해결할 수 있습니다.

이 분해 과정은 유효성 검증 로직을 캡슐화하기 위해 값 객체(Value Object)를 사용하는 방식과 같습니다.

```ts
interface GenreNameProps {
  value: string;
}

/**
 * @class GenreName
 * @description 장르 이름 클래스는 장르 이름을 지정하기 위한 유효성 검증 로직을
 * 캡슐화하는 값 객체입니다.
 * @see Genre 엔터티
 */

export class GenreName extends ValueObject<GenreNameProps> {
  private constructor(props: GenreNameProps) {
    super(props);
  }

  public static create(name: string): Result<GenreName> {
    const guardResult = Guard.againstNullOrUndefined(name, "name");

    if (!guardResult.isSuccess) {
      return Result.fail<GenreName>(guardResult.error);
    }

    if (name.length <= 2 || name.length > 100) {
      return Result.fail<GenreName>(
        new Error("이름은 2자 이상, 100자 이하이어야 합니다.")
      );
    }

    return Result.ok<GenreName>(new GenreName({ value: name }));
  }
}
```

단순히 문자열을 사용하기보다는 GenreName 클래스를 통해 장르 이름이 2자 이상 100자 이하이어야 한다는 유효성 검증 로직을 캡슐화합니다. 엔터티를 통해 모델의 불변성을 유지하며 더 큰 문제를 분해합니다.

```ts
interface ArtistProps {
  genres: Genre[];
  name: string;
}

export class Artist extends Entity<ArtistProps> {
  public static MAX_NUMBER_OF_GENRES_PER_ARTIST = 5;

  private constructor(props: ArtistProps, id?: UniqueEntityId): Artist {
    super(props, id);
  }

  get genres(): Genre[] {
    return this.props.genres;
  }

  /**
   * @method addGenre
   * @desc 이 클래스는 Artist와 Genre 간의 일대다 관계에 관한 중요한 비즈니스 규칙을 캡슐화합니다.
   * Artist에 추가할 수 있는 Genre의 수는 제한되어 있습니다.
   */
  addGenre(genre: Genre): Result<any> {
    if (this.props.genres.length >= Artist.MAX_NUMBER_OF_GENRES_PER_ARTIST) {
      return Result.fail<any>("장르 수의 최대 한도에 도달했습니다.");
    }

    if (!this.genreAlreadyExists(genre)) {
      this.props.genres.push(genre);
    }

    return Result.ok<any>();
  }
}
```

불변성/비즈니스 규칙: 아티스트는 최대 5개의 장르만 가질 수 있습니다.

도메인 레이어에서 각 엔터티 간 관계(1대1, 1대다, 다대다)에 대한 규칙과 제약을 정의할 때, 여러 질문이 생깁니다.

- 이 엔터티 클러스터를 어떻게 데이터베이스에 저장(및 계단식 저장)할까요?
- 이러한 엔터티에 대한 경계를 어떻게 설정할까요?
- 각 엔터티에 대한 리포지토리가 필요할까요?

이 글에서는 여러 엔터티를 하나의 단위로 취급하는 경계를 만들기 위해 Aggregate를 사용하는 방법과, 이를 데이터베이스에 저장하는 방법을 소개합니다.

## Aggregate란 무엇인가?

Aggregate에 대한 가장 좋은 정의는 Eric Evans의 DDD 책에서 찾을 수 있습니다. 그는 다음과 같이 설명합니다:

> "Aggregate는 데이터 변경을 위해 하나의 단위로 취급하는 연관된 객체들의 묶음입니다." - Evans, p.126

이 정의를 조금 더 풀어보겠습니다.

Aggregate 자체는 연결된 객체들 전체를 의미하는 묶음입니다. 예를 들어, White Label의 Vinyl 클래스를 살펴보겠습니다.

```ts
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/Result";
import { Artist } from "./artist";
import { TraderId } from "../../trading/domain/traderId";
import { Guard } from "../../core/Guard";
import { VinylId } from "./vinylId";
import { VinylNotes } from "./vinylNotes";
import { Album } from "./album";

interface VinylProps {
  traderId: TraderId;
  artist: Artist;
  album: Album;
  vinylNotes?: VinylNotes;
  dateAdded?: Date;
}

export type VinylCollection = Vinyl[];

export class Vinyl extends AggregateRoot<VinylProps> {
  get vinylId(): VinylId {
    return VinylId.create(this.id);
  }

  get artist(): Artist {
    return this.props.artist;
  }

  get album(): Album {
    return this.props.album;
  }

  get dateAdded(): Date {
    return this.props.dateAdded;
  }

  get traderId(): TraderId {
    return this.props.traderId;
  }

  get vinylNotes(): VinylNotes {
    return this.props.vinylNotes;
  }

  private constructor(props: VinylProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: VinylProps, id?: UniqueEntityID): Result<Vinyl> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.album, argumentName: "album" },
      { argument: props.artist, argumentName: "artist" },
      { argument: props.traderId, argumentName: "traderId" },
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Vinyl>(propsResult.message);
    }

    const vinyl = new Vinyl(
      {
        ...props,
        dateAdded: props.dateAdded ? props.dateAdded : new Date(),
      },
      id
    );
    const isNewlyCreated = !!id === false;

    if (isNewlyCreated) {
      // TODO: 도메인 이벤트 발생
    }

    return Result.ok<Vinyl>(vinyl);
  }
}
```

hite Label에서 Vinyl은 해당 소유자인 Trader에 의해 게시됩니다. Vinyl은 Artist와 Album과도 관계를 가지므로, Vinyl은 세 개의 다른 엔터티와 관계를 맺고 있습니다.

- Vinyl은 Trader와 1대1 관계입니다.
- Vinyl은 Artist와 1대1 관계입니다.
- Vinyl은 Album과 1대1 관계입니다.
- Album은 여러 개(1대다)의 Genre를 가질 수 있습니다.
- Artist는 여러 개(1대다)의 Genre를 가질 수 있습니다.

이 관계에서 Vinyl이 중심에 있으며, 이로 인해 Vinyl은 이 묶음에서 주 엔터티(aggregate root)가 됩니다.

- 애그리게이트(Aggregate)는 데이터 변경을 위해 하나의 단위로 취급하는 연관된 엔터티들의 집합입니다.
- 애그리게이트 루트(Aggregate Root)는 다른 엔터티들에 대한 참조를 보유하는 주요 엔터티입니다. 이 집합에서 직접 조회에 사용되는 유일한 엔터티입니다.

여기까지 따라오셨다면 애그리게이트가 실제로 무엇인지에 대해 더 잘 이해했을 것입니다.

이제 에릭 에반스(Evans)의 애그리게이트에 대한 설명의 두 번째 부분을 이야기해야 합니다. 특히, "[애그리게이트를] 데이터 변경을 목적으로 하나의 단위로 취급한다"는 부분을 말이죠.

<br/>

## Figuring out boundaries

에릭 에반스가 "애그리게이트를 데이터 변경을 위한 단위로 취급한다"고 말할 때 이건 무슨 무슨 의미일까요?

여기서 말하는 데이터 변경이란 무엇일까요?

이것은 특히 **생성(CREATE), 삭제(DELETE), 갱신(UPDATE)**과 같은 작업을 의미합니다. 우리는 도메인 모델이 손상되지 않도록 도메인에 불법적인 작업이 허용되지 않도록 보장하고 싶습니다.

- (Q. 도메인 모델이 손상된다는 것은 무슨 말인가? )
- (Q. 도메인에 불법적인 작업이 허용되는 것은 무엇이 있을까? 어떤 예시가 있을까?)

좋습니다, 그렇다면 이러한 데이터 변경은 어디에서 시작될까요?
데이터 변경은 애플리케이션이 수행하는 유스케이스에서 시작됩니다. 즉, 애플리케이션의 기능이며 존재 이유라고 할 수 있습니다.

다시 White Label을 예로 들어 봅시다. 우리는 오늘 Vinyl 엔터티(사실 이것은 애그리게이트 루트로 확인되었습니다)의 대부분의 유스케이스를 식별했습니다.

몇몇 유스케이스는 데이터베이스에 데이터를 변경하는 작업(명령, command)을 수행하며, 몇몇은 단순히 데이터베이스에서 데이터를 읽는 작업(조회, query)을 수행합니다.

개인 카탈로그에서 Vinyl에 대한 카탈로그 유스케이스

- addVinyl: 기존의 새로운 바이닐 추가
- createNewVinyl: 새로운 바이닐 생성
- getRecommendations: 현재 카탈로그에 있는 바이닐을 기반으로 추천 가져오기
- getAllVinyl: 카탈로그에 있는 모든 바이닐 가져오기
- getVinylByVinylId: 카탈로그에서 특정 바이닐 가져오기
- removeVinyl: 카탈로그에서 특정 바이닐 제거
- searchCatalogForVinyl: 카탈로그에서 바이닐 검색
- updateVinyl: 카탈로그에서 바이닐 업데이트

공개 마켓플레이스에서 Vinyl에 대한 마켓플레이스 유스케이스

- searchMarketplaceForVinyl: 마켓플레이스에서 바이닐 검색
- getRecommendationsByVinylId: 다른 사용자가 보유한 특정 바이닐을 기반으로 추천 가져오기

좋습니다, 이제 Vinyl에 대한 유스케이스를 알고 있습니다. 그 다음에는 무엇을 해야 할까요?

> 우리는 애그리게이트를 설계하여 모든 (명령 같은) 유스케이스를 실행할 수 있도록 하면서도 모델의 불변성을 보호할 수 있도록 해야 합니다.

바로 여기에 어려움이 있습니다.

이와 동시에 애그리게이트 경계를 결정할 수 있는 능력도 여기서 나옵니다. 이것이 애그리게이트 설계의 목표입니다.

경계를 정의하는 방법은 다음과 같습니다:
Vinyl의 모든 명령 유스케이스를 수행할 수 있도록 하고, 경계 내에서 제공되는 정보가 충분히 있어야 비즈니스 규칙을 위반하지 않도록 보장합니다.

하지만, 처음부터 정확히 맞추는 것은 항상 쉬운 일이 아닙니다.

때로는 새로운 비즈니스 규칙이 추가됩니다.
때로는 새로운 유스케이스가 추가됩니다.
꽤 자주 우리는 경계가 약간 맞지 않다는 것을 깨닫고 애그리게이트 경계를 수정해야 합니다.
효과적인 애그리게이트 설계에 대한 수많은 에세이, 문서, 책, 자료 등이 있는 이유는 바로 이것이 매우 까다로운 작업이기 때문입니다. 고려해야 할 사항이 많습니다.

## 애그리게이트를 설계할 때 고려해야할 것들

우리의 애그리거트 설계 목표가 다음과 같다면:

• 경계 내에서 모델의 불변성을 보장할 수 있는 충분한 정보를 제공한다.
• 유스 케이스를 실행한다.

그렇다면 너무 큰 애그리거트 경계를 만들 경우 데이터베이스와 트랜잭션에 어떤 영향을 미칠지 고려해야 한다.

**데이터베이스 / 트랜잭션 성능**

현재 Vinyl에 대한 경계를 기준으로 생각해보면, 단일 Vinyl을 조회하기 위해 몇 개의 테이블을 조인해야 하는지 떠올려보자.

우리의 애그리거트 설계 목표에 하나를 추가하자:

• 경계 내에서 모델의 불변성을 보장할 수 있는 충분한 정보를 제공한다.

• 유스 케이스를 실행한다.

• 적절한 데이터베이스 성능을 보장한다.

## **DTOs**

DTO와 관련된 경우도 존재한다. 도메인 엔터티를 DTO(View Model)로 매핑해 사용자에게 반환해야 할 때가 종종 있다.

White Label의 Vinyl 예시를 보면, 사용자에게 다음과 같은 데이터를 반환해야 할 수도 있다:

• 실제 **ArtistName**, **artwork**, 출시된 연도 등 다양한 정보.

이 데이터를 프런트엔드에서 화면을 구성하기 위해, DTO는 다음과 같은 구조가 되어야 할 것이다:

```ts
interface GenreDTO {
  genre_id: string;

  name: string;
}

interface ArtistDTO {
  artist_id: string;

  name: string;

  artist_image: string;

  genres?: GenreDTO[];
}

interface AlbumDTO {
  name: string;

  yearReleased: number;

  artwork: string;

  genres?: GenreDTO[];
}

export interface VinylDTO {
  vinyl_id: string;

  trader_id: string;

  title: string;

  artist: ArtistDTO;

  album: AlbumDTO;
}
```

이러한 점을 고려하면, **Vinyl** 애그리거트 경계 안에 **Artist**와 **Album** 엔터티 전체를 포함시키는 것이 API 응답 DTO를 생성하는 데 더 편리하다고 생각할 수도 있다.

이는 애그리거트 설계 목표에 다음을 추가하게 만든다:

• 경계 내에서 모델의 불변성을 보장할 수 있는 충분한 정보를 제공한다.

• 유스 케이스를 실행한다.

• 적절한 데이터베이스 성능을 보장한다.

• (선택적, 추천되지 않음) **도메인 엔터티를 DTO로 변환할 수 있는 충분한 정보를 제공한다.**

이 마지막 목표가 선택적인 이유는 **CQS(Command-Query Segregation) 원칙**에서 비롯된다.

## **Command-Query Segregation**

CQS는 모든 작업이 **COMMAND** 또는 **QUERY** 중 하나여야 한다고 말한다.

즉, 함수가 **COMMAND**를 수행한다면 반환값이 없어야 한다(void), 예를 들면 다음과 같다:

```ts
// 유효한 예시

function createVinyl(data): void {

... // 생성 및 저장

}

// 유효한 예시

function updateVinyl(vinylId: string, data): void {

... // 업데이트

}

// 유효하지 않은 예시

function updateVinyl(vinylId: string, data): Vinyl {

... // 업데이트

}

```

애그리거트에 변경 작업(UPDATE, DELETE, CREATE)을 수행할 때는 **COMMAND**를 수행하는 것이다.

이 경우, COMMAND를 승인하거나 일부 비즈니스 규칙이 충족되지 않아 거부하기 전에 불변 규칙을 강제하기 위해 **완전한 애그리거트**를 메모리로 불러와야 한다.

**OK, 이해된다.**

하지만 **QUERY**는 다르다. **QUERY**는 값을 반환하기만 하며 절대 부작용을 발생시키지 않는다.

```ts
// 유효한 예시

function getVinylById(vinylId: string): Vinyl {
  // Vinyl 반환

  return vinylRepo.findById(vinylId);
}

// 유효하지 않은 예시

function getVinylById(vinylId: string): Vinyl {
  const vinyl = this.vinylRepo.getVinyl(vinylId);

  await updateVinyl(vinyl); // 잘못된 예: QUERY의 부작용

  return vinyl; // Vinyl 반환
}
```

**따라서, 단순히 DTO에 필요한 정보를 애그리거트 안에 추가하기 위해 애그리거트를 확장하는 것은 성능에 악영향을 미칠 수 있으므로 그렇게 하지 말라.**

DTO는 사용자 인터페이스 요구 사항을 충족하기 위해 매우 구체적인 정보가 필요할 수 있다.

따라서 애그리거트를 이런 정보들로 채우는 대신, 필요한 데이터를 **레포지토리에서 직접 조회**하여 DTO를 생성하라.

**카탈로그에 바이닐 추가 유즈케이스(Add Vinyl To Catalog Use Case)**

**일반적인 알고리즘 설계**

주어진 요청 DTO(Request DTO)에는 다음 내용이 포함됩니다:

• **현재 사용자 ID**

• **바이닐 상세 정보**:

• **아티스트 세부 정보**

• 이미 존재하는 경우: **아티스트 ID**

• 존재하지 않는 경우: **이름과 장르**

• **앨범 세부 정보**

• 이미 존재하는 경우: **앨범 ID**

• 존재하지 않는 경우: **이름, 연도, 장르**

• **각 장르(genre)**:

• 이미 존재하는 경우: **장르 ID**

• 존재하지 않는 경우: **장르 이름**

**목표**

1. 아티스트를 찾거나 새로 생성합니다.

2. 앨범을 찾거나 새로 생성합니다.

3. 새 바이닐(아티스트, 앨범, 거래자 ID)을 생성합니다.

4. 새 바이닐을 저장합니다.

**요청 DTO 설계**

API 호출이 장르(Genres)가 이미 존재하는 경우와 새로 생성해야 하는 경우를 처리할 수 있도록, **GenresRequestDTO**를 두 부분으로 나눕니다.

```ts
interface GenresRequestDTO {
  new: string[]; // 새로 생성할 장르 이름 목록

  ids: string[]; // 연결할 기존 장르 ID 목록
}
```

앨범과 아티스트 모두 장르 정보를 사용하므로, 요청 DTO에서 각각의 키로 포함합니다.

```ts
interface AddVinylToCatalogUseCaseRequestDTO {
  artistNameOrId: string; // 아티스트 이름 또는 ID

  artistGenres: string | GenresRequestDTO; // 아티스트 장르 정보

  albumNameOrId: string; // 앨범 이름 또는 ID

  albumGenres: string | GenresRequestDTO; // 앨범 장르 정보

  albumYearReleased: number; // 앨범 발매 연도

  traderId: string; // 거래자 ID
}
```

**작동 방식**

• **ArtistNameOrId**와 **AlbumNameOrId**를 사용하면, 이미 존재하는 경우 ID를 포함하고, 그렇지 않으면 이름을 포함합니다.

• 각 장르는 기존 ID 또는 새로운 이름 중 하나를 선택합니다.

**유즈케이스 클래스 작성**

```ts
import { UseCase } from "../../../../core/domain/UseCase";

import { Vinyl } from "../../../domain/vinyl";

import { IVinylRepo } from "../../../repos/vinylRepo";

import { Result } from "../../../../core/Result";

import { TextUtil } from "../../../../utils/TextUtil";

import { IArtistRepo } from "../../../repos/artistRepo";

import { Artist } from "../../../domain/artist";

import { TraderId } from "../../../../trading/domain/traderId";

import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";

import { ArtistName } from "../../../domain/artistName";

import { ParseUtils } from "../../../../utils/ParseUtils";

import { GenresRepo, IGenresRepo } from "../../../repos/genresRepo";

import { Genre } from "../../../domain/genre";

import { Album } from "../../../domain/album";

import { IAlbumRepo } from "../../../repos/albumRepo";

import { GenreId } from "../../../domain/genreId";

interface GenresRequestDTO {
  new: string[];

  ids: string[];
}

interface AddVinylToCatalogUseCaseRequestDTO {
  artistNameOrId: string;

  artistGenres: string | GenresRequestDTO;

  albumNameOrId: string;

  albumGenres: string | GenresRequestDTO;

  albumYearReleased: number;

  traderId: string;
}

export class AddVinylToCatalogUseCase
  implements UseCase<AddVinylToCatalogUseCaseRequestDTO, Result<Vinyl>>
{
  private vinylRepo: IVinylRepo;

  private artistRepo: IArtistRepo;

  private albumRepo: IAlbumRepo;

  private genresRepo: IGenresRepo;

  constructor(
    vinylRepo: IVinylRepo,

    artistRepo: IArtistRepo,

    genresRepo: GenresRepo,

    albumRepo: IAlbumRepo
  ) {
    this.vinylRepo = vinylRepo;

    this.artistRepo = artistRepo;

    this.genresRepo = genresRepo;

    this.albumRepo = albumRepo;
  }

  // GenresRequestDTO를 처리하여 장르 객체를 반환

  private async getGenresFromDTO(artistGenres: string) {
    return (
      await this.genresRepo.findByIds(
        (ParseUtils.parseObject(artistGenres) as Result<GenresRequestDTO>)

          .getValue()

          .ids.map(genreId => GenreId.create(new UniqueEntityID(genreId)))
      )
    ).concat(
      (ParseUtils.parseObject(artistGenres) as Result<GenresRequestDTO>)

        .getValue()

        .new.map(name => Genre.create(name).getValue())
    );
  }

  // 아티스트 찾기 또는 생성

  private async getArtist(
    request: AddVinylToCatalogUseCaseRequestDTO
  ): Promise<Result<Artist>> {
    const { artistNameOrId, artistGenres } = request;

    const isArtistIdProvided = TextUtil.isUUID(artistNameOrId);

    if (isArtistIdProvided) {
      const artist = await this.artistRepo.findByArtistId(artistNameOrId);

      if (artist) {
        return Result.ok<Artist>(artist);
      } else {
        return Result.fail<Artist>(
          `Couldn't find artist by id=${artistNameOrId}`
        );
      }
    } else {
      return Artist.create({
        name: ArtistName.create(artistNameOrId).getValue(),

        genres: await this.getGenresFromDTO(artistGenres as string),
      });
    }
  }

  // 앨범 찾기 또는 생성

  private async getAlbum(
    request: AddVinylToCatalogUseCaseRequestDTO,
    artist: Artist
  ): Promise<Result<Album>> {
    const { albumNameOrId, albumGenres, albumYearReleased } = request;

    const isAlbumIdProvided = TextUtil.isUUID(albumNameOrId);

    if (isAlbumIdProvided) {
      const album = await this.albumRepo.findAlbumByAlbumId(albumNameOrId);

      if (album) {
        return Result.ok<Album>(album);
      } else {
        return Result.fail<Album>(`Couldn't find album by id=${albumNameOrId}`);
      }
    } else {
      return Album.create({
        name: albumNameOrId,

        artistId: artist.artistId,

        genres: await this.getGenresFromDTO(albumGenres as string),

        yearReleased: albumYearReleased,
      });
    }
  }

  // 실행 메서드

  public async execute(
    request: AddVinylToCatalogUseCaseRequestDTO
  ): Promise<Result<Vinyl>> {
    const { traderId } = request;

    let artist: Artist;

    let album: Album;

    try {
      const artistOrError = await this.getArtist(request);

      if (artistOrError.isFailure) {
        return Result.fail<Vinyl>(artistOrError.error);
      } else {
        artist = artistOrError.getValue();
      }

      const albumOrError = await this.getAlbum(request, artist);

      if (albumOrError.isFailure) {
        return Result.fail<Vinyl>(albumOrError.error);
      } else {
        album = albumOrError.getValue();
      }

      const vinylOrError = Vinyl.create({
        album: album,

        artist: artist,

        traderId: TraderId.create(new UniqueEntityID(traderId)),
      });

      if (vinylOrError.isFailure) {
        return Result.fail<Vinyl>(vinylOrError.error);
      }

      const vinyl = vinylOrError.getValue();

      await this.vinylRepo.save(vinyl);

      return Result.ok<Vinyl>(vinyl);
    } catch (err) {
      console.log(err);

      return Result.fail<Vinyl>(err);
    }
  }
}
```

**요약**

1. 요청 DTO를 설계하여 새로운 장르, 아티스트, 앨범을 지원하도록 구현했습니다.

2. 필요한 리소스(아티스트, 앨범, 거래자 ID)를 검색하거나 생성하는 로직을 작성했습니다.

3. 마지막으로, Vinyl을 생성하고 저장하는 레포지토리 호출을 처리합니다.

## 애그리게이트 영속화(Persisting an Aggregate)

**준비되셨나요? 이제 마무리해 봅시다.**

애그리게이트를 어떻게 영속화할 수 있을지 알아봅시다.

다음은 `VinylRepo` 클래스와 특히 `save()` 메서드에 대한 설명입니다.

---

### **VinylRepo** (Vinyl 저장소)

```typescript
export class VinylRepo implements IVinylRepo {
  public async save(vinyl: Vinyl): Promise<Vinyl> {
    // 1. Sequelize ORM의 Vinyl 모델에 접근합니다.
    const VinylModel = this.models.Vinyl;

    // 2. Vinyl이 이미 존재하는지 확인합니다.
    const exists: boolean = await this.exists(vinyl.vinylId);

    // 3. VinylMap으로 Sequelize가 DB에 저장하는 데 필요한 JSON 객체 생성
    const rawVinyl: any = VinylMap.toPersistence(vinyl);

    try {
      // 4. 아티스트 저장을 artistRepo에 위임 (1:1 관계로 인해 Vinyl보다 먼저 저장해야 함)
      await this.artistRepo.save(vinyl.artist);

      // 5. 앨범 저장을 albumRepo에 위임 (Vinyl도 앨범을 먼저 저장해야 의존성 해결)
      await this.albumRepo.save(vinyl.album);

      if (!exists) {
        // 6. Vinyl이 존재하지 않으면 CREATE 수행
        await VinylModel.create(rawVinyl);
      } else {
        // 7. 이미 존재하면 UPDATE 수행
        await VinylModel.update(rawVinyl);
      }
    } catch (err) {
      // 8. 실패 시 수동 롤백 실행
      this.rollbackSave(vinyl);
    }

    return vinyl;
  }
}
```

---

### **VinylMap** (Vinyl 형식 변환)

`VinylMap`은 DB, DTO, 도메인 객체 간의 변환 작업을 담당하는 클래스입니다.

```typescript
export class VinylMap extends Mapper<Vinyl> {
  public static toDomain(raw: any): Vinyl {
    const vinylOrError = Vinyl.create(
      {
        traderId: TraderId.create(raw.trader_id),
        artist: ArtistMap.toDomain(raw.Artist),
        album: AlbumMap.toDomain(raw.Album),
      },
      new UniqueEntityID(raw.vinyl_id)
    );
    return vinylOrError.isSuccess ? vinylOrError.getValue() : null;
  }

  public static toPersistence(vinyl: Vinyl): any {
    return {
      vinyl_id: vinyl.id.toString(),
      artist_id: vinyl.artist.artistId.id.toString(),
      album_id: vinyl.album.id.toString(),
      notes: vinyl.vinylNotes.value,
    };
  }

  public static toDTO(vinyl): VinylDTO {
    return {
      vinyl_id: vinyl.id.toString(),
      trader_id: vinyl.traderId.id.toString(),
      artist: ArtistMap.toDTO(vinyl.artist),
      album: AlbumMap.toDTO(vinyl.album),
    };
  }
}
```

`VinylMap`은 도메인 모델(Vinyl)과 퍼시스턴스 모델(JSON), DTO 간의 변환 역할을 합니다.

---

### **AlbumRepo** (앨범 저장소)

`AlbumRepo`는 `VinylRepo`와 유사한 방식으로 앨범 데이터를 처리합니다. 주요 차이점은 `setAlbumGenres()`를 통해 앨범 장르를 저장하는 부분입니다.

```typescript
public async save (album: Album): Promise<Album> {
  const AlbumModel = this.models.Album;
  const exists: boolean = await this.exists(album.albumId);
  const rawAlbum: any = AlbumMap.toPersistence(album);
  let sequelizeAlbumModel;

  try {
    await this.genresRepo.saveCollection(album.genres);

    if (!exists) {
      sequelizeAlbumModel = await AlbumModel.create(rawAlbum);
    } else {
      sequelizeAlbumModel = await AlbumModel.update(rawAlbum);
    }

    await this.setAlbumGenres(sequelizeAlbumModel, album.genres);
  } catch (err) {
    this.rollbackSave(album);
  }

  return album;
}
```

---

### Sequelize 관계 설정

Sequelize는 모델 간의 관계를 정의하여 쉽게 연결할 수 있는 메서드를 제공합니다.

```typescript
Album.belongsToMany(models.Genre, {
  as: "AlbumGenres",
  through: models.TagAlbumGenre,
  foreignKey: "genre_id",
});
```

이 설정은 `setGenres()`와 같은 메서드를 `Album` 인스턴스에 추가하여 장르를 쉽게 설정할 수 있도록 합니다.

---

### **롤백 (Rollback)**

롤백은 트랜잭션 중 오류가 발생했을 때 데이터베이스를 원래 상태로 복구하는 작업입니다.

`AlbumRepo`에서 롤백 예시는 다음과 같습니다:

```typescript
public async rollbackSave (album: Album): Promise<any> {
  const AlbumModel = this.models.Album;
  await this.genresRepo.removeByGenreIds(album.genres.map((g) => g.genreId));
  await AlbumModel.destroy({
    where: { album_id: album.id.toString() }
  });
}
```

#### 수동 롤백 vs 작업 단위(Unit of Work)

작업 단위 패턴(Unit of Work)을 사용하면 트랜잭션을 한 번에 관리할 수 있지만, 구현이 복잡할 수 있습니다.  
현재는 간단한 수동 롤백 방식을 사용했습니다.

---

### 결론

- **`VinylRepo`와 `AlbumRepo`**는 비슷한 알고리즘을 사용하며, 각각의 책임에 따라 데이터를 저장하고 롤백합니다.
- **`VinylMap`**은 도메인 객체와 퍼시스턴스 데이터를 변환하는 데 중추적인 역할을 합니다.
- 롤백은 작업 단위 대신 간단한 수동 방식으로 처리됩니다.

이 과정은 애그리게이트와 관련된 데이터 영속화를 체계적으로 수행하며, 도메인 모델의 무결성을 유지합니다. 😊

---

## 정리

- 애그리게이트는 데이터 변경을 위해 하나의 단위로 취급하는 연관된 엔터티들의 집합이다.
  - 왜 하나의 단위로 취급하려 하는가?
  - 왜 데이터들을 연관시키는가?
  - 데이터 변경을 위한다는 말은 무슨 말인가?
- 애그리게이트는 다른 엔터티들에 대한 참조를 보유하게 한다. 다른 엔티티들은 직접 조회하는 것이 불가능하다. 오직 애그리케이트를 통해서만 접근할 수 있다.

  - 왜 애그리게이트를 통해서만 접근해야하는가? 왜 다른 엔티티들에는 직접 접근하는 것을 막는 것인가?

- DTO의 요구사항을 채우려하다보면 여타 다른 정보들이 필요할 수 있다. 하지만, 이런 상황 속에서도 애그리게이트의 경계를 잘 지켜야한다.
  - 애그리게이트에 무언가를 추가하려고하기 보다는 유즈 케이스 안쪽에서 다른 레포지토리를 의존하여 가져오도록 만들자.
  -

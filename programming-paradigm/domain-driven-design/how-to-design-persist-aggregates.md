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

> https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/

DDD 에서는 object-modeled system에서 발생할 수 있는 모든 작업에 대해서 적절한 도구가 있다고 합니다.

- 유효성 검사 로직을 담당하는 곳은 Value Objects 입니다.
- 도메인 로직은 가능한 Entity 가까운 곳에서 처리하고, 그렇지 않다면 도메인 서비스에서 처리합니다.

DDD를 배우면서 가장 어려운 부분 중 하나는 특정 작업에 필요한 도구가 무엇인지를 판단하는 것입니다.

DDD에서 Repository, Data Mapper, DTO는 도메인 엔티티를 저장, 복원 및 삭제할 수 있게 해주는 엔티티 생명 주기의 중요한 부분입니다. 이러한 유형의 로직은 Data Access Logic이라고 부릅니다.

MVC 패턴을 이ㅛㅇ해 ORM 데이터 접근 로직 캡슐화에 대해 크게 신경 쓰지 않았던 개발자라면 다음의 내용을 배우게 될 것입니다.

- ORM 데이터 접근 로직을 캡슐화하지 않을 때 발생하는 문제
- DTO를 사용해 API를 안정화하는 방법
- Repository 가 복잡한 ORM 쿼리에 대하 Facade로 작동하는 방식
- Repository를 생성하는 다양한 접근법
- Data Mapper가 DTO, 도메인 엔티티, ORM 모델 간의 변환에 사용되는 방식

## How do we usually use ORM models in MVC apps?

```ts
class UserController extends BaseController {
  async exec (req, res) => {
    try {
      const { User } = models;
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      return res.status(201);
    } catch (err) {
      return res.status(500);
    }
  }
}
```

위의 코드의 장점은 다음과 같습니다.

- 읽기 쉽다
- 작은 프로젝트에서는 이런 접근법은 생산성이 높을 수 있다.

하지만, 어플리케이션이 복잡해지면서 이러한 접근법은 몇몇가지 문제를 야기합니다.
이것이 문제가 되는 가장 주된 이유는 관심사의 분리의 부족입니다.
저 위의 코드 블록에서는

- api 요청을 처리하고 있고,
- 도메인 객체에 대한 validation을 처리하고 있고
- 도메인 엔티티를 데이터 베이스에 저장하고 있습니다.

## Scenario: Returning the same view model in 3 separate API calls

ORM을 사용하여 데이터를 가져오는 방식의 캡슐화가 부족해지면, 버그가 발생할 수 있습니다. 이제 예를 들어 생각해봅시다. Vinly앱에서 3가지 api를 호출한다고 해봅시다.

- GET /vinyl?recent=6 – 최신에 등록된 6개의 바이닐 목록 가져오기
- GET /vinyl/:vinylId/ – 특정 ID의 바이닐 가져오기
- GET /vinyl/owner/:userId/ – 특정 사용자가 소유한 모든 바이닐 가져오기

각각의 API 호출에서 Vinly 뷰 모델을 반환해야합니다.
아래는 첫 번째 컨트롤러입니다.

```ts
export class GetRecentVinylController extends BaseController {
  private models: any;

  public constructor(models: any) {
    super();
    this.models = models;
  }

  public async executeImpl(): Promise<any> {
    try {
      const { Vinyl, Track, Genre } = this.models;
      const count: number = this.req.query.count;

      const result = await Vinyl.findAll({
        where: {},
        include: [
          { owner: User, as: "Owner", attributes: ["user_id", "display_name"] },
          { model: Genre, as: "Genres" },
          { model: Track, as: "TrackList" },
        ],
        limit: count ? count : 12,
        order: [["created_at", "DESC"]],
      });

      return this.ok(this.res, result);
    } catch (err) {
      return this.fail(err);
    }
  }
}
```

다음에는 id로 가져오는 컨트롤러입니다.

```ts
export class GetVinylById extends BaseController {
  private models: any;

  public constructor(models: any) {
    super();
    this.models = models;
  }

  public async executeImpl(): Promise<any> {
    try {
      const { Vinyl, Track, Genre } = this.models;
      const vinylId: string = this.req.params.vinylId;

      const result = await Vinyl.findOne({
        where: {
          vinyl_id: vinylId,
        },
        include: [
          { model: User, as: "Owner", attributes: ["user_id", "display_name"] },
          { model: Genre, as: "Genres" },
          { model: Track, as: "TrackList" },
        ],
      });

      return this.ok(this.res, result);
    } catch (err) {
      return this.fail(err);
    }
  }
}
```

이 두 코드 사이의 차이점이 많지 않지요? 이 방식은 DRY 원칙을 따르지 않기 때문에 코드의 중복이 많이 발생합니다. 세번째 API 호출도 이와 비슷할 것입니다.

지금까지 발견한 주요 문제는

- 코드 중복
- 데이터 일관성 부족
  - ORM쿼리 결과를 직접 반환하고 있습니다.
  - `return this.ok(this.res, result)`
  - 이러한 방식으로 클라이언트에게 응답을 보내고 있는데, 만약 데이터베이스 마이그레이션을 수행하여 새로운 컬럼을 추가하거나, 컬럼을 삭제 또는 이름을 변경한다면 어떻게 될까요? 이를 사용하는 각 클라이언트의 API가 깨질 위험이 있습니다.

이러한 문제를 해결하기 위한 도구가 바로 DTO입니다.

## Data Transfer Objects

DTO는 두 개의 독립적인 시스템 간에 데이터를 전달하는 객체를 의미하는 용어입니다.

웹 개발 관점에서 DTO를 생각할 때, 이를 뷰 모델로 볼 수 있습니다. 이는 가짜 모델로 불리며, 실제 도메인은 아니지만, 뷰에서 필요한 만큼의 데이터를 포함하고 있습니다.

Vinyl 뷰 모델/ DTO는 다음과 같이 구성될 수 있습니다.

```ts
type Genre = "Post-punk" | "Trip-hop" | "Rock" | "Rap" | "Electronic" | "Pop";

interface TrackDTO {
  number: number;
  name: string;
  length: string;
}

type TrackCollectionDTO = TrackDTO[];

// Vinyl view model / DTO, 이는 응답 형식을 나타냅니다.
interface VinylDTO {
  albumName: string;
  label: string;
  country: string;
  yearReleased: number;
  genres: Genre[];
  artistName: string;
  trackList: TrackCollectionDTO;
}
```

이러한 방식이 강력한 이유는 API 응답 구조를 표준화하기 때문입니다.

DTO는 일종의 데이터계약입니다. API를 사용하는 모든 사람에게 "이 API 호출에서 항상 이 형식을 기대할 수 있다"라는 약속을 전달하는 것입니다.

```ts
export class GetVinylById extends BaseController {
  private models: any;

  public constructor(models: any) {
    super();
    this.models = models;
  }

  public async executeImpl(): Promise<any> {
    try {
      const { Vinyl, Track, Genre, Label } = this.models;
      const vinylId: string = this.req.params.vinylId;

      const result = await Vinyl.findOne({
        where: {},
        include: [
          { model: User, as: "Owner", attributes: ["user_id", "display_name"] },
          { model: Label, as: "Label" },
          { model: Genre, as: "Genres" },
          { model: Track, as: "TrackList" },
        ],
      });

      // ORM 객체를 DTO로 매핑합니다.
      const dto: VinylDTO = {
        albumName: result.album_name,
        label: result.Label.name,
        country: result.Label.country,
        yearReleased: new Date(result.release_date).getFullYear(),
        genres: result.Genres.map((g) => g.name),
        artistName: result.artist_name,
        trackList: result.TrackList.map((t) => ({
          number: t.album_track_number,
          name: t.track_name,
          length: t.track_length,
        })),
      };

      // BaseController를 사용하여 반환 유형을 지정하여 가독성을 높입니다.
      return this.ok<VinylDTO>(this.res, dto);
    } catch (err) {
      return this.fail(err);
    }
  }
}
```

이제 이 클래스에 대해서 다시 생각해봅시다.

- ORM 모델을 VinlyDTO, TrackDTo, Genres로 매핑하는 방법을 정의하고 있습니다.
- DTO를 생성하기 위해 Sequelize ORM 호출로부터 얼마만큼의 데이터를 가져올지를 정의하고 있습니다.

컨트롤러가 해야 할 역할보다 많은 책임을 지고 있습니다.
이제 Repository 패턴과 Data Mapper 패턴을 사용하여 이러한 문제를 해결해봅시다.

## Repositories

Repository는 도메인 엔티티의 생명 주기에서 중요한 역할을 합니다. 도메인 엔티티를 저장, 복원, 삭제할 수 있게 합니다.
Repository는 퍼사드로 퍼사드는 코드의 복잡한 부분에 대해 간단한 인터페이스를 제공하는 디자인 패턴입니다. 여기서 퍼사드는 도메인 엔티티의 영속성과 조회 로직을 단순화하는 역할을 합니다.

### DDD와 클린 아키텍처에서의 Repository 역할

DDD와 클린 아키텍처에서는 Repository가 인프라 계층의 관심사입니다. 일반적으로 Repository는 도메인 엔티티를 저장하고 조회하는 역할을 합니다.

- 저장 목적 :
  - 복잡한 영속성 로직을 조인 및 관계 테이블을 통해 처리
  - 실패한 트랜잭션 롤백
  - save() 시 엔티티가 이미 존재하는지 확인 후 생성(create) 또는 업데이트(update)수행

특히, 존재하지 않으면 생성하고, 존재하면 업데이트 하는 복잡한 데이터 접근 로직은 도메인 내부의 다른 객체들이 알 필요가 없습니다. 오직 repository가 처리해야하는 부분입니다.

- 조회 목적 :
  - 도메인 엔티티를 생성하기 위해 필요한 전체 데이터를 조회
    - ORM 조회에 필요한 include:[] 설정을 통해 DTO와 도메인 객체를 생성
  - 엔티티 복원 책임을 Mapper에 위임

### Approaches to writing repositories

인터페이스를 먼저 만들어봅시다.

```ts
interface Repo<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<any>;
  getById(id: string): Promise<T>;
  save(t: T): Promise<any>;
}
```

이 접근 방식은 Repository 생성에 대한 공통 방식을 정의했다는 점에서 유용하지만 데이터 접근계층의 세부 사항이 호출 코드에 노출될 수 있습니다. 예를 들어, getById는 다소 모호하며, 도메인에 적합한 용어를 사용하는 것이 더 직관적입니다. VinlyRepo에서는 getVinlyById가 더 설명적입니다.

#### 엔티티/데이터베이스 테이블별 Repository 작성

기본 Repository를 작성한 후, 도메인에 더 적합한 메서드를 추가하는 접근법을 선호할 수 있습니다.

```ts
interface Repo<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<any>;
  save(t: T): Promise<any>;
}

export interface IVinylRepo extends Repo<Vinyl> {
  getVinylById(vinylId: string): Promise<Vinyl>;
  findAllVinylByArtistName(artistName: string): Promise<VinylCollection>;
  getVinylOwnedByUserId(userId: string): Promise<VinylCollection>;
}
```

Repository를 항상 인터페이스로 정의하는 이유는 리스코프 치환 원칙을 따르기 위함입니다. 이를 통해 구현체를 종속성 주입할 수 있습니다. 예를 들어, 유닛 테스트시 sequelize repository 대신 json으로 저장하는 repository를 사용할 수 있습니다.

```ts
import { Op } from "sequelize";
import { IVinylRepo } from "./IVinylRepo";
import { VinylMap } from "./VinylMap";

class VinylRepo implements IVinylRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createQueryObject(): any {
    const { Vinyl, Track, Genre, Label } = this.models;
    return {
      where: {},
      include: [
        {
          model: User,
          as: "Owner",
          attributes: ["user_id", "display_name"],
          where: {},
        },
        { model: Label, as: "Label" },
        { model: Genre, as: "Genres" },
        { model: Track, as: "TrackList" },
      ],
    };
  }

  public async exists(vinyl: Vinyl): Promise<boolean> {
    const VinylModel = this.models.Vinyl;
    const result = await VinylModel.findOne({
      where: { vinyl_id: vinyl.id.toString() },
    });
    return !!result === true;
  }

  public delete(vinyl: Vinyl): Promise<any> {
    const VinylModel = this.models.Vinyl;
    return VinylModel.destroy({
      where: { vinyl_id: vinyl.id.toString() },
    });
  }

  public async save(vinyl: Vinyl): Promise<any> {
    const VinylModel = this.models.Vinyl;
    const exists = await this.exists(vinyl.id.toString());
    const rawVinylData = VinylMap.toPersistence(vinyl);

    if (exists) {
      const sequelizeVinyl = await VinylModel.findOne({
        where: { vinyl_id: vinyl.id.toString() },
      });

      try {
        await sequelizeVinyl.update(rawVinylData);
        // 관련된 테이블(VinylGenres, Tracks 등) 처리
        // ...
      } catch (err) {
        // 실패 시 롤백을 위해 this.delete(vinyl) 실행
      }
    } else {
      await VinylModel.create(rawVinylData);
    }

    return vinyl;
  }

  public async getVinylById(vinylId: string): Promise<Vinyl> {
    const VinylModel = this.models.Vinyl;
    const queryObject = this.createQueryObject();
    queryObject.where = { vinyl_id: vinylId };
    const vinyl = await VinylModel.findOne(queryObject);
    if (!!vinyl === false) return null;
    return VinylMap.toDomain(vinyl);
  }

  public async findAllVinylByArtistName(
    artistName: string
  ): Promise<VinylCollection> {
    const VinylModel = this.models.Vinyl;
    const queryObject = this.createQueryObject();
    queryObject.where = { [Op.like]: `%${artistName}%` };
    const vinylCollection = await VinylModel.findAll(queryObject);
    return vinylCollection.map((vinyl) => VinylMap.toDomain(vinyl));
  }

  public async getVinylOwnedByUserId(userId: string): Promise<VinylCollection> {
    const VinylModel = this.models.Vinyl;
    const queryObject = this.createQueryObject();
    queryObject.include[0].where = { user_id: userId };
    const vinylCollection = await VinylModel.findAll(queryObject);
    return vinylCollection.map((vinyl) => VinylMap.toDomain(vinyl));
  }
}
```

이렇게 하면 Sequelize 데이터 접근 로직을 캡슐화하여, 필요한 include 설정을 한 곳에 모아 반복적인 작성이 필요 없게 됩니다.

또한 VinylMap이라는 Mapper를 참조하고 있습니다. 이제 Mapper의 역할에 대해 살펴보겠습니다.

## Data Mappers

Mapper의 책임은 데이터를 변경하는 것이다.

- From Domain to DTO
- From Domain to Persistence
- From Persistence to Domain

여기 VinlyMap의 구현이다.

```ts
class VinylMap extends Mapper<Vinyl> {
  public static toDomain (raw: any): Vinyl {
    const vinylOrError = Vinyl.create({
      albumName: AlbumName.create(raw.album_name).getValue(),
      artistName: ArtistName.create(raw.artist_name).getValue(),
      tracks: raw.TrackList.map((t) => TrackMap.toDomain(t))
    }, new UniqueEntityID(raw.vinyl_id));
    return vinylOrError.isSuccess ? vinylOrError.getValue() : null;
  }

  public static toPersistence (vinyl: Vinyl): any {
    return {
      album_name: vinyl.albumName.value,
      artist_name: vinyl.artistName.value
    }
  }

  public static toDTO (vinyl: Vinyl): VinylDTO {
    return {
      albumName: vinyl.albumName.value,
      label: vinyl.Label.name.value,
      country: vinyl.Label.country.value
      yearReleased: vinyl.yearReleased.value,
      genres: vinyl.Genres.map((g) => g.name),
      artistName: vinyl.aristName.value,
      trackList: vinyl.tracks.map((t) => TrackMap.toDTO(t))
    }
  }
}
```

이제 DTO, Mapper, Repository를 사용하여 젤 첫번째 코드를 리팩토링해봅시다.

```ts
export class GetVinylById extends BaseController {
  private vinylRepo: IVinylRepo;

  public constructor(vinylRepo: IVinylRepo) {
    super();
    this.vinylRepo = vinylRepo;
  }

  public async executeImpl(): Promise<any> {
    try {
      const { VinylRepo } = this;
      const vinylId: string = this.req.params.vinylId;
      const vinyl: Vinyl = await VinylRepo.getVinylById(vinylId);
      const dto: VinylDTO = VinylMap.toDTO(vinyl);
      return this.ok<VinylDTO>(this.res, dto);
    } catch (err) {
      return this.fail(err);
    }
  }
}
```

Much. Cleaner. And. Singularly. Responsible.

> https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/

유스케이스
유스케이스와 '기능'은 거의 같은 개념이다. 소프트웨어를 구축하는 전체 목적은 하나 이상의 유스케이스를 해결하기 위함입니다.
만약 애플리케이션의 모든 기능을 설명할 수 있는 특정 구조가 코드에 나타난다면 어떨까요? 이는 애플리케이션의 모든 기능을 캡슐화하고 조직하며 추적하는 데 도움이 될 것입니다. 다행히도 이러한 구조가 존재하며, 바로 "유스케이스"라고 불립니다.

이 글에서는 아래의 내용을 다룰 것입니다.

- 유스케이스를 발견하는 방법
- 애플리케이션 계층의 역할
- 유스케이스가 속한 서브도메인을 식별하는 방법
- 유스케이스가 대규모 프로젝트를 더 읽기 쉽게 만드는 방법(소리치는 아키텍처)
- TypeScript로 유스케이스를 구현하는 방법

## 1. Discovering Use Cases

애플리케이션을 구축하기 위한 계획을 세우는 방법에는 여러 가지가 있습니다. 예전에는 API 설계를 먼저 하는 방식으로 실제로 어떻게 무언가를 구축할지 계획하곤 했습니다.
이후에는 와이어프레임을 그리거나 인터페이스 설계부터 시작하게 되었는데, 프론트엔드가 실제로 필요한 것과 YAGNI(필요하지 않은 기능)를 결정하는 경우가 많았기 때문입니다.
프로젝트가 점점 복잡해지면서 더 전통적인 소프트웨어 계획 방식이 필요하다는 것을 깨달았습니다. 그 방식이 바로 유스케이스 설계입니다.

### 전통적인 접근 방식

유스케이스를 식별하고 다이어그램으로 그리는 전통적인 방식이 있습니다.

유스케이스 다이어그램에서는 막대인형이 시스템의 행위자(사용자)를 나타내고, 원이 실제 유스케이스를 나타내어 소프트웨어로 실행할 수 있도록 지원하고자 하는 모든 유스케이스를 시각화합니다.

전통적인 유스케이스 다이어그램
이 다이어그램을 그리는 방법을 아는 것은 유용하지만, 시스템 설계를 이러한 문서를 생성하는 데 초점을 맞추어 시작하는 경우는 드뭅니다.

대신 중요한 구성 요소를 대화로 식별한 후, 자유 형식으로 다이어그램을 그리는 방식을 선호합니다.

### Use Case Basics

- Actors: 시스템의 행위자가 누구인지 (누가 유스케이스를 실행하는지)
- Command or Query: 유스케이스는 명령 또는 조회 중 하나라는 점
- Subdomain: 유스케이스는 특정 서브도메인에 속하며, 이는 별도의 경계 컨텍스트로 배포될 수 있다는 점

#### 1. Actors

모든 행위자를 User(사용자)라고 부르기 쉽지만, 이는 도메인에 대해 충분히 설명하지 않습니다.

예를 들어, 다음과 같은 도메인에 따라 다양한 용어를 사용할 수 있습니다:

- 결제 시스템: 고객(Customer), 구독자(Subscriber), 회계사(Accountant), 출납원(Treasurer), 직원(Employee)
- 블로깅 시스템: 편집자(Editor), 리뷰어(Reviewer), 방문자(Guest), 작성자(Author)
- 채용 플랫폼: 구직자(JobSeeker), 고용주(Employer), 면접관(Interviewer), 채용자(Recruiter)
- 바이닐 거래 애플리케이션: 거래자(Trader), 관리자(Admin)
- 이메일 마케팅 회사: 연락처(Contact), 수신자(Recipient), 발신자(Sender), 목록 소유자(ListOwner)

#### 2.Use Cases are Commands and Queries

유스케이스는 명령 또는 조회로 나눌 수 있습니다.

객체 지향 설계 원칙 중 하나인 CQS(명령-조회 분리)를 따르게 되면 애플리케이션 부작용을 쉽게 이해할 수 있으며, 버그를 줄이고 가독성을 높이는 데 도움이 됩니다.
예를 들어, 바이닐 거래 앱인 "White Label"에서 명령의 예로는 AddVinylToWishlist(위시리스트에 바이닐 추가)가 있고, 조회의 예로는 GetWishlist(위시리스트 가져오기)가 있습니다.
CQS에서 명령(COMMANDS)은 시스템을 변경하지만 값을 반환하지 않으며, 조회(QUERIES)는 시스템에서 데이터를 가져오지만 부작용이 없습니다.

#### 3. Use cases belong to a particular subdomain

일반적으로 대부분의 애플리케이션은 여러 서브도메인으로 구성됩니다.
서브도메인은 전체 문제 도메인의 논리적 분할을 의미합니다.

예를 들어, 바이닐 거래 앱 "White Label"은 바이닐을 거래하는 것뿐만 아니라 신원 및 접근 관리, 항목 카탈로깅, 결제, 알림 등 다양한 서브도메인도 포함해야 합니다.

이는 [Conway](https://khalilstemmler.com/wiki/conways-law/)의 법칙과도 관련이 있으며, 이는 다음과 같습니다:

"시스템을 설계하는 조직은 해당 조직의 의사소통 구조를 복사한 설계를 만들어야 합니다."

Conway의 법칙은 서브도메인을 결정하고 향후 유스케이스를 쉽게 변경할 수 있도록 돕는 데 유용합니다.

대규모 단일체(monolithic) 애플리케이션에서는 서브도메인을 폴더별로 분리하는 것이 가독성을 높이며, 추후 애플리케이션이 독립적으로 배포 가능한 단위로 분리되는 데 필수적입니다.

### We discover use cases through conversation

소프트웨어 개발의 오해 중 하나는 개발자가 사람들과 대화 없이 코드만 작성한다는 것입니다.

실제 개발에서는 올바른 언어를 식별하고 실제 모델을 소프트웨어로 구현하는 작업이 많습니다.

다음은 White Label의 유스케이스를 발견하는 대화 예시입니다.

> "앱에 대한 아이디어가 있어요. 사람들이 다른 사람들과 바이닐을 거래할 수 있는 앱이에요."
>
> "오, 그러면 디스코그스(Discogs) 같은 건가요?"
>
> "네, 비슷해요. 하지만 오로지 바이닐만 거래해요. 진정한 힙스터들을 위해서죠."
>
> "좋네요. 제 바이닐을 거래하고 싶지 않다면, 그냥 구매할 수도 있나요?"
>
> "네, 본인의 바이닐을 다른 사람의 것과 교환하거나 돈으로 거래할 수 있어요."

> "네, 본인의 바이닐을 다른 사람의 것과 교환하거나 돈으로 거래할 수 있는 거죠."
>
> "그럼 이건 어때요? 사용자들이 복잡한 제안을 할 수 있게 하는 거죠. 예를 들어, '이 2개의 디보 앨범과 섹스 피스톨즈 앨범, 그리고 60달러를 줄 테니 그 한정판 버스데이 파티 바이닐을 주라' 같은 식으로요."
>
> "아, 그렇군요. 그러니까 제안과 거래가 있는 거죠. 제안에는 여러 레코드와 돈이 포함될 수 있고, 한 개 이상의 레코드와 교환이 가능한 거고요. 그리고 제안을 받은 사람은 이를 수락하거나 거절할 수 있는 거군요."
>
> "네, 그게 정확합니다. 만약 거절하고 싶다면, '코멘트를 남기며' 거절하는 기능을 통해 왜 거절하는지 이유를 설명하고 다른 제안을 하도록 유도할 수도 있을 거에요."

> "좋아요, 괜찮네요."
>
> "자, 그럼 지금까지 우리가 발견한 유스케이스는 뭐가 있을까요?"

```plaintext
MakeOffer(offer: Offer)
DeclineOffer(offerId: OfferId, comments?: string)
AcceptOffer(offerId: OfferId)
```

> "아마도 모든 제안을 가져오거나 특정 ID로 제안을 조회하는 기능도 필요할 거에요. UI도 고려해야 할 테니, 이런 유스케이스가 필요할 거에요."
>
> "아, 그렇죠. 그러면 `GetAllOffers(userId: User)`와 `GetOfferById(offerId: OfferId)`도 필요하겠네요."

> "음, 그런데 여기서 `User`가 어디서 나온 거죠?"
>
> "우리가 이야기한 게 바로 사용자들이 할 수 있는 기능들이잖아요."
>
> "맞아요, 하지만 조금 다르게 생각해 봅시다. 이 거래 서브도메인과 그 역할을 고려할 때, 'User'보다는 'Trader'나 'RecordCollector'라고 부르는 게 더 적절해 보이지 않나요?"

> "아, 알겠어요. 'User'라는 용어는 'Users & Identity' 서브도메인에 더 적합하고, 지금 우리가 논의하는 'Trading' 서브도메인에는 맞지 않는 것 같네요, 맞죠?"
>
> "네, 맞습니다."
>
> "좋아요, 그럼 'Trader'로 갑시다."
>
> "좋습니다. 지금까지 Trading 서브도메인에서 우리가 발견한 유스케이스는 다음과 같습니다:

- MakeOffer(offer: Offer)
- DeclineOffer(offerId: OfferId, comments?: string)
- AcceptOffer(offerId: OfferId)
- GetAllOffers(traderId: TraderId)
- GetOfferById(offerId: offerId)

> "그 밖에 다른 건 생각나는 게 없네요."
>
> "저도 더는 없어요. 일단 이 정도로 진행해 봅시다."

> "그리고 우리가 몇 가지 엔티티도 파악한 것 같네요. Offer와 Trader가 그렇죠?"
>
> "네, Offer는 아마 OfferItems의 애그리게이트 루트가 될 거에요. (돈과 바이닐을 포함하는 컬렉션) 그 부분은 나중에 더 구체화하면 될 것 같아요. 지금까지는 괜찮아 보여요."
>
> "아, 그리고 Users & Identity 서브도메인을 언급했으니 그것도 다룰까요?"
>
> "음, 네- 그렇게 해도 좋을 것 같아요. 아마 다른 앱과 비슷할 거에요."
>
> "무슨 의미죠?"
>
> "보통 이런 경우엔 공통적인 유스케이스가 있잖아요. 예를 들어:

- login(userEmail: UserEmail, password: UserPassword)
- logout(authToken: JWTToken)
- verifyEmail(emailVerificationToken: EmailVerificationToken)
- changePassword(passwordResetToken: Token, password: UserPassword)

> "이런 식이죠. 이런 기능들은 많이 구현해 봤잖아요."
>
> "아, 이거 우리가 아웃소싱할 수 있지 않을까요?"
>
> "네, 아마 Auth0 같은 서비스를 사용해 볼 수 있을 거에요."
>
> "DDD 용어로 이런 걸 뭐라고 하죠? 서브도메인 유형이..."

> "제네릭 서브도메인(generic subdomain)이라고 하죠."
>
> "그게 무슨 뜻이죠?"

> "비즈니스에서 중요한 부분이긴 하지만, 사업의 핵심은 아니라는 뜻이에요. 핵심은 아마도 Trading 서브도메인이 될 거에요."
>
> "맞아요. 그것이 핵심 서브도메인이 될 거에요. 왜냐하면, 그것이 바로 우리의 앱에서 아웃소싱하거나 기존의 패키지를 사용할 수 없는 독특한 부분이기 때문이죠."

이렇게 대화를 통해 MakeOffer, DeclineOffer, AcceptOffer 등의 유스케이스를 파악해 나갈 수 있습니다.

유스케이스 설계를 통해 서브도메인의 역할을 더 잘 이해할 수 있으며, 기능을 잘 정의하고 조직하는 데 도움이 됩니다.

## 2. The Role of the Application Layer

Enterprise Node.js + TypeScript 시리즈를 따라오셨다면, 도메인 계층(Domain Layer)은 모든 엔터티와 값 객체를 포함하며, 외부 계층에 의존하지 않고, 비즈니스 로직(특히 특정 엔터티와 관련된 로직)을 가장 먼저 배치하는 계층이라는 것을 기억하실 겁니다.

예를 들어, White Label에서 Vinyl이 최대 3개의 다른 장르만 가질 수 있도록 보장하는 불변 로직을 어디에 배치해야 할지 고민한다면, 이 로직은 Vinyl 클래스(애그리게이트 루트)에 포함되어야 합니다.

```ts
class Vinyl extends AggregateRoot<VinylProps> {
  ...

  addGenre (genre: Genre): Result<any> {
    if (this.props.genres.length >= MAX_NUMBER_OF_GENRES_PER_VINYL) {
      return Result.fail<any>('Max number of genres reached')
    }

    if (!this.genreAlreadyExists(genre)) {
      this.props.genres.push(genre)
    }

    return Result.ok<any>();
  }
}
```

위의 코드에서 우리는 도메인 모델 자체에 검증 로직을 배치함으로써 도메인 모델의 무결성을 보장하고 있습니다.

Vinyl은 Catalog 서브도메인의 도메인 계층에서 많은 도메인 모델 중 하나에 불과합니다.

> 도메인 계층과 인프라 계층 복습
>
> - 도메인 계층: 비즈니스 로직을 포함하고, 외부 계층에 의존하지 않습니다.
> - 인프라 계층: 컨트롤러, 데이터베이스, 캐시 등 외부 서비스와 관련된 요소를 포함합니다.

애플리케이션 계층은 애플리케이션의 특정 서브도메인에 대한 유스케이스를 포함합니다.

유스케이스는 애플리케이션의 기능을 설명하며, 독립적으로 배포되거나 모놀리식 형태로 배포될 수 있습니다. 유스케이스를 서브도메인에 직접 포함하면 해당 서브도메인의 기능을 바로 이해할 수 있습니다. DDD 용어로, 유스케이스는 애플리케이션 서비스입니다. **애플리케이션 서비스는 도메인 로직을 실행하기 위해 필요한 도메인 엔터티와 정보를 검색하는 역할을 담당합니다.**

예를 들어, AcceptOffer(offerId: OfferId) 유스케이스를 고려해 봅시다.

이 유스케이스에서는 OfferId만 가지고 시작합니다. 하지만, 단순히 OfferId만으로는 accept 작업을 수행할 수 없습니다. OfferId를 통해 전체 Offer 엔터티를 가져와야 합니다. 그런 다음 offer.accept()를 저장하고, OfferAcceptedEvent라는 도메인 이벤트를 디스패치해야 합니다. Offer 엔터티를 검색하고 저장하기 위해 리포지토리를 사용해야 합니다. 이렇게 애플리케이션 서비스는 도메인 엔터티를 검색하고 실행 환경을 설정하는 책임을 갖습니다.

프로젝트를 유스케이스 중심으로 구조화하는 방법을 아래에서 살펴보겠습니다. 애플리케이션 계층은 유스케이스를 포함하여 애플리케이션의 기능을 명확히 정의하고 서브도메인 간의 책임을 분리합니다. 😊

## 3. 프로젝트 구조화 예시

로버트 마틴(일명 Uncle Bob)은 **"Screaming Architecture"**라는 패턴을 제안했습니다.
이 패턴은 프로젝트의 구조만 보아도 우리가 어떤 프로젝트를 작업하고 있는지, 그리고 시스템의 기능이 무엇인지가 명확히 드러나야 한다는 것을 의미합니다.

White Label 프로젝트에서 서브도메인 => 유스케이스 + 엔터티 구조로 나누었을 때의 예시는 다음과 같습니다.

프로젝트 구조를 보면 Users 서브도메인이 무엇인지, 어떤 기능을 하는지, 그리고 Catalog 서브도메인의 역할이 무엇인지 바로 알 수 있습니다.

## 4. A Use Case interface

유스케이스는 원칙적으로 단순합니다. **요청(request)**과 **응답(response)**이 옵션으로 포함됩니다.

```ts
export interface UseCase<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
```

"항상 구현이 아닌 인터페이스에 의존해서 프로그래밍해야 한다"는 설계 원칙을 적용하여, 위와 같이 유스케이스를 표현하는 인터페이스를 정의할 수 있습니다.
단순하면서도 효과적이죠.

## 5. Implementing a Use Case

이제 유스케이스를 구현해봅시다. AddVinylToCatalogUseCase를 Catalog 서브도메인에서 구현해 보겠습니다.

먼저, 클래스를 생성하고 제네릭 DTO(데이터 전송 객체)로 any를 사용하여 인터페이스를 구현합니다.

```ts
export class AddVinylToCatalogUseCase implements UseCase<any, any> {
  public async execute(request: any): Promise<any> {
    return null;
  }
}
```

Vinyl을 추가하려면, 이를 생성하는 데 필요한 모든 정보와 함께 추가할 Trader의 id를 제공해야 합니다.
이 정보를 요청 DTO에 담아보겠습니다.

```ts
interface AddVinylToCatalogUseCaseRequestDTO {
  vinylName: string;
  artistNameOrId: string;
  traderId: string;
  genresArray?: string | string[];
}

export class AddVinylToCatalogUseCase
  implements UseCase<AddVinylToCatalogUseCaseRequestDTO, any>
{
  async execute(request: AddVinylToCatalogUseCaseRequestDTO): Promise<any> {
    return null;
  }
}
```

### 의존성 주입을 통한 리포지토리 연결

Vinyl 애그리게이트 루트 클래스는 Artist의 실제 인스턴스가 필요합니다.

요청에서 제공된 artistNameOrId가 ID인지 이름인지에 따라 적절히 가져와야 합니다. 요청 실패 시 안전하게 오류를 반환하기 위해 Result 클래스를 사용합니다. 성공 시 VinylRepo를 사용하여 Vinyl을 영속화해야 합니다. 이를 위해 **의존성 주입(DI)**을 사용해 VinylRepo와 ArtistRepo를 클래스의 생성자에서 주입합니다.

```ts
interface AddVinylToCatalogUseCaseRequestDTO {
  vinylName: string;
  artistNameOrId: string;
  traderId: string;
  genresArray?: string | string[];
}

export class AddVinylToCatalogUseCase
  implements UseCase<AddVinylToCatalogUseCaseRequestDTO, Result<Vinyl>>
{
  private vinylRepo: IVinylRepo;
  private artistRepo: IArtistRepo;

  constructor(vinylRepo: IVinylRepo, artistRepo: IArtistRepo) {
    this.vinylRepo = vinylRepo;
    this.artistRepo = artistRepo;
  }

  public async execute(
    request: AddVinylToCatalogUseCaseRequestDTO
  ): Promise<Result<Vinyl>> {
    return null;
  }
}
```

다음으로 유스케이스 로직을 구현합니다.

- Artist 확인 및 생성
  - 요청에서 받은 artistNameOrId가 UUID인지 이름인지 확인 후 적절히 처리합니다.
- Vinyl 생성
  - Vinyl.create() 메서드를 사용해 Vinyl 객체를 생성합니다.
- Vinyl 저장
  - 생성된 Vinyl 객체를 VinylRepo.save()를 통해 영속화합니다.

```ts
export interface AddVinylToCatalogUseCaseRequestDTO {
  vinylName: string;
  artistNameOrId: string;
  traderId: string;
  genresArray?: string | string[];
}

export class AddVinylToCatalogUseCase
  implements UseCase<AddVinylToCatalogUseCaseRequestDTO, Result<Vinyl>>
{
  private vinylRepo: IVinylRepo;
  private artistRepo: IArtistRepo;

  constructor(vinylRepo: IVinylRepo, artistRepo: IArtistRepo) {
    this.vinylRepo = vinylRepo;
    this.artistRepo = artistRepo;
  }

  public async execute(
    request: AddVinylToCatalogUseCaseRequestDTO
  ): Promise<Result<Vinyl>> {
    const { vinylName, artistNameOrId, traderId, genresArray } = request;
    let artist: Artist;

    const isArtistId = TextUtil.isUUID(artistNameOrId);

    if (isArtistId) {
      artist = await this.artistRepo.findById(artistNameOrId);
    } else {
      artist = await this.artistRepo.findByArtistName(artistNameOrId);
    }

    if (!!artist === false) {
      artist = Artist.create({
        name: ArtistName.create(artistNameOrId).getValue(),
        genres: [],
      }).getValue();
    }

    const vinylOrError = Vinyl.create({
      title: vinylName,
      artist: artist,
      traderId: TraderId.create(new UniqueEntityID(traderId)),
      genres: [],
    });

    if (vinylOrError.isFailure) {
      return Result.fail<Vinyl>(vinylOrError.error);
    }

    const vinyl = vinylOrError.getValue();

    await this.vinylRepo.save(vinyl);
    return Result.ok<Vinyl>(vinyl);
  }
}
```

## 유스케이스는 인프라 계층에 종속되지 않음

유스케이스는 어떻게 연결되는지와 무관합니다.

입력값만 제공되면, 시스템에서 명령과 쿼리를 실행할 수 있습니다.
즉, 유스케이스는 Express.js 컨트롤러나 인프라 계층의 다른 외부 서비스로 연결될 수 있습니다.

```ts
import { BaseController } from "../../../../../infra/http/BaseController";
import { AddVinylToCatalogUseCase } from "./CreateJobUseCase";
import { DecodedExpressRequest } from "../../../../../domain/types";
import { AddVinylToCatalogUseCaseRequestDTO } from "./AddVinylToCatalogUseCaseRequestDTO";

export class AddVinylToCatalogUseCaseController extends BaseController {
  private useCase: AddVinylToCatalogUseCase;

  public constructor(useCase: AddVinylToCatalogUseCase) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl(): Promise<any> {
    const req = this.req as DecodedExpressRequest;
    const { traderId } = req.decoded;
    const requestDetails = req.body as AddVinylToCatalogUseCaseRequestDTO;
    const resultOrError = await this.useCase.execute({
      ...requestDetails,
      traderId,
    });
    if (resultOrError.isSuccess) {
      return this.ok(this.res, resultOrError.getValue());
    } else {
      return this.fail(resultOrError.error);
    }
  }
}
```

다른 유스케이스와 연결
**유스케이스는 애플리케이션 계층 내에서 다른 유스케이스에 의해 실행될 수도 있습니다.**
하지만 도메인 계층에서는 실행될 수 없습니다(Uncle Bob의 의존성 규칙에 따름).

이러한 구조는 매우 유용하며, 애플리케이션을 확장하는 데 유연성을 제공합니다.

도메인 이벤트와의 우아한 유스케이스 사용
유스케이스를 체인으로 연결하는 우아한 방법이 있습니다.

특정 이벤트가 발생했을 때, 다른 유스케이스가 실행되도록 연결하고 싶을 때 체인을 사용할 수 있습니다.
도메인 주도 설계(DDD)에서는 이벤트 스토밍(Event Storming) 기법을 통해 이러한 동작을 식별하고, 옵저버 패턴을 사용하여 도메인 이벤트를 방출합니다.

## 위시리스트에 있는 항목 추가 시 트레이더 알림

White Label에서는 트레이더가 특정 아티스트나 바이닐을 위시리스트에 추가할 수 있습니다.
누군가 새로운 바이닐을 컬렉션에 추가하면, 해당 아티스트나 바이닐에 관심이 있는 트레이더들에게 알림이 전송됩니다.
이를 통해 트레이더는 관심 있는 바이닐의 소유자에게 제안을 보낼 수 있습니다.

레이어와 유스케이스 간의 통신 다이어그램
다음 다이어그램은 레이어와 유스케이스 간의 통신을 단순화한 예시입니다.

유스케이스 간의 체인 연결은 이벤트 기반 알림과 같은 복잡한 동작을 설계할 때 매우 강력한 패턴을 제공합니다. 😊

### 확장성을 고려한 마이크로서비스 전환

애플리케이션을 하나의 프로세스에서 실행되는 모놀리식 구조로 유지하는 대신, 서브도메인을 마이크로서비스로 배포하고 싶다면, RabbitMQ나 Amazon MQ와 같은 메시지 브로커를 활용할 수 있습니다.

### 도메인 이벤트와 유스케이스 체인의 비동기 연결

향후 기사에서 옵저버 패턴을 사용하여 도메인 이벤트를 체인으로 연결하고, 이를 통해 유스케이스를 디커플링된 방식으로 실행하는 방법에 대해 자세히 다룰 예정입니다.

코드베이스
이 글에 소개된 모든 코드는 White Label에서 가져왔습니다. White Label은 Node.js와 TypeScript를 사용해 도메인 주도 설계(DDD) 방식으로 구축된 바이닐 거래 엔터프라이즈 애플리케이션입니다.

---

- 주요 포인트

  - CQS에서 명령(COMMANDS)은 시스템을 변경하지만 값을 반환하지 않으며, 조회(QUERIES)는 시스템에서 데이터를 가져오지만 부작용이 없습니다.
  - 유스케이스의 3가지 기본 개념: 명령, 조회, 서브도메인

- 애플리케이션 서비스는 도메인 로직을 실행하기 위해 필요한 도메인 엔터티와 정보를 검색하는 역할을 담당한다.

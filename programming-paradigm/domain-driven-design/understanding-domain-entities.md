> https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/

이 글에서는 DDD에서 엔터티의 역할과 생명주기에 대해 다룹니다. 이 주제는 The Software Essentialist 온라인 강의에서도 다루고 있으니, 이 글을 재미있게 보셨다면 확인해 보세요. 또한 이 내용은 TypeScript로 도메인 주도 설계하기 시리즈의 일부이기도 합니다.

기업들이 도메인 주도 설계를 향해 나아가는 가장 큰 이유는 비즈니스가 필연적으로 복잡성을 갖게 되기 때문입니다.

이러한 비즈니스 로직의 복잡성을 관리하기 위해 객체 지향 프로그래밍 개념을 활용하여 객체 간의 복잡한 동작을 모델링합니다. 특정 도메인에서 발생해야 하는 일을 객체를 통해 재현하려는 접근 방식이 사용됩니다.

이제 주요 아티팩트 중 하나인 엔터티에 대해 이야기해보겠습니다.

## DDD에서 엔터티의 역할

엔터티는 도메인 모델링에서 필수적인 요소입니다.

### 엔터티의 주요 특징

1. 비즈니스 로직을 배치하는 첫 번째 장소 (적절할 경우)

**엔터티는 도메인 로직을 배치할 첫 번째 장소로 고려해야 합니다. 특정 모델이 어떤 동작을 수행할 수 있는지, 언제 수행 가능한지, 어떤 조건이 필요한지 등의 로직을 해당 모델에 가장 가깝게 배치하는 것이 목표입니다.**

예를 들어, 구직 게시판 애플리케이션에서 고용주가 지원자에게 답변을 받을 질문을 남기는 기능이 있다고 가정해 보겠습니다. 이때 다음과 같은 규칙을 적용할 수 있습니다.

- 규칙 1: 기존 지원자가 있는 구직 공고에는 질문을 추가할 수 없습니다.
- 규칙 2: 구직 공고의 최대 질문 수를 초과할 수 없습니다.

```ts
class Job extends Entity<IJobProps> {
  get questions(): QuestionsCollection {
    return this.props.questions;
  }

  public hasApplicants(): boolean {
    return this.props.applicants.length !== 0;
  }

  public addQuestion(question: Question) {
    if (this.hasApplicants()) {
      throw new Error(
        "이미 지원자가 있는 구직 공고에는 질문을 추가할 수 없습니다."
      );
    }

    if (this.props.questions.length === MAX_QUESTIONS_PER_JOB) {
      throw new Error("이 구직 공고는 최대 질문 수에 도달했습니다.");
    }

    this.props.questions.push(question);
  }
}
```

하지만 모든 도메인 로직이 엔터티에 자연스럽게 위치하지는 않습니다. **하나의 특정 엔터티와 관련되지 않은 로직의 경우 도메인 서비스에 배치하는 것이 적절할 수 있습니다.**

2. 모델 불변성 강제

DDD는 선언적인 방식입니다. DDD를 통해 애플리케이션을 구축하는 것은 문제 도메인에 대한 도메인 특화 언어를 만드는 것과 비슷합니다. **따라서 도메인에 유효하고 의미 있는 작업만 노출해야 하며, 클래스의 불변성 또한 충족해야 합니다.**

객체 생성 시 유효성 검사는 일반적으로 값 객체(Value Objects)에 위임되지만, 특정 시점에 어떤 일이 발생할지 결정하는 것은 엔터티가 담당합니다.

예를 들어, 다음 Job 엔터티에서 questions 배열에 setter를 정의하지 않았습니다. 도메인 로직은 특정 구직 공고의 질문 수가 최대치를 넘지 않아야 한다는 것을 규정하고 있기 때문입니다.

```ts
class Job extends Entity<IJobProps> {
  get questions(): QuestionsCollection {
    return this.props.questions;
  }

  public addQuestion(question: Question) {
    if (this.props.questions.length === MAX_QUESTIONS_PER_JOB) {
      throw new Error("이 구직 공고는 최대 질문 수에 도달했습니다.");
    }

    this.props.questions.push(question);
  }
}
```

만약 questions에 공개된 setter가 있다면, 외부에서 이 도메인 로직을 우회하여 잘못된 상태로 객체를 변경할 수 있습니다. 이는 데이터 무결성을 유지하는 객체 지향 프로그래밍의 중요한 원칙인 캡슐화(encapsulation)를 의미합니다.

3. 식별 및 조회

엔터티는 주로 ID를 가지며, 이 ID를 통해 구별됩니다. 반면 값 객체는 식별자를 가지지 않습니다. 일반적으로 하나의 엔터티는 다른 값 객체 및 엔터티를 참조합니다.

```ts
interface IUserProps {
  name: Username;
  email: Email;
  active: boolean;
}

class User extends Entity<IUserProps> {
  get name(): Username {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  private constructor(props: IUserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public isActive(): boolean {
    return this.props.active;
  }

  public static createUser(
    props: IUserProps,
    id?: UniqueEntityId
  ): Result<User> {
    const userPropsResult = Guard.againstNullOrUndefined([
      { propName: "name", value: props.name },
      { propName: "email", value: props.email },
      { propName: "active", value: props.active },
    ]);

    if (userPropsResult.isSuccess) {
      return Result.ok<User>(new User(props, id));
    } else {
      return Result.fail<User>(userPropsResult.error);
    }
  }
}
```

엔터티의 생명주기 동안 데이터베이스에 저장되고, 재구성되며, 수정되거나 삭제/보관될 수 있습니다. 저는 엔터티 생성 시 UUID를 자동 증가 ID 대신 사용합니다.

## 엔터티의 생명주기

일반적으로 엔터티의 생명주기는 다음과 같습니다.

### 생성 (Creation)

엔터티 생성은 값 객체(Value Objects)처럼 팩토리(Factory)를 사용합니다. 여기서 팩토리 메서드는 엔터티 생성을 담당하며, 직접 new 키워드로 인스턴스를 생성하지 못하게 합니다. 예를 들어 User 엔터티를 생성하는 createUser 메서드는 다음과 같습니다.

```ts
class User {
  private constructor(props: IUserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static createUser(
    props: IUserProps,
    id?: UniqueEntityId
  ): Result<User> {
    const userPropsResult: Result = Guard.againstNullOrUndefined([
      { propName: "name", value: props.name },
      { propName: "email", value: props.email },
      { propName: "active", value: props.active },
    ]);

    if (userPropsResult.isSuccess) {
      return Result.ok<User>(new User(props, id));
    } else {
      return Result.fail<User>(userPropsResult.error);
    }
  }
}
```

여기서 createUser는 팩토리 메서드로 new User()로 객체를 생성하지 못하게 합니다. 이는 캡슐화와 데이터 무결성을 유지하기 위한 것으로, 엔티티 인스턴스가 도메인 레이어의 코드 실행에 통제된 방식으로 진입하도록 합니다.

### 엔터티 기본 클래스 (Entity Base Class)

Entity<T> 기본 클래스는 엔터티 비교를 위해 equals 메서드를 사용하며, 클래스 내의 속성(props)은 자식 클래스가 getter와 setter를 정의하도록 유연하게 설계되었습니다. id 필드는 선택사항으로, 엔터티 생성 시 ID가 이미 존재하면 전달하고, 그렇지 않다면 UUID를 생성합니다.

```ts
export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  protected props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    return this._id.equals(object._id);
  }
}
```

### 저장 (Storage)

엔터티가 메모리 내에서 생성된 후, 이를 데이터베이스에 저장하기 위해 리포지토리와 매퍼(Mapper)를 사용합니다. 리포지토리는 도메인 객체를 특정 영속성 기술에 맞게 저장하고 검색하는 데 사용되며, 매퍼는 도메인 객체를 저장 가능한 형식으로 변환하고 반대로 변환합니다. 아래는 User 리포지토리의 예시입니다.

```ts
export class SequelizeUserRepo implements IUserRepo {
  private sequelizeModels: any;

  constructor(sequelizeModels: any) {
    this.sequelizeModels = sequelizeModels;
  }

  async getUsers(config: IUserSearchConfig): Promise<UsersCollection> {
    const UserModel = this.sequelizeModels.BaseUser;
    const queryObject = this.createQueryObject(config);
    const users: any[] = await UserModel.findAll(queryObject);
    return users.map((u) => UserMap.toDomain(u));
  }
}
```

매퍼 클래스는 도메인 객체를 데이터베이스 형식으로 변환합니다.

```ts
export class UserMap extends Mapper<User> {
  public static toPersistence(user: User): any {
    return {
      user_id: user.id.toString(),
      user_name: user.name.value,
      user_email: user.email.value,
      is_active: user.isActive(),
    };
  }
}
```

재구성 (Reconstitution)
엔터티가 데이터베이스에 저장된 후, 다시 불러와서 조작할 필요가 있을 때 리포지토리와 매퍼를 통해 재구성합니다.

## 결론

도메인 객체에는 Aggregate Root와 도메인 이벤트(Domain Events) 같은 개념도 있지만, 엔터티와 값 객체(Value Objects)만으로도 도메인의 많은 부분을 모델링할 수 있습니다.

다음 글에서는 실전 애플리케이션(Sequelize + Node + TypeScript)에서 도메인 이벤트를 사용하는 방법과 Aggregate를 모델링하는 방법에 대해 다룰 예정입니다.

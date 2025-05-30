## 배경설명

- 파트너 사이트 : 관리하는 사이트. 제작사에서 직접 사용하면서 컨텐츠를 관리함

## ddd는 무엇일까?

- 각각의 기능적인 문제들을 정의하는 도메인과 그 도메인을 사용하는 비지니스 로직을 중심으로 설계를 하는 것을 말한다.
- 몇가지 특징이 있다.
  - 도메인의 모델과 로직에 집중한다.
  - 유비쿼터스 언어를 사용한다.
  - 소프트웨어 엔티티와 도메인간 개념의 일치를 이룬다. (모델과 코드까지 일관된 그림)

## DDD에 필요했던 것들

- Bounded Context : 범위를 구분해놓은 하위 도메인 개념
  - 파트너 사이트에는 유저, 인증 컨텐츠 제작, 예약 등등 다양한 기능이 존재한다.
  - 이러한 기능 영역들을 분류하고, 서로에 대한 의존성을 낮추기 위해 일종의 '경계'를 구성하게 된다.
  - msa상 각각의 서비스로 나뉘어지게 된다.
- Context Map : 바운디드 컨텍스트 간의 관계를 보여주는 맵
  - 컨텍스트 맵을 구성하여 업스트립과 다운 스트림을 한눈에 볼 수 있게 한다.
- Aggregate : 데이터 변경 단위, 일종의 라이프 사이클이 같은 도메인을 한데 모아 놓은 집합.
  - 데이터의 변경 단위, 루트 엔티티를 통해서만 접근이 가능하다.
  - 모든 crud는 root 엔티티를 통해서만 수행된다.
  - 오로지 root 엔티티를 통해서만 접근가능하다. 개별적인 하위 도메인에는 접근 불가하다.
  - 이렇게 집합을 구성하게 되면, 도메인간의 관계를 더 넓은 시야를 볼 수 있게 된다.
  - 상품 관리 서비스라는 bounded context가 있다고 가정하자.
    - 여기에는 여러게의 집합이 존재한다. 이를테면 비디어 프로덕트, 이미지 프로덕트 등등의 집합이 존재하게 된다. 이 각각의 집합들은 작품 집합과 연결되어서 상품 관리시에 사용을 하게 된다.

## 아키텍처

- ddd에는 3가지 아키텍처가 존재한다.

  - 레이어드 아키텍처 :
    - ui / application / domain / infrastructure 로 구성된다.
  - 클린 아키텍처
    - external interface : db나 웹 프론트엔드 등등 외부와 연결되는 인터페이스
    - interface adapter : 외부의 데이터 베이스나 내부의 유즈 케이스를 위해 양방향으로 소통하기 위한 인터페이스
    - use case : 핵심 비즈니스 로직을 담당하는 부분
    - entity : 데이터를 담당하는 부분
  - 헥사고날 아키텍처
    - ports & adapters 패턴을 사용한다.
    - port에 맞는 adapter를 사용하여 소프트웨어를 구성한다.

- 적용 예시 :
  - 파트너 사이트에서 유저가 특정 작품을 통해 controller를 통해 service라는 포트를 통해 인입된다. 이것에 대해 application 및 domain 레이어에서 처리를 하게 된다.
  - 이렇게 처리를 하게 되면, repository레이어에서 persistent adapter쪽으로 데이터 변경에 대한 처리를 하게 된다.
  - 그리고 해당 처리를 받아서 notification adapter를 통해 외부 시스템에 데이터를 전달하게 된다.

```java
public class Product {
  private ProductSalesInfo productSalesInfo;
  private ProductMetaInfo productMetaInfo;
  private Content content;

  public void startSale(LocalDate startSaleDt) {
    validateProduct();
    productSalesInfo = ProductSalesInfo.startSale(startSaleDt);
  }
}
```

유저는 컨트롤러를 통해서 작품 판매시작 요청을 하게 된다.
이 api에서는 UseCase에 정의된 작품 판매를 시작하게 된다.
이렇게 세일하는 코드는 또 SaleService에서 구현된다.

```java
@PostMapping(path = "/product/{productId}")
public void saleProduct(@PathVariable("productId") Long productId) {
  productUseCase.saleProduct(ProductSaleCommand
    .builder()
    .productId(new ProductId(productId))
    .build());
}

public interface ProductUseCase {
  void saleProduct(ProductSaleCommand command);
}
```

```java
public class SaleService implements ProductUseCase {
  private final LoadProductPort loadProductPort;
  private final SaveProductPort saveProductPort;
  private final EventPublishPort eventPublishPort;

  @Override
  public void saleProduct(ProductSaleCommand command) {
    Product product = loadProductPort.loadProduct(command.getProductId());
    product.startSale(LocalDateTime.now());

    saveProductPort.saveProduct(product);
    eventPublishPort.publsherEvent(product);
  }
}
```

여기서 load 포트와 save포트는 persistent adapter에 해당한다.

```java
class ProductPersistenceAdapter implements LoadProductPort, SaveProductPort {
  ...

  @Override
  public Product loadProduct(ProductId productId) {
    ProductJpaEntity productJpaEntity = productRepository.findById(productId.getValue())
    ContentJpaEntity contentJpaEntity = contentRepository.findByProductID(productId.getValue())
    return mapper.mapToDomainEntity(...);
  }

  @Override
  public void saveProduct(Product product) {
    productRepository.save(mapper.mapToJpaEntity(product));
  }
}
```

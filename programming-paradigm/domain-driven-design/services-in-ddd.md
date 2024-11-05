> https://gorodinski.com/blog/2012/04/14/services-in-domain-driven-design-ddd/

서비스라는 용어는 상황에 따라 의미가 조금씩 달라지는 과도한 의미를 지닌 용어입니다. 이로 인해 애플리케이션 서비스, 도메인 서비스, 인프라 서비스, SOA 서비스 등을 구별하는 과정에서 혼란이 생길 수 있습니다. 모든 경우에서 "서비스"라는 용어는 유효하지만, 역할은 다르며 애플리케이션의 모든 계층을 아우를 수 있습니다.

서비스는 매우 일반적인 애플리케이션 구성 요소를 의미하는 용어로, 본질적으로는 매우 적은 정보를 제공합니다. 무엇보다도 서비스는 요청을 충족하도록 설계된 클라이언트를 암시합니다. 서비스 연산의 또 다른 특성은 입력과 출력입니다. 연산에는 인수(입력)가 제공되고 결과가 반환됩니다. 이와 더불어 보통 상태가 없는(stateless) 특성과 GRASP에 따른 순수한 조작의 개념이 수반됩니다.

- 서비스
  - 서비스 요청을 충족하도록 설계된 클라이언트(a client the requests of which the service is designed to satisfy)
  - 입력과 출력의 연산(service operation is that of input and output)
  - 상태가 없는 특성과 grasp에 따른 순수한 조작의 개념(statelessness and the idea of pure fabrication according to GRASP.)

에릭 에반스는 "Domain-Driven Design" (블루 북)에서 도메인 주도 설계의 구성 요소로서 서비스 개념을 소개합니다:

> "도메인에서 중요한 프로세스나 변환이 ENTITY나 VALUE OBJECT의 자연스러운 책임이 아닌 경우, 단독 인터페이스로 선언된 SERVICE로 모델에 연산을 추가합니다. 이 인터페이스는 모델의 언어로 정의하며, 연산 이름이 통합 언어(UBIQUITOUS LANGUAGE)의 일부가 되도록 합니다. SERVICE는 상태가 없어야 합니다."
>
> - 에릭 에반스, 도메인 주도 설계 (Domain-Driven Design)

- 이러한 유형의 서비스는 도메인 서비스로 더 구체적으로 식별할 수 있으며, 도메인 계층의 일부입니다. 도메인 서비스는 종종 핵심 구성 요소로 간과되며, 엔티티와 값 객체에 대한 집중에 가려지기 쉽습니다. 반면 도메인 서비스를 과도하게 활용하게 되면, 엔티티에 데이터만 저장되고 서비스에 동작이 분리되는 빈약한 도메인 모델로 이어질 수 있습니다. 이 경우 객체 지향 프로그래밍(OOP)의 정보 전문가 원칙이 손실되므로 안티 패턴이 될 수 있습니다.

  - 도메인 서비스도 엔티티만큼이나 잘 활용되어야하나, 너무 이것만 활용하다가는 엔티티에서 로직이 사라지는 빈약한 도메인 모델을 설계할 수도 있다.

- 도메인 서비스는 도메인 개념을 포함하고 이에 작동하기 때문에 인프라 서비스와 다르며 통합 언어(ubiquitous language)의 일부가 됩니다. 반면 인프라 서비스는 애플리케이션의 "배관 작업" 요구 사항을 캡슐화하는 데 중점을 둡니다. 일반적으로 파일 시스템 접근, 데이터베이스 접근, 이메일 등 IO 작업이 여기에 해당됩니다. 예를 들어, 어떤 이벤트에 대해 관련자들에게 이메일 알림을 보내는 애플리케이션 요구사항이 있을 수 있습니다. 이벤트 개념은 도메인 계층에 존재하고, 이벤트 발생 여부를 결정하는 것도 도메인 계층에서 담당합니다. 이메일 인프라 서비스는 도메인 이벤트를 처리하여 적절한 이메일 메시지를 생성하고 전송합니다. 또 다른 인프라 서비스는 동일한 이벤트를 처리하여 SMS 또는 다른 채널을 통해 알림을 보낼 수 있습니다. 도메인 계층은 알림의 전달 방식에는 관심이 없으며, 단지 이벤트를 발생시키는 것만 신경 씁니다. 리포지토리 구현도 인프라 서비스의 한 예입니다. 인터페이스는 도메인 계층에서 선언되며 중요한 도메인 요소입니다. 하지만 영구 저장 장치와의 통신 구체 사항은 인프라 계층에서 처리됩니다.

  - 인프라서비스는 pipe line 작업의 캡슐화에 집중한다.
  - 이벤트 개념은 도메인 계층에 속한다. 이 이벤트를 발생시키는 것도 도메인 계층이 담당.

- 애플리케이션 서비스는 중요한 역할을 담당합니다. 애플리케이션 서비스는 도메인 로직 실행을 위한 호스팅 환경을 제공합니다. 따라서 리포지토리나 외부 서비스에 대한 래퍼와 같은 다양한 게이트웨이를 주입할 수 있는 적절한 지점이 됩니다. DDD를 적용할 때 자주 발생하는 문제는 엔티티가 비즈니스 작업을 수행하기 위해 리포지토리나 다른 게이트웨이에서 데이터를 필요로 할 때입니다. 한 가지 해결책은 리포지토리 의존성을 엔티티에 직접 주입하는 것이지만, 이는 보통 바람직하지 않습니다. 그 이유는 엔티티를 구현하는 순수 객체(C#, Java 등의 일반적인 객체)가 애플리케이션 의존성 그래프의 일부가 되어야 하기 때문입니다. 또 다른 이유는 단일 책임 원칙(Single-Responsibility Principle)이 위반되기 때문에 엔티티의 동작을 이해하기 어려워지기 때문입니다. 더 나은 해결책은 애플리케이션 서비스가 엔티티에 필요한 정보를 검색하여 실행 환경을 설정하고, 이를 엔티티에 제공하는 것입니다.

  - application은 도메인 로직을 실행하기 위한 호스팅 환경을 제공한다.
  - ddd에서 엔티티가 비지니스 작업 수행을 위해 다른 도메인의 데이터를 필요할 때 이것을 어플리케이션에서 제공하고, 이를 조작하여 엔티티에 제공하는 것이다.

- 애플리케이션 서비스는 호스트 역할 외에도 도메인의 기능을 다른 애플리케이션 계층에 API로 노출하는 역할을 수행합니다. 이는 서비스를 캡슐화 역할로 만드는데, 서비스는 파사드 패턴의 한 예입니다. 객체를 직접 노출하면 상호작용이 분산된 경우 특히 번거롭고 추상화가 깨질 위험이 있습니다. 이 방식으로 애플리케이션 서비스는 외부 명령과 내부 도메인 객체 모델 간의 번역 역할을 수행하게 됩니다. 이 번역의 중요성은 간과해서는 안 됩니다. 예를 들어, 사람이 요청하는 명령이 “계좌 A에서 계좌 B로 $5 이체”와 같을 수 있습니다. 컴퓨터가 이 명령을 이행하려면 여러 단계가 필요하며, 사람에게 "계좌 저장소에서 ID가 A인 계좌 엔터티를 불러오고, B 계좌를 불러온 후 A 계좌 엔터티에서 출금 메서드를 호출..." 등 구체적인 명령을 요구하지 않습니다. 이러한 작업은 애플리케이션 서비스가 수행하는 것이 적합합니다.
  - 어플리케이션 서비스는 도메인 기능을 다른 어플리케이션 계층에 api로 노출한다.
  - 이를 통해 캡슐화 역할을 수행한다.
  - 어플리케이션은 외부 명령과 내부 모데인 객체 모델 간의 번역 역할을 수행한다.

```ts
// 리포지토리
public interface IPurchaseOrderRepository
{
    PurchaseOrder Get(string id);
    // commit 메서드는 인프라에서 관리되는 작업 단위로 옮길 가능성이 있습니다.
    void Commit();
}

// 도메인 이벤트 마커 인터페이스
public interface IDomainEvent { }

// 로컬 도메인 이벤트 발행기
public static class DomainEvents
{
    public static void Raise<TEvent>(TEvent domainEvent) where TEvent : IDomainEvent
    {
        // 참조: http://www.udidahan.com/2009/06/14/domain-events-salvation/
        // 참조: http://lostechies.com/jimmybogard/2010/04/08/strengthening-your-domain-domain-events/
    }
}

// PO 애그리게이트의 루트 엔터티
public class PurchaseOrder
{
    public string Id { get; private set; }
    public string VendorId { get; private set; }
    public string PONumber { get; private set; }
    public string Description { get; private set; }
    public decimal Total { get; private set; }
    public DateTime SubmissionDate { get; private set; }
    public ICollection<Invoice> Invoices { get; private set; }

    public decimal InvoiceTotal => this.Invoices.Select(x => x.Amount).Sum();
    public bool IsFullyInvoiced => this.Total <= this.InvoiceTotal;

    private bool ContainsInvoice(string vendorInvoiceNumber) =>
        this.Invoices.Any(x => x.VendorInvoiceNumber.Equals(vendorInvoiceNumber, StringComparison.OrdinalIgnoreCase));

    public Invoice Invoice(IInvoiceNumberGenerator generator, string vendorInvoiceNumber, DateTime date, decimal amount)
    {
        if (this.IsFullyInvoiced)
            throw new Exception("PO가 전액 청구되었습니다.");
        if (ContainsInvoice(vendorInvoiceNumber))
            throw new Exception("중복 청구서!");

        var invoiceNumber = generator.GenerateInvoiceNumber(this.VendorId, vendorInvoiceNumber, date);
        var invoice = new Invoice(invoiceNumber, vendorInvoiceNumber, date, amount);
        this.Invoices.Add(invoice);
        DomainEvents.Raise(new PurchaseOrderInvoicedEvent(this.Id, invoice.InvoiceNumber));
        return invoice;
    }
}

// 도메인 이벤트
public class PurchaseOrderInvoicedEvent : IDomainEvent
{
    public PurchaseOrderInvoicedEvent(string purchaseOrderId, string invoiceNumber)
    {
        this.PurchaseOrderId = purchaseOrderId;
        this.InvoiceNumber = invoiceNumber;
    }

    public string PurchaseOrderId { get; private set; }
    public string InvoiceNumber { get; private set; }
}

// 값 객체
public class Invoice
{
    public Invoice(string vendorInvoiceNumber, string invoiceNumber, DateTime date, decimal amount)
    {
        this.VendorInvoiceNumber = vendorInvoiceNumber;
        this.InvoiceNumber = invoiceNumber;
        this.InvoiceDate = date;
        this.Amount = amount;
    }

    public string VendorInvoiceNumber { get; private set; }
    public string InvoiceNumber { get; private set; }
    public DateTime InvoiceDate { get; private set; }
    public decimal Amount { get; private set; }
}

// 도메인 서비스로 고유하고 사용자 친화적인 청구서 번호를 생성
public interface IInvoiceNumberGenerator
{
    string GenerateInvoiceNumber(string vendorId, string vendorInvoiceNumber, DateTime invoiceDate);
}

// 애플리케이션 서비스
public class PurchaseOrderService
{
    public PurchaseOrderService(IPurchaseOrderRepository repository, IInvoiceNumberGenerator invoiceNumberGenerator)
    {
        this.repository = repository;
        this.invoiceNumberGenerator = invoiceNumberGenerator;
    }

    readonly IPurchaseOrderRepository repository;
    readonly IInvoiceNumberGenerator invoiceNumberGenerator;

    public void Invoice(string purchaseOrderId, string vendorInvoiceNumber, DateTime date, decimal amount)
    {
        using (var ts = new TransactionScope())
        {
            var purchaseOrder = this.repository.Get(purchaseOrderId);
            if (purchaseOrder == null)
                throw new Exception("PO를 찾을 수 없습니다.");
            purchaseOrder.Invoice(this.invoiceNumberGenerator, vendorInvoiceNumber, date, amount);
            this.repository.Commit();
            ts.Complete();
        }
    }
}

```

- 이 코드는 프로덕션 수준으로 다듬어야 할 부분이 많지만, 애플리케이션 서비스의 목적을 설명하기에는 충분합니다. IInvoiceNumberGenerator 인터페이스는 고유하고 사용자 친화적인 청구서 번호를 생성하는 도메인 서비스로, 도메인 로직을 캡슐화합니다. 이 과정은 도메인 전문가와 시스템 사용자와 논의할 수 있는 부분입니다. 반면, PurchaseOrderService 애플리케이션 서비스는 도메인 전문가가 관심을 두지 않는 기술적 작업을 수행합니다.

  - 애플리케이션 서비스는 도메인 전문가가 관심을 두지 않는 기술적 작업을 수행합니다

- 도메인 서비스와 애플리케이션 서비스의 차이는 미묘하지만 중요합니다.
  - 도메인 서비스는 매우 세밀하며, 애플리케이션 서비스는 API를 제공하는 파사드 역할을 합니다.
  - 도메인 서비스는 엔터티나 값 객체에 자연스럽게 포함되지 않는 도메인 로직을 포함하며, 애플리케이션 서비스는 도메인 로직의 실행을 조정하고 도메인 로직을 구현하지 않습니다.
  - 도메인 서비스 메서드는 다른 도메인 요소를 피연산자나 반환값으로 사용할 수 있는 반면, 애플리케이션 서비스는 ID 값이나 원시 데이터 구조와 같은 단순한 피연산자로 작동합니다.
  - 애플리케이션 서비스는 도메인 로직 실행에 필요한 인프라 서비스를 선언합니다.
  - 커맨드 핸들러는 CQRS 아키텍처에서 단일 명령을 처리하는 애플리케이션 서비스의 한 형태입니다.

---

- 어플리케이션 계층
  - 도메인 엔티티를 위한 호스트 역할
  - 도메인 기능을 다른 애플리케이션 계층에 api로 노출

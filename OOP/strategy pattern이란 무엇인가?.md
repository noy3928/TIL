객체지향에서 전략 패턴이란 알고리즘의 행동을 런타임 시점에 선택할 수 있게 만드는 것이다. 
전략 패턴은 알고리즘의 가족을 정의한다. 그리고 각각의 알고리즘을 캡슐화한 다음에 해당 알고리즘을 교체할 수 있게 만드는 것이다. 이렇게 함으로써 프로그램의 필요에 따라서, 알고리즘이 동적으로 선택될 수 있도록 만드는 것이다. 

```javascript
class PaymentStrategy {
  pay(amount) {
    throw new Error("Must implement pay method");
  }
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paying ${amount} using credit card`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paying ${amount} using PayPal`);
  }
}

class ShoppingCart {
  constructor() {
    this.totalAmount = 0;
    this.items = [];
  }

  addItem(price, quantity) {
    this.totalAmount += price * quantity;
    this.items.push({ price, quantity });
  }

  pay(paymentStrategy) {
    paymentStrategy.pay(this.totalAmount);
  }
}

const cart = new ShoppingCart();
cart.addItem(100, 1);
cart.addItem(50, 2);

cart.pay(new CreditCardStrategy());
cart.pay(new PayPalStrategy());

```

이 예시에서 `ShoppingCart` 클래스는 아이템의 리스트들과 전체 값이 지불되도록 유지되고 있다. 
`addItem` 메서드는 아이템을 리스트에 더하고 전체 값을 업데이트하고 있다. 그리고 `pay` 메서드는 `PaymentStrategy`객체를 취하고 `pay` 메서드를 호출한다. 


## 전략 패턴을 사용하는 이유 : 

전략 패턴은 알고리즘의 행동이 런타임에 결정될 수 있도록 하기 위해서 사용되는 디자인 패턴이다. 이것은 다양한 상황에서 이용될 수 있는데, 알고리즘의 행위가 환경에 따라서 변경될 필요가 있을 때 유용할 것이다. 

이 패턴을 이용하면, 유연하고, 확장가능하고, 코드 재사용성이 높아지며, 관심사의 분리를 증대시킬 수 있다. 


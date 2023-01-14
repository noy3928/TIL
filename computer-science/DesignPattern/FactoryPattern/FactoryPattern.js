class Americano {
  constructor() {
    this.shot = "one shot"
    this.water = "200ml"
  }
}

class Latte {
  constructor() {
    this.shot = "one shot"
    this.milk = "200ml"
  }
}

class CoffeeMachine {
  constructor(type) {
    if (type === "americano") {
      return new Americano()
    }
    if (type === "latte") {
      return new Latte()
    }
  }
}

const americano = new CoffeeMachine("americano")
const latter = new CoffeeMachine("latte")

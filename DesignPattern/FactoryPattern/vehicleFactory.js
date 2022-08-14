class Car {
  constructor(options) {
    this.doors = options.doors || 4
    this.state = options.state || "brand new"
    this.color = options.color || "silver"
  }
}

class Truck {
  constructor(options) {
    this.state = options.state || "used"
    this.wheelSize = options.wheelSize || "large"
    this.color = options.color || "blue"
  }
}

class VehicleFactory {
  constructor(options) {
    return this.createVehicle(options)
  }

  createVehicle(options) {
    if (options.vehicleType === "car") {
      return new Car(options)
    } else {
      return new Truck(options)
    }
  }
}

VehicleFactory.prototype.createVehicle = function (options) {
  if (options.vehicleType === "car") {
    this.vehicleClass = Car
  } else {
    this.vehicleClass = Truck
  }

  return new this.vehicleClass(options)
}

// Create an instance of our factory that makes cars
const car = new VehicleFactory({
  vehicleType: "car",
  color: "yellow",
  doors: 6,
})

const movingTruck = new VehicleFactory({
  vehicleType: "truck",
  state: "like new",
  color: "red",
  wheelSize: "small",
})

console.log(car)
console.log(movingTruck)

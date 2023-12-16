# 11. API 리팩터링

- 좋은 api는 데이터를 갱신하는 함수와 그저 조회만하는 함수를 명확히 구분한다.

## 11.1 질의 함수와 변경 함수 분리하기

- 우리가 추구해야하는 함수 : 부수효과 없이 값을 반환해주는 함수 -> 이용할 때 신경쓸 거리가 적은 함수
- 질의 함수는 모두 부수효과가 없어야 한다.
- 값을 반환하면서 부수효과도 있는 함수가 있다면 무조건 상태를 변경하는 부분과 질의하는 부분을 분리하는 것이 좋다.

## 11.2 함수 매개변수화하기

- 함수를 호출할 때마다 달라지는 리터럴 값을 매개변수로 전달하는 것이 좋다.

## 11.3 플래그 인수 제거하기

- 플래그 인수란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수이다.
- 저자가 플래그 인수를 싫어하는 이유 : 호출할 수 있는 함수들이 무엇이고 어떻게 호출해야 하는지를 이해하기가 어려워진다.
- 플래그 인수를 제거하는 방법은 2가지가 있다.
  - 1. 함수를 분리한다.
  - 2. 함수를 새로 만든다.

## 11.4 객체 통째로 넘기기

- 레코드를 통째로 넘기면 변화에 대응하기 쉽다. 예컨대 그 함수가 더 다양한 데이터를 사용하도록 바뀌어도 매개변수 목록은 수정할 필요가 없다.

```js
// 호출자

const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high)) {
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");
}
```

```js
// HeatingPlan 클래스
withinRange(bottom, top){
    return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
}

```

아래의 메서드를 기존의 withinRange 메서드로 대체할 것이다.

```js
xxNEWwithinRange(aNumberRange) {
    return this.withinRange(aNumberRange.low, aNumberRange.high);
}
```

그리고 기존의 함수를 호출하는 부분을 수정하자.

```js
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange)) {
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");
}
```

이제 이렇게하고 나면 위에 변수로 선언한 부분들은 필요가 없어진다.

```js
if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange)) {
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");
}
```

<br/>

## 11.5 매개변수를 질의 함수로 바꾸기

- 매개변수 목록은 함수의 변동 요인을 모아놓은 곳이다. 즉, 함수의 동작에 변화를 줄 수 있는 일차적인 수단이다.
- 가능하면 호출하는 쪽을 간소하게 만든다.
- 하지만, 피호출함수안에만 너무 가둬두다가는 그 안에서 원치 않는 의존성이 발생할 수도 있다.

## 11.6 질의 함수를 매개변수로 바꾸기

- 참조를 풀어내는 책임을 호출자로 옮기기. -> 호출자가 참조를 풀어내는 책임을 맡기면, 호출자가 참조를 풀어내는 방식을 원하는 대로 바꿀 수 있다. -> 유연성이 생긴다. -> 사실나는 이 방식을 선호함.

## 11.9 함수를 명령으로 바꾸기

- 명령객체 패턴 : 함수를 객체로 만들어서 호출하는 쪽과 실행하는 쪽을 분리하는 방법

예시: 로깅 함수를 명령 객체로 변환하기
단계 1: 기본 함수

```js
function logMessage(message) {
  console.log(message);
}

// 함수 사용
logMessage("Hello, world!");
```

```js
단계 2: 명령 객체로 변환
javascript
Copy code
class LogCommand {
    constructor(message) {
        this.message = message;
    }

    execute() {
        console.log(this.message);
    }
}

// 명령 객체 사용
const logCommand = new LogCommand("Hello, world!");
logCommand.execute();
```

이 예시에서 logMessage 함수는 LogCommand 클래스로 변환되었습니다. LogCommand 객체를 생성할 때 메시지를 전달하고, execute 메소드를 호출하여 로그를 출력합니다. 이러한 변환을 통해 로그 메시지를 나중에 실행하거나, 다른 명령과 함께 큐에 넣는 등의 추가적인 유연성을 얻을 수 있습니다.

다른 예시 :

```js
function processDataAndLog(data) {
  const processedData = processData(data);
  logData(processedData);
  saveData(processedData);
}

function processData(data) {
  // 데이터 처리 로직
  return processedData;
}

function logData(data) {
  console.log(data);
}

function saveData(data) {
  // 데이터 저장 로직
}
```

```js
class Command {
    execute() {
        throw new Error("execute method should be implemented");
    }
}

class ProcessDataCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
    }

    execute() {
        // 데이터 처리 로직
        return processedData;
    }
}

class LogDataCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
    }

    execute() {
        console.log(this.data);
    }
}

class SaveDataCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
    }

    execute() {
        // 데이터 저장 로직
    }
}

// 명령 객체 사용
const data = /* 원본 데이터 */;
const processDataCommand = new ProcessDataCommand(data);
const processedData = processDataCommand.execute();

const logDataCommand = new LogDataCommand(processedData);
logDataCommand.execute();

const saveDataCommand = new SaveDataCommand(processedData);
saveDataCommand.execute();

```

## 11.10 명령을 함수로 바꾸기

- 명령객체의 이점 : 큰 연산 하나를 여러 개의 작은 메서드로 쪼개고 필드를 이용해 쪼개진 메서드들끼리 정보를 공유할 수 있다.
- 하지만 로직이 크게 복잡하지 않다면, 명령 객체를 사용할 필요가 없다. -> 함수로 바꾸자.

## 11.11 수정된 값 반환하기.

- 데이터가 수정되는 것을 알려주는 좋은 방법 : 변수를 갱신하는 함수라면 수정된 값을 반환하여 호출자가 그 값을 변수에 담아두도록 하는 것이다.

## 11.12 오류 코드를 예외로 바꾸기

- 예외를 사용하면 오류 코드를 일일이 검사하거나 오류를 식별해 콜스택 위로 던지는 일을 신경쓰지 않아도 된다. 예외에는 독자적인 흐름이 있어서 프로그램의 나머지에서는 오류 발생에 따른 복잡한 상황에 대처하는 코드를 작성하거나 읽을 일이 없게 해준다.
- 예외는 정확히 예상 밖의 동작일 때만 사용되어야 한다. 만약 예외를 던졌을 때 정상동작하지 않는 상황이라면 예외를 던져서는 안된다.

```js
function validateUser(user) {
  if (user.age < 18) {
    return -1; // 오류 코드 반환
  }
  if (!user.name) {
    return -2; // 오류 코드 반환
  }
  // 추가 검증 로직...

  return 0; // 성공 코드 반환
}

// 함수 사용
const user = { name: "Alice", age: 17 };
const result = validateUser(user);
if (result < 0) {
  console.log("Validation failed");
  // 오류 처리 로직
}
```

위의 코드를 아래와 같이 바꿀 수 있다.

```js
function validateUser(user) {
  if (user.age < 18) {
    throw new Error("User is underage");
  }
  if (!user.name) {
    throw new Error("User name is missing");
  }
  // 추가 검증 로직...

  // 성공 시 아무 오류도 발생시키지 않음
}

// 함수 사용
const user = { name: "Alice", age: 17 };
try {
  validateUser(user);
  // 성공 시 처리 로직
} catch (error) {
  console.error(error.message);
  // 오류 처리 로직
}
```

오류 코드 대신 예외를 사용하면 함수의 사용자는 반환된 오류 코드를 일일이 검사할 필요 없이 예외 처리를 통해 오류를 관리할 수 있습니다. 예외는 함수의 일반적인 반환 흐름과는 별도로 처리되므로, 코드의 가독성과 유지 관리성이 향상됩니다.

## 11.13 예외를 사전확인으로 바꾸기

-

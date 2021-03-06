# 1번째 강의 :

it에는 여러가지 분야가 있다.

그런데, 어떤 분야에서도 컴퓨터 하드웨어에 대한 내부적인 이해가 없다면 제대로 된 성과를 내기 어려울 것이다.
그렇기 때문에 이번 시간에는 컴퓨터 내부의 하드웨어에 대해서 배워볼 것이다.  
이번 주차가 끝나면 당신은 물리적인 의미에서의 컴퓨터에 대해서 이해하게 될 것이다.

<br>

# 2번째 강의 :

두번째 강의에서 갑자기 등장한 질문 = To extend the functionality of a computer, we can plug devices into connection points on it. What are these connection points known as?

답 : ports

2번째 강의에서는 아주 대략적으로 컴퓨터의 구성요소들을 살펴본다.
우선 컴퓨터와 함께 있는 주변 장치들 혹은 입출력 장치들 (모니터, 프린터, 마우스 등등) 을 소개하고,
그 다음 본체 뒤에 있는 포트들에 대해서 설명해주고 있었다.

그 다음 본체를 뜯어서 핵심이 되는 components들을 설명해준다.
cpu, ram, hard disk 순서대로 소개해주고 있었다.

### CPU

cpu는 컴퓨터의 뇌라고 생각하면된다.

### RAM

ram은 cpu와 가장 많은 소통을하는데, 일시적인 저장소라고 생각하면된다. 그치만 컴퓨터 입장에서는 주기억장치라고 이해할 수 있다.

### Hard Disk

hard disk는 long term storage이다. => hols all of our data, which includes all of our music, pictures, applications.

### MotherBoard

Motherboard : The body or circulatory system of the computer that connects all the pieces together.
한국말로 부르자면 메인보드이다.

<br>

# 3번째 강의 :

3번째 강의에서 주로 살펴본 내용은 우리가 컴퓨터에게 명령한 내용을 어떻게 컴퓨터가 해석하는지와 관련된 내용이다.

### program :

promgrams : instructions that tell the computer what to do
프로그램은 하나의 레시피라고 생각하면 된다.

이를 요리에 비유해서 소개한다. 프로그램은 하나의 요리 레시피가 적힌 책이다. 그리고 cpu는 요리사다. 그 요리사는 레시피(program)대로 요리를 진행한다. 이때 도마 위에서 작업을 하는데, 이 도마를 우리는 RAM이라고 부를 수 있다. 재료들을 재료 창고(hard disk)에서 가져오는 것보다, 도마(ram)위에 재료들을 미리 가져다 놓고 사용하는 것이 훨씬 더 빠르다.

## EDB :

cpu는 0과 1로 되어있는 데이터를 읽는다. 이것을 이해하기 위해서 우리는 EDB라는 것을 알 필요가 있다.

EDB (external daba bus) : 이것은 수 많은 선으로 이루어져있다. 그래서 컴퓨터 내부에서 데이터를 주고 받을 수 있도록 한다. 우리 신체의 혈관으로 이해하면 된다. 그래서 이 edb에 전기 신호가 가면 이것을 1로 인지를 하고, 만약에 아무 신호도 가지 않는다면 이것을 0으로 인지한다.

8bit 짜리 EDB를 통해서 조금 더 이해해보자. cpu에는 레지스터라는 것이 있다. 이 레지스터들은 cpu가 작업을 하기 위해서 필요한 데이터들을 저장할 수 있게 해준다. a,b를 더하고 싶다면, a와 b를 레지스터에 저장해둔다.

## MCC :

추가적으로 MCC(memory chip controller)라는 것이 있다. MCC는 램과 cpu 사이의 다리역할을 한다. 무슨 말이냐. cpu가 작업을 할 때, mcc에게 말한다. '나 레시피북에 있는 3번째 샌드위치 레시피가 필요해.' 그러면 mcc는 램에서 해당 instruction을 찾아서, grab the data를 한 다음, EDB를 통해 전송한다.

조금 더 상세하게 살펴보자. 이 과정에는 주소 버스(address bus)라는 것이 존재한다. 이 주소버스는 mcc와 cpu를 연결하고, data의 주소를 전달해준다. data자체를 전달하는 것이 아님을 기억하자. 그러면 mcc는 주소를 확인하고 데이터를 찾는다. 그리고 그 데이터를 EBD를 통해서 cpu에게 전달한다.

## 캐시 :

한 가지 더 알아야할 것이 있다면, ram이 cpu가 데이터에 접근할 수 있는 가장 빠른 방법이 아니라는 것이다. ram 외에도 CACHE라는 것이 있다. 여기에는 가장 자주 사용되는 데이터가 저장된다. 그래서 자주 접근할 수 있도록 한다. 그리고 이 캐시에도 3가지 단계가 있다. L1, L2, L3가 그것이다. L1이 가장 빠르고, 작다.

## Clock :

그런데, cpu는 어떻게 instruction이 끝났고, 새로운 것이 시작된다는 것을 알 수 있는 것일까? 바로 internal clock을 가지고 있기 때문에 그것을 알 수 있다. 이것은 Clock Wire라고 불린다. 이 clock wire는 시계의 틱톡 처럼 생각해볼 수 있다. 모든 tick 마다 cpu는 작동의 한 사이클을 돈다. 헤르츠라는 단어를 들어본 적이 있을텐데, 이거은 clock의 속도를 의미한다.

clock speed : the maximun number of clock cycles that it can handle in a certain time period.

<details>
<summary>what is overclock? </summary>
<div markdown="1">

Your computer’s CPU comes from the factory set to run at a certain maximum speed. If you run your CPU at that speed with proper cooling, it should perform fine without giving you any problems.

However, you’re often not limited to that CPU speed. You can increase the CPU’s speed by setting a higher clock rate or multiplier in the computer’s BIOS, forcing it to perform more operations per second.

</div>
</details>

<br>

# Quiz

1. Where does the CPU store its computations?
   register
2. Which mechanisms do we use to transport binary data and memory addresses? Check all that apply.
   Address Bus

   <br>
   <br>
   <br>

## 새롭게 알게 된 단어

- daunting : 위압적인 (daunting to learn)
- Ignite : 점화하다
- stereotype : 고정관념

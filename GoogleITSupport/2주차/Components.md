# 1번째 강의 : CPU

the brain of our computer.

### Instruction Set

cpu가 수행할 지시서들이 담겨있다.
instruction set are hard-coded into our CPU.
이것은 제조사마다 다르게 만들지만,  
공통적으로 사용되는 기능은 비슷하다.

<br>

우리가 CPU를 고르고자 한다면 기존의 motherboard를 고려해야 한다.
특히 알맞는 소켓인지를 확인해야한다.

### Soket

소켓에는 2가지 종류가 있다.
LGA(Land grid array)
PGA(Pin grid array)

<br>
cpu가 컴퓨터에서 가장 중요한 것이라는 사실만은 잊지말자!

<br>

# 2번째 강의 : RAM

we use RAM to store data that we want to access **quickly**.  
여기에 저장되는 데이터는 영구적이지 않다. 컴퓨터를 끄면 그 안에 있던 데이터들은 사라질 것이다.

프로그램을 실행시키기 위해서는 ram에 옮겨야 한다.  
그렇게 함으로써 cpu가 접근할 수 있게 만든다.

램에도 다양한 종류가 있지만, 가장 보편적으로 사용되는 램은 DRAM이다.  
dram : dynamic random-access memory.

dram이 만들어지고 나서, 만들어진 것이 sdram이다.
SDRAM : Synchronous DRAM.

-> dram과 sdram이 뭔지 찾아보기.

<br>

# 3번째 강의 : MotherBoard

### chipset : which decides how components talk to each other on our machine.

이 chipset은 2개가 있는데,
하나는 northbride이며 Ram과 video card와 interconnect 한다.  
또 다른 하나는 southbridge이다. 이것은 IO컨트롤러를 지탱한다.

이 chipset은 key component이다. motherboard가 data를 관리할 수 있도록해주는. cpu와 ram peripherals 사이에서 오고가는. 데이터들을.

> peripherals
>
> > External devices we connect to our computer, like a mouse, keyboard, and monitor.

### Expansion Slots : Give us the ability to increase the functionality of our computer.

만약 그래픽 카드를 업그레이드하고 싶다면, 그래픽 카드를 구매하고, 그것을 expansion slot을 통해서 업그레이드하면 된다.
오늘 날의 standard slot은 PCI Express이다.

### Form Factor

- 컴퓨터에서 폼 팩터(영어: Form factor)는 컴퓨터 부품의 규격을 의미한다. 인텔 기반 데스크톱 컴퓨터에서는 일반적으로 ATX 또는 microATX 폼 팩터가 사용된다.(위키백과)
- 폼 팩터 (Form-factor)란 제품의 구조화된 형태를 의미합니다.

<br>

# 4번째 강의 : Storage

2가지 하드디스크 타입
HDD : hard disk drives, use a spinning platter and a mechanical arm to read and write information. the speed that the platter rotate allow you to read and write data faster. 이런 속도를 RPM이라고 한다. revolution per minute. RPM이 높을수록 빠르다. HDD는 움직이는 부품이 많기 때문에 훨씬 더 많은 손상을 입기 쉽다.
그런 부분을 보완해주는 것이 SDD이다.
SDD : Solid State Drive. sdd have no moving parts. sdd는 빠르고, form factor가 슬림하다는 장점도 있다. 그런데 왜 다들 이것을 사용하지 않는 것일까? hdd는 수용성이 더 높지만 손상에 대한 노출이 있고, sdd는 조금 더 안전하지만 비싸다는 단점이 있다.

<br>
<br>
<br>

## 새롭게 알게 된 단어 :

- volatile : 변덕스러운
- bummer : 실망

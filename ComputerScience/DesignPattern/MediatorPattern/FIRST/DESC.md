## What is it?

the mediator design pattern facilitates communication between different components.

- a component tha facilitates communication between other components withour them necessarily being aware of each other or having direct access to each other.

## motivation

- components may go in and out of a system at any time
  - chat room participants
  - players in an MMORPG(많은 사람들과 진행하는 온라인 게임)
  - 그들끼리 직접 소통할 경우, 연결이 불안정하거나할 때 생길 수 있는 복잡성과 문제점을 고려해야 할 떄.
- it makes no sense for them to have direct references to one another.
  - those reference may go dead
- solution : have them all refer to some central component that facilitate communication.

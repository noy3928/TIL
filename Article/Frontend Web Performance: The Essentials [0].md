[Frontend Web Performance: The Essentials [0]](https://medium.com/@matthew.costello/frontend-web-performance-the-essentials-0-61fea500b180)

서론 :

- 프레임 드롭에 대한 설명.
- 최소 12ms안에 작업이 이루어져야 한다.

## The Rendering Cycle 🔁

[ JS > Style > Layout > Paint > Composite ]  
이 순서대로 렌더링 사이클이 이루어진다.

- 몇몇 속성들은 똑같은 비주얼 효과를 만들어내지만, 렌더링 비용적인 측면에서는 훨씬 더 비쌀 수 있다.

<br>

## Layout Bad, Composite Good 📢

- layout 속성을 변경시키는 것은 layout 단계를 트리거한다.
- layout 속성은 사이즈나 위치같은 것을 변경시키는 속성을 말한다.
- layout 속성을 변경시키려면 렌더링 주기 전체가 필요하다. 그러나 우리에게 주어진 시간은 하나의 프레임 12ms이라는 것을 기억해야 한다.

<br>

- 레이아웃 계산 비용은 다른 모든 단계보다 비싼 단계이다.
- 이 단계에 영향을 많이 미치는 것은 DOM요소의 양이 될 수 있다. 그리고 변경하고자 하는 요소가 Root Dom과 가까울 수록 레이아웃 비용이 많이든다. 많약 그것이 root dom이라면 큰일이다!

<br>

- paint에만 영향을 미치는 속성들은 레이아웃 단계에는 영향을 미치지 않는다. 고로 레이아웃 단계를 건너뛸 것이다.
- 예를 들어, 색상이나 배경이미지를 바꾸는 작업들은 레이아웃에는 영향을 미치지 않을 것이다.

<br>

- composite 단계가 layout, paint 단계보다 더 저렴하다. 그리고 여기에 해당하는 속성을 이용하면 layout과 paint 단계를 건너뛸 수 있다.
  - Transform
  - Opacity
  - Filter

<br>

## The Secret Sauce ✨

- will-change : 레이어가 promoted될 것이라고 브라우저에게 힌트를 줄 수 있다.
- composite 속성과 will-change를 적절히 잘 결합해서 사용한다면 적은 paint & layout 비용으로 동적 페이지를 구성할 수 있다.

<br>

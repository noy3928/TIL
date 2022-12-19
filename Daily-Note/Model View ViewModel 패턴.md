
참고할 링크 : [[Model View ViewModel 패턴]]

# MVVM 

## MVVM 패턴이란 무엇인가? 

- presentation 레이어를 비지니스 로직에서 분리시키는 패턴이다. 
	- 이것은 MVC 패턴과 비슷하다. 
	- 하지만 뷰와 모델 사이의 커뮤니케이션을 단순화하기 위해서 데이터 바인딩을 레버리징하는 것에 집중한다. 
- MVVM 패턴에서, view model은 모델의 데이터와 행동을 view에 드러내는 것에 책임이 있다. 
	- 그리고 이것은 모델과 view 사이에서 중재자로써 행동한다.
	- view에서 유저의 입력을 받고, 모델을 이용해 가공하고, view를 결과에 따라서 업데이트한다. 
- view는 데이터를 보여주고, 유저가 상호작용할 수 있는 방법을 제공해준다. 


## MVVM 패턴과 MVP 패턴의 차이점은 무엇인가? 

- 이 둘을 구분하는 핵심 차이점은 view와 model이 소통하는 방식이다. 

- MVP에서는 presenter가 view와 모델 사이의 중재자 역할을 한다. 
- MVVM에서는 ViewModel 이 중재자로써 행동한다. 
	- 이것은 view에 모델의 데이터와 행동을 보여준다. 
	- 그리고 model의 변경에 따라 view를 업데이트하기 위해서 데이터 바인딩을 이용한다.
	- 이것은 presenter가 명시적으로 view를 업데이트 해줄 필요없이 , 모델이 변경될 때마다, view가 자신 스스로를 자동으로 업데이트 할 수 있게 허용해준다. 
- 결론적으로 MVP와 MVVM 패턴은 view와 모델이 서로 소통하는 방식에서 차이가 있다. 
	- mvvm은 view를 업데이트하기 위해서 데이터 바인딩을 이용하고, 
	- mvp는 presenter를 이용한다.


## MVVM 패턴에서 데이터 바인딩은 어떻게 이루어지는가? 

- MVVM 패턴에서 데이터 바인딩은 모델의 변경을 자동적으로 view에 업데이트하기 위해서 사용된다. 
	- 데이터 바인딩은 view가 모델에 연결되도록 허용하는 기술이다. 
		- 더구나 모델의 변경이 자동으로 뷰에 반영되게 해준다. 
- MVVM 패턴에서 데이터 바인딩을 이용하기 위해서, ViewModel은 properties와 commands를 통해 모델의 데이터와 행동을 view에 노출해야한다.
	- 이렇게 되면 view는 데이터 바인딩 프레임워크를 이용해서 이런 properties와 commands를 바인드할 수 있다.
- 예를 들어서, view가 유저의 이름을 보여주는 text field를 가지고 있다고 가정해보자. 
	- ViewModel은 아마도 name 프로퍼티를 노출할 것이다. 
		- 이 프로퍼티는 유저의 이름을 나타낸다. 
	- 그리고 view는 이 프로퍼티를 데이터 바인딩에 사용할 수 있을 것이다. 
	- Name 프로퍼티가 ViewModel에서 업데이트 되면, text field는 자동적으로 새로운 값을 업데이트 할 것이다. 
- 결론적으로 데이터 바인딩은 view와 모델이 소통할 때 단순하게 만드는 강력한 도구이다. 그리고 이것을 통해서 소프트웨어의 생산과 유지보수를 쉽게 만든다. 


## MVVM 패턴에서 ViewModel은 어떻게 property를 view에게 expose하는가? 

- ViewModel은 view가 모델의 데이터와 행동에 접근하는 것을 허용하기 위해서 properties를  view에게 노출한다.
- 3가지 방법으로 expose할 수 있다. 
	1. 스탠다드 properties를 이용함으로 : ViewModel은 standard properties를 정의할 수 있다. 이 standard properties는 model의 data와 behavior를 나타낸다. 예를 들어서, 이 standard properties는 `Name` 프로퍼티를 정의할 수 있다. view는 이 프로퍼티를 데이터 바인딩을 위해서 바인드할 수 있다. 
	2. observables를 이용함으로 : ViewModel은 프로퍼티를 view에게 expose하기 위해서 관찰자 객체를 사용할 수 있다. 관찰자 객체는 `INotifyPropertyChange` 인터페이스를 구현한 객체이다. 그리고 이것은 


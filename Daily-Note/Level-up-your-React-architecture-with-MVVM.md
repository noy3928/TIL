
# [Level up your React architecture with MVVM](https://medium.cobeisfresh.com/level-up-your-react-architecture-with-mvvm-a471979e3f21)

이 아티클에서는 MVVM 패턴을 리액트에서는 어떻게 적용해볼 지를 다루어보겠다. 

혹자는 이렇게 질문할 수도 있다. 나는 리덕스도 알고 플럭스 패턴도 아는데, 이 패턴을 꼭 배워야 하나요 ? 
그럼! 배워야 한다. 왜 배워야할까? 만약 리덕스가 당신의 프로젝트에 딱 맞다면, 그냥 그대로 사용하면 된다. 그런데, 당신의 프로젝트에 딱 맞다는 것을 어떻게 판단할 것인가? 당신이 다양한 패턴을 이해하고 있지 못하는데, 그것이 딱 맞다는 것을 어떻게 이해하겠다는 말인가? 

암튼 MVVM을 한번 배워보자. 


## MVVM의 4가지 메인 블록 : 

- View : 유저가 소통하는 화면 레이어
- ViewController : ViewModel에 접근해야하고, 유저의 인풋을 다루어야 한다. 
- ViewModel : Model에 접근해야하고, 비즈니스 로직을 다루어야 한다. 
- Model : 데이터 소스 
![[스크린샷 2022-12-21 오후 5.14.53.png]]


### View : 

- view는 유일하게 유저와 소통하는 부분이다. 
- 유저가 View와 상호작용을 하면, ViewController의 메서드를 트리거 할 것이다. 
- View는 바보다. 얘는 그냥 데이터를 화면에 보여주고, ViewController로 부터 받은 이벤트를 트리거 하는 역할만 한다. 
- MobX의 도움으로, View에 일어나는 어떤 변경 사항을  관찰하고 있다가 자동으로 그냥 반영하는 그런 컴포넌트를 만들것이다. 

```javascript 
import React from 'react'  
import PokemonList from './UI/PokemonList'  
import PokemonForm from './UI/PokemonForm'  
  
class PokemonView extends React.Component {  
	render() {  
		const {  
			pokemons,  
			pokemonImage,  
			pokemonName,  
			randomizePokemon,  
			setPokemonName,  
			addPokemon,  
			removePokemon,  
			shouldDisableSubmit  
		} = this.props  
  
		return (  
			<React.Fragment>  
				<PokemonForm  
					image={pokemonImage}  
					onInputChange={setPokemonName}  
					inputValue={pokemonName}  
					randomize={randomizePokemon}  
					onSubmit={addPokemon}  
					shouldDisableSubmit={shouldDisableSubmit}  
				/>  
				<PokemonList  
					removePokemon={removePokemon}  
					pokemons={pokemons}  
				/>  
			</React.Fragment>  
)  
}  
}  
  
export default PokemonView
```


### ViewController 

- ViewController는 View의 머리다. 이것은 View와 관련된 모든 로직을 가지고 있고, ViewModel에 대한 참조를 하고 있다. 
- View는 ViewModel에 대한 존재를 인지하지 못한다. 그저 ViewController에 의존하고 있으며, 거기에 필요한 데이터와 이벤트를 넘겨줄 뿐이다. 


### ViewModel 

- ViewModel은 누가 데이터를 사용하는지 모르는 생성자다. 
	- 이것은 리액트 컴포넌트일 수 있다. 
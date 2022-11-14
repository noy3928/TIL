### 날짜 : 2022-11-14 12:37
### 주제 :  #함수형프로그래밍 #유인동 

---- 

### 메모 : 
- 사용하는 데이터가 무엇이든지 사용하는 보조함수가 순수함수라면 무엇이든지 아래와 같이 결합한다면 둘 다 결과가 같다. 
```javascript
[[mapping, mapping], [filtering, filtering], [mapping, mapping]]
= 
[[mapping, filtering, mapping], [mapping, filtering, mapping], [mapping, filtering, mapping]]
```


### 내 생각과 정리 : 
- 저런 결합법칙이 가능한 이유는 함수가 지연평가할 수 있는 특성을 가지고 있기 때문이다.

### 출처(참고문헌) : 


### Link : 

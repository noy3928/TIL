### 날짜 : 2022-11-12 20:46
### 주제 : #함수형프로그래밍  #유인동 

---- 

### 메모 : 
```javascript
go(
	products,
	products => filter(p => p.price < 20000, products),
	products => map(p => p.price, products),
	prices => reduce(add, prices),
	log
)
```


### 내 생각과 정리 : 


### 출처(참고문헌) : 


### Link : 
[[go 함수]]
CREATE 문은 데이터베이스에 새 테이블을 만들 수 있게 해줍니다. 새로운 테이블을 처음부터 만들고 싶을 때 언제든지 CREATE 문을 사용할 수 있습니다. 아래의 문장은 celebs라는 이름의 새 테이블을 만듭니다.

```sql
CREATE TABLE celebs ( 
	id INTEGER, 
	name TEXT, 
	age INTEGER 
);
```


1. CREATE TABLE은 SQL에 새 테이블을 만들고 싶다는 것을 알리는 절입니다.
2. celebs는 테이블의 이름입니다.
3. (id INTEGER, name TEXT, age INTEGER)는 테이블의 각 열, 또는 속성과 그 데이터 유형을 정의하는 매개변수 목록입니다:
    - id는 테이블의 첫 번째 열입니다. INTEGER 데이터 유형의 값을 저장합니다.
    - name은 테이블의 두 번째 열입니다. TEXT 데이터 유형의 값을 저장합니다.
    - age는 테이블의 세 번째 열입니다. INTEGER 데이터 유형의 값을 저장합니다.
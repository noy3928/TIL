문장(Statements) 아래 코드는 SQL 문장입니다. 문장이란 데이터베이스가 유효한 명령으로 인식하는 텍스트입니다. 문장은 항상 세미콜론(;)으로 끝납니다.

```sql
CREATE TABLE table_name ( 
	column_1 data_type, 
	column_2 data_type, 
	column_3 data_type 
);
```


문장의 구성 요소를 살펴봅시다:

CREATE TABLE은 절(clause)입니다. 절은 SQL에서 특정 작업을 수행합니다. 관례적으로 절은 대문자로 작성됩니다. 절은 명령어로도 불릴 수 있습니다. table_name은 명령이 적용되는 테이블의 이름을 가리킵니다. (column_1 data_type, column_2 data_type, column_3 data_type)는 매개변수(parameter)입니다. 매개변수는 절에 인수로 전달되는 열, 데이터 유형 또는 값의 목록입니다. 여기서 매개변수는 열 이름과 관련 데이터 유형의 목록입니다. SQL 문장의 구조는 다양합니다. 사용되는 줄 수는 중요하지 않습니다. 문장은 한 줄에 모두 작성되거나, 읽기 쉽게 여러 줄로 나눠질 수 있습니다. 이 과정에서는 일반적인 문장의 구조에 익숙해질 것입니다.


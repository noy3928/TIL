# SQL 문법 정리

- sql 문제를 풀어나가면서 새롭게 알게 된 문법들을 정리하는 문서

## 프로그래머스 LEVEL 1에서 알게된 문법

level 1에서는 아래의 문법만 이해하고 있으면 대부분의 문제를 풀 수 있다.

### COALESCE

- COALESCE 함수는 인수로 지정된 값들 중에서 NULL이 아닌 첫 번째 값을 반환하는 함수이다. [예시](./programmers/level1/12세이하인여자환자목록구하기.sql)

### DATE_FORMAT

- DATE_FORMAT 함수는 날짜를 특정한 형식으로 포맷하는 함수이다. [예시](./programmers/level1/자동차대여기록에서장기단기구분하기.sql)

### DATEDIFF

- DATEDIFF 함수는 두 날짜 사이의 일수를 계산하는 함수이다. [예시](./programmers/level1/자동차대여기록에서장기단기구분하기.sql)

### YEAR, MONTH

- YEAR, MONTH 함수는 날짜의 년, 월을 각각 반환하는 함수이다. [예시](./programmers/level1/자동차대여기록에서장기단기구분하기.sql)

### CONCAT

- CONCAT 함수는 두 개 이상의 문자열을 연결하는 함수이다. [예시](./programmers/level1/길이가가장긴물고기.sql)

### BETWEEN

- BETWEEN 함수는 두 개의 값 사이에 포함되는 값을 반환하는 함수이다. [예시](./programmers/level1/조건에맞는회원수.sql)

### IN

- IN 함수는 두 개 이상의 값 중에 포함되는 값을 반환하는 함수이다. [예시](./programmers/level1/흉부외과또는일반외과의사목록구하기.sql)

### AVG

- AVG 함수는 숫자의 평균값을 계산하는 함수이다. [예시](./programmers/level1/잡은물고기의평균길이구하기.sql)

### JOIN

- JOIN 함수는 두 개 이상의 테이블을 연결하는 함수이다. [예시1](./programmers/level1/과일로만든아이스크림구하기.sql) [예시2](./programmers/level1/조건에부합하는중고거래댓글구하기.sql)

### Sub Query

- Sub Query 함수는 쿼리 내부에 쿼리를 중첩하는 함수이다. [예시](./programmers/level1/잡은물고기의평균길이구하기.sql)

<br/>

---

<br/>

## 프로그래머스 LEVEL 2에서 알게된 문법

### GROUP BY

- GROUP BY 함수는 데이터를 그룹화하는 함수이다. [예시](./programmers/level2/동명동물수구하기.sql)

### HAVING

- HAVING 함수는 그룹화된 데이터에 대한 조건을 지정하는 함수이다. [예시](./programmers/level2/동명동물수구하기.sql)

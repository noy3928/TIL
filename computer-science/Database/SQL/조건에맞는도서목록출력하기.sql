SELECT BOOK_ID, DATE_FORMAT(PUBLISHED_DATE, "%Y-%m-%d") as PUBLISHED_DATE
FROM BOOK
WHERE CATEGORY = '인문'
  AND PUBLISHED_DATE BETWEEN '2021-01-01' AND '2021-12-31'
ORDER BY PUBLISHED_DATE ASC;

`BETWEEN` 구문은 SQL에서 사용되는 연산자 중 하나로, 특정 범위 내의 값을 필터링할 때 사용됩니다. 주로 날짜, 숫자, 문자열 범위를 지정하여 해당 범위 내에 있는 데이터만 선택할 수 있습니다.

### 사용법
```sql
컬럼명 BETWEEN 시작값 AND 종료값
```

### 설명
- **컬럼명**: 검사할 대상이 되는 컬럼입니다.
- **시작값**과 **종료값**: 범위의 시작과 끝을 지정하는 값입니다. 시작값은 범위에 포함되며, 종료값 또한 범위에 포함됩니다.

### 예시
```sql
SELECT * FROM 테이블명
WHERE 컬럼명 BETWEEN 시작값 AND 종료값;
```

### 날짜를 사용한 예시
```sql
SELECT * FROM BOOK
WHERE PUBLISHED_DATE BETWEEN '2021-01-01' AND '2021-12-31';
```

#### 설명:
- `PUBLISHED_DATE BETWEEN '2021-01-01' AND '2021-12-31'`은 `PUBLISHED_DATE`가 2021년 1월 1일부터 2021년 12월 31일 사이에 있는 모든 행을 선택합니다.
- 여기서 **'2021-01-01'**은 범위의 시작 날짜이고, **'2021-12-31'**은 범위의 끝 날짜입니다.
- 날짜 형식은 'YYYY-MM-DD' 형식의 문자열로 지정되어 있습니다.
- `BETWEEN` 구문은 **포함형 비교**를 수행하므로, 지정된 시작값과 종료값을 모두 포함합니다. 따라서, 2021년 1월 1일에 출판된 도서와 2021년 12월 31일에 출판된 도서도 결과에 포함됩니다.

`BETWEEN`은 시작값과 종료값을 포함하는 범위를 쉽게 지정할 수 있어, 특정 기간의 데이터를 필터링할 때 유용합니다.
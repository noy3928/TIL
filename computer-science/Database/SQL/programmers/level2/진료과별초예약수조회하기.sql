-- https://school.programmers.co.kr/learn/courses/30/lessons/132202
SELECT MCDP_CD AS "진료과 코드", COUNT(*) AS "5월예약건수"
FROM APPOINTMENT
WHERE EXTRACT(YEAR FROM APNT_YMD) = 2022
  AND EXTRACT(MONTH FROM APNT_YMD) = 5
GROUP BY MCDP_CD
ORDER BY COUNT(*) ASC, MCDP_CD ASC;

/*
`WHERE EXTRACT(YEAR FROM APNT_YMD) = 2022 AND EXTRACT(MONTH FROM APNT_YMD) = 5` 부분은 주어진 날짜(`APNT_YMD`)에서 연도와 월을 추출하여 특정 조건에 맞는 행만 필터링하는 구문입니다.

- `EXTRACT(YEAR FROM APNT_YMD)`: `APNT_YMD` 컬럼에서 연도 부분을 추출합니다. 예를 들어, `APNT_YMD` 값이 `2022-05-15 17:30:00.000000`인 경우, `2022`를 추출합니다.
- `EXTRACT(MONTH FROM APNT_YMD)`: `APNT_YMD` 컬럼에서 월 부분을 추출합니다. 예를 들어, `APNT_YMD` 값이 `2022-05-15 17:30:00.000000`인 경우, `5`를 추출합니다.

`WHERE` 절은 SQL 쿼리에서 특정 조건을 만족하는 행만 선택하기 위해 사용됩니다. 이 경우에는:

- `EXTRACT(YEAR FROM APNT_YMD) = 2022`: 예약 날짜(`APNT_YMD`)의 연도가 2022년인 경우만 선택합니다.
- `EXTRACT(MONTH FROM APNT_YMD) = 5`: 예약 날짜(`APNT_YMD`)의 월이 5월인 경우만 선택합니다.

따라서, 이 두 조건을 모두 만족하는 행들, 즉 2022년 5월에 예약된 데이터만 선택됩니다. 이 부분을 통해 쿼리는 특정 기간에 해당하는 데이터를 필터링하게 됩니다.
*/
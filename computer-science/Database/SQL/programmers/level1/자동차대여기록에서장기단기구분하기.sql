SELECT  HISTORY_ID
        ,CAR_ID
        ,DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE
        ,DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE
        ,CASE
        WHEN DATEDIFF(END_DATE, START_DATE)+1 >= 30 THEN '장기 대여'
        ELSE '단기 대여' END AS RENT_TYPE
  FROM  CAR_RENTAL_COMPANY_RENTAL_HISTORY
 WHERE  YEAR(START_DATE) = 2022 AND MONTH(START_DATE) = 9
 ORDER
    BY  HISTORY_ID DESC


-- SQL 쿼리에서 사용된 `DATEDIFF`, `CASE`, `YEAR`, `MONTH` 함수와 관련된 부분의 문법을 설명하겠습니다.

-- ### 1. `DATEDIFF` 함수

-- `DATEDIFF(date1, date2)` 함수는 두 날짜 `date1`과 `date2` 사이의 일 수 차이를 계산합니다. 일반적으로 `date1`이 `date2`보다 나중이면 양수, 그렇지 않으면 음수를 반환합니다. 이 쿼리에서는 `END_DATE`와 `START_DATE`의 차이를 계산하고, 거기에 1을 더하여 대여 기간을 일 수로 계산합니다.

-- ```sql
-- DATEDIFF(END_DATE, START_DATE) + 1
-- ```

-- `+1`을 추가한 이유는 대여 기간을 시작일과 종료일을 모두 포함하도록 계산하기 위해서입니다.

-- ### 2. `CASE` 문

-- `CASE` 문은 SQL에서 조건부 로직을 구현할 때 사용됩니다. 여러 조건을 평가하여 그 조건에 맞는 값을 반환할 수 있습니다. 기본 형식은 다음과 같습니다.

-- ```sql
-- CASE
--     WHEN 조건1 THEN 결과1
--     WHEN 조건2 THEN 결과2
--     ...
--     ELSE 기본결과
-- END
-- ```

-- 위 쿼리에서는 `DATEDIFF(END_DATE, START_DATE) + 1 >= 30` 조건을 평가하여 '장기 대여' 또는 '단기 대여'를 결정합니다.

-- ```sql
-- CASE
--     WHEN DATEDIFF(END_DATE, START_DATE) + 1 >= 30 THEN '장기 대여'
--     ELSE '단기 대여'
-- END AS RENT_TYPE
-- ```

-- ### 3. `YEAR` 및 `MONTH` 함수

-- `YEAR(date)`와 `MONTH(date)` 함수는 주어진 날짜에서 연도와 월을 추출합니다. 이 함수들은 날짜에서 특정 부분만을 가져와 조건으로 사용할 때 유용합니다.

-- - `YEAR(START_DATE) = 2022`: `START_DATE`의 연도가 2022년인 경우를 의미합니다.
-- - `MONTH(START_DATE) = 9`: `START_DATE`의 월이 9월인 경우를 의미합니다.

-- 따라서, `WHERE` 절에서

-- ```sql
-- WHERE YEAR(START_DATE) = 2022 AND MONTH(START_DATE) = 9
-- ```

-- 은 `START_DATE`가 2022년 9월인 대여 기록만을 선택합니다.

-- ### 요약

-- - `DATEDIFF`는 두 날짜 사이의 차이를 일 단위로 계산합니다.
-- - `CASE` 문은 조건에 따라 다른 값을 반환합니다.
-- - `YEAR`와 `MONTH`는 날짜의 연도와 월을 추출하여 필터링할 때 사용됩니다.

-- 이러한 문법을 활용하여 쿼리는 대여 기록에서 2022년 9월에 시작된 대여 기간을 추출하고, 그 기간이 30일 이상인 경우 '장기 대여'로, 그렇지 않은 경우 '단기 대여'로 분류합니다.
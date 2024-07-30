
SELECT DR_NAME, DR_ID, MCDP_CD, DATE_FORMAT(HIRE_YMD, '%Y-%m-%d') AS HIRE_YMD
FROM DOCTOR
WHERE MCDP_CD IN ('CS', 'GS')
ORDER BY HIRE_YMD DESC, DR_NAME;




-- ### 1. IN 절 (`IN` Clause)

-- `IN` 절은 SQL에서 특정 컬럼의 값이 여러 값 중 하나와 일치하는지를 확인할 때 사용됩니다. `IN` 절을 사용하면 `OR` 연산자를 여러 번 사용하는 것보다 간결하고 효율적인 쿼리를 작성할 수 있습니다.

-- #### 사용 예:
-- ```sql
-- SELECT *
-- FROM 테이블명
-- WHERE 컬럼명 IN (값1, 값2, 값3, ...);
-- ```

-- #### 설명:
-- - `컬럼명`이 `(값1, 값2, 값3, ...)`에 있는 값들 중 하나와 일치하는 행을 선택합니다.
-- - 위 예제에서는 `MCDP_CD` 컬럼의 값이 'CS' 또는 'GS'인 행을 선택합니다.

-- ### 2. DATE_FORMAT 함수

-- `DATE_FORMAT` 함수는 MySQL에서 날짜 데이터를 특정 형식으로 변환할 때 사용됩니다. 날짜와 시간을 다양한 형식의 문자열로 변환할 수 있으며, 주로 조회된 데이터의 가독성을 높이기 위해 사용됩니다.

-- #### 사용 예:
-- ```sql
-- DATE_FORMAT(날짜_컬럼, '형식')
-- ```

-- #### 설명:
-- - `날짜_컬럼`: 변환할 날짜 데이터를 포함하는 컬럼.
-- - `'형식'`: 날짜를 변환할 형식을 지정하는 문자열.
--   - `%Y`: 4자리 연도의 표시
--   - `%m`: 2자리 월의 표시
--   - `%d`: 2자리 일의 표시

-- #### 예시:
-- ```sql
-- DATE_FORMAT(HIRE_YMD, '%Y-%m-%d') AS HIRE_YMD
-- ```
-- - `HIRE_YMD` 컬럼의 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
-- - 변환된 값은 결과 테이블의 `HIRE_YMD` 컬럼으로 표시됩니다.

-- 위 쿼리에서는 `HIRE_YMD`를 'YYYY-MM-DD' 형식으로 변환하여 일관된 날짜 형식을 유지하고, 이를 통해 결과의 가독성을 높입니다.
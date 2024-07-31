SELECT 
    CONCAT(MAX(LENGTH), 'cm') AS MAX_LENGTH
FROM 
    FISH_INFO
WHERE 
    LENGTH IS NOT NULL;


--     `CONCAT` 함수는 문자열을 결합하는 데 사용되는 SQL 함수입니다. 여러 개의 문자열을 하나로 합칠 때 사용하며, 다음과 같은 문법을 가집니다.

-- ```sql
-- CONCAT(string1, string2, ..., stringN)
-- ```

-- - `string1, string2, ..., stringN`: 결합하고자 하는 문자열 또는 컬럼 값들을 나열합니다. 최소 하나 이상의 인자가 필요합니다.

-- **예시:**
-- ```sql
-- SELECT CONCAT('Hello', ' ', 'World') AS Greeting;
-- ```

-- 위의 쿼리는 'Hello'와 'World' 사이에 공백을 넣어 "Hello World"라는 문자열을 결합한 후, `Greeting`이라는 컬럼명으로 결과를 반환합니다.

-- 또한, 숫자와 문자열을 함께 결합할 수도 있으며, 숫자형 데이터는 문자열로 변환되어 결합됩니다.

-- **예시:**
-- ```sql
-- SELECT CONCAT('The number is ', 42) AS Result;
-- ```

-- 이 쿼리는 "The number is 42"라는 문자열을 생성합니다. `42`라는 숫자형 데이터를 문자열로 변환하여 'The number is '와 결합합니다.
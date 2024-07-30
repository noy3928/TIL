-- https://school.programmers.co.kr/learn/courses/30/lessons/59410

SELECT ANIMAL_TYPE, 
       COALESCE(NAME, 'No name') AS NAME, 
       SEX_UPON_INTAKE
FROM ANIMAL_INS
ORDER BY ANIMAL_ID;


-- `COALESCE` 함수는 SQL에서 널 값을 처리하기 위해 사용되는 함수입니다. 여러 인자를 받아서 그 중 `NULL`이 아닌 첫 번째 값을 반환합니다. 이 함수는 보통 `NULL` 값을 다른 값으로 대체할 때 사용됩니다.

-- ### 사용법
-- ```sql
-- COALESCE(value1, value2, ..., valueN)
-- ```

-- ### 작동 방식
-- - `COALESCE` 함수는 왼쪽부터 오른쪽으로 인자들을 평가합니다.
-- - 첫 번째로 만나는 `NULL`이 아닌 값을 반환합니다.
-- - 만약 모든 인자가 `NULL`이면 `NULL`을 반환합니다.

-- ### 예제
-- 1. **기본 사용 예제**
--    ```sql
--    SELECT COALESCE(NULL, 'A', 'B') AS result;
--    ```
--    - 결과: 'A'
--    - 설명: 첫 번째 인자가 `NULL`이므로, 두 번째 인자인 'A'를 반환합니다.

-- 2. **여러 값 중 첫 번째 널이 아닌 값 반환**
--    ```sql
--    SELECT COALESCE(NULL, NULL, 'B', 'C') AS result;
--    ```
--    - 결과: 'B'
--    - 설명: 앞의 두 인자가 모두 `NULL`이므로, 세 번째 인자인 'B'를 반환합니다.

-- 3. **컬럼과 사용 예제**
--    ```sql
--    SELECT COALESCE(NAME, 'No name') AS display_name
--    FROM ANIMAL_INS;
--    ```
--    - 설명: `NAME` 컬럼의 값이 `NULL`인 경우 "No name"으로 대체하여 반환합니다.

-- `COALESCE`는 여러 인자를 받을 수 있다는 점에서 `IFNULL` 함수와 차별화됩니다. `IFNULL`은 두 개의 인자만 받을 수 있는 반면, `COALESCE`는 여러 개의 인자를 받을 수 있어 좀 더 유연하게 널 값을 처리할 수 있습니다.
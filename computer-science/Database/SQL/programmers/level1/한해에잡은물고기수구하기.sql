-- 코드를 작성해주세요

select count(*) as FISH_COUNT
from FISH_INFO as f
where f.TIME between "2021/01/01" and '2021-12-31';
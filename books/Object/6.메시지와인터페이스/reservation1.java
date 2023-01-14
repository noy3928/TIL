public class ReservationAgency{
    public Reservation reserve(Screening screening, Customer customer, int audienceCount){
        Movie movie = screening.getMovie();

        boolean discountable = false;
        for(DiscountCondition condition : movie.getDiscountConditions()){
            if(condition.getType() == DiscountConditionType.PERIOD){
                discountable = screening.getWhenScreened().getDayOfWeek().equals(condition.getDayOfWeek()) && 
                condition.getStartTime().compareTo(screening.getWhenScreened().toLocalTime()) <= 0 && 
                condition.getEndTime().compareTo(screening.getWhenScreened().toLocalTime()) >= 0
            }else{
                discountable = condition.getSequence() === screening.getSequence();
            }

            if(discountable){
                break;
            }
        }
    }
}

/*
이 코드는 의존성의 집결지다. 

- Screening : Movie를 포함하지 않게 변경된다면? 
- Movie : DiscountCondition을 포함하지 않게 변경된다면? 
- condition : sequence를 포함하지 않게 변경된다면?
*/
public class ReservationAgency{
    public Reservation reserve(Screening screening, Customer customer, int audienceCount){
        Money fee = screening.calculateFee(audienceCount)
        return new Reservation(customer, screening, fee, audienceCount)
        }
    }

/*
여기서는 인자로 전달된 Screening 인스턴스에게만 메시지를 전송한다. 
ReservationAgency는 Screening에 내부에 대한 어떤 정보도 알지 못한다. 
=> 그 결과 Screening의 내부 구현이 변경되어도 ReservationAgency는 변경될 필요가 없어졌다. 
*/
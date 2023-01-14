public class Invitation{
    private LocalDateTime when;
}


/*
티켓(Ticket) :
공연을 관람하기 원하는 모든 사람들은 티켓을 소지하고 있어야만 한다. 
*/ 
public class Ticket {
    private Long fee;

    public Long getFee(){
        return fee;
    }
}

/*
가방(Bag) :
관람객이 극장에 오면서 가지고 올 소지품은 3가지밖에 없다.(초대장, 현금, 티켓) 그리고 이것을 챙기기 위한 가방이 필요하다. 
이 가방을 위한 Bag 클래스를 생성하자.  
*/ 

public class Bag {
    private Long amout;
    private Invitation invitation;
    private Ticket ticket;

    public Long hold(Ticket ticket){
        if(hasInvitation()){
            setTicket(ticket);
            return OL;
        }else{
            setTicket(ticket);
            minusAmount(ticket.getFee());
            return ticket.getFee();
        }
    }

    private boolean hasInvitation(){
        return invitation != null;
    }


    private void setTicket(Ticket ticket){
        this.ticket = ticket
    }

    private void minusAmount(Long amount){
        this.amount -= amount;
    }

    public boolean hasTicket(){
        return ticket != null;
    }

    public void plusAmount(Long amount){
        this.amount += amount;
    }

    /*
    초대를 받지 못한 사람과 초대를 받은 사람이 가방에 가지고 있는 구성품은 다를 것이다. 
    이것을 생성자를 통해서 강제할 필요가 있다. 
    */

    public Bag(long amount){
        this(null, amount)
    }

    public Bag(Invitation invitaion, long amount){
        this.invitation = invitation;
        this.amount = amount;
    }
}

/*
관람객(Audience) : 
관람객은 가방을 소지할 수 있다.  
*/ 

public class Audience {
    private Bag bag;

    public Audience(Bag bag){
        this.bag = bag;
    }

    public Bag getBag(){
        return bag;
    }

    /*
    관람객 스스로가 가방 안에 초대장이 있는지 확인한다. 
    제3자가 가방을 열어보도록 허용하지 않는다.  
    외부에서는 더 이상 관람객이 Bag을 소유하고 있다는 사실을 알 필요가 없다. 

    bag의 구현을 캡슐화한 이후로, audience도 bag의 인터페이스에만 의존하게 된다. 
    */
    public Long buy(Ticket ticket){
        return bag.hold(ticket);
    }
}


/*
매표소(TicketOffice) : 
매표소는 관람객에게 판매할 티켓과 티켓의 판매 금액이 보관되어 있어야 한다. 
*/

public class TicketOffice {
    private Long amount;
    private List<Ticket> tickets = new ArrayList<>();

    public TicketOffice(Long amount, Ticket, ... tickets) {
        this.amount = amount;
        this.tickets.addAll(Arrays.asList(tickets));
    }

    public void sellTicketTo(Audience audience){
        plusAmount(audience.buy(getTicket()));
    }

    private Ticket getTickets(){
        return tickets.remove(0)
    }

    private void plusAmount(Long amount){
        this.amount += amount;
    }

    public void minusAmount(Long amount){
        this.amount -= amount;
    }

}

/*
판매원(TicketSeller) : 
판매원은 매표소에서 초대장을 티켓으로 교환해주거나 티켓을 판매하는 역할을 수행한다.  
판매원을 구현한 TicketSeller 클래스는 자신이 일하는 매표소를 알고 있어야 한다. 
*/

public class TicketSeller {
    private TicketOffice ticketOffice;

    public TicketSeller(TicketOffice ticketOffice){
        this.ticketOffice = ticketOffice;
    }

    /*
    이 코드를 지움으로써, 외부에서는 더 이상 ticketOffice에 접근할 수 없다. 
    이제 ticketOffice에 대한 접근은 TicketSeller 안에만 존재하게 된다. 
    TicketSeller는 ticketOffice에서 티켓을 꺼내거나 판매 요금을 적립하는 일을 스스로 해야한다. 
    */
    // public TicketOffice getTicketOffice(){
    //     return ticketOffice;
    // }

    /*
    TicketSeller는 audience의 인터페이스에만 의존하게 되었다.  
    */
    public void sellTo(Audience audience){
        ticketOffice.sellTicketTo(audience);
    }
}

/*
소극장 (Theater) : 
*/

public class Theater {
    private TicketSeller ticketSeller;

    public Theater(TicketSeller ticketSeller){
        this.ticketSeller = ticketSeller;
    }

    /*
    이제 Theater는 ticketSeller 내부에 ticketOffice가 존재한다는 사실을 알지 못한다. 
    단지 sellTo 메시지를 이해하고 응답할 수 있다는 사실만 알고 있다. 
    */
    public void enter(Audience audience){
        ticketSeller.sellTo(audience);
    }
}


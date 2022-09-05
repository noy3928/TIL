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

    public boolean hasInvitation(){
        return invitation != null;
    }

    public boolean hasTicket(){
        return ticket != null;
    }

    public void setTicket(Ticket ticket){
        this.ticket = ticket
    }

    public void minusAmount(Long amount){
        this.amount -= amount;
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

    public Ticket getTickets(){
        return tickets.remove(0)
    }

    public void minusAmount(Long amount){
        this.amount -= amount;
    }

    public void plusAmount(Long amount){
        this.amount += amount;
    }
}

/*
판매원(TicketSeller) : 
판매원은 매표소에서 초대장을 티켓으로 교환해주거나 티켓을 판매하는 역할을 수행한다.  
판매원을 구현한 TicketSeller 클래스는 자신이 일하는 매표소를 알고 있어야 한다. 
*/

public class TicketSeller{
    private TicketOffice ticketOffice;

    public TicketSeller(TicketOffice ticketOffice){
        this.ticketOffice = ticketOffice;
    }

    public TicketOffice getTicketOffice(){
        return ticketOffice;
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

    public void enter(Audience audience){
        if(audience.getBag().hasInvitation()){
            Ticket ticket = ticketSeller.getTicketOffice().getTicket();
            audience.getBag().setTicket(ticket);
        }else{
            Ticket ticket = ticketSeller.getTicketOffice().getTicket();
            audience.getBag().minusAmount(ticket.getFee());
            ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
            audience.getBag().setTicket(ticket);
        }
    }
}


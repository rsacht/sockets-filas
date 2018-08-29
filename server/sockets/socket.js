const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('proximoTicket', ()=>{
        let proximo = ticketControl.proximoTicket();

        console.log(proximo);
    });    
});
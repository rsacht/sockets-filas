const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('proximoTicket', (data, callback)=>{
        let proximo = ticketControl.proximoTicket();

        console.log(proximo);
        callback(proximo);
    });    
    //Emitir um envento 'estadoAtual'
    //Chama o ultimo valor de ticket
    client.emit('estadoAtual', {
        atual: ticketControl.getUltimoTicket()
    });
});



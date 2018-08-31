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
        atual: ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimos4()
  
    });

    client.on('atenderTicket', (data, callback)=>{
        //Validação caso o usuário não informe o escritório
        if(!data.escritorio){
            return callback({
                err:true,
                mensagem: 'O escritório é necessário'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        //Retornando o ticket para o frontend 
        callback(atenderTicket);

        //Atualiza / Notifica mundanças nos ultimos4
        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimos4()
        })
    });
});



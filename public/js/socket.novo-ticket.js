//Comando para estabelecer a conexão
var socket = io();

var label = $('#lblNovoTicket');

socket.on('connect', function(){
    console.log('Conectado ao Servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado do Servidor');
});

//on 'estadoAtual'
socket.on('estadoAtual', function(resp){
    console.log(resp);
    label.text(resp.atual);
});

//Definindo que todos os buttons da tela executem esta função
$('button').on('click', function(){
    socket.emit('proximoTicket', null, function(proximoTicket){
        label.text(proximoTicket)
    });
});
//Fazendo a comunicação do backend com frontend do proximo ticket
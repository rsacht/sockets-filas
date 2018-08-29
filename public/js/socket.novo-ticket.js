//Comando para estabelecer a conexão
var socket = io();

socket.on('connect', function(){
    console.log('Conectado ao Servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado do Servidor');
});

//Definindo que todos os buttons da tela executem esta função
$('button').on('click', function(){
    socket.emit('proximoTicket');
});
//Fazendo a comunicação do backend com frontend do proximo ticket
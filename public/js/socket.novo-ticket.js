//Comando para estabelecer a conexão
var socket = io();

socket.on('connect', function(){
    console.log('Conectado ao Servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado do Servidor');
});
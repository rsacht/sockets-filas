//Comando para estabelecer a conexão
var socket = io();


socket.on('estadoAtual', function(data){
    console.log(data);
});
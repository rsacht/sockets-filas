//Comando para estabelecer a comunicação
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

//Se não tiver a palavra escritório na URL redireciona para a página principal
if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('O escritório é necessário');
}
//Se a palavra escritorio existe na URL
var escritorio = searchParams.get('escritorio');
//Referencia à tag <small>
var label = $('small');
//Verificar o número do escritório
//http://localhost:3000/escritorio.html?escritorio=4 ... 5 enter
console.log(escritorio);

//Indica o número do escritório
//Veja que o número aparece no frontend
$('h1').text('Escritório '+ escritorio);

//Chamando o Socket
//Listener do Botão
//Quando clica no botão apresenta o valor ... pelo valor do ticket no <small>...</small>
$('button').on('click', function(){
    socket.emit('atenderTicket', {escritorio: escritorio}, function(resp){
        if (resp === 'Não há tickets'){
            label.text(resp);
            alert(resp);
            return;
        }
        //Muda o valor na tag <small>
        label.text('Ticket '+ resp.numeroTicket);
    });
});


//Comando para estabelecer a conexão
var socket = io();

//Referenciando as tags onde deve aparecer o número dos tickets
//Que estão sendo atendidos
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

//Colocando em array para efetuar a contagem da posição
var lblTickets = [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
var leblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];

socket.on('estadoAtual', function(data){
    console.log(data);
    atualizaHTML(data.ultimos4);
});

//Atualiza o HTML com o array dos ultimos 4
//Sempre que houver um novo atendimento
function atualizaHTML(ultimos4){
    //Varrendo os tickets na tela
    for(var i=0; i<= ultimos4.length -1; i++){
        lblTickets[i].text('Ticket '+ ultimos4[i].numeroTicket);
        leblEscritorios[i].text('Escritorio '+ ultimos4[i].escritorio);
    }
}
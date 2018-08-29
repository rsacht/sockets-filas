//Importando file system para podermos salvar os dados no data.json
const fs = require('fs');

//Classe para manipular os tickets que ainda não foram atendidos
//Não vamos exportá-la porque vamos usá-la apenas internamente aqui
class Ticket{
    constructor(numeroTicket, escritorio){
        this.numeroTicket = numeroTicket;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoje = new Date().getDate();
        //Array com os tickets que ainda não foram atendidos
        this.tickets = [];

        //Lendo o arquivo de dados data.json
        let data = require('../data/data.json');
        //Compara a data atual em data.json
        if(data.hoje === this.hoje){
            //Se a data for igual a de hoje pegar o número do ultimo ticket
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        }else{
            //Se a data for diferente da data de hoje reinicia o ticket
            this.reiniciarContador();
        }      
    }

    proximoTicket(){
        //Incrementando o contador de tickets
        this.ultimo += 1;
        //Cria um ticket com número e escritório de atendimento
        let ticket = new Ticket(this.ultimo, null);
        //Adiciona ao array de tickets
        this.tickets.push(ticket);
        //Grava as alterações de ticket no DB
        this.gravarArquivo();
        //Retorna o ultimo ticket para mostrar na Tela
        return `Ticket ${this.ultimo}`;
    }

    //Retornando o ultimo ticket
    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    //Reinicia o contador de Tickets
    reiniciarContador(){
        //Zera a variável ultimo
        this.ultimo = 0;
        this.tickets = [];

        console.log('O sistema foi reinicializado');
        
        //Grava as alterações de data e ticket no DB
        this.gravarArquivo();
    }

    gravarArquivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoje: this.hoje,
            tickets: this.tickets
        }; 
        //Mandando como string json
        let jsonDataString = JSON.stringify(jsonData); 
        //Gravando a informação no data.json 
        fs.writeFileSync('./server/data/data.json', jsonDataString); 
    }
}

module.exports = {
    TicketControl
}
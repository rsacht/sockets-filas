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
        //Ultimos 4 tickets 
        this.ultimos4 = [];

        //Lendo o arquivo de dados data.json
        let data = require('../data/data.json');
        //Compara a data atual em data.json
        if(data.hoje === this.hoje){
            //Se a data for igual a de hoje pegar o número do ultimo ticket
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
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
        this.ultimos4 = [];

        console.log('O sistema foi reinicializado');
        
        //Grava as alterações de data e ticket no DB
        this.gravarArquivo();
    }


    atenderTicket(escritorio){
        //Verifica se há tickets pendentes a atender
        if(this.tickets.length === 0){
            return 'Não há tickets';
        }
        //Obtendo o primeiro número de ticket pendente
        let numeroTicket = this.tickets[0].numeroTicket;
        //Elimina o primeiro ticket do array
        this.tickets.shift();
        //Cria um novo ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //Colocar este ticket no inicio do array
        this.ultimos4.unshift(atenderTicket);
        //Apagando os que ultrapassam 4 pelo ultimo
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1);
        }

        console.log('ultimos4');
        console.log(this.ultimos4);

        //Grava na base de dados
        this.gravarArquivo();
        //Retorna tickets a atender
        return atenderTicket;

    }

    gravarArquivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoje: this.hoje,
            tickets: this.tickets,
            ultimos4 : this.ultimos4
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
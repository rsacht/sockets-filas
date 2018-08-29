//Importando file system para podermos salvar os dados no data.json
const fs = require('fs');

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoje = new Date().getDate();

        //Lendo o arquivo de dados data.json
        let data = require('../data/data.json');
        //Compara a data atual em data.json
        if(data.hoje === this.hoje){

        }else{
            //Se a data for diferente da data de hoje reinicia o ticket
            this.reiniciarContador();
        }      
    }

    //Reinicia o contador de Tickets
    reiniciarContador(){
        let jsonData = {
            ultimo: this.ultimo = 0,
            hoje: this.hoje
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
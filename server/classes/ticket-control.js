
class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoje = new Date().getDate();

        //Lendo o arquivo de dados data.json
        let data = require('../data/data.json');
        console.log(data);
    }
}

module.exports = {
    TicketControl
}
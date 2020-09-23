const banco = require("../banco");
const frases = require("../frases/frases")

function execute(user, msg) {
   
    if(msg == 1 ||msg == 2 ||msg == 3 ||msg == 4 ||msg == 5 ){
        banco.db[user].stage = 0;
        return [frases.feedback1 ];
           } 
    return [   frases.feedback2     
    ];
 
}

exports.execute = execute;
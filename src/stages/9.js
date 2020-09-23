const banco = require("../banco");
const frases = require("../frases/frases")

function execute(user, msg) {
  if (msg == 0) {
    banco.db[user].stage = 1;
    return [
        frases.boavindas3,
    ];
  } 
  if (msg == 1) {

    banco.db[user].stage = 9.1;
    return [
        frases.curso.frase2
    ];
  } 

  if (msg == 2) {

    banco.db[user].stage = 9.2;
    return [
        frases.curso.frase2,
    ];
  } 
 
return [frases.curso.frase4,frases.curso.frase1]
 
}

exports.execute = execute;
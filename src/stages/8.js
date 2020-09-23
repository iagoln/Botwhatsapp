const banco = require("../banco");
const frases = require("../frases/frases")

function execute(user, msg) {

  if (msg == 1) {
    banco.db[user].stage = 1;
    return [
      frases.boavindas3,
    ];
  }
  if (msg == 2) {
    banco.db[user].stage = 0;
    return [
      frases.finalizandoconversa2,
    ];
  }
  return [frases.finalizandoconversa3]

}

exports.execute = execute;
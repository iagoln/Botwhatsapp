const banco = require("../banco");
const frases = require("../frases/frases")

function execute(user, msg, contato) {
  banco.db[user].stage = 1;
  return [
    frases.boavindas1, frases.boavindas2, frases.boavindas3,
  ];
}

exports.execute = execute;

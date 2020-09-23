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
    banco.db[user].stage = 6.1;
    return [
      frases.agendamento2
    ];
  }
  if (msg == 2) {
    banco.db[user].stage = 6.2;
    return [
      frases.agendamento4,
    ];
  }
  return [frases.agendamento6]
}
exports.execute = execute;
const banco = require("../banco");
const frases = require("../frases/frases");
const { boavindas3 } = require("../frases/frases");
const frase = require("../frases/frases");
function execute(user, msg) {
  if (msg == 0) {
    banco.db[user].stage = 1;
    return [
      frases.boavindas3,
    ];
  }
  if (msg === "1") {
    banco.db[user].stage = 6;
    return [frases.agendamento1];
  }
  if (msg === "2") {
    banco.db[user].stage = 2;
    return [frases.reagendamento1, frases.reagendamento2];
  }
  if (msg === "3") {
    banco.db[user].stage = 3;
    return [frases.cancelamento1];
  }
  if (msg === "4") {
    const horarioinicio = frases.horarioinicio //horario de funcioamento de inicio
    const intervaloinicio = frases.intervaloinicio
    const intervalofim = frases.intervalofim
    const horariofinal = frases.horariofinal
    const horarioiniciomili = (horarioinicio.slice(0, 2) * 3600000) + (horarioinicio.slice(3, 5) * 60000)
    const intervaloiniciomili = (intervaloinicio.slice(0, 2) * 3600000) + (intervaloinicio.slice(3, 5) * 60000)
    const intervalofimmili = (intervalofim.slice(0, 2) * 3600000) + (intervalofim.slice(3, 5) * 60000)
    const horariofinalmili = (horariofinal.slice(0, 2) * 3600000) + (horariofinal.slice(3, 5) * 60000)
    const horaagoramili = (new Date().getHours() * 3600000) + (new Date().getMinutes() * 60000)
    const dia_sem = new Date().getDay()
    if ((horaagoramili >= horarioiniciomili) && (horaagoramili <= intervaloiniciomili) || (horaagoramili >= intervalofimmili) && (horaagoramili <= horariofinalmili)) {
      if (dia_sem != (6) && dia_sem != (0)) {
        banco.db[user].stage = 4;
        return [frases.falarcomhumano1, frases.falarcomhumano2];
      }
    }
    return [frases.falarcomhumano3, frase.falarcomhumano4];
  }
  if (msg === "5") {
    return [frases.planos.frase1];
  }
  if (msg === "6") {
    banco.db[user].stage = 9;
    return [frases.curso.frase1];
  }
  return [
    frases.naoentedeu, frases.boavindas3
  ];
}

exports.execute = execute;

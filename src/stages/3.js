const banco = require("../banco");
const bot = require("venom-bot");
const googleeventos = require("./consultaeventosgoogle.js");
const frases = require("../frases/frases")
async function execute(user, msg) {
  const { google } = require('googleapis');
  if (msg == 0) {
    banco.db[user].stage = 1;
    return [
      frases.boavindas3
    ];
  }
  let telefonecliente = 0
  let telefonevalidar = msg.replace(/ /g, "").replace(/-/g, "").trim().length
  switch (telefonevalidar) {
    case 1:
      telefonecliente = user.substring(0, user.indexOf("@c.u")).trim();
      break;

    case 11:
      const resultaodobruto = msg.replace(/ /g, "").replace(/-/g, "").trim()
      telefonecliente = "55" + resultaodobruto.substring(0, 2) + resultaodobruto.substring(3, 14)
      break;

    case 10:
      telefonecliente = "55" + msg.replace(/ /g, "").replace(/-/g, "").trim();
      break;
    default:
      return [frases.naoentedeuonumero];
  }
  const eventosfinal = await googleeventos.eventesgoogleapi(telefonecliente)
  const eventosagenda = [];
  for (let i = 0; i < eventosfinal.length; i++) {
    let diaconsulta = eventosfinal[i].start
    if ((Date.parse(diaconsulta) - (frases.solicitarcancelamento * 60000)) > Date.now()) {
      let hora = diaconsulta.slice(11, 16)
      let dia = diaconsulta.slice(8, 10)
      let mes = diaconsulta.slice(5, 7)
      let ano = diaconsulta.slice(0, 4)
      let datalimpa = dia + "/" + mes + "/" + ano + " às " + hora
      eventosagenda.push(`${frases.cancelamento2.frase1}*${eventosfinal[i].nomecliente}*${frases.cancelamento2.frase2}*${datalimpa}*${frases.cancelamento2.frase3}${eventosfinal[i].linkcancelar} \n`)
    }
  }
  if (eventosagenda == 0) {
    return [frases.naolocalizouagendamento]
  } else {
    banco.db[user].stage = 8;
    eventosagenda.push(frases.finalizandoconversa)
    return eventosagenda
  }
}

exports.execute = execute;

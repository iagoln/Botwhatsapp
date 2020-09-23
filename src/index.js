const bot = require("venom-bot");
const banco = require("./banco");
const stages = require("./stages");
const eventogoogle = require("./EventosGoogle");
var schedule = require('node-schedule');
const frases = require("./frases/frases");
const frase = require("./frases/frases");
const { civicinfo } = require("googleapis/build/src/apis/civicinfo");

bot.create('sessionName', (base64Qr, asciiQR) => {
  // To log the QR in the terminal
  //console.log(asciiQR);
  // To write it somewhere else in a file

}, (statusFind) => {
  console.log(statusFind)
}, {
  headless: false, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: true, // Logs QR automatically in terminal
  browserArgs: [''], // Parameters to be added into the chrome browser instance
  refreshQR: 15000, // Will refresh QR every 15 seconds, 0 will load QR once. Default is 30 seconds
  autoClose: 60000, // Will auto close automatically if not synced, 'false' won't auto close. Default is 60 seconds (#Important!!! Will automatically set 'refreshQR' to 1000#)
  disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
}).then((client) => start(client));
function start(client) {
   client.onAck(ack => {
    if (ack.body.toUpperCase().replace(/ /g, "") == frases.desativabot.frase1.toUpperCase().replace(/ /g, "") || ack.body.toUpperCase().replace(/ /g, "") == frases.desativabot.frase2.toUpperCase().replace(/ /g, "") || ack.body.toUpperCase().replace(/ /g, "") == frases.desativabot.frase3.toUpperCase().replace(/ /g, "") || ack.body.toUpperCase().replace(/ /g, "") == frases.desativabot.frase4.toUpperCase().replace(/ /g, "")) {
      banco.db[ack.to] = {
        stage: 5,
        itens: [],
      };
      setTimeout(function () { banco.db[ack.to].stage = 0 }, 18000000)
    }
    if (ack.body.toUpperCase().replace(/ /g, "") == frases.ativarbot.frase1.toUpperCase().replace(/ /g, "") || ack.body.toUpperCase().replace(/ /g, "") == frases.ativarbot.frase2.toUpperCase().replace(/ /g, "")) {
      banco.db[ack.to] = {
        stage: 0,
        itens: [],
      };
    }
  });
  setInterval(() => {
    // enviar lembrete
    (async () => {
      const qtdventos = 200;
      const requisitaminutosfuturo = 2000 // Soma 60 miutos da data inicial para gerar a data final (Sempre o maior lembrete )
      const requisitaminutospassado = 2000 // Soma 60 miutos da data inicial para gerar a data final (Sempre o maior feedback )
      const lembrarminutos = frases.lembrarminutos //quantos minutos antes é para enviar o lembrete
      const feedback = frases.feedbackminutos //quantos minutos antes é para enviar o feedback
      const eventos = await eventogoogle.eventesgoogleapi(requisitaminutosfuturo, requisitaminutospassado)
      if (eventos != 0) {
        for (let i = 0; i < eventos.length; i++) {
          // mensagem de lembrete
          if ((((Date.parse(eventos[i].start)) - ((lembrarminutos * 60000) + 1800000)) <= Date.now()) && (Math.abs(((Date.parse(eventos[i].start)) - ((lembrarminutos * 60000) + 1800000) - (Date.now()))) < (1800000))) {
            const perfil = await client.getNumberProfile(`${eventos[i].telefonecliente}` + `@c.us`);
            if (perfil.canReceiveMessage == true) {
              const diaconsulta = eventos[i].start
              const dataagendamento = Date.parse(eventos[i].start) - (lembrarminutos * 60000)
              const hora = diaconsulta.slice(11, 16)
              const dia = diaconsulta.slice(8, 10)
              const mes = diaconsulta.slice(5, 7)
              const ano = diaconsulta.slice(0, 4)
              const datalimpa = dia + "/" + mes + "/" + ano + " às " + hora
              const j = schedule.scheduleJob(dataagendamento, function () {
              const idclientelembrete = perfil.id._serialized

               client.sendMessageToId(`${idclientelembrete}`, `${frases.lembrete1.frase1}*${eventos[i].nomecliente}* ${frases.lembrete1.frase2}*${datalimpa}*${frases.lembrete1.frase3}`);

              });
            }
          }
          // fim lembrete 1

          // inicio feedback
          if ((((Date.parse(eventos[i].end)) + ((feedback * 60000) - 1800000)) <= Date.now()) && (Math.abs(((Date.parse(eventos[i].end)) + ((feedback * 60000) - 1800000) - (Date.now()))) < (1800000))) {
            const perfil = await client.getNumberProfile(`${eventos[i].telefonecliente}` + `@c.us`);
            if (perfil.canReceiveMessage == true) {
              const diaconsulta = eventos[i].start
              const dataagendamento = Date.parse(eventos[i].end) + (feedback * 60000)
              const hora = diaconsulta.slice(11, 16)
              const dia = diaconsulta.slice(8, 10)
              const mes = diaconsulta.slice(5, 7)
              const ano = diaconsulta.slice(0, 4)
              const feed = schedule.scheduleJob(dataagendamento, function () {
                const idclientefeed = perfil.id._serialized
                client.sendMessageToId(`${idclientefeed}`, `${frase.feedback.frase1}*${eventos[i].nomecliente}*${frase.feedback.frase2}`);
                banco.db[idclientefeed] = {
                  stage: 7,
                  itens: [],
                };
                setTimeout(function () { banco.db[idclientefeed].stage = 0 }, 1800000)
              });
            }
          }
          // Fim feefback
        }
      }
    })()
  }, 1800000);

  // fim do codigo
  client.onStateChange((state) => {
    console.log(state);
    const conflits = [
      bot.SocketState.CONFLICT,
      bot.SocketState.UNPAIRED,
      bot.SocketState.UNLAUNCHED,
    ];
    if (conflits.includes(state)) {
      client.useHere();
    }
  });
  client.onMessage((message) => {
    if (message.isGroupMsg == false) {
      (async () => {
        let resp = await stages.step[getStage(message.from, message.body)].obj.execute(
          message.from,
          message.body,
          message.sender.name
        );

        if (resp == "!@#$%#") {

        } else {
          for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            client.sendText(message.from, element);
          }
        }
      })()
    }
  });

  function getStage(user, resp) {
    //Se existir esse numero no banco de dados
    if (banco.db[user]) {

      // mandar mensagem quando design de sobrancel
      if (banco.db[user].stage == 9.1) {
        console.log(resp)
        let linkcliente = ("https://wa.me/" + user.slice(0, 12))
        client.sendText("", `Curso de Design de Sobrancelhas \n Nome: ${resp} \n ${linkcliente}`);// enviar mensagem quando solicita falar com secretaria
      }
      // mandar mensagem quando Curso de Micropigmentaçãoa
      if (banco.db[user].stage == 9.2) {
        console.log(resp)
        let linkcliente = ("https://wa.me/" + user.slice(0, 12))
        client.sendText("", `Curso de Micropigmentação \n nome: ${resp} \n ${linkcliente}`);// enviar mensagem quando solicita falar com secretaria
      }
      // mandar mensagem quando solicta falar com a secretaria
      if (banco.db[user].stage == 4) {
        console.log(resp)
        let linkcliente = ("https://wa.me/" + user.slice(0, 12))
        client.sendText("", `Cliente deseja sua atenção sobre: ${resp} \n ${linkcliente}`);// enviar mensagem quando solicita falar com secretaria
      }
      //lista de espera
      if (banco.db[user].stage == 6.1) {
        console.log(resp)
        let linkcliente = ("https://wa.me/" + user.slice(0, 12))
        client.sendText("", `Nome: ${resp} \n ${linkcliente}`);//lista de espera
      }
      // clicnteque tinham agendado e ainda nao entramos em contato
      if (banco.db[user].stage == 6.2) {
        console.log(resp)
        let linkcliente = ("https://wa.me/" + user.slice(0, 12))
        client.sendText("", `Nome: ${resp} \n ${linkcliente}`);//lista de espera
      }

      return banco.db[user].stage;
    } else {
      //Se for a primeira vez que entra e contato
      banco.db[user] = {
        stage: 0,
        itens: [],
      };
      return banco.db[user].stage;
    }
  }
}


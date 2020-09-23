
const { google } = require('googleapis');
const qtdventos = 200;
const frases = require("./frases/frases")
async function eventesgoogleapi(requisitaminutosfuturo, requisitaminutospassad) {
  const dadosbruto = [];
  var continua = true
  // pode modificar aqui os valores para pegar do outro dia
  let inicio = new Date((Date.now()) - (requisitaminutospassad * 3600000)).toISOString()
  let datafim = new Date((Date.now()) + (requisitaminutosfuturo * 60000)).toISOString()
  const dadosfinal = [];
  do {

    continua = true;
    const dadosapi = [];
    const agesemcancelar = [];
    const dadosgoogle = await apigoogleleitura(inicio, datafim)
    dadosapi.push(await apigoogleleitura(inicio, datafim))

    for (let i = 0; i < dadosgoogle.length; i++) {
      try {

        if (dadosgoogle[i].attendees[1].responseStatus != "declined") {
          agesemcancelar.push(dadosgoogle[i])
        }
      } catch {
        continue
      }
    }
    // no numero do if dever igual ao do limite de requisição 
    try {

      inicio = dadosgoogle[dadosgoogle.length - 1].start.dateTime //pegaando a ultima data
    } catch { }
    for (let i = 0; i < agesemcancelar.length; i++) {
      try {
        telefone = agesemcancelar[i].description

        const resultaodo = telefone.substring(telefone.indexOf("elefon"), telefone.indexOf("Precisa efetua")).replace(/\D/gim, '');
        if (resultaodo.length == 13) {
          const resultaodomodificado = resultaodo.substring(0, 4) + resultaodo.substring(5, 14)
          const idevent = agesemcancelar[i].id
          const start = agesemcancelar[i].start.dateTime
          const linkreagendar = agesemcancelar[i].description.substring(telefone.indexOf("Reagendar:") + 10, agesemcancelar[i].description.indexOf("Desenvolvido po")).trim();
          const linkcancelar = agesemcancelar[i].description.substring(telefone.indexOf("Cancelar:") + 9, agesemcancelar[i].description.indexOf("Reagendar")).trim();
          const telefonecliente = resultaodomodificado
          const nomecliente = agesemcancelar[i].summary.substring(0, agesemcancelar[i].summary.indexOf("e |")).trim()
          const end = agesemcancelar[i].end.dateTime
          const eventoigual = dadosfinal.filter(function (exluciiugual) {
            return exluciiugual.idevent == idevent;
          });
          if (eventoigual == 0) {
            dadosfinal.push({
              idevent,
              start,
              linkreagendar,
              linkcancelar,
              telefonecliente,
              nomecliente,
              end
            });
          }
        }
        if (resultaodo.length == 12) {
          const idevent = agesemcancelar[i].id
          const start = agesemcancelar[i].start.dateTime
          const linkreagendar = agesemcancelar[i].description.substring(telefone.indexOf("Reagendar:") + 10, agesemcancelar[i].description.indexOf("Desenvolvido po")).trim();
          const linkcancelar = agesemcancelar[i].description.substring(telefone.indexOf("Cancelar:") + 9, agesemcancelar[i].description.indexOf("Reagendar")).trim();
          const telefonecliente = resultaodo
          const nomecliente = agesemcancelar[i].summary.substring(0, agesemcancelar[i].summary.indexOf("e |")).trim()
          const end = agesemcancelar[i].end.dateTime
          const eventoigual = dadosfinal.filter(function (exluciiugual) {
            return exluciiugual.idevent == idevent;
            return exluciiugual.idevent == idevent;
          });

          if (eventoigual == 0) {
            dadosfinal.push({
              idevent,
              start,
              linkreagendar,
              linkcancelar,
              telefonecliente,
              nomecliente,
              end

            });
          }
        }
      } catch { continue }
    }
    if (await dadosgoogle.length < qtdventos) {
      continua = false
    }

  } while (continua == true)
  return dadosfinal
}

async function apigoogleleitura(inicio, datafim) {
  return new Promise((resolver, reject) => {

    let auth = new google.auth.OAuth2(
      frases.keys.YOUR_CLIENT_ID,
      frases.keys.YOUR_CLIENT_SECRET,
      frases.keys.YOUR_GOOGLE_CALENDAR_REDIRECT_URI
    );
    // Now use OAuth response to get an user authenticated API client
    let credentials = {
      access_token: frases.keys.access_token,
      token_type: 'Bearer', // mostly Bearer
      refresh_token: frases.keys.refresh_token,
      expiry_date: '3599'
    };
    auth.setCredentials(credentials);
    let calendar = google.calendar({ version: 'v3', auth });
    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: `${inicio}`,
      timeMax: `${datafim}`,
      maxResults: `${qtdventos}`,
      singleEvents: true,
      orderBy: 'startTime',

    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        var para = false
        const events = res.data.items;
        resolver(events)
        if (events.length < 200) {
          para = true
        } else {
          para = false
        }
      }
    });
  });
}

exports.eventesgoogleapi = eventesgoogleapi



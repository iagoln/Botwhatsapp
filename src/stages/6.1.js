const banco = require("../banco");
const frases = require("../frases/frases")

function execute(user, msg) {
    banco.db[user].stage = 8;
    return [frases.agendamento3, frases.finalizandoconversa]
}

exports.execute = execute;
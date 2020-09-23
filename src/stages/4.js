const banco = require("../banco");
const frases = require("../frases/frases")

function execute(user, msg) {
  banco.db[user].stage = 5;

  setTimeout(function () { banco.db[user].stage = 0 }, 18000000);
  return [frases.falarcomhumano5
  ];
}

exports.execute = execute;

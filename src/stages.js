var stages = {
  0: {
    descricao: "Boas Vindas",
    obj: require("./stages/0"),
  },
  1: {
    descricao: "menu",
    obj: require("./stages/1"),
  },
  2: {
    descricao: "Reagendar",
    obj: require("./stages/2"),
  },
  3: {
    descricao: "Cancelar",
    obj: require("./stages/3"),
  },
  4: {
    descricao: "falar comhumano",
    obj: require("./stages/4"),
  },
  5: {
    descricao: "Bot off ate que mude de stage",
    obj: require("./stages/5"),
  },
  6: {
    descricao: "Agendamento",
    obj: require("./stages/6"),
  },
  6.1: {
    descricao: "Agendamento fila de espera",
    obj: require("./stages/6.1"),
  },
  6.2: {
    descricao: "Agendamento clinte que ja estava agendada",
    obj: require("./stages/6.2"),
  },
  7: {
    descricao: "Feedback",
    obj: require("./stages/7"),
  },
  8: {
    descricao: "Posso ajudar",
    obj: require("./stages/8"),
  },
  9: {
    descricao: "Cursos",
    obj: require("./stages/9"),
  },
  9.1: {
    descricao: "Curso de Design de Sobrancelhas.",
    obj: require("./stages/9.1"),
  },
  9.2: {
    descricao: "Curso de Micropigmentação",
    obj: require("./stages/9.2.js"),
  },
};

exports.step = stages;

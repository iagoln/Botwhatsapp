const linkagendamento = ""
const horarioinicio=  "09:00" //horario de funcioamento de inicio
const intervaloinicio= "12:00"
const intervalofim= "14:00"
const horariofinal=  "17:00" //

const frase={
boavindas1: "Olá, eu sou a atendente virtual de Alice Mendonça! 🌷 e hoje vou te auxiliar no atendimento.👩🏽‍⚕️",
boavindas2: "Como posso te ajudar ?",
boavindas3: 'Digite *1*- Agendar um procedimento.📅 \n\nDigite *2*- Reagendar procedimento.📆 \n\nDigite *3*- Cancelar procedimento.❌ \n\nDigite *4*- Para falar com a secretaria.👩🏻‍💻\n\nDigite *5*- Tabela de preços.🏷️\n\nDigite *6* - Cursos.👩🏻‍🎓',

agendamento1: `Olá! Estamos primeiramente reagendando as pessoas que já estavam marcadas antes da Pandemia. Quando organizarmos todos os agendamentos pendentes aos quais possuímos este compromisso,  a agenda será liberada para marcarmos novos procedimentos.

Digite *1*- Se você _*não faz*_ parte do grupo de pessoas agendadas e deseja ser informado assim que a agenda for liberada.
Digite *2*- Se você faz parte desse grupo de pessoas já agendadas e ainda não entramos em contato.
Digite *0*- Para voltar ao menu anterior.`,

agendamento2:`Fico feliz com o seu interesse. Agora é só digitar seu nome e sobrenome.`,
agendamento3:`Agradecemos pelo contato. Assim que surgir uma vaga você será a primeira a ser avisada ❤`,
agendamento4:`Agora é só digitar seu nome e sobrenome.`,
agendamento5:`Em breve nossa equipe entrará em contato Obrigada ❤`,
agendamento6:`Desculpe! Não consegui entender! 😔

Digite *1*- Se você _*não faz parte*_ do grupo de pessoas agendadas e deseja ser informado assim que a agenda for liberada.
Digite *2*- Se você faz parte desse grupo de pessoas já agendadas e ainda não entramos em contato.
Digite *0*- Para voltar ao menu anterior.`,

reagendamento1: "Sem problemas... Vamos reagendar seu novo dia agora mesmo! \nPara consultar o seu dia e horário, preciso do número de telefone.",

reagendamento2: `Digite *1*- Se o número de telefone for este que estamos conversando.

Caso seja outro número, digite-o com o DDD conforme este exemplo\n *79 98801-1234*

Digite *0*- Para voltar ao menu anterior.`,

reagendamento3:{ frase1:`Nome: `, frase2:" \nData: ",
frase3:" \n\n👇🏼Click aqui para buscar um novo horário:👇🏼\n "},


cancelamento1: `Que pena que tomou esta decisão. Para seguirmos com o cancelamento, e reembolso do agendamento, preciso do número de telefone.

Digite *1*- Se o número de telefone for este que estamos conversando.

Caso seja outro número, digite-o com o DDD conforme este exemplo:\n *79 98801-1234*.

Digite *0*- Para voltar ao menu anterior.`,
cancelamento2:{ frase1:`Nome: `, frase2:" \nData: ",
frase3:" \n\n👇🏼Click aqui para cancelar:👇🏼\n " },
falarcomhumano1: "Só um minuto que vou chamar o humano!👩🏻‍💻",
falarcomhumano2:"Para que eu possa transferir, qual assunto deseja tratar?",
falarcomhumano3: `Infelizmente o humano não esta disponivel agora!👩🏻‍💻
Horario de funcionamento ${horarioinicio}  as ${horariofinal}.
\n\nDigite *0*- Para voltar ao menu anterior.`,
falarcomhumano4:``,
falarcomhumano5:`Agradecemos pelo contato!🤖
Devido a pandemia estamos com um tempo de espera um pouco maior, mas não se preocupe que o humano irá te atender.
Obrigada pela compreensão 🌻💛`,
planos:{frase1:`Digite *0* - para voltar ao menu anterior.

OBS: Os valores abaixo podem ser _*parcelados em até 3X*_ ou receber _*10% de desconto*_ para pagamento em dinheiro ou transferência bancária. 
(Não aceitamos cheque)

*-* Micropigmentação de sobrancelhas (nunca fiz antes)
Valor: 740,00

*-* Retoque de micropigmentação de sobrancelhas (até 60 dias feitas por Alice) 
Valor: 280,00

*-* Retoque de Micropigmentação de sobrancelhas (seja passado o prazo de 60 dias ou seja Anual, feitas por Alice)
Valor: 580,00

*-* Retoque de Micropigmentação de sobrancelhas (feitas por outro profissional)
Valor: Somente após avaliação 

*-* Micropigmentação de Lábios  (nunca fiz antes)
Valor: 1.440,00

*-* Retoque de micropigmentação de Lábios  (até 90 feitos por Alice)  
Valor: 300,00

*-* Retoque de Micropigmentação de Lábios  (seja passado o prazo de 90 dias ou seja Anual, feitos por Alice)
Valor: 980,00

*-* Retoque de Micropigmentação de Lábios  (feitos por outro profissional)
 Valor: Somente após avaliação 

*-* Micropigmentação de Olhos (nunca fiz antes)Áreas Superior e Inferior dos olhos.
Valor: 1.440,00

*-* Micropigmentação  de Olhos Somente a uma Área
Valor: 1.240,00

*-* Retoque de micropigmentação de Olhos  (até 90 dias feitos por Alice)  
Valor: 300,00

*-* Retoque de Micropigmentação de Olhos  (seja passado o prazo de 90 dias ou seja Anual, feitos por Alice) Áreas Superior e Inferior dos olhos
Valor: 980,00

*-* Micropigmentação Paramédica (nunca fiz antes)
Valor: Somente após avaliação  

*-* Remoção de sobrancelhas a laser
Valor: 300,00 a sessão

*-* Avaliação prévia para qualquer procedimento
Valor: 50,00

Digite *0* - para voltar ao menu anterior.
`},


finalizandoconversa:`Posso te ajudar em algo mais?

Digite *1*- Sim
Digite *2*- Não`,
finalizandoconversa2:`Obrigada pelo contato!🤖`,
finalizandoconversa3:`Desculpe!Não consegui entender! 😔 
Posso te ajudar em algo mais?

Digite *1*- Sim
Digite *2*- Não`,
naoentedeu:"Desculpe! \nNão consegui entender! 😔 \n\nO código pode estar inválido, favor escolher uma destas opções:\n\n",

naoentedeuonumero:"*Favor informar um número com o DDD conforme este exemplo:*\n*79 98801-1234*\n\nDigite *0* para voltar ao menu anterior.",
naolocalizouagendamento:"Infelizmente não localizamos nenhum agendamento  com o número informado, digite *0* para voltar ao menu anterior ou caso queira, posso tentar com outro número!",

curso:{frase1:`Digite *1* - Curso de Design de Sobrancelhas.🖌

Digite *2* - Curso de Micropigmentação. 🖋`,
frase2:`Quase lá!
Preciso que digite seu nome e sobrenome para enviarmos todas as informações para você! 😉`,frase3:`Prontinho! Registramos o seu contato! Logo mais te enviaremos as informações definidas do próximo curso! 🌷`,frase4:`Desculpe!Não consegui entender! 😔`},


//lembrete
lembrete1:{frase1: `Oie!, `,
frase2:"passando para lembrar do seu agendamento amanhã 🥰\n\nData: ",
frase3:`\n\nAqui vão algumas informações importantes para você: 
No dia do seu procedimento não venha com o horário apertado, pois micropigmentação é um serviço artístico, não se tem como prever o tempo que será gasto. 
Não traga crianças, pois por ser um procedimento minucioso, que requer atenção da profissional, acaba atrapalhando o trabalho, além de gerar riscos de contaminação cruzada, pois elas acabam mexendo em materiais esterilizados.
Tenha um otimo dia! ❤️`
},
//feedback
feedback:{frase1:"E aí? ",frase2:`,\nComo foi a sua experiência em Alice Mendonça? 
Sua opinião é muito importante para continuarmos a fazer melhorias em nosso atendimento!

Digite *1*- 😡 Totalmente insatisfeito 
Digite *2*- 😟 Insatisfeito 
Digite *3*- 😐 Adequado 
Digite *4*- 🙂 Satisfeito 
Digite *5*- 😁 Totalmente satisfeito`},
 feedback1:`Obrigada por nos avaliar!`,
 feedback2:`Desculpe!Não consegui entender! 😔 

Digite *1*- 😡 Totalmente insatisfeito 
Digite *2*- 😟 Insatisfeito 
Digite *3*- 😐 Adequado 
Digite *4*- 🙂 Satisfeito 
Digite *5*- 😁 Totalmente satisfeito
 `,

// <<<<<<<<<<<<<<<<<<<<<<<<< Configurações do bot >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//horario (OBS: os dias da semanan off tem que fazer de maneira manual no stage 1 por padrao esta sabado e domingo)
horarioinicio:`${horarioinicio}`,
intervaloinicio:`${intervaloinicio}`,
intervalofim:`${intervalofim}`,
horariofinal:`${horariofinal}`,
//lembrete 
lembrarminutos:1440,

//feedback
feedbackminutos:1440,

//possivil reagendar quanto tempo antes minutos
solicitareagedamento: 2880,

//possivil cancelar quanto tempo antes minutos
solicitarcancelamento: 2880,

//gatilhoooooo
desativabot:{frase1:"oi",frase2:"ola",frase3:"",frase4:""},
ativarbot:{frase1:"...",frase1:"."},
//keys
keys: {
  
}
}
module.exports = frase
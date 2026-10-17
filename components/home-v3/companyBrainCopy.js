// Pagina Company Brain (IT 14/10/2026; EN e PT dall'italiano, fonte di verità). Scritta con copywriter + humanizer. Titolo e sottotitolo: scelta di Luca.
// IT: titolo e demo restano in components/v2/copy/systems.it.js (hero, brain, meta). EN/PT: `head` qui sotto (le voci "company-brain" di systems.en/pt.js sono ancora la vecchia pagina sull'onboarding HR).
// ATTENZIONE prima di andare online: il livello «Tutto nell'UE» va confermato (fornitore e regioni) e l'intera pagina
// va letta da Arcangelo. Nessun prezzo e nessun numero in pagina: oggi non c'è un cliente reale da citare.
const IT = {
  hero: { cta: "Vedi come funziona" },
  who: {
    eyebrow: "Per chi è",
    title: "Ti riconosci?",
    items: [
      {
        icon: "contact",
        title: "Sei la persona a cui tutti chiedono tutto.",
        line: "Permessi, fatture, regole sui rimborsi: la risposta la sai tu, e ogni volta ti interrompono.",
      },
      {
        icon: "clock",
        title: "Un collega va in ferie e il lavoro si ferma.",
        line: "Quello che sa resta nella sua testa. Se manca o se ne va, manca anche quello.",
      },
      {
        icon: "doc",
        title: "I documenti ci sono, ma nessuno sa dove.",
        line: "Manuali, procedure e contratti sparsi tra cartelle, email e PDF.",
      },
    ],
    noteTitle: "Si parte dai documenti.",
    note: "Se una procedura non è scritta da nessuna parte, il Brain non ha da dove rispondere.",
  },
  work: {
    eyebrow: "Cosa facciamo noi",
    title: "Lo prepariamo noi, tu lo usi",
    lead: "La parte difficile non è il programma. È avere i documenti in ordine, risposte controllate e un archivio che resta aggiornato.",
    items: [
      {
        icon: "scan",
        title: "Mettiamo in ordine i documenti",
        line: "Leggiamo quello che hai, anche le scansioni. Togliamo duplicati e versioni vecchie e diamo a ogni documento un titolo e un'area.",
      },
      {
        icon: "shield",
        title: "Decidiamo con te chi vede cosa",
        line: "Ognuno vede solo la sua parte. Un dipendente non legge un contratto che non è suo.",
      },
      {
        icon: "check",
        title: "Lo proviamo su domande vere",
        line: "Prima di aprirlo al team facciamo le domande che fate ogni giorno e correggiamo dove sbaglia. Se non trova la risposta, lo dice invece di inventarla.",
      },
      {
        icon: "repeat",
        title: "Lo teniamo aggiornato",
        line: "I documenti nuovi entrano nell'archivio. Ogni mese vedi le domande rimaste senza risposta: sono i documenti che mancano.",
      },
    ],
  },
  data: {
    eyebrow: "I tuoi dati",
    title: "Decidi tu dove stanno i tuoi dati",
    lead: "Tre modi di averlo, in base a quanto sono riservati i tuoi documenti.",
    items: [
      {
        tag: "Il più semplice",
        title: "Nel cloud",
        line: "L'archivio sta nell'UE. Il modello che scrive la risposta lavora fuori dall'UE, con clausole contrattuali standard.",
        who: "Per procedure, manuali e listini.",
      },
      {
        tag: "Più riservato",
        title: "Tutto nell'UE",
        line: "Archivio e modello lavorano dentro l'UE: i documenti non escono dall'Europa.",
        who: "Per chi tratta dati di clienti o del personale.",
      },
      {
        tag: "Massima riservatezza",
        title: "Nei tuoi locali",
        line: "Un server tuo, con modelli che girano lì: nessuna richiesta esce dalla tua rete. Le risposte possono essere meno precise e serve un server adatto.",
        who: "Per i dati più sensibili. Su preventivo.",
      },
    ],
    note: "Prima di partire ti diciamo per iscritto quali fornitori trattano quali dati e dove. Rispettiamo il GDPR dal primo giorno.",
  },
  place: {
    eyebrow: "Come lavoriamo",
    title: "Da remoto o in sede",
    lead: "Quasi tutto si fa da remoto. La sede serve in pochi casi.",
    cols: ["Da remoto", "In sede"],
    rows: [
      {
        label: "Quando va bene",
        remote: "Cloud e tutto nell'UE. Anche il server locale, se è già collegato alla rete.",
        onsite: "Server locale con rete isolata, o se preferisci avere qualcuno in azienda.",
      },
      {
        label: "Cosa fai tu",
        remote: "Ci dai l'accesso in sola lettura ai documenti. Per il server locale, il tuo IT ci apre un accesso.",
        onsite: "Prepari il server e il posto dove metterlo.",
      },
      {
        label: "Cosa facciamo noi",
        remote: "Configuriamo, proviamo e aggiorniamo da qui.",
        onsite: "Installiamo di persona, proviamo con il tuo team e lo formiamo.",
      },
      {
        label: "Il tuo controllo",
        remote: "Accesso a tempo e registrato, che puoi revocare quando vuoi.",
        onsite: "Nessun collegamento esterno: gli aggiornamenti li portiamo noi.",
      },
    ],
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        q: "Chi vede cosa?",
        a: "Lo decidiamo insieme prima di partire. Ogni persona vede solo i documenti della sua area.",
      },
      {
        q: "Cosa succede se non trova la risposta?",
        a: "Lo dice. Non inventa, e la domanda finisce nell'elenco mensile: così sai quale documento manca.",
      },
      {
        q: "Serve un tecnico in azienda?",
        a: "No. Costruiamo, attiviamo e manteniamo tutto noi. Per il server locale ci serve solo qualcuno del tuo IT che apra l'accesso.",
      },
      {
        q: "Quello che costruite è mio?",
        a: "Sì, quello che consegniamo è tuo.",
      },
      {
        q: "E se ho già un team tecnico?",
        a: "Può costruirlo anche da solo. Il lavoro che non si improvvisa è ordinare i documenti, provare le risposte e tenerlo aggiornato: lì possiamo affiancarlo.",
      },
      {
        q: "Quanto costa e quanto ci vuole?",
        a: "Lo preventiviamo dopo aver capito come lavori e i tempi li concordiamo con te prima di iniziare. Non esiste un pacchetto standard.",
      },
    ],
  },
};

const EN = {
  head: {
    meta: {
      title: "Company Brain: AI that answers from your documents | Automis",
      description:
        "A private archive over your own documents: your team asks, it answers with the source, and you stop being the company manual. See how it works.",
    },
    hero: {
      eyebrow: "Company Brain",
      title: "Stop being your company's manual",
      highlight: "your company's manual",
      lead: "Your team asks and the archive answers, with the document it came from. We set it up, and you decide where your data lives.",
    },
    brain: {
      title: "Ask the Brain",
      caption: "Sample company and documents. Tap a question.",
      sourceLabel: "Source",
      queries: [
        {
          q: "How do I ask for a day off?",
          a: "Send the request in the HR tool. Your team lead approves it, then administration confirms.",
          sources: [{ doc: "Employee handbook", where: "Vacation and time off" }],
        },
        {
          q: "Who do I send a supplier invoice to?",
          a: "Supplier invoices go to administration. Send the PDF with the order reference and they take it from there.",
          sources: [{ doc: "Administrative procedures", where: "Supplier invoices" }],
        },
        {
          q: "Can I approve a customer refund on my own?",
          a: "Up to the standard limit, support approves it directly. Above that limit, a manager has to sign off.",
          sources: [{ doc: "Refund policy", where: "Approvals" }],
        },
      ],
    },
    cta: {
      title: "What lives in just a few people's heads today?",
      line: "Tell us where your company's information lives and we'll show you how to make it available to everyone.",
    },
    bookCall: "Book a call",
  },
  hero: { cta: "See how it works" },
  who: {
    eyebrow: "Who it's for",
    title: "Sound familiar?",
    items: [
      {
        icon: "contact",
        title: "You're the person everyone asks everything.",
        line: "Time off, invoices, refund rules: you know the answer, and you get interrupted every time.",
      },
      {
        icon: "clock",
        title: "A colleague goes on vacation and work stops.",
        line: "What they know stays in their head. If they're out or they leave, that knowledge goes with them.",
      },
      {
        icon: "doc",
        title: "The documents exist, but nobody knows where.",
        line: "Manuals, procedures and contracts scattered across folders, emails and PDFs.",
      },
    ],
    noteTitle: "We start from the documents.",
    note: "If a procedure isn't written down anywhere, the Brain has nothing to answer from.",
  },
  work: {
    eyebrow: "What we do",
    title: "We set it up, you use it",
    lead: "The hard part isn't the software. It's getting the documents in order, checking the answers and keeping the archive up to date.",
    items: [
      {
        icon: "scan",
        title: "We put your documents in order",
        line: "We read what you have, scans included. We remove duplicates and old versions and give every document a title and an area.",
      },
      {
        icon: "shield",
        title: "We decide with you who sees what",
        line: "Everyone sees only their own part. An employee can't read a contract that isn't theirs.",
      },
      {
        icon: "check",
        title: "We test it on real questions",
        line: "Before opening it to the team, we ask the questions you ask every day and fix where it gets them wrong. If it can't find the answer, it says so instead of making one up.",
      },
      {
        icon: "repeat",
        title: "We keep it up to date",
        line: "New documents go into the archive. Every month you see the questions left unanswered: those are the documents you're missing.",
      },
    ],
  },
  data: {
    eyebrow: "Your data",
    title: "You decide where your data lives",
    lead: "Three ways to run it, depending on how confidential your documents are.",
    items: [
      {
        tag: "The simplest",
        title: "In the cloud",
        line: "The archive sits in the EU. The model that writes the answer runs outside the EU, under standard contractual clauses.",
        who: "For procedures, manuals and price lists.",
      },
      {
        tag: "More confidential",
        title: "Entirely in the EU",
        line: "Archive and model both run inside the EU: your documents never leave Europe.",
        who: "For anyone handling customer or staff data.",
      },
      {
        tag: "Maximum confidentiality",
        title: "On your premises",
        line: "A server of your own, with models running on it: no request leaves your network. Answers may be less precise and you need a suitable server.",
        who: "For your most sensitive data. Quoted on request.",
      },
    ],
    note: "Before we start, we tell you in writing which providers handle which data and where. We comply with GDPR from day one.",
  },
  place: {
    eyebrow: "How we work",
    title: "Remote or on site",
    lead: "Almost everything is done remotely. On site is needed only in a few cases.",
    cols: ["Remote", "On site"],
    rows: [
      {
        label: "When it fits",
        remote: "Cloud and entirely in the EU. Also a local server, if it's already connected to the network.",
        onsite: "A local server on an isolated network, or if you'd rather have someone at your company.",
      },
      {
        label: "What you do",
        remote: "You give us read-only access to the documents. For a local server, your IT team opens an access for us.",
        onsite: "You prepare the server and the place to put it.",
      },
      {
        label: "What we do",
        remote: "We configure, test and update from here.",
        onsite: "We install in person, test with your team and train them.",
      },
      {
        label: "Your control",
        remote: "Time-limited, logged access that you can revoke whenever you want.",
        onsite: "No external connection: we bring the updates ourselves.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Who sees what?",
        a: "We decide together before we start. Each person sees only the documents in their own area.",
      },
      {
        q: "What happens if it can't find the answer?",
        a: "It says so. It doesn't make anything up, and the question goes on the monthly list, so you know which document is missing.",
      },
      {
        q: "Do I need a technical person in-house?",
        a: "No. We build, activate and maintain everything. For a local server, we only need someone from your IT team to open the access.",
      },
      {
        q: "Is what you build mine?",
        a: "Yes, what we deliver is yours.",
      },
      {
        q: "What if I already have a technical team?",
        a: "They can build it on their own too. The work you can't improvise is putting the documents in order, testing the answers and keeping it up to date: that's where we can work alongside them.",
      },
      {
        q: "How much does it cost and how long does it take?",
        a: "We quote after understanding how you work, and we agree the timeline with you before we start. There is no standard package.",
      },
    ],
  },
};

const PT = {
  head: {
    meta: {
      title: "Company Brain: a IA que responde com os ficheiros | Automis",
      description:
        "Um arquivo privado sobre os seus documentos: a equipa pergunta, a IA responde com a fonte e deixa de precisar de si como manual. Veja como funciona.",
    },
    hero: {
      eyebrow: "Company Brain",
      title: "Deixe de ser o manual da sua empresa",
      highlight: "o manual da sua empresa",
      lead: "Quem trabalha consigo pergunta e o arquivo responde, com o documento de onde vem. Preparamo-lo nós, e a decisão sobre onde ficam os dados é sua.",
    },
    brain: {
      title: "Pergunte ao Brain",
      caption: "Empresa e documentos de exemplo. Toque numa pergunta.",
      sourceLabel: "Fonte",
      queries: [
        {
          q: "Como peço um dia de folga?",
          a: "Envie o pedido na ferramenta de RH. O responsável da sua equipa aprova e depois a administração confirma.",
          sources: [{ doc: "Manual do colaborador", where: "Férias e ausências" }],
        },
        {
          q: "A quem envio a fatura de um fornecedor?",
          a: "As faturas dos fornecedores vão para a administração. Envie o PDF com a referência da encomenda e ela trata do resto.",
          sources: [{ doc: "Procedimentos administrativos", where: "Faturas de fornecedores" }],
        },
        {
          q: "Posso aprovar sozinho o reembolso a um cliente?",
          a: "Até ao limite habitual, o apoio ao cliente aprova diretamente. Acima desse limite, é preciso o responsável.",
          sources: [{ doc: "Política de reembolsos", where: "Aprovações" }],
        },
      ],
    },
    cta: {
      title: "O que fica hoje na cabeça de poucas pessoas?",
      line: "Conte-nos onde estão as informações da sua empresa e mostramos-lhe como torná-las acessíveis a todos.",
    },
    bookCall: "Agende uma chamada",
  },
  hero: { cta: "Veja como funciona" },
  who: {
    eyebrow: "Para quem é",
    title: "Reconhece-se?",
    items: [
      {
        icon: "contact",
        title: "É a pessoa a quem todos perguntam tudo.",
        line: "Licenças, faturas, regras de reembolso: sabe a resposta e interrompem-no de cada vez.",
      },
      {
        icon: "clock",
        title: "Um colega vai de férias e o trabalho para.",
        line: "O que ele sabe fica na cabeça dele. Se falta ou se vai embora, esse conhecimento vai com ele.",
      },
      {
        icon: "doc",
        title: "Os documentos existem, mas ninguém sabe onde.",
        line: "Manuais, procedimentos e contratos espalhados por pastas, emails e PDF.",
      },
    ],
    noteTitle: "Começamos pelos documentos.",
    note: "Se um procedimento não está escrito em lado nenhum, o Brain não tem de onde responder.",
  },
  work: {
    eyebrow: "O que fazemos",
    title: "Preparamo-lo nós, a si cabe usá-lo",
    lead: "A parte difícil não é o programa. É ter os documentos em ordem, respostas verificadas e um arquivo que se mantém atualizado.",
    items: [
      {
        icon: "scan",
        title: "Pomos os documentos em ordem",
        line: "Lemos o que tem, incluindo as digitalizações. Retiramos duplicados e versões antigas e damos a cada documento um título e uma área.",
      },
      {
        icon: "shield",
        title: "Decidimos consigo quem vê o quê",
        line: "Cada pessoa vê apenas a sua parte. Um colaborador não lê um contrato que não é seu.",
      },
      {
        icon: "check",
        title: "Testamo-lo com perguntas reais",
        line: "Antes de o abrir à equipa, fazemos as perguntas que vocês fazem todos os dias e corrigimos onde falha. Se não encontra a resposta, diz que não sabe em vez de a inventar.",
      },
      {
        icon: "repeat",
        title: "Mantemo-lo atualizado",
        line: "Os documentos novos entram no arquivo. Todos os meses vê as perguntas que ficaram sem resposta: são os documentos que faltam.",
      },
    ],
  },
  data: {
    eyebrow: "Os seus dados",
    title: "Os seus dados ficam onde decidir",
    lead: "Três formas de o ter, consoante a confidencialidade dos seus documentos.",
    items: [
      {
        tag: "A mais simples",
        title: "Na cloud",
        line: "O arquivo fica na UE. O modelo que escreve a resposta trabalha fora da UE, com cláusulas contratuais-tipo.",
        who: "Para procedimentos, manuais e tabelas de preços.",
      },
      {
        tag: "Mais reservado",
        title: "Tudo na UE",
        line: "Arquivo e modelo trabalham dentro da UE: os documentos não saem da Europa.",
        who: "Para quem trata dados de clientes ou de pessoal.",
      },
      {
        tag: "Máxima confidencialidade",
        title: "Nas suas instalações",
        line: "Um servidor seu, com modelos a correr lá: nenhum pedido sai da sua rede. As respostas podem ser menos precisas e é preciso um servidor adequado.",
        who: "Para os dados mais sensíveis. Sob orçamento.",
      },
    ],
    note: "Antes de começar, dizemos-lhe por escrito que fornecedores tratam que dados e onde. Cumprimos o RGPD desde o primeiro dia.",
  },
  place: {
    eyebrow: "Como trabalhamos",
    title: "À distância ou no local",
    lead: "Quase tudo se faz à distância. A presença no local só é necessária em poucos casos.",
    cols: ["À distância", "No local"],
    rows: [
      {
        label: "Quando serve",
        remote: "Cloud e tudo na UE. Também o servidor local, se já estiver ligado à rede.",
        onsite: "Servidor local com rede isolada, ou se preferir ter alguém na empresa.",
      },
      {
        label: "O que fica a seu cargo",
        remote: "Dá-nos acesso só de leitura aos documentos. Para o servidor local, a sua equipa de informática abre-nos um acesso.",
        onsite: "Prepara o servidor e o sítio onde o colocar.",
      },
      {
        label: "O que fazemos nós",
        remote: "Configuramos, testamos e atualizamos daqui.",
        onsite: "Instalamos presencialmente, testamos com a sua equipa e formamo-la.",
      },
      {
        label: "O seu controlo",
        remote: "Acesso com prazo e registado, que pode revogar quando quiser.",
        onsite: "Nenhuma ligação externa: as atualizações levamo-las nós.",
      },
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        q: "Quem vê o quê?",
        a: "Decidimos em conjunto antes de começar. Cada pessoa vê apenas os documentos da sua área.",
      },
      {
        q: "O que acontece se não encontrar a resposta?",
        a: "Diz que não sabe. Não inventa, e a pergunta vai para a lista mensal: assim fica a saber que documento falta.",
      },
      {
        q: "Preciso de um técnico na empresa?",
        a: "Não. Construímos, ativamos e mantemos tudo nós. Para o servidor local, só precisamos de alguém da sua equipa de informática que abra o acesso.",
      },
      {
        q: "O que constroem é meu?",
        a: "Sim, o que entregamos é seu.",
      },
      {
        q: "E se já tiver uma equipa técnica?",
        a: "Pode construí-lo sozinha. O trabalho que não se improvisa é pôr os documentos em ordem, testar as respostas e mantê-lo atualizado: aí podemos acompanhá-la.",
      },
      {
        q: "Quanto custa e quanto tempo demora?",
        a: "Orçamentamos depois de perceber como trabalha e combinamos consigo os prazos antes de começar. Não existe um pacote standard.",
      },
    ],
  },
};

export const CB_BY_LOCALE = { it: IT, en: EN, pt: PT };

/** Testi della pagina nella lingua `locale` (it | en | pt); una lingua sconosciuta cade sull'inglese. */
export function getCB(locale) {
  return CB_BY_LOCALE[locale] || EN;
}

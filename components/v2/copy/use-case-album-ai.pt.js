/* Caso Album AI (PT, pt-PT). Stessa struttura e stessi numeri dell'IT (fonte): 1.200-1.800 scatti, circa 280 foto, circa 6 ore a mano
   contro circa 50 minuti con il sistema (tempi dichiarati dallo studio, non misurati). Percorso: /use-cases/album-ai.
   Scritta pensando in portoghese europeo, non tradotta dall'inglese. */
export default {
  meta: {
    title: "Album AI: de 6 horas a 50 minutos por álbum | Automis",
    description:
      "O Album AI escolhe as fotografias e faz a paginação do álbum para um estúdio fotográfico: de cerca de 6 horas para cerca de 50 minutos, revisão incluída. Tempos indicados pelo estúdio.",
  },

  hero: {
    eyebrow: "Caso de estudo",
    title: "Um álbum em cerca de 50 minutos, não em 6 horas",
    highlight: "cerca de 50 minutos",
    lead: "O Album AI escolhe as fotografias e faz a paginação do álbum do fotógrafo. Ele revê e corrige, e o sistema aprende com as correções.",
    client: "Estúdio fotográfico Simone Casillo",
    logo: "/assets/images/client-logos/simone-casillo-white.png",
    tag: "Ferramenta de álbuns",
  },

  flow: {
    title: "O que o sistema faz",
    from: { figure: "De 1.200 a 1.800", label: "fotografias de um evento entram no sistema" },
    to: { figure: "Cerca de 280", label: "fotografias que o sistema escolhe" },
    then: "Depois, o sistema faz a paginação do álbum.",
  },

  scene: {
    title: "Como trabalha o sistema",
    lead: "Das fotografias do evento ao álbum, com o fotógrafo a ter a última palavra.",
    note: "As fotografias são imagens de exemplo.",
    label: "Animação: as fotografias do evento chegam, o sistema descarta as desfocadas, repetidas ou com os olhos fechados, fica com as melhores e faz a paginação num álbum a sério, pronto a imprimir; o fotógrafo troca uma fotografia, o sistema aprende e as páginas folheiam-se.",
    photos: ["sposi-coriandoli", "bouquet-luce", "sposi-palloncini", "fedi-mani", "tavolo", "mani-bouquet", "famiglia-tramonto", "fedi-peonie", "sedie-prato", "ritratto"].map(
      (n) => `/media/use-cases/album-ai/photos/${n}.jpg`
    ),
    steps: [
      "Chegam as fotografias do evento: de 1.200 a 1.800",
      "O sistema analisa-as: desfocadas, repetidas, olhos fechados",
      "Ficam cerca de 280 fotografias",
      "Faz a paginação no álbum",
      "O fotógrafo revê e o sistema aprende",
      "O álbum está pronto a imprimir",
    ],
  },

  time: {
    title: "Antes e depois",
    lead: "O tempo de um álbum de eventos, antes à mão e agora com o sistema.",
    before: {
      label: "À mão",
      figure: "Cerca de 6 horas",
      bar: 100,
      rows: [
        ["Escolha das fotografias", "cerca de 3 horas"],
        ["Paginação", "2 a 3 horas"],
      ],
    },
    after: {
      label: "Com o Album AI",
      figure: "Cerca de 50 minutos",
      bar: 14,
      badge: "Mais de 80% menos de tempo",
      line: "O sistema faz o trabalho demorado. Ao fotógrafo resta a revisão.",
      rows: [
        ["Escolha das fotografias", "cerca de 20 minutos"],
        ["Paginação", "cerca de 15 minutos"],
        ["Revisão do fotógrafo", "cerca de 15 minutos"],
      ],
    },
  },

  online: {
    title: "Online de raiz, em três peças",
    lead: "Para o estúdio fotográfico construímos os álbuns, o site e o CRM.",
    site: {
      status: "Online",
      title: "O site",
      line: "O site do estúdio, com marcação por WhatsApp: escolhe-se o estúdio e o dia entre as datas disponíveis, e a mensagem sai já preenchida.",
      features: ["Marcação por WhatsApp", "Datas e dias de cada estúdio", "Três fórmulas com preços", "Dois estúdios com mapa", "Galerias e fotografias de Natal"],
      cta: "Ir para o site",
      url: "https://simonecasillo.com",
      links: [
        { label: "Início", href: "https://simonecasillo.com/" },
        { label: "Fotografias de Natal", href: "https://simonecasillo.com/natale/" },
      ],
      shots: [
        { src: "/media/use-cases/album-ai/sito-home.jpg", alt: "A página inicial do site do estúdio num computador", kind: "desktop" },
        { src: "/media/use-cases/album-ai/sito-mobile.jpg", alt: "A página inicial do site do estúdio num telemóvel", kind: "mobile" },
      ],
      note: "Fotografias provisórias, à espera das imagens do estúdio.",
    },
    items: [
      { title: "Album AI", line: "Escolhe as fotografias e faz a paginação do álbum, com o fotógrafo a rever.", status: "Em uso" },
      { title: "O CRM", line: "Pedidos e clientes num só sítio, do primeiro contacto à entrega do álbum.", status: "Em entrega" },
    ],
  },

  cta: {
    title: "É fotógrafo? Experimente o Album AI no seu estúdio",
    line: "Menos horas nos álbuns, entregas mais rápidas, mais tempo para os clientes. Se faz casamentos, festas de 18 anos ou cerimónias e passa horas a escolher e a paginar, conte-nos como trabalha: vemos juntos se é para si.",
  },
};

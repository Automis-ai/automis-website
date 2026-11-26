// utility/toolsData.js
//
// Central registry for the free /tools section. One entry per tool holds all
// EN + IT + PT copy and SEO, so page files stay thin (they just read from here).
// Keep copy free of em/en dashes; Italian follows house rules (IA not AI,
// "assistente vocale", informal "tu"). Portuguese is European (pt-PT), formal
// register, "IA" not "AI", "assistente de voz", vocab: utilizador, telemóvel,
// ecrã, contacto, receção, equipa, gerir, marcação, chamada perdida, avaliação.

export const SITE = "https://automis.ai";

// ctaTarget: "booking" -> external calendar via getCtaHref; "voiceai" -> the VoiceAI page.
export const TOOLS = {
  "missed-call-calculator": {
    key: "missed-call-calculator",
    widget: "MissedCallCalculator",
    icon: "📞", // 📞
    ctaTarget: "booking",
    slug: { en: "missed-call-revenue-calculator", it: "calcolatore-chiamate-perse", pt: "calculadora-chamadas-perdidas" },
    en: {
      name: "Missed-Call Revenue Calculator",
      metaTitle: "Missed-Call Revenue Calculator: What Missed Calls Cost You | Automis",
      metaDescription:
        "Free calculator: estimate the revenue your business loses to missed calls every month, and how much an AI receptionist could win back. No signup.",
      keywords: [
        "missed call revenue calculator",
        "cost of missed calls",
        "missed call calculator",
        "how much do missed calls cost",
        "AI receptionist ROI",
      ],
      h1: "Missed-Call Revenue Calculator",
      intro:
        "Every unanswered call can be a booking that never happens. Enter your numbers to see, in seconds, how much revenue slips away each month, and how much an AI receptionist that answers 24/7 could win back.",
      why: [
        "Most local businesses miss far more calls than they think: after hours, during busy periods, and while staff are with customers. Each missed call is a prospect who often just calls the next business on the list.",
        "This calculator turns that invisible leak into a number. Multiply the calls you miss by your average customer value and close rate, and you get a monthly and yearly figure you can act on.",
        "Automis VoiceAI answers every call 24/7, qualifies the caller, and books the appointment straight into your calendar, so most of that lost revenue is recovered instead of walking away.",
      ],
      faqs: [
        { q: "How is lost revenue calculated?", a: "We multiply your missed calls per month by your average customer value and your typical close rate. It is an estimate to size the opportunity, not an exact accounting figure." },
        { q: "What counts as a missed call?", a: "Any inbound call your business does not answer live: after hours, weekends, holidays, or when everyone is already busy on another call or with a customer." },
        { q: "Can an AI receptionist really recover these?", a: "An AI voice agent answers instantly, around the clock, so calls that used to go to voicemail (or to a competitor) get handled and booked. It will not recover every single one, but it closes most of the gap." },
      ],
      cta: { label: "Book a call to stop the leak", sub: "15 minutes, no commitment" },
    },
    it: {
      name: "Calcolatore delle chiamate perse",
      metaTitle: "Calcolatore chiamate perse: quanto ti costano davvero | Automis",
      metaDescription:
        "Calcolatore gratuito: scopri quanto fatturato perdi ogni mese per le chiamate senza risposta e quanto recuperi con un assistente vocale IA.",
      keywords: [
        "calcolatore chiamate perse",
        "quanto costano le chiamate perse",
        "chiamate senza risposta",
        "assistente vocale IA",
        "segretaria IA",
      ],
      h1: "Calcolatore delle chiamate perse",
      intro:
        "Ogni chiamata senza risposta puo' essere un appuntamento che non si prenota. Inserisci i tuoi numeri e scopri in pochi secondi quanto fatturato perdi ogni mese e quanto potresti recuperare con un assistente vocale IA che risponde 24 ore su 24.",
      why: [
        "La maggior parte delle attivita' locali perde molte piu' chiamate di quanto immagina: fuori orario, nei momenti di punta e mentre lo staff e' con i clienti. Ogni chiamata persa e' spesso un cliente che chiama semplicemente l'attivita' successiva.",
        "Questo calcolatore trasforma quella perdita invisibile in un numero. Moltiplica le chiamate che perdi per il valore medio di un cliente e per il tuo tasso di conversione, e ottieni una cifra mensile e annuale su cui agire.",
        "L'assistente vocale IA di Automis risponde a ogni chiamata 24 ore su 24, qualifica chi chiama e fissa l'appuntamento direttamente in agenda, cosi' recuperi gran parte di quel fatturato invece di lasciarlo andare.",
      ],
      faqs: [
        { q: "Come si calcola il fatturato perso?", a: "Moltiplichiamo le chiamate perse al mese per il valore medio di un cliente e per il tuo tasso di conversione tipico. E' una stima per dimensionare l'opportunita', non un dato contabile preciso." },
        { q: "Cosa si intende per chiamata persa?", a: "Qualsiasi chiamata in entrata a cui non rispondi dal vivo: fuori orario, nei weekend, nei giorni di chiusura o quando sei gia' occupato con un'altra chiamata o con un cliente." },
        { q: "Un assistente vocale IA puo' davvero recuperarle?", a: "Un agente vocale IA risponde subito, a qualsiasi ora, quindi le chiamate che finivano in segreteria (o a un concorrente) vengono gestite e prenotate. Non le recupera tutte, ma copre gran parte del divario." },
      ],
      cta: { label: "Prenota una call per fermare la perdita", sub: "15 minuti, nessun impegno" },
    },
    pt: {
      name: "Calculadora de chamadas perdidas",
      metaTitle: "Calculadora de chamadas perdidas: quanto lhe custam mesmo | Automis",
      metaDescription:
        "Calculadora gratuita: veja quanta faturação perde por mês com as chamadas sem resposta e quanto pode recuperar com um assistente de voz IA.",
      keywords: [
        "calculadora de chamadas perdidas",
        "quanto custam as chamadas perdidas",
        "chamadas sem resposta",
        "assistente de voz IA",
        "rececionista IA",
      ],
      h1: "Calculadora de chamadas perdidas",
      intro:
        "Cada chamada sem resposta pode ser uma marcação que nunca acontece. Introduza os seus números e descubra, em segundos, quanto faturação perde todos os meses e quanto poderia recuperar com um assistente de voz IA que atende 24 horas por dia.",
      why: [
        "A maioria dos negócios locais perde muito mais chamadas do que imagina: fora de horas, nos períodos de maior movimento e enquanto a equipa está a atender clientes. Cada chamada perdida é, muitas vezes, um cliente que simplesmente liga para o negócio seguinte da lista.",
        "Esta calculadora transforma essa perda invisível num número. Multiplique as chamadas que perde pelo valor médio de um cliente e pela sua taxa de conversão, e obtém um valor mensal e anual sobre o qual pode agir.",
        "O assistente de voz da Automis atende todas as chamadas 24 horas por dia, qualifica quem liga e marca a consulta diretamente na sua agenda, para que grande parte dessa faturação perdida seja recuperada em vez de se perder.",
      ],
      faqs: [
        { q: "Como é calculada a faturação perdida?", a: "Multiplicamos as suas chamadas perdidas por mês pelo valor médio de um cliente e pela sua taxa de conversão habitual. É uma estimativa para dimensionar a oportunidade, não um valor contabilístico exato." },
        { q: "O que conta como chamada perdida?", a: "Qualquer chamada recebida que o seu negócio não atende ao vivo: fora de horas, aos fins de semana, em dias de fecho ou quando já está ocupado com outra chamada ou com um cliente." },
        { q: "Um assistente de voz IA consegue mesmo recuperá-las?", a: "Um agente de voz IA atende de imediato, a qualquer hora, por isso as chamadas que iam para o atendedor de chamadas (ou para um concorrente) passam a ser tratadas e marcadas. Não recupera todas, mas cobre grande parte da diferença." },
      ],
      cta: { label: "Agende uma chamada para travar a perda", sub: "15 minutos, sem compromisso" },
    },
  },

  "no-show-calculator": {
    key: "no-show-calculator",
    widget: "NoShowCalculator",
    icon: "📅", // 📅
    ctaTarget: "booking",
    slug: { en: "no-show-cost-calculator", it: "calcolatore-appuntamenti-mancati", pt: "calculadora-faltas-consultas" },
    en: {
      name: "No-Show Cost Calculator",
      metaTitle: "No-Show Cost Calculator for Clinics and Salons | Automis",
      metaDescription:
        "Free calculator: see how much revenue no-shows cost your clinic or practice each month, and how automated reminders cut them. No signup.",
      keywords: [
        "no-show cost calculator",
        "cost of no-shows",
        "reduce no-shows",
        "appointment no-show calculator",
        "clinic no-shows",
      ],
      h1: "No-Show Cost Calculator",
      intro:
        "No-shows quietly drain a booked calendar. Enter a few numbers to see what missed appointments cost you each month, and how much automated reminders and confirmations could save.",
      why: [
        "For clinics, salons, and practices, a no-show is a slot that can rarely be refilled at short notice. The chair sits empty, the staff time is paid, and the revenue is simply gone.",
        "Seeing the monthly and yearly cost in euros makes it obvious why reminders and confirmations are worth automating rather than leaving to a busy front desk.",
        "Automis VoiceAI confirms appointments, sends reminders, and lets clients reschedule by voice, so fewer slots go empty and your calendar stays full.",
      ],
      faqs: [
        { q: "How is the no-show cost estimated?", a: "We multiply your appointments per week by your no-show rate and your average appointment value, then project it across the month and year." },
        { q: "How much can reminders reduce no-shows?", a: "It varies by sector, but automated reminders and easy rescheduling typically cut no-shows meaningfully. Use the result as a conservative sizing of the opportunity." },
        { q: "Does this work for any appointment business?", a: "Yes. Dental and medical practices, salons, and any service that books time slots can use it to size the cost of empty chairs." },
      ],
      cta: { label: "Book a call to cut no-shows", sub: "15 minutes, no commitment" },
    },
    it: {
      name: "Calcolatore degli appuntamenti mancati",
      metaTitle: "Calcolatore costo appuntamenti mancati per studi e cliniche | Automis",
      metaDescription:
        "Calcolatore gratuito: scopri quanto ti costano ogni mese gli appuntamenti mancati e quanto risparmi con promemoria e conferme automatiche.",
      keywords: [
        "calcolatore appuntamenti mancati",
        "costo no-show",
        "ridurre i no-show",
        "appuntamenti mancati studio dentistico",
        "promemoria appuntamenti IA",
      ],
      h1: "Calcolatore degli appuntamenti mancati",
      intro:
        "Gli appuntamenti mancati svuotano in silenzio un'agenda piena. Inserisci pochi numeri e scopri quanto ti costano ogni mese e quanto potresti risparmiare con promemoria e conferme automatiche.",
      why: [
        "Per studi, cliniche e saloni, un appuntamento mancato e' uno slot che raramente si riempie all'ultimo minuto. La poltrona resta vuota, il tempo dello staff e' comunque pagato e il fatturato e' perso.",
        "Vedere il costo mensile e annuale in euro rende evidente perche' conviene automatizzare promemoria e conferme invece di lasciarli a una reception gia' impegnata.",
        "L'assistente vocale IA di Automis conferma gli appuntamenti, invia promemoria e permette ai clienti di spostare la prenotazione a voce, cosi' meno slot restano vuoti e la tua agenda resta piena.",
      ],
      faqs: [
        { q: "Come si stima il costo degli appuntamenti mancati?", a: "Moltiplichiamo gli appuntamenti a settimana per la percentuale di no-show e per il valore medio di un appuntamento, poi proiettiamo il dato su mese e anno." },
        { q: "Di quanto si possono ridurre i no-show?", a: "Dipende dal settore, ma promemoria automatici e la possibilita' di riprogrammare facilmente riducono i no-show in modo significativo. Usa il risultato come stima prudente dell'opportunita'." },
        { q: "Funziona per qualsiasi attivita' su appuntamento?", a: "Si'. Studi dentistici e medici, saloni e qualsiasi servizio che prenota per fasce orarie possono usarlo per quantificare il costo delle poltrone vuote." },
      ],
      cta: { label: "Prenota una call per ridurre i no-show", sub: "15 minuti, nessun impegno" },
    },
    pt: {
      name: "Calculadora de faltas às consultas",
      metaTitle: "Calculadora de custo das faltas às consultas para clínicas e salões | Automis",
      metaDescription:
        "Calculadora gratuita: veja quanto lhe custam por mês as faltas às consultas e quanto pode poupar com lembretes e confirmações automáticas.",
      keywords: [
        "calculadora de faltas às consultas",
        "custo das faltas",
        "reduzir faltas às consultas",
        "faltas em clínica dentária",
        "lembretes de marcações IA",
      ],
      h1: "Calculadora de faltas às consultas",
      intro:
        "As faltas às consultas esvaziam em silêncio uma agenda cheia. Introduza alguns números e descubra quanto lhe custam todos os meses e quanto poderia poupar com lembretes e confirmações automáticas.",
      why: [
        "Para clínicas, salões e consultórios, uma falta é um horário que raramente se volta a preencher em cima da hora. A cadeira fica vazia, o tempo da equipa é pago à mesma e a faturação perde-se.",
        "Ver o custo mensal e anual em euros torna evidente porque compensa automatizar lembretes e confirmações, em vez de os deixar a cargo de uma receção já ocupada.",
        "O assistente de voz da Automis confirma as marcações, envia lembretes e permite aos clientes remarcar por voz, para que menos horários fiquem vazios e a sua agenda se mantenha cheia.",
      ],
      faqs: [
        { q: "Como é estimado o custo das faltas?", a: "Multiplicamos as suas consultas por semana pela percentagem de faltas e pelo valor médio de uma consulta, e depois projetamos o valor para o mês e para o ano." },
        { q: "Quanto podem os lembretes reduzir as faltas?", a: "Depende do setor, mas os lembretes automáticos e a possibilidade de remarcar com facilidade reduzem as faltas de forma significativa. Use o resultado como uma estimativa prudente da oportunidade." },
        { q: "Funciona para qualquer negócio por marcação?", a: "Sim. Clínicas dentárias e médicas, salões e qualquer serviço que trabalhe por horários pode utilizá-la para dimensionar o custo das cadeiras vazias." },
      ],
      cta: { label: "Agende uma chamada para reduzir as faltas", sub: "15 minutos, sem compromisso" },
    },
  },

  "google-review-link-generator": {
    key: "google-review-link-generator",
    widget: "ReviewLinkGenerator",
    icon: "⭐", // ⭐
    ctaTarget: "voiceai",
    slug: { en: "google-review-link-generator", it: "generatore-link-recensioni-google", pt: "gerador-link-avaliacoes-google" },
    en: {
      name: "Google Review Link Generator",
      metaTitle: "Google Review Link Generator and QR Code (Free, Printable) | Automis",
      metaDescription:
        "Get your Google review link in seconds: paste your Place ID, copy the direct link, then download or print a Google review QR code card. Free, no signup.",
      keywords: [
        "google review link generator",
        "google review qr code",
        "direct google review link",
        "get more google reviews",
        "review link generator",
      ],
      h1: "Google Review Link Generator and QR Code",
      intro:
        "Make your Google review link in three steps: find your Place ID, paste it below, copy the link. You also get a Google review QR code and a printable card to put at the counter, so happy customers can review you in one scan.",
      why: [
        "The fewer taps between a happy customer and the review form, the more reviews you collect. A direct write-a-review link skips the search and opens the box straight away.",
        "Reviews are one of the strongest local ranking and trust signals, so a steady flow of them lifts both your map-pack position and your conversion rate.",
        "Print the QR on a card at reception, add the link to a follow-up message, and ask right after a great visit. Automis VoiceAI can send the review link automatically after each appointment, so asking becomes hands-free.",
      ],
      faqs: [
        { q: "How do I get a Google review link?", a: "Find your Google Place ID with Google's free Place ID Finder, paste it into the field above, and the tool builds your direct write-a-review link. Copy it and share it by text, email or on your site." },
        { q: "How do I make a Google review QR code?", a: "Paste your Place ID and the QR code appears under your link. Download it as a PNG, or add your business name and print the ready-made card." },
        { q: "Can I print the QR code?", a: "Yes. Use the print button on the card below your link. It prints a simple card with the QR code and a short line asking for a review, ready for a counter or a receipt." },
        { q: "Where do I find my Google Place ID?", a: "Use Google's free Place ID Finder, linked above the field. Search your business name and copy the Place ID it shows." },
        { q: "Is the review link safe to share?", a: "Yes. It simply opens the standard Google review box for your business. Nothing is stored and everything runs in your browser." },
        { q: "Can I automate review requests?", a: "Yes. Automis VoiceAI and our automations can send this link by SMS or WhatsApp right after each visit, so your review flow runs on autopilot." },
      ],
      cta: { label: "Automate your review requests", sub: "See how VoiceAI does it" },
    },
    it: {
      name: "Generatore di link e QR per recensioni Google",
      metaTitle: "Link recensioni Google e QR code: generatore gratuito da stampare | Automis",
      metaDescription:
        "Crea il link per le recensioni Google in pochi secondi: incolla il Place ID, copia il link diretto e scarica o stampa il QR code per le recensioni. Gratis, senza registrazione.",
      keywords: [
        "generatore link recensioni google",
        "qr code recensioni google",
        "link diretto recensione google",
        "ottenere piu' recensioni google",
        "link recensioni",
      ],
      h1: "Link recensioni Google e QR code: il generatore",
      intro:
        "Crea il link per le recensioni Google in tre passaggi: trova il Place ID, incollalo qui sotto, copia il link. Ottieni anche il QR code per le recensioni Google e un cartoncino da stampare per il bancone, cosi' un cliente soddisfatto ti recensisce con un'inquadratura.",
      why: [
        "Meno passaggi ci sono tra un cliente soddisfatto e il modulo di recensione, piu' recensioni raccogli. Un link diretto salta la ricerca e apre subito il riquadro.",
        "Le recensioni sono uno dei segnali di fiducia e di posizionamento locale piu' forti, quindi un flusso costante migliora sia la posizione nel pacchetto mappe sia il tasso di conversione.",
        "Stampa il QR su un cartoncino alla reception, aggiungi il link a un messaggio di follow-up e chiedi subito dopo una bella visita. L'assistente vocale IA di Automis puo' inviare il link automaticamente dopo ogni appuntamento.",
      ],
      faqs: [
        { q: "Come si crea il link per le recensioni Google?", a: "Trova il Place ID con lo strumento gratuito Place ID Finder di Google, incollalo nel campo qui sopra e lo strumento crea il link diretto per scrivere una recensione. Copialo e mandalo per messaggio, email o mettilo sul sito." },
        { q: "Come si fa il QR code per le recensioni Google?", a: "Incolla il Place ID e il QR code compare sotto il link. Scaricalo in PNG oppure scrivi il nome della tua attivita' e stampa il cartoncino gia' pronto." },
        { q: "Posso stampare il QR code?", a: "Si'. Usa il pulsante di stampa sul cartoncino sotto il link: stampa un cartoncino semplice con il QR code e una frase che chiede una recensione, pronto per il bancone o lo scontrino." },
        { q: "Dove trovo il mio Place ID di Google?", a: "Usa lo strumento gratuito Place ID Finder di Google, linkato sopra il campo. Cerca il nome della tua attivita' e copia il Place ID che appare." },
        { q: "Il link per le recensioni e' sicuro da condividere?", a: "Si'. Apre semplicemente il modulo standard di recensione Google per la tua attivita'. Non salviamo nulla e tutto avviene nel tuo browser." },
        { q: "Posso automatizzare le richieste di recensione?", a: "Si'. L'assistente vocale IA di Automis e le nostre automazioni possono inviare questo link via SMS o WhatsApp subito dopo ogni visita." },
      ],
      cta: { label: "Automatizza le richieste di recensione", sub: "Scopri come lo fa l'assistente vocale IA" },
    },
    pt: {
      name: "Gerador de link e QR para avaliações Google",
      metaTitle: "Link de avaliações Google e QR code: gerador gratuito para imprimir | Automis",
      metaDescription:
        "Crie o link de avaliações Google em segundos: cole o Place ID, copie o link direto e descarregue ou imprima o QR code. Grátis, sem registo.",
      keywords: [
        "gerador de link para avaliações google",
        "qr code avaliações google",
        "link direto avaliação google",
        "obter mais avaliações google",
        "gerador de link de avaliações",
      ],
      h1: "Link de avaliações Google e QR code: o gerador",
      intro:
        "Crie o link de avaliações Google em três passos: encontre o Place ID, cole-o abaixo e copie o link. Recebe também o QR code e um cartão para imprimir e pôr no balcão, para que um cliente satisfeito o avalie com uma leitura.",
      why: [
        "Quantos menos toques houver entre um cliente satisfeito e o formulário de avaliação, mais avaliações recolhe. Um link direto salta a pesquisa e abre logo a caixa de avaliação.",
        "As avaliações são um dos sinais de confiança e de posicionamento local mais fortes, por isso um fluxo constante melhora tanto a sua posição no mapa como a sua taxa de conversão.",
        "Imprima o QR num cartão na receção, junte o link a uma mensagem de follow-up e peça logo a seguir a uma boa visita. O assistente de voz da Automis pode enviar o link de avaliação automaticamente após cada consulta, para que pedir seja algo automático.",
      ],
      faqs: [
        { q: "Como se cria o link de avaliações Google?", a: "Encontre o Place ID com o Place ID Finder gratuito do Google, cole-o no campo acima e a ferramenta cria o link direto para escrever uma avaliação. Copie-o e envie-o por mensagem ou email, ou ponha-o no site." },
        { q: "Como se faz o QR code das avaliações Google?", a: "Cole o Place ID e o QR code aparece por baixo do link. Descarregue-o em PNG ou escreva o nome do seu negócio e imprima o cartão já pronto." },
        { q: "Posso imprimir o QR code?", a: "Sim. Use o botão de impressão no cartão por baixo do link: imprime um cartão simples com o QR code e uma frase a pedir uma avaliação, pronto para o balcão ou para o talão." },
        { q: "Onde encontro o meu Place ID do Google?", a: "Use o Place ID Finder gratuito da Google, com ligação acima do campo. Pesquise o nome do seu negócio e copie o Place ID que aparece." },
        { q: "O link de avaliação é seguro de partilhar?", a: "Sim. Abre simplesmente o formulário padrão de avaliação Google do seu negócio. Não guardamos nada e tudo acontece no seu browser." },
        { q: "Posso automatizar os pedidos de avaliação?", a: "Sim. O assistente de voz da Automis e as nossas automações podem enviar este link por SMS ou WhatsApp logo após cada visita, para que o seu fluxo de avaliações funcione em piloto automático." },
      ],
      cta: { label: "Automatize os seus pedidos de avaliação", sub: "Veja como o assistente de voz IA o faz" },
    },
  },

  "whatsapp-link-generator": {
    key: "whatsapp-link-generator",
    widget: "WhatsAppLinkGenerator",
    icon: "💬", // 💬
    ctaTarget: "voiceai",
    slug: { en: "whatsapp-link-generator", it: "generatore-link-whatsapp", pt: "gerador-link-whatsapp" },
    en: {
      name: "WhatsApp Link Generator",
      metaTitle: "Free WhatsApp Link and Click-to-Call Generator | Automis",
      metaDescription:
        "Create a wa.me WhatsApp link with a pre-filled message, a click-to-call link, and a QR code. Free, runs in your browser, no signup.",
      keywords: [
        "whatsapp link generator",
        "wa.me link generator",
        "click to chat whatsapp",
        "whatsapp qr code",
        "click to call link",
      ],
      h1: "WhatsApp Link and Click-to-Call Generator",
      intro:
        "Let customers reach you in one tap. Enter your number to create a WhatsApp chat link with a ready message, a click-to-call link, and a QR code for print or web.",
      why: [
        "In Italy and across Europe, customers reach for WhatsApp before email. A one-tap chat link on your site, bio, or flyer removes the friction of saving a number first.",
        "Add the click-to-call link to your Google Business Profile and ads so mobile users dial you instantly, and drop the QR on printed material to bridge offline to chat.",
        "When the volume grows, Automis VoiceAI and chat automations answer and qualify those conversations 24/7, so a busy line or inbox never means a lost customer.",
      ],
      faqs: [
        { q: "What is a wa.me link?", a: "It is WhatsApp's official link format. Opening it starts a chat with your number, optionally with a message already typed in, on phone or desktop." },
        { q: "Do I need a WhatsApp Business account?", a: "No. The link works with any WhatsApp number. A Business profile just adds extras like a catalog and quick replies." },
        { q: "Where should I use these links?", a: "Your website, Instagram and Google profiles, email signature, ads, and printed material via the QR code. Anywhere a customer might want to reach you." },
      ],
      cta: { label: "Never miss a chat or call again", sub: "See how VoiceAI handles it" },
    },
    it: {
      name: "Generatore di link WhatsApp e click-to-call",
      metaTitle: "Generatore gratuito di link WhatsApp e click-to-call | Automis",
      metaDescription:
        "Crea un link WhatsApp wa.me con messaggio gia' pronto, un link click-to-call e un QR code. Gratis, funziona nel browser, senza registrazione.",
      keywords: [
        "generatore link whatsapp",
        "link wa.me",
        "click to chat whatsapp",
        "qr code whatsapp",
        "link click to call",
      ],
      h1: "Generatore di link WhatsApp e click-to-call",
      intro:
        "Fatti raggiungere con un tocco. Inserisci il tuo numero per creare un link chat WhatsApp con messaggio gia' pronto, un link click-to-call e un QR code per stampa o web.",
      why: [
        "In Italia e in Europa i clienti usano WhatsApp prima dell'email. Un link chat con un tocco sul sito, in bio o su un volantino elimina l'attrito di dover prima salvare il numero.",
        "Aggiungi il link click-to-call al profilo Google e agli annunci cosi' chi e' da mobile ti chiama subito, e metti il QR sul materiale stampato per collegare l'offline alla chat.",
        "Quando il volume cresce, l'assistente vocale IA di Automis e le automazioni di chat rispondono e qualificano queste conversazioni 24 ore su 24, cosi' una linea occupata non e' mai un cliente perso.",
      ],
      faqs: [
        { q: "Cos'e' un link wa.me?", a: "E' il formato ufficiale dei link di WhatsApp. Aprendolo si avvia una chat con il tuo numero, se vuoi con un messaggio gia' scritto, da telefono o desktop." },
        { q: "Serve un account WhatsApp Business?", a: "No. Il link funziona con qualsiasi numero WhatsApp. Un profilo Business aggiunge solo extra come catalogo e risposte rapide." },
        { q: "Dove conviene usare questi link?", a: "Sito, profili Instagram e Google, firma email, annunci e materiale stampato tramite il QR. Ovunque un cliente possa volerti contattare." },
      ],
      cta: { label: "Non perdere piu' una chat o una chiamata", sub: "Scopri come lo gestisce l'assistente vocale IA" },
    },
    pt: {
      name: "Gerador de link WhatsApp e click-to-call",
      metaTitle: "Gerador gratuito de link WhatsApp e click-to-call | Automis",
      metaDescription:
        "Crie um link WhatsApp wa.me com mensagem já preenchida, um link click-to-call e um QR code. Grátis, funciona no seu browser, sem registo.",
      keywords: [
        "gerador de link whatsapp",
        "link wa.me",
        "click to chat whatsapp",
        "qr code whatsapp",
        "link click to call",
      ],
      h1: "Gerador de link WhatsApp e click-to-call",
      intro:
        "Deixe que os clientes o contactem com um toque. Introduza o seu número para criar um link de conversa WhatsApp com mensagem já pronta, um link click-to-call e um QR code para impressão ou web.",
      why: [
        "Em Portugal e em toda a Europa, os clientes recorrem ao WhatsApp antes do email. Um link de conversa com um toque no seu site, na bio ou num panfleto elimina o incómodo de ter primeiro de guardar o número.",
        "Junte o link click-to-call ao seu Perfil de Empresa no Google e aos seus anúncios, para que quem está no telemóvel lhe ligue de imediato, e coloque o QR no material impresso para ligar o offline à conversa.",
        "Quando o volume cresce, o assistente de voz da Automis e as automações de chat respondem e qualificam essas conversas 24 horas por dia, para que uma linha ou caixa de entrada ocupada nunca signifique um cliente perdido.",
      ],
      faqs: [
        { q: "O que é um link wa.me?", a: "É o formato oficial dos links do WhatsApp. Ao abri-lo, inicia-se uma conversa com o seu número, se quiser com uma mensagem já escrita, no telemóvel ou no computador." },
        { q: "Preciso de uma conta WhatsApp Business?", a: "Não. O link funciona com qualquer número WhatsApp. Um perfil Business só acrescenta extras como catálogo e respostas rápidas." },
        { q: "Onde devo usar estes links?", a: "No seu site, nos perfis de Instagram e Google, na assinatura de email, nos anúncios e no material impresso através do QR code. Em qualquer sítio onde um cliente possa querer contactá-lo." },
      ],
      cta: { label: "Nunca mais perca uma conversa ou uma chamada", sub: "Veja como o assistente de voz IA a trata" },
    },
  },
  "receptionist-cost-calculator": {
    key: "receptionist-cost-calculator",
    widget: "ReceptionistCostCalculator",
    icon: "🧮",
    ctaTarget: "booking",
    related: ["missed-call-calculator", "missed-call-text-back-generator"],
    slug: { en: "ai-receptionist-cost-calculator", it: "calcolatore-costo-segretaria", pt: "calculadora-custo-rececionista" },
    en: {
      name: "Answering Service vs AI Receptionist Cost Calculator",
      metaTitle: "Answering Service Cost vs AI Receptionist Cost Calculator | Automis",
      metaDescription:
        "Free calculator: compare the monthly and yearly cost of an in-house receptionist, a human answering service and an AI receptionist, with sourced default figures you can change.",
      keywords: [
        "answering service cost",
        "ai receptionist cost",
        "receptionist cost calculator",
        "answering service pricing",
        "virtual receptionist cost",
      ],
      h1: "Answering Service vs AI Receptionist Cost Calculator",
      intro:
        "What does it really cost to have every call answered? Enter your calls, call length and the hours you need covered, and compare a hired receptionist, a human answering service and an AI receptionist, month by month and year by year.",
      why: [
        "A receptionist is paid for every hour, including the quiet ones. An answering service charges per call or per minute, so a busy month costs more. An AI receptionist is a flat monthly fee. Which one is cheapest depends on how many calls you get and when.",
        "The calculator starts from public figures, such as official wage statistics and published answering service prices, and tells you where each one comes from. Change any number to match your own quote or payroll. Where we found no public figure, the field is left empty rather than guessed.",
        "The break-even lines show how many calls a month it takes for one option to beat another. If your phone is busy at night, at weekends or while you are with a customer, the gap usually opens fast.",
      ],
      faqs: [
        { q: "How much does an answering service cost?", a: "It depends on the provider and the plan. As one published example, the Smith.ai human receptionist Starter plan is listed at $300 for 30 calls, about $10 a call, and Ruby lists $250 for 50 minutes. Enter your own quote in the calculator to see your real figure." },
        { q: "How much does an AI receptionist cost?", a: "Automis AI receptionist plans start from EUR 297 a month, a flat fee. Other providers price per minute or per call, so compare on your own call volume." },
        { q: "Where do the default numbers come from?", a: "Each default is taken from a public page we opened in November 2026: the US Bureau of Labor Statistics for the US wage, ONS earnings data for the UK, the Confcommercio collective agreement for Italy, the national minimum wage for Portugal, and Smith.ai for a published per-call price. The sources are listed under the calculator." },
        { q: "Why are some fields empty?", a: "Where we could not find a public price, we leave the field empty instead of inventing one. Type in your own quote and the comparison updates." },
        { q: "Does the in-house option include extra costs?", a: "Only the employer cost percentage you enter. Social charges, equipment, training, sick leave and holiday cover usually add to the salary, so adding them gives a fairer comparison." },
      ],
      cta: { label: "Book a call to see your real numbers", sub: "15 minutes, no commitment" },
    },
    it: {
      name: "Calcolatore costo segretaria: servizio di segreteria o segretaria IA",
      metaTitle: "Costo segretaria: confronto con segreteria telefonica e segretaria IA | Automis",
      metaDescription:
        "Calcolatore gratuito: confronta il costo mensile e annuale di una segretaria interna, di una segreteria telefonica e di una segretaria IA, con cifre di partenza da fonti pubbliche che puoi cambiare.",
      keywords: [
        "costo segretaria",
        "costo segretaria part time",
        "segretaria IA",
        "costo segreteria telefonica",
        "calcolatore costo receptionist",
      ],
      h1: "Calcolatore costo segretaria: interna, servizio telefonico o segretaria IA",
      intro:
        "Quanto costa davvero far rispondere a ogni chiamata? Inserisci le chiamate, la durata e le fasce da coprire e confronta una segretaria assunta, un servizio di segreteria telefonica e una segretaria IA, al mese e all'anno.",
      why: [
        "Una segretaria si paga per ogni ora, anche quelle tranquille. Un servizio di segreteria si paga a chiamata o a minuto, quindi un mese pieno costa di piu'. Una segretaria IA ha un canone fisso. Quale conviene dipende da quante chiamate ricevi e a che ora.",
        "Il calcolatore parte da cifre pubbliche, come i minimi del contratto collettivo e i listini pubblicati, e ti dice da dove arriva ognuna. Cambia i numeri con i tuoi, quelli del tuo preventivo o del tuo cedolino. Dove non abbiamo trovato una cifra pubblica, il campo resta vuoto invece di essere inventato.",
        "Le righe sul punto di pareggio ti dicono da quante chiamate al mese un'opzione batte l'altra. Se il telefono squilla la sera, nel weekend o mentre sei con un cliente, la differenza si vede presto.",
      ],
      faqs: [
        { q: "Quanto costa una segretaria?", a: "Per una persona assunta, il minimo contrattuale del CCNL Terziario Confcommercio al IV livello e' un punto di partenza, ma a questo vanno aggiunti contributi, ferie, malattia e sostituzioni. Nel calcolatore puoi inserire la percentuale di costi extra a carico tuo." },
        { q: "Quanto costa una segreteria telefonica?", a: "Dipende dal fornitore e dal piano. Per l'Italia non abbiamo trovato un listino pubblico affidabile, quindi il campo e' vuoto: inserisci il tuo preventivo. Come esempio estero, Smith.ai pubblica un piano da 300 $ per 30 chiamate, circa 10 $ a chiamata." },
        { q: "Quanto costa una segretaria IA?", a: "I piani della segretaria IA di Automis partono da 297 € al mese, a canone fisso. Altri fornitori fanno pagare a minuto o a chiamata, quindi confronta sempre sul tuo numero di chiamate." },
        { q: "Da dove arrivano i numeri di partenza?", a: "Da pagine pubbliche che abbiamo aperto a novembre 2026: il contratto collettivo Terziario Confcommercio per lo stipendio, il listino Automis per la segretaria IA. Le fonti sono elencate sotto il calcolatore." },
        { q: "Perche' alcuni campi sono vuoti?", a: "Dove non abbiamo trovato un prezzo pubblico lasciamo il campo vuoto invece di inventarlo. Scrivi il tuo preventivo e il confronto si aggiorna." },
      ],
      cta: { label: "Prenota una call per i tuoi numeri veri", sub: "15 minuti, nessun impegno" },
    },
    pt: {
      name: "Calculadora do custo de rececionista: serviço de atendimento ou rececionista IA",
      metaTitle: "Custo de rececionista: comparação com serviço de atendimento e rececionista IA | Automis",
      metaDescription:
        "Calculadora gratuita: compare o custo mensal e anual de uma rececionista interna, de um serviço de atendimento telefónico e de uma rececionista IA, com valores de partida de fontes públicas que pode alterar.",
      keywords: [
        "custo de uma rececionista",
        "custo secretária",
        "rececionista IA",
        "custo serviço de atendimento telefónico",
        "calculadora custo rececionista",
      ],
      h1: "Calculadora do custo de rececionista: interna, serviço telefónico ou IA",
      intro:
        "Quanto custa realmente atender todas as chamadas? Introduza as chamadas, a duração e o horário a cobrir e compare uma rececionista contratada, um serviço de atendimento telefónico e uma rececionista IA, por mês e por ano.",
      why: [
        "Uma rececionista é paga por todas as horas, incluindo as calmas. Um serviço de atendimento cobra por chamada ou por minuto, por isso um mês cheio custa mais. Uma rececionista IA tem uma mensalidade fixa. Qual compensa depende de quantas chamadas recebe e a que horas.",
        "A calculadora parte de valores públicos, como o salário mínimo nacional e preços publicados, e diz-lhe de onde vem cada um. Altere os números para os do seu orçamento ou do seu recibo de vencimento. Onde não encontrámos um valor público, o campo fica vazio em vez de inventado.",
        "As linhas do ponto de equilíbrio mostram a partir de quantas chamadas por mês uma opção ganha à outra. Se o telefone toca à noite, ao fim de semana ou enquanto está com um cliente, a diferença nota-se depressa.",
      ],
      faqs: [
        { q: "Quanto custa uma rececionista?", a: "Para uma pessoa contratada, o salário mínimo nacional (920 € em 14 meses em 2026) é um mínimo, não um valor típico, e a empresa paga ainda 23,75% de Taxa Social Única. Na calculadora pode alterar o salário e os custos extra." },
        { q: "Quanto custa um serviço de atendimento telefónico?", a: "Depende do fornecedor e do plano. Para Portugal não encontrámos uma tabela pública fiável, por isso o campo está vazio: introduza o seu orçamento. Como exemplo estrangeiro, a Smith.ai publica um plano de 300 $ para 30 chamadas, cerca de 10 $ por chamada." },
        { q: "Quanto custa uma rececionista IA?", a: "Os planos de rececionista IA da Automis começam nos 297 € por mês, com mensalidade fixa. Outros fornecedores cobram por minuto ou por chamada, por isso compare sempre com o seu número de chamadas." },
        { q: "De onde vêm os números de partida?", a: "De páginas públicas que abrimos em novembro de 2026: o salário mínimo nacional e a taxa da Segurança Social, e a tabela de preços da Automis. As fontes estão listadas por baixo da calculadora." },
        { q: "Porque estão alguns campos vazios?", a: "Onde não encontrámos um preço público deixamos o campo vazio em vez de o inventar. Escreva o seu orçamento e a comparação atualiza-se." },
      ],
      cta: { label: "Agende uma chamada para ver os seus números reais", sub: "15 minutos, sem compromisso" },
    },
  },
  "missed-call-text-back-generator": {
    key: "missed-call-text-back-generator",
    widget: "AwayMessageGenerator",
    icon: "💬",
    ctaTarget: "voiceai",
    related: ["missed-call-calculator", "receptionist-cost-calculator"],
    slug: { en: "missed-call-text-back-generator", it: "generatore-messaggio-assenza-whatsapp", pt: "gerador-mensagem-chamada-perdida" },
    en: {
      name: "Missed-Call Text Back and Away Message Generator",
      metaTitle: "Missed Call Text Back Message Generator: Free Templates | Automis",
      metaDescription:
        "Free missed call text back generator: pick your business, the situation and a tone, and get 3 ready-to-send messages for missed calls, after hours, holidays and busy times. No signup.",
      keywords: [
        "missed call text back",
        "missed call text back message",
        "missed call text back template",
        "auto reply text for missed calls",
        "away message generator",
      ],
      h1: "Missed Call Text Back and Away Message Generator",
      intro:
        "A caller who gets no answer rarely leaves a voicemail. Pick your business, the situation and the tone, and copy three ready messages that turn a missed call into a conversation. No signup, nothing stored.",
      why: [
        "A quick text after a missed call tells the customer you saw it and what happens next. That one message is often the difference between a booking and a call to your competitor.",
        "The messages cover the four moments that cost you contacts: a missed call, after hours, holidays and a busy line. Add your name, a booking link and a callback time, and they are ready to paste into your phone, WhatsApp Business or CRM.",
        "A template still needs someone to send it. Automis VoiceAI answers the call itself, books the visit and texts the caller, so there is no missed call to apologise for.",
      ],
      faqs: [
        { q: "What is a missed call text back?", a: "It is a short text a business sends to a caller it could not answer, saying sorry, asking how to help and, if you add one, offering a callback time or a booking link." },
        { q: "How do I send it automatically?", a: "Most business phone systems, WhatsApp Business and CRMs let you set an automatic reply or a missed call text. Paste the message you like into that setting. An AI receptionist avoids the problem by answering the call." },
        { q: "How long should the message be?", a: "Short. Two or three sentences, a clear next step, and your name. Use the Short tone if you want the leanest version." },
        { q: "Is anything stored or sent to AI?", a: "No. The messages are built in your browser from templates, nothing is stored, and no AI is called each time you use the tool." },
        { q: "Can I use these for WhatsApp away messages?", a: "Yes. Pick the After hours, Holidays or Busy situation and paste the text into your WhatsApp Business away message or quick replies." },
      ],
      cta: { label: "Stop missing calls for good", sub: "See how the AI receptionist answers every call" },
    },
    it: {
      name: "Generatore di messaggi di assenza e risposta automatica WhatsApp",
      metaTitle: "Messaggio di assenza WhatsApp e risposta automatica: generatore gratuito | Automis",
      metaDescription:
        "Generatore gratuito di messaggi di assenza e risposta automatica per WhatsApp: scegli attivita', situazione e tono, ottieni 3 messaggi pronti per chiamata persa, fuori orario, ferie e linea occupata.",
      keywords: [
        "messaggio di assenza WhatsApp",
        "risposta automatica WhatsApp",
        "messaggio assenza whatsapp business",
        "messaggio chiamata persa",
        "risposta automatica WhatsApp Business",
      ],
      h1: "Messaggio di assenza WhatsApp e risposta automatica: il generatore",
      intro:
        "Chi chiama e non ti trova di solito non lascia un messaggio in segreteria. Scegli la tua attivita', la situazione e il tono, e copia tre messaggi pronti che trasformano una chiamata persa in una conversazione. Senza registrazione, non salviamo nulla.",
      why: [
        "Un messaggio veloce dopo una chiamata persa dice al cliente che l'hai vista e cosa succede adesso. Spesso e' la differenza tra un appuntamento e una chiamata al concorrente.",
        "I messaggi coprono i quattro momenti in cui perdi contatti: chiamata persa, fuori orario, ferie e linea occupata. Aggiungi il tuo nome, un link per prenotare e quando richiami, e sono pronti da incollare in WhatsApp Business, nel telefono o nel gestionale.",
        "Un modello pero' deve sempre essere inviato da qualcuno. L'assistente vocale IA di Automis risponde alla chiamata, fissa la visita e scrive a chi ha chiamato, cosi' non c'e' nessuna chiamata persa di cui scusarsi.",
      ],
      faqs: [
        { q: "Come si imposta il messaggio di assenza su WhatsApp Business?", a: "In WhatsApp Business vai su Strumenti per l'azienda, poi Messaggio di assenza, attivalo e incolla il testo che hai scelto qui. Puoi scegliere quando inviarlo, per esempio fuori dall'orario di lavoro." },
        { q: "Come si imposta la risposta automatica WhatsApp?", a: "Sempre da Strumenti per l'azienda: usa Messaggio di assenza per fuori orario e ferie, e Risposte rapide per i testi che invii a mano dopo una chiamata persa." },
        { q: "Quanto deve essere lungo il messaggio?", a: "Breve. Due o tre frasi, un passo chiaro da fare e il tuo nome. Se vuoi la versione piu' snella, scegli il tono Breve." },
        { q: "Salvate qualcosa o usate l'IA?", a: "No. I messaggi si costruiscono nel tuo browser da modelli, non salviamo nulla e non c'e' nessuna chiamata a un'IA ogni volta che usi lo strumento." },
        { q: "Posso evitare del tutto le chiamate perse?", a: "Si', con un assistente vocale IA che risponde a ogni chiamata, 24 ore su 24, e fissa l'appuntamento in agenda." },
      ],
      cta: { label: "Non perdere piu' una chiamata", sub: "Scopri come l'assistente vocale IA risponde a tutto" },
    },
    pt: {
      name: "Gerador de mensagens de chamada perdida e de ausência",
      metaTitle: "Mensagem de chamada perdida e de ausência: gerador gratuito | Automis",
      metaDescription:
        "Gerador gratuito de mensagens para chamadas perdidas e ausência: escolha o negócio, a situação e o tom, e obtenha 3 mensagens prontas para chamada perdida, fora de horas, férias e linha ocupada.",
      keywords: [
        "mensagem automática whatsapp business",
        "mensagem de ausência whatsapp",
        "resposta automática whatsapp",
        "mensagem chamada perdida",
        "mensagem fora de horas",
      ],
      h1: "Mensagem de chamada perdida e de ausência: o gerador",
      intro:
        "Quem liga e não consegue falar consigo raramente deixa mensagem. Escolha o negócio, a situação e o tom, e copie três mensagens prontas que transformam uma chamada perdida numa conversa. Sem registo, não guardamos nada.",
      why: [
        "Uma mensagem rápida depois de uma chamada perdida diz ao cliente que viu a chamada e o que acontece a seguir. Muitas vezes é a diferença entre uma marcação e uma chamada para a concorrência.",
        "As mensagens cobrem os quatro momentos em que perde contactos: chamada perdida, fora de horas, férias e linha ocupada. Junte o seu nome, um link de marcação e a hora de retorno, e ficam prontas para colar no WhatsApp Business, no telemóvel ou no sistema de gestão.",
        "Um modelo continua a precisar de alguém que o envie. O assistente de voz da Automis atende a chamada, marca a consulta e escreve a quem ligou, por isso não há nenhuma chamada perdida pela qual pedir desculpa.",
      ],
      faqs: [
        { q: "Como configuro a mensagem automática no WhatsApp Business?", a: "No WhatsApp Business vá a Ferramentas comerciais, depois a Mensagem de ausência, ative-a e cole o texto que escolheu aqui. Pode definir quando é enviada, por exemplo fora do horário de trabalho." },
        { q: "Quanto deve ter a mensagem?", a: "Curta. Duas ou três frases, um passo claro a seguir e o seu nome. Se quiser a versão mais enxuta, escolha o tom Curto." },
        { q: "Guardam alguma coisa ou usam IA?", a: "Não. As mensagens são criadas no seu browser a partir de modelos, não guardamos nada e não é feita nenhuma chamada a uma IA de cada vez que usa a ferramenta." },
        { q: "Posso evitar de vez as chamadas perdidas?", a: "Sim, com um assistente de voz IA que atende todas as chamadas, 24 horas por dia, e marca a consulta na agenda." },
      ],
      cta: { label: "Nunca mais perca uma chamada", sub: "Veja como o assistente de voz IA atende tudo" },
    },
  },
  "appointment-reminder-generator": {
    key: "appointment-reminder-generator",
    widget: "ReminderMessageGenerator",
    icon: "⏰",
    ctaTarget: "voiceai",
    related: ["no-show-calculator", "missed-call-text-back-generator"],
    slug: { en: "appointment-reminder-text-generator", it: "generatore-messaggio-promemoria-appuntamento", pt: "gerador-mensagem-lembrete-consulta" },
    en: {
      name: "Appointment Reminder Message Generator",
      metaTitle: "Appointment Reminder Text Template Generator: WhatsApp, SMS, Email | Automis",
      metaDescription:
        "Free appointment reminder text generator: pick your sector, channel and timing, and get 3 ready messages with confirm and cancel wording for WhatsApp, SMS or email. No signup.",
      keywords: [
        "appointment reminder text template",
        "appointment reminder message",
        "appointment reminder text",
        "sms appointment reminder template",
        "reduce no-shows",
      ],
      h1: "Appointment Reminder Message Generator",
      intro:
        "Empty slots cost real money. Pick your sector, the channel and when to send, and copy three reminder messages with clear confirm and cancel wording. Ready for WhatsApp, SMS or email, no signup.",
      why: [
        "A reminder that is easy to answer gets answered. The messages here ask for a quick YES, a link or a call, so the client confirms or frees the slot while you can still refill it.",
        "Pick the day before or the same day, and the wording changes with the sector and channel: short for SMS, a little warmer for WhatsApp, with a subject line for email.",
        "Sending them by hand costs your front desk time every day. Automis VoiceAI confirms appointments, sends reminders and lets clients move a booking by voice, so fewer slots go empty.",
      ],
      faqs: [
        { q: "When should I send an appointment reminder?", a: "Many practices send one the day before and, for important slots, a second one the same morning. The generator gives you both timings so you can pick what fits your business." },
        { q: "What should a reminder include?", a: "The business name, the day and time, a simple way to confirm and a simple way to cancel or move. Keep it to two or three lines." },
        { q: "Can I use these for SMS?", a: "Yes. Choose SMS for a shorter text. Check the length in your SMS tool, as limits vary by provider." },
        { q: "Is anything stored or sent to AI?", a: "No. Messages are built in your browser from templates and nothing is stored or sent to an AI." },
        { q: "How do I work out what no-shows cost me?", a: "Use the no-show cost calculator linked below this tool: it turns your appointments and no-show rate into a monthly and yearly figure." },
      ],
      cta: { label: "Automate your reminders", sub: "See how VoiceAI confirms every appointment" },
    },
    it: {
      name: "Generatore di messaggi promemoria appuntamento",
      metaTitle: "Messaggio promemoria appuntamento: generatore per WhatsApp, SMS, email | Automis",
      metaDescription:
        "Generatore gratuito di messaggi promemoria per appuntamenti: scegli settore, canale e quando inviarlo, ottieni 3 messaggi pronti con conferma e annullamento per WhatsApp, SMS o email.",
      keywords: [
        "messaggio promemoria appuntamento",
        "promemoria appuntamento WhatsApp",
        "sms promemoria appuntamento",
        "messaggio conferma appuntamento",
        "ridurre i no-show",
      ],
      h1: "Messaggio promemoria appuntamento: il generatore",
      intro:
        "Gli appuntamenti saltati costano soldi veri. Scegli settore, canale e quando inviarlo, e copia tre messaggi di promemoria con la frase giusta per confermare o annullare. Pronti per WhatsApp, SMS o email, senza registrazione.",
      why: [
        "Un promemoria a cui e' facile rispondere riceve risposta. I messaggi qui chiedono un SI' veloce, un link o una telefonata, cosi' il cliente conferma o libera lo slot quando puoi ancora riempirlo.",
        "Scegli il giorno prima o lo stesso giorno, e il testo cambia con settore e canale: breve per l'SMS, un po' piu' caldo per WhatsApp, con l'oggetto per l'email.",
        "Mandarli a mano toglie tempo alla segreteria ogni giorno. L'assistente vocale IA di Automis conferma gli appuntamenti, invia i promemoria e fa spostare la prenotazione a voce, cosi' restano meno slot vuoti.",
      ],
      faqs: [
        { q: "Quando conviene inviare il promemoria di un appuntamento?", a: "Molti studi lo inviano il giorno prima e, per gli slot importanti, un secondo la mattina stessa. Il generatore ti da' entrambi i momenti, cosi' scegli quello che fa per te." },
        { q: "Cosa deve contenere un promemoria?", a: "Nome dell'attivita', giorno e ora, un modo semplice per confermare e uno per annullare o spostare. Tienilo a due o tre righe." },
        { q: "Posso usarlo per gli SMS?", a: "Si'. Scegli SMS per un testo piu' corto. Controlla la lunghezza nel tuo strumento SMS, perche' i limiti cambiano da fornitore a fornitore." },
        { q: "Salvate qualcosa o usate l'IA?", a: "No. I messaggi si costruiscono nel tuo browser da modelli e non salviamo nulla ne' inviamo dati a un'IA." },
        { q: "Come calcolo quanto mi costano gli appuntamenti saltati?", a: "Usa il calcolatore degli appuntamenti mancati, linkato sotto questo strumento: trasforma appuntamenti e percentuale di no-show in una cifra mensile e annuale." },
      ],
      cta: { label: "Automatizza i promemoria", sub: "Scopri come l'assistente vocale IA conferma ogni appuntamento" },
    },
    pt: {
      name: "Gerador de mensagens de lembrete de consulta",
      metaTitle: "Mensagem de lembrete de consulta: gerador para WhatsApp, SMS e email | Automis",
      metaDescription:
        "Gerador gratuito de mensagens de lembrete de consulta: escolha o setor, o canal e quando enviar, e obtenha 3 mensagens prontas com confirmação e cancelamento para WhatsApp, SMS ou email.",
      keywords: [
        "mensagem lembrete consulta",
        "lembrete de marcação whatsapp",
        "sms lembrete consulta",
        "mensagem confirmação de consulta",
        "reduzir faltas às consultas",
      ],
      h1: "Mensagem de lembrete de consulta: o gerador",
      intro:
        "As faltas custam dinheiro a sério. Escolha o setor, o canal e quando enviar, e copie três mensagens de lembrete com a frase certa para confirmar ou cancelar. Prontas para WhatsApp, SMS ou email, sem registo.",
      why: [
        "Um lembrete a que é fácil responder tem resposta. As mensagens aqui pedem um SIM rápido, um link ou uma chamada, para que o cliente confirme ou liberte o horário enquanto ainda o pode preencher.",
        "Escolha a véspera ou o próprio dia, e o texto muda com o setor e o canal: curto para SMS, um pouco mais caloroso para WhatsApp, com assunto para email.",
        "Enviá-las à mão tira tempo à receção todos os dias. O assistente de voz da Automis confirma marcações, envia lembretes e deixa o cliente remarcar por voz, para que menos horários fiquem vazios.",
      ],
      faqs: [
        { q: "Quando devo enviar o lembrete de uma consulta?", a: "Muitas clínicas enviam um na véspera e, para horários importantes, um segundo na própria manhã. O gerador dá-lhe os dois momentos para escolher o que serve ao seu negócio." },
        { q: "O que deve incluir um lembrete?", a: "O nome do negócio, o dia e a hora, uma forma simples de confirmar e outra de cancelar ou remarcar. Mantenha-o em duas ou três linhas." },
        { q: "Posso usá-lo para SMS?", a: "Sim. Escolha SMS para um texto mais curto. Verifique o tamanho na sua ferramenta de SMS, porque os limites variam de fornecedor para fornecedor." },
        { q: "Guardam alguma coisa ou usam IA?", a: "Não. As mensagens são criadas no seu browser a partir de modelos e não guardamos nada nem enviamos dados a uma IA." },
        { q: "Como calculo o que as faltas me custam?", a: "Use a calculadora de faltas às consultas, ligada por baixo desta ferramenta: transforma as suas consultas e a taxa de faltas num valor mensal e anual." },
      ],
      cta: { label: "Automatize os lembretes", sub: "Veja como o assistente de voz IA confirma cada marcação" },
    },
  },
};

export const TOOLS_ORDER = [
  "receptionist-cost-calculator",
  "google-review-link-generator",
  "missed-call-text-back-generator",
  "appointment-reminder-generator",
  "missed-call-calculator",
  "no-show-calculator",
  "whatsapp-link-generator",
];

export const HUB = {
  en: {
    metaTitle: "Free Tools for Local Businesses | Automis",
    metaDescription:
      "Free, no-signup tools for local businesses: compare receptionist and answering service costs, calculate missed-call and no-show losses, and generate review links, reminder and missed-call messages.",
    h1: "Free Tools for Local Businesses",
    intro:
      "Simple, free tools to help local businesses answer more calls, fill more appointments, and win more reviews. No signup, nothing stored, everything runs in your browser.",
    cardCta: "Open tool",
  },
  it: {
    metaTitle: "Strumenti gratuiti per attivita' locali | Automis",
    metaDescription:
      "Strumenti gratuiti e senza registrazione: confronta il costo della segretaria, calcola chiamate perse e appuntamenti mancati, genera link recensioni, promemoria e messaggi di assenza.",
    h1: "Strumenti gratuiti per attivita' locali",
    intro:
      "Strumenti semplici e gratuiti per aiutare le attivita' locali a rispondere a piu' chiamate, riempire piu' appuntamenti e ottenere piu' recensioni. Senza registrazione, non salviamo nulla, tutto funziona nel tuo browser.",
    cardCta: "Apri strumento",
  },
  pt: {
    metaTitle: "Ferramentas gratuitas para negócios locais | Automis",
    metaDescription:
      "Ferramentas gratuitas e sem registo: compare o custo da rececionista, calcule chamadas perdidas e faltas às consultas, gere links de avaliações, lembretes e mensagens de ausência.",
    h1: "Ferramentas gratuitas para negócios locais",
    intro:
      "Ferramentas simples e gratuitas para ajudar os negócios locais a atender mais chamadas, preencher mais marcações e conquistar mais avaliações. Sem registo, não guardamos nada, tudo funciona no seu browser.",
    cardCta: "Abrir ferramenta",
  },
};

export function getTool(key) {
  return TOOLS[key];
}

export function toolPath(key, locale) {
  const t = TOOLS[key];
  if (locale === "it") return `/it/tools/${t.slug.it}`;
  if (locale === "pt") return `/pt/tools/${t.slug.pt}`;
  return `/tools/${t.slug.en}`;
}

export function toolUrl(key, locale) {
  return `${SITE}${toolPath(key, locale)}`;
}

export function hubPath(locale) {
  if (locale === "it") return "/it/tools";
  if (locale === "pt") return "/pt/tools";
  return "/tools";
}

export function hubUrl(locale) {
  return `${SITE}${hubPath(locale)}`;
}

function ogImageAlt(locale) {
  if (locale === "it") return "Strumenti gratuiti Automis per attivita' locali";
  if (locale === "pt") return "Ferramentas gratuitas Automis para negócios locais";
  return "Free Automis tools for local businesses";
}

// Build a Next.js metadata object for an individual tool page.
export function toolMetadata(key, locale) {
  const c = TOOLS[key][locale];
  const enUrl = toolUrl(key, "en");
  const itUrl = toolUrl(key, "it");
  const ptUrl = toolUrl(key, "pt");
  const canonical = locale === "it" ? itUrl : locale === "pt" ? ptUrl : enUrl;
  const ogLocale = locale === "it" ? { locale: "it_IT" } : locale === "pt" ? { locale: "pt_PT" } : {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: {
      canonical,
      languages: { en: enUrl, "it-IT": itUrl, "pt-PT": ptUrl, "x-default": enUrl },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: canonical,
      siteName: "Automis",
      type: "website",
      ...ogLocale,
      images: [{ url: "/assets/og/home-en.png", width: 1200, height: 630, alt: ogImageAlt(locale) }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDescription,
      images: ["/assets/og/home-en.png"],
    },
  };
}

// Build a Next.js metadata object for the /tools hub page.
export function hubMetadata(locale) {
  const h = HUB[locale];
  const enUrl = hubUrl("en");
  const itUrl = hubUrl("it");
  const ptUrl = hubUrl("pt");
  const canonical = locale === "it" ? itUrl : locale === "pt" ? ptUrl : enUrl;
  const ogLocale = locale === "it" ? { locale: "it_IT" } : locale === "pt" ? { locale: "pt_PT" } : {};
  return {
    title: h.metaTitle,
    description: h.metaDescription,
    alternates: {
      canonical,
      languages: { en: enUrl, "it-IT": itUrl, "pt-PT": ptUrl, "x-default": enUrl },
    },
    openGraph: {
      title: h.metaTitle,
      description: h.metaDescription,
      url: canonical,
      siteName: "Automis",
      type: "website",
      ...ogLocale,
      images: [{ url: "/assets/og/home-en.png", width: 1200, height: 630, alt: ogImageAlt(locale) }],
    },
    twitter: {
      card: "summary_large_image",
      title: h.metaTitle,
      description: h.metaDescription,
      images: ["/assets/og/home-en.png"],
    },
  };
}

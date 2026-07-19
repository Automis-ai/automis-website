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
        "Calcolatore gratuito: scopri quanto fatturato perdi ogni mese per le chiamate senza risposta e quanto potresti recuperare con un assistente vocale IA. Senza registrazione.",
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
        "Calculadora gratuita: veja quanto faturação perde todos os meses com as chamadas sem resposta e quanto poderia recuperar com um assistente de voz IA. Sem registo.",
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
        "Calcolatore gratuito: scopri quanto ti costano ogni mese gli appuntamenti mancati e quanto puoi risparmiare con promemoria e conferme automatiche. Senza registrazione.",
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
        "Calculadora gratuita: veja quanto lhe custam todos os meses as faltas às consultas e quanto pode poupar com lembretes e confirmações automáticas. Sem registo.",
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
      metaTitle: "Free Google Review Link and QR Code Generator | Automis",
      metaDescription:
        "Turn your Google Place ID into a direct write-a-review link and a downloadable QR code. Free, runs in your browser, no signup.",
      keywords: [
        "google review link generator",
        "google review qr code",
        "direct google review link",
        "get more google reviews",
        "review link generator",
      ],
      h1: "Google Review Link and QR Code Generator",
      intro:
        "Make it effortless for happy customers to review you. Paste your Google Place ID to get a direct link that opens the review box, plus a QR code you can print or share.",
      why: [
        "The fewer taps between a happy customer and the review form, the more reviews you collect. A direct write-a-review link skips the search and opens the box straight away.",
        "Reviews are one of the strongest local ranking and trust signals, so a steady flow of them lifts both your map-pack position and your conversion rate.",
        "Print the QR on a card at reception, add the link to a follow-up message, and ask right after a great visit. Automis VoiceAI can send the review link automatically after each appointment, so asking becomes hands-free.",
      ],
      faqs: [
        { q: "Where do I find my Google Place ID?", a: "Use Google's free Place ID Finder, linked above the field. Search your business name and copy the Place ID it shows." },
        { q: "Is the review link safe to share?", a: "Yes. It simply opens the standard Google review box for your business. Nothing is stored and everything runs in your browser." },
        { q: "Can I automate review requests?", a: "Yes. Automis VoiceAI and our automations can send this link by SMS or WhatsApp right after each visit, so your review flow runs on autopilot." },
      ],
      cta: { label: "Automate your review requests", sub: "See how VoiceAI does it" },
    },
    it: {
      name: "Generatore di link e QR per recensioni Google",
      metaTitle: "Generatore gratuito di link e QR per recensioni Google | Automis",
      metaDescription:
        "Trasforma il tuo Place ID di Google in un link diretto per lasciare una recensione e in un QR code da scaricare. Gratis, funziona nel browser, senza registrazione.",
      keywords: [
        "generatore link recensioni google",
        "qr code recensioni google",
        "link diretto recensione google",
        "ottenere piu' recensioni google",
        "link recensioni",
      ],
      h1: "Generatore di link e QR per recensioni Google",
      intro:
        "Rendi semplicissimo lasciare una recensione ai clienti soddisfatti. Incolla il tuo Place ID di Google per ottenere un link diretto che apre subito il modulo di recensione, piu' un QR code da stampare o condividere.",
      why: [
        "Meno passaggi ci sono tra un cliente soddisfatto e il modulo di recensione, piu' recensioni raccogli. Un link diretto salta la ricerca e apre subito il riquadro.",
        "Le recensioni sono uno dei segnali di fiducia e di posizionamento locale piu' forti, quindi un flusso costante migliora sia la posizione nel pacchetto mappe sia il tasso di conversione.",
        "Stampa il QR su un cartoncino alla reception, aggiungi il link a un messaggio di follow-up e chiedi subito dopo una bella visita. L'assistente vocale IA di Automis puo' inviare il link automaticamente dopo ogni appuntamento.",
      ],
      faqs: [
        { q: "Dove trovo il mio Place ID di Google?", a: "Usa lo strumento gratuito Place ID Finder di Google, linkato sopra il campo. Cerca il nome della tua attivita' e copia il Place ID che appare." },
        { q: "Il link per le recensioni e' sicuro da condividere?", a: "Si'. Apre semplicemente il modulo standard di recensione Google per la tua attivita'. Non salviamo nulla e tutto avviene nel tuo browser." },
        { q: "Posso automatizzare le richieste di recensione?", a: "Si'. L'assistente vocale IA di Automis e le nostre automazioni possono inviare questo link via SMS o WhatsApp subito dopo ogni visita." },
      ],
      cta: { label: "Automatizza le richieste di recensione", sub: "Scopri come lo fa l'assistente vocale IA" },
    },
    pt: {
      name: "Gerador de link e QR para avaliações Google",
      metaTitle: "Gerador gratuito de link e QR para avaliações Google | Automis",
      metaDescription:
        "Transforme o seu Place ID do Google num link direto para deixar uma avaliação e num QR code para descarregar. Grátis, funciona no seu browser, sem registo.",
      keywords: [
        "gerador de link para avaliações google",
        "qr code avaliações google",
        "link direto avaliação google",
        "obter mais avaliações google",
        "gerador de link de avaliações",
      ],
      h1: "Gerador de link e QR para avaliações Google",
      intro:
        "Torne muito simples para os clientes satisfeitos deixarem uma avaliação. Cole o seu Place ID do Google para obter um link direto que abre logo o formulário de avaliação, mais um QR code para imprimir ou partilhar.",
      why: [
        "Quantos menos toques houver entre um cliente satisfeito e o formulário de avaliação, mais avaliações recolhe. Um link direto salta a pesquisa e abre logo a caixa de avaliação.",
        "As avaliações são um dos sinais de confiança e de posicionamento local mais fortes, por isso um fluxo constante melhora tanto a sua posição no mapa como a sua taxa de conversão.",
        "Imprima o QR num cartão na receção, junte o link a uma mensagem de follow-up e peça logo a seguir a uma boa visita. O assistente de voz da Automis pode enviar o link de avaliação automaticamente após cada consulta, para que pedir seja algo automático.",
      ],
      faqs: [
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
};

export const TOOLS_ORDER = [
  "missed-call-calculator",
  "no-show-calculator",
  "google-review-link-generator",
  "whatsapp-link-generator",
];

export const HUB = {
  en: {
    metaTitle: "Free Tools for Local Businesses | Automis",
    metaDescription:
      "Free, no-signup tools for local businesses: calculate missed-call and no-show costs, generate a Google review link, and create WhatsApp and click-to-call links.",
    h1: "Free Tools for Local Businesses",
    intro:
      "Simple, free tools to help local businesses answer more calls, fill more appointments, and win more reviews. No signup, nothing stored, everything runs in your browser.",
    cardCta: "Open tool",
  },
  it: {
    metaTitle: "Strumenti gratuiti per attivita' locali | Automis",
    metaDescription:
      "Strumenti gratuiti e senza registrazione per attivita' locali: calcola il costo di chiamate perse e appuntamenti mancati, genera un link per le recensioni Google e crea link WhatsApp e click-to-call.",
    h1: "Strumenti gratuiti per attivita' locali",
    intro:
      "Strumenti semplici e gratuiti per aiutare le attivita' locali a rispondere a piu' chiamate, riempire piu' appuntamenti e ottenere piu' recensioni. Senza registrazione, non salviamo nulla, tutto funziona nel tuo browser.",
    cardCta: "Apri strumento",
  },
  pt: {
    metaTitle: "Ferramentas gratuitas para negócios locais | Automis",
    metaDescription:
      "Ferramentas gratuitas e sem registo para negócios locais: calcule o custo das chamadas perdidas e das faltas às consultas, gere um link para avaliações Google e crie links WhatsApp e click-to-call.",
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

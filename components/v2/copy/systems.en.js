/* Sistemi v2 (EN): l'hub /systems e le cinque categorie /systems/<slug>.
   Il meta di primo livello è quello dell'hub; ogni categoria ha il suo meta.
   Scheda = { id, kicker, title, short, line, more, href, caseHref, price }.
   href = pagina propria della scheda (solo prodotti); caseHref = caso studio (badge «Real case →»).
   short è la riga visibile (al massimo ~9 parole); line (cosa fa) e more (il problema) si aprono a richiesta (Disclosure). Percorsi senza prefisso di lingua. */
export default {
  meta: {
    title: "AI Systems for Business: Marketing, Sales, Admin | Automis",
    description:
      "AI systems built around how you work: marketing, sales, customer service and admin, plus Voice AI, e-commerce and Company Brain. Book a call.",
  },

  labels: {
    more: "Read more",
  },

  hub: {
    hero: {
      eyebrow: "AI Systems",
      title: "The systems your business is missing",
      highlight: "missing",
      lead: "Pick an area. Every system is built around how you already work.",
    },
    categories: {
      items: [
        { slug: "marketing", title: "AI Systems for Marketing", line: "Ads, search, content, reviews and your store." },
        { slug: "sales", title: "AI Systems for Sales", line: "Every contact answered and tracked." },
        { slug: "support", title: "AI Systems for Customer Service", line: "Calls, chats and messages answered day and night." },
        { slug: "admin", title: "AI Systems for Admin", line: "Documents, data and routine tasks handled for you." },
      ],
    },
    products: {
      title: "Three products you can start from",
      items: [
        {
          id: "voice",
          name: "Voice AI",
          line: "A receptionist that answers every call, 24/7, and books the appointment.",
          price: "From €297/month",
          cta: "See Voice AI",
          href: "/voice-ai",
        },
        {
          id: "ecommerce",
          name: "AI E-commerce Manager",
          line: "AI agents that look after your online store.",
          price: null,
          cta: "Choose your platform",
          href: "/ecommerce",
        },
        {
          id: "company-brain",
          name: "Company Brain",
          line: "An archive over your documents: your team asks and gets the answer, with the source.",
          price: null,
          tag: "On your documents",
          cta: "See the Company Brain",
          href: "/systems/company-brain",
        },
      ],
    },
    cta: {
      title: "Not sure where to start?",
      line: "Tell us how you work. We will propose the systems that matter for you.",
    },
  },

  marketing: {
    meta: {
      title: "AI Systems for Marketing: Ads, SEO and Online Stores | Automis",
      description:
        "AI systems that run your marketing: ads and creative, SEO and GEO, reviews, content, reactivation campaigns and an AI manager for your online store.",
    },
    hero: {
      eyebrow: "AI Systems for Marketing",
      title: "Systems that run your marketing",
      highlight: "your marketing",
      lead: "Ads, search visibility, content, reviews and your online store, handled by AI built around your business.",
    },
    moment: {
      label: "From the first ad to social: the marketing chain",
      steps: [
        { card: "ads-creative", glyph: "target", label: "Ads" },
        { card: "seo-geo", glyph: "search", label: "Search" },
        { card: "reviews", glyph: "star", label: "Reviews" },
        { card: "content-social", glyph: "pen", label: "Social" },
      ],
    },
    cards: [
      {
        id: "ads-creative",
        kicker: null,
        title: "Ads and creative agent",
        short: "Tests creative and moves budget to what converts.",
        line: "Generates and tests ad creative on Meta and Google, and moves budget to what converts.",
        more: "Ad spend leaks on tired creative and on campaigns nobody has time to optimize.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "seo-geo",
        kicker: null,
        title: "SEO and GEO agent",
        short: "Pages built for Google and for AI answers.",
        line: "Writes and publishes pages built to rank on Google and be cited in AI answers.",
        more: "Customers now search on Google and in AI answers. Without steady content, you show up in neither.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reviews",
        kicker: null,
        title: "Reviews and reputation",
        short: "Asks for reviews and drafts the public replies.",
        line: "Asks for reviews at the right moment, routes unhappy feedback to you, drafts public replies.",
        more: "Happy customers rarely leave reviews, and the occasional bad one sits unanswered.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "content-social",
        kicker: null,
        title: "Content and social",
        short: "From one piece of material to scheduled posts.",
        line: "Turns one piece of material into on-brand posts, scheduled on your channels.",
        more: "Posting consistently falls off the moment things get busy.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "ecommerce-manager",
        kicker: null,
        title: "AI E-commerce Manager",
        short: "AI agents that watch your store day and night.",
        line: "AI agents that watch your online store day and night. Choose your platform.",
        more: "Hosting, site, ads and email each check their own piece. Nobody checks the whole store. This system does.",
        href: "/ecommerce",
        caseHref: null,
        price: null,
      },
      {
        id: "product-listings",
        kicker: null,
        title: "Product listings from photos",
        short: "Product listings written from your photos.",
        line: "Product descriptions and listings drafted from your product photos.",
        more: "Writing a page for every product takes time, and the photo already shows much of what the page needs to say.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "video-editing",
        kicker: null,
        title: "Video editing",
        short: "From raw footage to a finished, captioned video.",
        line: "From raw footage to a finished video: the best takes chosen, pauses cut and captions added.",
        more: "Editing takes more time than filming, and it is often what keeps video from being published.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reactivation",
        kicker: null,
        title: "Database reactivation campaigns",
        short: "SMS and email sequences that bring past customers back.",
        line: "Runs personalized SMS and email sequences to bring past customers back.",
        more: "Past customers already know your business, but hardly anyone follows up with them.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "animated-sites",
        kicker: "Platforms",
        title: "Animated and 3D websites",
        short: "Websites with animation and 3D that show what you do.",
        line: "Websites with animation and 3D, built to show your business at its best.",
        more: "A website is the first thing many customers see. Motion and 3D make what you do easier to understand at a glance.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: null,
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Who runs the campaigns, you or the system?",
          a: "The system does the day-to-day work: it tests creatives and moves budget to the ones that convert. Every month we review the results and improve it, with a person overseeing.",
        },
        {
          q: "What is GEO?",
          a: "It is content written to be cited in the answers of ChatGPT, Perplexity and similar tools, on top of ranking on Google. Nobody can guarantee a citation. We work so your content is clear and ready to earn one.",
        },
        {
          q: "Can the AI E-commerce Manager change prices or issue refunds?",
          a: "No. Prices, refunds and returns are never left to an AI, and anything that costs money or touches your store waits for your approval.",
        },
        {
          q: "How much does it cost?",
          a: "We quote after we have heard how your business works, because we build around your processes, not a standard package. Tell us your case and we will say where we would start.",
        },
      ],
    },
    cta: {
      title: "Which of these would help most?",
      line: "Tell us about your business and we will tell you where we would start.",
    },
  },

  sales: {
    meta: {
      title: "AI Systems for Sales: CRM, Lead Follow-up and DMs | Automis",
      description:
        "AI that answers every social comment and DM, calls back ad leads, qualifies with quizzes and runs your CRM. Live in 2 to 4 weeks. Book a call.",
    },
    hero: {
      eyebrow: "AI Systems for Sales",
      title: "Systems that let no lead go cold",
      highlight: "no lead",
      lead: "They answer right away, take each lead to an appointment and track it in your CRM, so your team only talks to people who are ready.",
    },
    moment: {
      label: "From message to CRM: the sales chain",
      steps: [
        { card: "social-dms", glyph: "chat", label: "Message" },
        { card: "lead-qualification", glyph: "sales", label: "Qualify" },
        { card: "lead-nurture", glyph: "repeat", label: "Follow-up" },
        { card: "custom-crm", glyph: "contact", label: "CRM" },
      ],
      result: { value: "2,329", unit: "conversations handled", src: "ADifesa · 1 May to 16 Sept 2026" },
    },
    // Illustrative examples for the visuals (no real data: made-up contacts, phone prefix of the page's country)
    dmDemo: {
      caption: "Illustrative example: from a comment to a record in the CRM",
      rows: ["Comment: “Can I get more information?”", "DM: a reply following your rules"],
      crmLabel: "Contact in the CRM",
      crmState: "✓ qualified",
    },
    crmDemo: {
      caption: "Illustrative example: your team's pipeline",
      cols: [
        { name: "New", cards: [["Contact 01", "+44 7•• ••• 214", "Information"], ["Contact 02", "+44 7•• ••• 251", "Quote"]] },
        { name: "Contacted", cards: [["Contact 03", "+44 7•• ••• 288", "Quote"]] },
        { name: "Interested", cards: [["Contact 04", "+44 7•• ••• 325", "Information"], ["Contact 05", "+44 7•• ••• 362", "Quote"]] },
        { name: "Booked", cards: [["Contact 06", "+44 7•• ••• 399", "Appointment"]] },
      ],
    },
    qualDemo: {
      caption: "Illustrative example: today's leads",
      rows: [["Wants to book", "→ to the team", true], ["Asks for information", "The system answers", false]],
    },
    cards: [
      {
        id: "social-dms",
        kicker: null,
        title: "Instagram and Facebook comments and DMs in your CRM",
        short: "Answers comments and DMs, then updates your CRM.",
        line: "Answers every comment and DM, qualifies the contact and writes it into your CRM.",
        more: "Leads slide into your social comments and DMs and get buried before anyone can follow up.",
        href: null,
        caseHref: "/use-cases/adifesa",
        price: null,
      },
      {
        id: "lead-callback",
        kicker: null,
        title: "Callbacks for ad leads",
        short: "Calls back anyone who leaves a number from an ad.",
        line: "Anyone who leaves a number from an ad gets a call back from a voice assistant, which asks your questions and offers an appointment.",
        more: "Someone who leaves a number from an ad wants an answer now. If they have to wait, they usually call someone else.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "lead-forms",
        kicker: null,
        title: "Forms and quizzes that qualify",
        short: "A quiz works out what they need and writes the lead into the CRM.",
        line: "A short quiz works out what the person filling it in needs, gives them a tailored result and writes the contact into the CRM with their answers and tags.",
        more: "A form that only collects a name and an email brings in leads you know nothing about. A quiz tells you who you are dealing with.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "lead-qualification",
        kicker: null,
        title: "Lead qualification and routing",
        short: "Scores leads on your criteria, routes them and gets them to book.",
        line: "Scores each lead against your criteria, routes the good ones to the right person and gets them to book.",
        more: "Your team spends time on unqualified leads and slow-walks the good ones.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "lead-nurture",
        kicker: null,
        title: "Leads that stay warm",
        short: "Keeps in touch with anyone who isn't ready yet.",
        line: "Anyone who isn't ready yet gets a sequence of emails, texts or WhatsApp messages, chosen for each contact and written by your rules.",
        more: "Many leads aren't ready right away, and without follow-up they forget you.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reactivation-sales",
        kicker: null,
        title: "Database reactivation",
        short: "SMS and email to get dormant contacts talking to you again.",
        line: "Sends personalized SMS and email sequences to contacts sitting idle in your database, to get them talking to you again.",
        more: "Your database holds contacts who never bought and whom nobody has called back.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "custom-crm",
        kicker: null,
        title: "Custom CRM",
        short: "A CRM built around how your team sells.",
        line: "A CRM built around how your team sells: every contact, what stage they are at and what to do next.",
        more: "Leads and customers end up scattered across spreadsheets, inboxes and people's memory.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "voice-notes",
        kicker: null,
        title: "Voice notes in your CRM",
        short: "A voice note becomes a CRM record.",
        line: "Record a voice note. It is transcribed, structured and written into the right CRM record.",
        more: "Notes from calls and site visits stay in your head or on scraps of paper and never reach the system.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "sales-qa",
        kicker: null,
        title: "Sales call quality control",
        short: "Scores your team's calls and points out where to improve.",
        line: "Listens to your team's calls, scores them against your criteria and tells you where to improve.",
        more: "No manager listens to every call, and the same mistakes repeat with nobody seeing them.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: {
      eyebrow: "Real case",
      title: "ADifesa",
      line: "Comments and DMs on Facebook and Instagram, answered and qualified: 2,329 conversations from 1 May to 16 September 2026 and 524 complete records. According to the association, 3 in 10 complete records become customers.",
      cta: "Read the case",
      href: "/use-cases/adifesa",
    },
    finder: {
      eyebrow: "Try it on us",
      title: "The sales system we use ourselves",
      line: "Answer a few questions about your business: the Opportunity Finder gives you a tailored roadmap, and you enter our CRM as a contact, with your answers and tags. It is the same path we build for your leads.",
      cta: "Try the Opportunity Finder",
      steps: ["Quiz about your business", "Tailored roadmap", "Contact in the CRM, with answers and tags"],
    },
    start: {
      eyebrow: "To get started",
      title: "What you need to begin",
      need: {
        label: "What we need from you",
        items: [
          "Access to the channels your leads come from: Instagram and Facebook pages, phone number, form.",
          "Your rules: what makes a good lead, what to reply.",
          "Who on your team receives the good leads.",
          "The CRM or spreadsheet you use today, if any.",
        ],
        outro: "We do the rest.",
      },
      times: {
        label: "Timing",
        text: "About 2 weeks for DM replies, lead callbacks and forms. About 4 for a custom CRM. We start once we have access.",
      },
      tools: {
        label: "Connects to",
        title: "The tools you already use",
        line: "If it has an API, we connect to it: you don't change what you use.",
        items: [
          { name: "HubSpot", src: "/assets/images/integrations/hubspot.svg" },
          { name: "Salesforce", src: "/assets/images/integrations/salesforce.svg" },
          { name: "WhatsApp", src: "/assets/images/integrations/whatsapp.svg" },
          { name: "Instagram", src: "/assets/images/integrations/instagram.svg" },
          { name: "Facebook", src: "/assets/images/integrations/facebook.svg" },
          { name: "Google Calendar", src: "/assets/images/integrations/googlecalendar.svg" },
          { name: "Google Sheets", src: "/assets/images/integrations/googlesheets.svg" },
        ],
      },
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Does it work with the CRM I already use?",
          a: "If your tool has an API, we connect to it: HubSpot and GoHighLevel, for example. If nothing fits, we build the CRM around how your team sells.",
        },
        {
          q: "Who answers comments and DMs, the AI or a person?",
          a: "The AI answers with your rules and writes the qualified contact into your CRM. Delicate cases go to a person on your team.",
        },
        {
          q: "Is my contacts' data safe?",
          a: "We work GDPR-first. Data can be stored on EU servers, and before we start we tell you which providers process what, and where.",
        },
        {
          q: "How long until it goes live?",
          a: "About 2 weeks for the simpler systems, like DM replies, lead callbacks and forms. About 4 for a custom CRM. The clock starts once we have access and your rules.",
        },
        {
          q: "How much does it cost?",
          a: "We quote after we have heard how your business works, because we build around your processes, not a standard package. Tell us your case and we will say where we would start.",
        },
      ],
    },
    cta: {
      title: "Where do your leads get lost?",
      line: "Tell us how your contacts reach you today. We will show you where a system would help.",
    },
  },

  support: {
    meta: {
      title: "AI Systems for Customer Service: Voice, Chat and Messages | Automis",
      description:
        "AI systems that answer your customers day and night: a voice receptionist, missed-call recovery, 24/7 chat answers and e-commerce customer service.",
    },
    hero: {
      eyebrow: "AI Systems for Customer Service",
      title: "Systems that answer your customers",
      highlight: "your customers",
      lead: "By phone, chat and message, day and night, with a person ready for whatever needs one.",
    },
    moment: {
      label: "From call to reply: the customer service chain",
      steps: [
        { card: "voice-receptionist", glyph: "voice", label: "Call" },
        { card: "missed-call-recovery", glyph: "phone", label: "Recovery" },
        { card: "answers-247", glyph: "clock", label: "Replies" },
        { card: "ecommerce-support", glyph: "cart", label: "Shop" },
      ],
      result: { value: "872", unit: "calls", src: "Clínica Santa Maria dos Olivais · 1 Feb to 9 Sept 2026" },
    },
    cards: [
      {
        id: "voice-receptionist",
        kicker: null,
        title: "AI voice receptionist",
        short: "Answers every call 24/7 and books the appointment.",
        line: "Answers every call 24/7, books the appointment and passes to your team what needs a person.",
        more: "Calls come in while you are with a client, after hours or at the weekend, and go to voicemail.",
        href: "/voice-ai",
        caseHref: "/use-cases/clinica-santa-maria",
        price: "From €297/month",
      },
      {
        id: "missed-call-recovery",
        kicker: null,
        title: "Missed-call recovery",
        short: "A missed call gets an instant text back.",
        line: "A missed call triggers a text that offers a callback or a booking link.",
        more: "A missed call is usually a lost customer who dials the next business on the list.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "answers-247",
        kicker: null,
        title: "24/7 answers",
        short: "Answers form, chat and WhatsApp inquiries at once.",
        line: "Answers form, chat and WhatsApp inquiries right away, day or night, and routes them.",
        more: "Whoever replies first usually wins the customer, but inquiries arrive at every hour.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "ecommerce-support",
        kicker: null,
        title: "E-commerce customer service",
        short: "Answers on WhatsApp, Instagram and email by your rules.",
        line: "Answers your customers on WhatsApp, Instagram and email by your rules. Delicate cases come to you.",
        more: "Customers write wherever they like, at any hour, and a store rarely has someone on every channel.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    chat: {
      title: "How it reads in a chat",
      header: "The practice's assistant",
      caption: "It is late in the evening and the office has been closed for hours.",
      messages: [
        { role: "customer", text: "Hi, do you have anything free this week for an appointment?" },
        { role: "assistant", text: "Hi, I'm the practice's virtual assistant, and I answer when the office is closed. I can offer Thursday morning or Friday afternoon. Which do you prefer?" },
        { role: "customer", text: "Friday afternoon works." },
        { role: "assistant", text: "Done, Friday afternoon is yours. You will get a confirmation here. Anything else?" },
        { role: "customer", text: "Yes, I'd like a refund on last month's invoice." },
        { role: "assistant", text: "That one needs a person. I have passed it to the team with the details, and they will reply when the office opens." },
      ],
    },
    case: {
      eyebrow: "Real case",
      title: "Clínica Santa Maria dos Olivais",
      line: "A voice assistant on a dental clinic's phone line: 872 calls from 1 February to 9 September 2026, 527 closed by the assistant and 114 appointments booked.",
      cta: "Read the case",
      href: "/use-cases/clinica-santa-maria",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "How much does the voice receptionist cost?",
          a: "Voice AI starts from €297/month. We quote the other support systems after we have heard how your business works, with no standard packages.",
        },
        {
          q: "How long until it goes live?",
          a: "About 2 to 4 weeks, depending on the system: about 2 for the simpler ones, about 4 for a custom CRM or a larger build. We agree the timeline with you before we start.",
        },
        {
          q: "What happens with delicate calls?",
          a: "They go to a person on your team. The AI handles the repetitive requests, and delicate cases come to you.",
        },
        {
          q: "What if it doesn't work for us?",
          a: "Every Voice AI plan has a 30-day performance guarantee. We take the risk of the first step.",
        },
      ],
    },
    cta: {
      title: "Who answers when you can't?",
      line: "Tell us where your customers reach you. We will show you what a system could take over.",
    },
  },

  admin: {
    meta: {
      title: "AI Systems for Admin: Documents, Back Office and Accounting | Automis",
      description:
        "AI systems for the back office: accounting management software, scan-to-brain for paper documents, document intake and sorting, and routine admin automation.",
    },
    hero: {
      eyebrow: "AI Systems for Admin",
      title: "Systems that run your back office",
      highlight: "your back office",
      lead: "Documents, data and routine tasks handled by AI, so your team can work on the work that matters.",
    },
    moment: {
      label: "From document to record: the admin chain",
      steps: [
        { card: "document-intake", glyph: "inbox", label: "Documents" },
        { card: "scan-to-brain", glyph: "scan", label: "Reading" },
        { card: "accounting-software", glyph: "receipt", label: "Invoices" },
        { card: "back-office", glyph: "repeat", label: "Back office" },
      ],
    },
    cards: [
      {
        id: "accounting-software",
        kicker: null,
        title: "Accounting management software",
        short: "Accounting built on your rules, including 74-ter.",
        line: "Accounting software built around your rules, for example the 74-ter VAT scheme for travel agencies.",
        more: "Special schemes like 74-ter ask for rules that generic accounting tools don't always follow.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "scan-to-brain",
        kicker: null,
        title: "Scan-to-Brain",
        short: "Reads scanned documents and makes them searchable.",
        line: "Reads scanned documents, pulls out the key fields and files them as data you can search.",
        more: "Paper forms, contracts and PDFs pile up as data nobody can search.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "document-intake",
        kicker: null,
        title: "Document intake and sorting",
        short: "Classifies, renames and files every incoming document.",
        line: "Reads each incoming document, classifies it, renames it and sends it to the right place.",
        more: "Incoming documents need someone to open, name and file each one.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "back-office",
        kicker: null,
        title: "Back-office automation",
        short: "Invoices, reminders and records updated on their own.",
        line: "Handles routine flows: drafts invoices, sends reminders and updates records across your tools.",
        more: "Invoices, reminders and status updates eat the day in small repetitive tasks.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: null,
    brain: {
      title: "Ask your documents",
      caption: "Sample documents, already scanned and filed. Tap a question.",
      windowTitle: "Document archive",
      sourceLabel: "Source",
      queries: [
        {
          q: "When does the warehouse lease end?",
          a: "The lease ends at the end of the year and renews on its own unless you give six months' notice.",
          sources: [{ doc: "Warehouse lease", where: "Scan · clause 4, term" }],
        },
        {
          q: "Where did I file the June supplier invoice?",
          a: "It is in Supplier invoices, in the June folder. I renamed it with the date and supplier, and the key details are on its record.",
          sources: [{ doc: "Supplier invoices", where: "Archive · June" }],
        },
        {
          q: "Has the supplier sent the delivery note yet?",
          a: "Yes, it arrived by email this morning. I read it, classed it as a delivery note and filed it with the others.",
          sources: [{ doc: "Delivery notes", where: "Received by email" }],
        },
      ],
    },
    crossLink: {
      title: "Company Brain",
      line: "A private archive over your documents, where your team asks and gets an answer with its source. You will find it on its own page.",
      cta: "See the Company Brain",
      href: "/systems/company-brain",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Are my documents safe?",
          a: "We work GDPR-first. Data can be stored on EU servers, and before we start we tell you which providers process what, and where.",
        },
        {
          q: "Does it work with paper documents?",
          a: "Yes. The system reads scanned documents, pulls out the key fields and files them as data you can search.",
        },
        {
          q: "Does it work with the software I already use?",
          a: "If your software has an API, we connect to it. Where standard tools don't follow your rules, like the 74-ter VAT scheme, we build the accounting software around them.",
        },
        {
          q: "Does anyone check the AI's work?",
          a: "Yes. A person oversees the results, delicate cases go to your team, and every month we improve the system.",
        },
      ],
    },
    cta: {
      title: "Which paperwork eats your week?",
      line: "Tell us what your team does by hand. We will show you what a system could take over.",
    },
  },

  "company-brain": {
    meta: {
      title: "Company Brain: AI that answers from your documents | Automis",
      description:
        "A private archive over your own documents: your team asks, it answers with the source, and you stop being the company manual. See how it works.",
    },
    hero: {
      eyebrow: "Company Brain",
      title: "Stop being your company's manual",
      highlight: "your company's manual",
      lead: "Your people ask and the archive answers, with the document it comes from. We set it up, and you decide where the data lives.",
    },
    cards: [
      {
        id: "company-brain",
        kicker: null,
        title: "Company Brain",
        short: "Ask the way you talk, get the answer with its source.",
        line: "A private archive over your documents: the people who work for you ask a question and get the answer, with the document it comes from.",
        more: "To find out how something is done, you have to track down the right person, and they aren't always available.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    brain: {
      title: "Ask the Brain",
      caption: "Sample company and documents. Tap a question.",
      placeholder: "Ask anything about the company",
      sourceLabel: "Source",
      queries: [
        {
          q: "How do I request a day off?",
          a: "Send the request in the HR tool. Your team lead approves it, then admin confirms it.",
          sources: [{ doc: "Staff handbook", where: "Holidays and leave" }],
        },
        {
          q: "Who do I send a supplier invoice to?",
          a: "Supplier invoices go to admin. Send the PDF with the order reference and they take it from there.",
          sources: [{ doc: "Admin procedures", where: "Supplier invoices" }],
        },
        {
          q: "Can I approve a customer refund myself?",
          a: "Within the standard limit, support can approve it directly. Above it, the manager has to approve.",
          sources: [{ doc: "Refund policy", where: "Approvals" }],
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Where does the Brain get its answers?",
          a: "From your company's documents. Every answer shows its source, so whoever asks can check it.",
        },
        {
          q: "Do my documents stay private?",
          a: "Yes. The Brain is private and works on your documents. We work GDPR-first, data can be stored on EU servers, and before we start we tell you which providers process what, and where.",
        },
        {
          q: "Who can use it?",
          a: "Anyone who works for you, at any hour. Before we start, we decide together who sees what.",
        },
        {
          q: "Do we need technical staff?",
          a: "No. We build, launch and maintain the system, and you use it. What we deliver is yours.",
        },
        {
          q: "How much does it cost and how long does it take?",
          a: "We quote after we have heard how your business works, and we agree the timeline with you before we start. There is no standard package.",
        },
      ],
    },
    cta: {
      title: "What stays in a few people's heads today?",
      line: "Tell us where your company's information lives and we will show you how to make it available to everyone.",
    },
  },
};

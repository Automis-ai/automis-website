/* Clínica Santa Maria dos Olivais case (EN). Same keys, same facts and same figures as use-case-clinica.it.js (the source of truth).
   Data window: February 1 to September 9, 2026 (the November-January calls were Automis tests and are not counted).
   Metadata and JSON-LD (with the FAQ) come from components/use-cases/clinica/meta.js, locale "en"; the FAQ below is word for word
   the one in that schema. */
export default {
  ui: {
    read: "Read the case",
    book: "Book a call",
    keyTag: "In seven months",
    keyTitle: "first visits for implants",
    sep: ",",
  },

  hero: {
    eyebrow: "Case study",
    title: "7 months on a dental clinic's phone line",
    highlight: "7 months",
    lead: "872 calls, 114 appointments and 527 calls the assistant closed without going through the receptionist.",
    client: "Clínica Santa Maria dos Olivais",
    logo: "/assets/images/client-logos/clinica-santa-maria.png",
  },

  start: {
    eyebrow: "1 · Where we started",
    title: "For a dental practice, the phone is everything",
    lead: "Callers who get no answer often don't call back. They try the next dentist.",
    cards: [
      { figure: "6", label: "dentists", line: "Each with their own specialties and their own days." },
      { figure: "1", label: "receptionist, on her own", line: "One for six dentists." },
      { figure: "About ten", label: "missed calls a day", line: "That's the clinic's own estimate: nobody counted them before." },
    ],
    trust: {
      tag: "The real obstacle",
      title: "The owner wasn't comfortable putting an AI on the phone with her patients",
      lines: ["And who could blame her: if the assistant gets it wrong, she's the one who looks bad."],
    },
  },

  trust: {
    eyebrow: "2 · Trust",
    title: "We started small, then she trusted it",
    lead: "We didn't try to win her over with a presentation.",
    chart: {
      title: "Calls per month",
      total: "872 in total",
      ariaLabel: "Calls the assistant received each month of 2026: February 81, March 45, April 50, May 34, June 154, July 168, August 275, September 65 (through the 9th).",
      months: [
        { label: "Feb", value: 81 },
        { label: "Mar", value: 45 },
        { label: "Apr", value: 50 },
        { label: "May", value: 34 },
        { label: "Jun", value: 154 },
        { label: "Jul", value: 168 },
        { label: "Aug", value: 275 },
        { label: "Sep", value: 65 },
      ],
      markAt: 4,
      mark: "June · Google Maps",
      year: "2026",
      note: "September through the 9th.",
    },
    phases: [
      {
        tag: "February to May",
        title: "Only the ads number",
        line: "Whoever calls that number has already seen the ad and knows what they want. If anything had gone wrong, we could have switched it off in an afternoon without anyone at the clinic noticing.",
      },
      {
        tag: "From June",
        title: "The Google Maps number",
        line: "The owner handed everything over to the system: the assistant's number went on Google Maps, the one anyone searching for the clinic finds.",
      },
    ],
    note: "In May the assistant answered 34 calls a month. In August, 275. It didn't get eight times better: the number people call changed.",
  },

  numbers: {
    eyebrow: "By the numbers",
    title: "February 1 to September 9, 2026",
    lead: "Production data.",
    label: "The case in numbers",
    items: [
      { figure: "872", label: "calls the assistant received", basis: "in seven months" },
      { figure: "527", label: "closed by the assistant, without reaching the receptionist", basis: "60% of calls" },
      { figure: "114", label: "appointments booked", basis: "all in the calendar" },
    ],
    split: {
      title: "Where the 872 calls went",
      parts: [
        { value: 527, label: "Closed by the assistant", pct: "60%" },
        { value: 223, label: "Passed to the receptionist", pct: "26%" },
        { value: 122, label: "Hung up within 10 seconds", pct: "14%" },
      ],
    },
    more: [
      { figure: "193", label: "came in after hours or while another call was in progress", basis: "22%" },
      { figure: "385", label: "different people it spoke with" },
      { figure: "1 min 37 s", label: "average length of a conversation" },
      { figure: "20.2", label: "hours of phone time handled" },
    ],
  },

  languages: {
    eyebrow: "Languages",
    title: "Six languages, and it switches on its own",
    lead: "Lisbon is a multicultural capital, and Portuguese alone doesn't cover everyone who calls.",
    chips: ["European Portuguese", "English", "Italian", "Spanish", "French", "German"],
    chipsNote: "And other languages too, if needed.",
    steps: [
      { n: "1", title: "It starts in Portuguese", line: "Every call starts in Portuguese." },
      { n: "2", title: "It switches right away", line: "If the caller changes language, or asks for another one, the assistant switches in its very next reply." },
      { n: "3", title: "Without a fuss", line: "It doesn't announce it, doesn't ask permission and doesn't transfer the call to anyone." },
    ],
  },

  agenda: {
    eyebrow: "The calendar",
    title: "Finding a free slot was already a job",
    lead: "Six dentists, none of them full-time. They work half-days and each one does different things.",
    week: {
      title: "Who's in, and when",
      ariaLabel: "Days of the week each treatment is available: orthodontics on Wednesday, pediatric dentist on Tuesday, root canals on Tuesday, Thursday and Friday, implants on Monday, Tuesday, Thursday and Friday.",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      rows: [
        { name: "Orthodontics", on: [2] },
        { name: "Pediatric dentist", on: [1] },
        { name: "Root canals", on: [1, 3, 4] },
        { name: "Implants", on: [0, 1, 3, 4] },
      ],
      note: "Monday to Friday, everyone on half-days. Implants follow the clinical director's schedule.",
    },
    match: {
      title: "Four things have to line up",
      lead: "Some treatments exist on only one day of the week. Finding the first free slot takes more than checking the calendar.",
      items: ["The treatment", "The dentist who does it", "The day that dentist is in", "A slot still open"],
    },
    words: {
      tag: "Before that",
      title: "Working out what the caller means",
      lines: [
        "Nobody on the phone says \"endodontics\": they say it hurts, a crown fell off, they want braces or a cleaning.",
        "There are twenty-one treatment types, and they have to be recognized from the way people talk, because that word decides which dentist the patient sees.",
      ],
      figure: "21",
      figureLabel: "treatment types",
    },
    search: {
      tag: "How it looks for a slot",
      title: "Two times at a time, then it stops",
      steps: [
        "It always offers two times: never just one, never a list.",
        "If neither works, it looks for two more further ahead, and never offers a rejected time again.",
        "If the calendar returns the same times, earlier times or nothing, it counts that as a logical failure and stops after two attempts.",
        "At that point it doesn't push: during opening hours it passes the call to the receptionist, after hours it offers a callback.",
      ],
      note: "A system that keeps querying a full calendar until something turns up is very easy to write, and the worst thing to put on a phone line.",
    },
  },

  urgent: {
    eyebrow: "Emergencies",
    title: "Where it has to say something uncomfortable",
    lead: "The clinic works by appointment only and has no emergency slots.",
    case: {
      tag: "Severe pain, broken tooth, swelling, bleeding",
      title: "It doesn't promise anything",
      line: "When the assistant realizes the caller has an emergency, it acknowledges it in one sentence and explains that the first slot could be tomorrow or a week away.",
    },
    ways: [
      { n: "A", title: "The first free slot", line: "The assistant offers the first free slot." },
      { n: "B", title: "The receptionist", line: "If the clinic is open, the call goes to her." },
    ],
    note: "Promising a same-day slot to someone in pain is easy to program and impossible to keep. That's the difference between a demo and a system that has been running for seven months.",
  },

  call: {
    eyebrow: "3 · A call",
    title: "A real call, from the request to the appointment",
    lead: "A call from June, translated from Portuguese and anonymized. The assistant works out what is needed, finds the right slot and offers two times.",
    tag: "Real call, anonymized",
    live: "A call",
    ariaLabel: "A real call, translated into English: a caller asks for a dental cleaning next Saturday, the assistant asks whether they are already a patient, collects name and phone number, offers two times and books the appointment.",
    lines: [
      { who: "p", text: "I'd like to book a cleaning for next Saturday." },
      { who: "a", text: "Of course, I can help you book a dental cleaning. Is this your first visit with us, or are you already a patient?" },
      { who: "p", text: "My name is [[John Smith]]." },
      { who: "a", text: "Thank you. Could you give me your phone number, please?" },
      { who: "p", text: "[[+351 957 41]] 847" },
      { who: "a", text: "Let me check availability for Saturday. I have room for a dental cleaning with the doctor on Saturday, June 6 at ten or at eleven. Does one of those work?" },
      { who: "p", text: "Yes, ten works." },
      { who: "a", text: "Your dental cleaning is booked for Saturday, June 6 at ten in the morning, with the doctor. Can I help you with anything else?" },
    ],
    who: { p: "Caller", a: "Assistant" },
    checksLabel: "Four things have to line up",
    checks: ["The treatment", "The dentist who does it", "The day that dentist is in", "A slot still open"],
    checkAt: [1, 5.4, 5.8, 6.2],
    done: "In the calendar",
  },

  detail: {
    eyebrow: "In detail",
    title: "Behind the scenes, if you want to see it",
    lead: "Languages, the dentists' calendar and emergencies.",
  },

  handoff: {
    eyebrow: "4 · The receptionist",
    title: "One call in four goes to the receptionist",
    lead: "223 out of 872. The assistant doesn't pass a call on just because the caller asks: it first asks why, and if it's something it can handle, it tries to handle it itself. It only transfers if the person insists.",
    table: {
      title: "Why the call is passed on",
      rows: [
        { label: "Insists on a person, after the assistant has tried", value: 111 },
        { label: "Implant cleaning: by clinic policy only the receptionist books it", value: 26 },
        { label: "Doesn't want the call recorded", value: 25 },
        { label: "Emergency or pain", value: 21 },
        { label: "Couldn't be classified", value: 40 },
      ],
      note: "Classified automatically from call summaries, so take these as indicative.",
    },
    own: {
      tag: "Everything else",
      title: "It handles it on its own",
      line: "Including canceling and rescheduling an appointment, which people usually assume has to go through a person.",
    },
    hidden: {
      tag: "A case we can't count",
      line: "The assistant offers times, the caller turns them down one after another, and after a few tries the call goes to the receptionist. It shows up too rarely in the summaries to put a number on it.",
    },
  },

  mistakes: {
    eyebrow: "5 · Mistakes",
    title: "What we got wrong, and fixed",
    lead: "If we only told you what went well, it would be an ad.",
    tags: { found: "The problem", fix: "How it ended" },
    items: [
      {
        title: "\"Assessment\" was too vague",
        found: "The word in the appointment menu was too vague, and the assistant booked patients with the wrong dentist.",
        fix: "We caught it on the second complaint and fixed it.",
      },
      {
        title: "A reassurance that planted doubt",
        found: "When someone asked to speak to a person, the line the assistant used to reassure them said it was an artificial intelligence, and planted exactly the doubt it was meant to remove.",
        fix: "We rewrote it in neutral terms.",
      },
      {
        title: "An update on the third attempt",
        found: "The latest update went live on the third attempt.",
        fix: "Our tests rejected the first two before they ever reached real calls.",
      },
    ],
  },

  estimate: {
    eyebrow: "6 · The list-price math",
    title: "What it's worth, at list price",
    lead: "These are the clinic's list prices, applied to what the assistant logged: for each appointment, the treatment and whether the patient was new. The revenue that comes out is calculated, so it's an estimate: only the clinic knows the real figure.",
    max: 57000,
    steps: [
      { label: "Appointments booked, at list price", value: 5200, text: "€5,200" },
      { label: "Treatments requested by new patients", value: 1400, text: "+€1,400" },
      { label: "Implants, assuming half of the 23 first visits become a treatment", value: 25400, text: "+€25,400" },
    ],
    total: { label: "List-price total over seven months", value: 32000, text: "about €32,000" },
    ceiling: "If every implant visit became a treatment: about €57,000",
    note: "Math on the clinic's price list. Implant visits are valued at the average of the treatments in the clinic's implant program, about €2,200 each: from €745 for a single implant to €4,800 for a full arch. New patients' first visit at €20, and no-shows are not subtracted. The implant part depends on how many visits turn into a treatment, and it's the only assumption in the calculation.",
    key: {
      figure: "23",
      label: "first visits for implants in seven months",
      line: "In our view it's the number that matters most. It's the most expensive part of the price list, and a single one turning into a full arch is worth almost €5,000.",
    },
  },

  faq: {
    eyebrow: "Frequently asked questions",
    title: "What people ask us most",
    items: [
      {
        q: "How many calls did the AI voice receptionist handle?",
        a: "From February 1 to September 9, 2026 it answered 872 calls: 527 were wrapped up without reaching the front desk, 223 were passed to the receptionist and 122 were hung up within the first 10 seconds. It booked 114 appointments.",
      },
      {
        q: "Which languages does it speak?",
        a: "It can answer in European Portuguese, English, Italian, Spanish, French and German, and in other languages too if needed. Every call starts in Portuguese, and if the caller uses another language the assistant switches in its next reply, without transferring the call.",
      },
      {
        q: "What happens when a patient calls with an emergency?",
        a: "The clinic has no emergency slots, and the assistant doesn't promise any. It acknowledges the problem, explains that the first slot could be tomorrow or a week away, and offers the first available slot or the front desk if the clinic is open.",
      },
      {
        q: "When does it hand the call to a person?",
        a: "When the caller insists on a person after the assistant has tried to help, for implant cleanings, when someone doesn't want the call recorded, and for emergencies. That happened on 223 calls out of 872.",
      },
      {
        q: "Where should you start with an AI voice receptionist?",
        a: "In our view, with a single line, the way we did here with the ads number: if something goes wrong you switch it off in an afternoon, and if it works you expand it.",
      },
    ],
  },

  cta: {
    title: "Do you run a clinic or a practice? Let's work out which part of the phone to start on",
    line: "Thirty minutes, and we'll tell you where we'd start.",
    more: { text: "If you'd like to see how it works before we talk,", label: "here's how the AI voice receptionist works", href: "/voice-ai" },
  },
};

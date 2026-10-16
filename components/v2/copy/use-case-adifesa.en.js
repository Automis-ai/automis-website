/* ADifesa case (EN). Same keys, same facts and same figures as use-case-adifesa.it.js (the source of truth).
   Data window: May 1 to September 16, 2026. The commercial outcome (3 records in 10 become clients) is the association's own figure,
   not ours. No revenue and no refunds: they are not our data.
   Metadata and JSON-LD (with the FAQ) come from components/use-cases/adifesa/meta.js, locale "en"; the FAQ below is word for word
   the one in that schema. */
export default {
  ui: {
    read: "Read the case",
    book: "Book a call",
    openShot: "Open the full screenshot",
    hoursTitle: "1,377 private messages after hours",
    sep: ",",
  },

  hero: {
    eyebrow: "Case study",
    title: "Five months in the comments on Facebook and Instagram",
    highlight: "Five months",
    lead: "2,329 conversations handled and 524 records complete with name, phone and email. Of those, 3 in 10 become clients.",
    client: "ADifesa association",
    logo: "/assets/images/client-logos/adifesa-mark.png",
  },

  start: {
    eyebrow: "1 · Where we started",
    title: "Under every ad there's a queue of people asking",
    lead: "ADifesa is a banking and financial protection association based in Lissone, Italy. It works for people who were charged costs they never owed on a salary-backed loan, a revolving credit card or a loan sold with an insurance policy, and it tries to get that money back.",
    cards: [
      { tag: "Who they are", title: "You pay only on what's recovered", line: "The assessment and the claim are free; the fee comes only out of what is recovered. The office is in Lissone, in Brianza, and cases are handled across Italy." },
      { tag: "What already worked", title: "The completed forms", line: "The Meta campaigns bring in completed forms, and that part was going well." },
      { tag: "The problem", title: "Everything around the forms", line: "Comments pile up under every ad, and direct requests land in the message inbox. These are people describing something private in public: how much they owe a bank." },
    ],
    who: {
      title: "Whoever writes there isn't just browsing",
      line: "They have just read the ad and want one thing: to know whether their case qualifies. If nobody answers for a day, they take that question somewhere else.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-2-messenger-apertura.png",
      alt: "Screenshot of ADifesa's message inbox, in Italian: the assistant replies to a comment and asks for phone, email and call-back times; the person replies on a Saturday evening.",
      caption: "A real screenshot of ADifesa's inbox, in Italian. At the top, Meta itself states that the conversation started from a comment. The person replies at 11:07 pm on a Saturday and leaves phone, email and call-back times. Name, photo and contacts are destroyed in the pixels.",
    },
  },

  flow: {
    eyebrow: "2 · From comment to record",
    title: "What happens after a comment",
    lead: "Someone comments under an ad. The automation replies in public, opens the private conversation and collects the details the adviser needs.",
    label: "The path, in four steps",
    steps: [
      { n: "1", title: "The comment", line: "The person writes under an ad or a post, on Facebook or Instagram." },
      { n: "2", title: "The public reply", line: "After a deliberate three-minute wait, the automation replies. If the comment contains a phone number, it hides it." },
      { n: "3", title: "The private message", line: "In parallel it opens the private conversation and asks for phone, email and the times to call back." },
      { n: "4", title: "The record", line: "Name, phone, email and product: what an adviser needs to pick up the phone." },
    ],
  },

  detail: {
    eyebrow: "In detail",
    title: "Behind the scenes, if you want to see it",
    lead: "Numbers in the open, Instagram and the cost of a viral post.",
  },

  rules: {
    eyebrow: "3 · The rules",
    title: "The job is working out whether the case qualifies",
    lead: "Anyone can reply \"message us privately\". The value is knowing whether there is a case, and the association's rules are tight.",
    stats: [
      { figure: "10", label: "active eligibility rules" },
      { figure: "5", label: "product types" },
      { figure: "11", label: "banks and lenders named" },
    ],
    list: {
      title: "Each rule has its own conditions",
      lead: "It isn't a keyword list: each rule has its own window of years and its own conditions.",
      rows: [
        ["Revolving cards", "opened between 2000 and 2017, with a wider window for two issuers"],
        ["Compass loan", "from 2011 to 2020"],
        ["Deutsche Bank or Findomestic loan", "from 2017 to 2022, above a certain amount"],
        ["Business credit line", "companies only, trading for five years and above twenty thousand euros"],
        ["Investment losses", "yes"],
        ["Cryptocurrency", "no"],
      ],
    },
    words: {
      title: "Before that, working out what's being discussed",
      lead: "Nobody writes \"salary-backed loan renewed in 2016\" in a comment. They write the way they talk, and from those words the system has to reach the right product, because the product decides whether a case exists.",
      pairs: [
        ["\"They withhold a fifth of my salary\"", "Salary-backed loan"],
        ["\"I have a card that never ends\"", "Revolving card"],
        ["\"They sold me insurance along with the loan\"", "Loan with insurance policy"],
      ],
    },
  },

  numbers: {
    eyebrow: "By the numbers",
    title: "May 1 to September 16, 2026",
    lead: "Production data.",
    label: "The case in numbers",
    funnel: [
      { figure: "2,329", label: "conversations handled across comments and private messages" },
      { figure: "1,033", label: "qualified contacts" },
      { figure: "524", label: "complete records: name, phone, email, product" },
      { figure: "3 in 10", label: "of those records become a client, with at least one case", note: "the association's figure" },
    ],
    funnelNote: "From comment to case. The last step is the association's figure, not ours.",
    focus: "The first number we look at isn't the total. It's the 524 complete records, which is what an adviser needs to pick up the phone already knowing what the call is about.",
    chart: {
      title: "Conversations per month",
      total: "2,329 in total",
      ariaLabel: "Conversations handled each month of 2026: May 523, June 470, July 760, August 355, September 221 (through the 16th).",
      months: [
        { label: "May", value: 523 },
        { label: "Jun", value: 470 },
        { label: "Jul", value: 760 },
        { label: "Aug", value: 355 },
        { label: "Sep", value: 221 },
      ],
      markAt: 2,
      mark: "July · Instagram",
      year: "2026",
      note: "From July, Instagram direct messages come in too. Volume follows the association's campaigns, which were scaled back from August. September through the 16th.",
    },
    rows: [
      ["Different people", "1,794"],
      ["Handed to a person", "111 (4.8%)"],
      ["Private messages received", "2,951"],
      ["Private replies written by the automation", "1,676"],
      ["Public replies under comments", "1,262"],
    ],
    origin: {
      title: "Where the 2,329 conversations came from",
      parts: [
        { value: 1065, label: "From a comment under an ad" },
        { value: 232, label: "From a comment under a post" },
        { value: 1032, label: "From a direct message" },
      ],
    },
  },

  hours: {
    eyebrow: "4 · After hours",
    title: "Half of these people write when the office is closed",
    lead: "Of the 2,951 private messages received, 1,377 came in outside working hours: 46.7%.",
    figure: "46.7%",
    figureLabel: "of private messages arrive after hours",
    parts: [
      { value: 850, label: "On weekdays", line: "before nine or after six" },
      { value: 527, label: "At the weekend", line: "Saturday and Sunday" },
    ],
    night: { value: 267, label: "between ten at night and seven in the morning" },
    line: "It's the easiest number in the project to underrate. It says almost half of these requests arrive when there is nobody there to read them. They come on the evenings and Sundays when someone sits down with their statements, and that is exactly when they decide to write.",
  },

  privacy: {
    eyebrow: "Numbers in the open",
    title: "A phone number under a post is a problem, not a lead",
    lead: "It happens a lot: someone types their phone number into the comment, in the open, and wants a call back. Meanwhile anyone passing by can read that number.",
    steps: [
      { n: "1", title: "The comment", line: "It contains a phone number or a sensitive detail." },
      { n: "2", title: "It hides it", line: "The automation treats it as an incident to close, not a lead to bank." },
      { n: "3", title: "It moves to private", line: "The conversation moves into private messages." },
    ],
    note: "This applies under ads and under organic posts, on Facebook and on Instagram.",
    wait: {
      figure: "3 minutes",
      title: "A deliberate wait",
      line: "Under comments, the public reply comes after three minutes. That isn't slowness: a reply that appears the same second someone finishes typing tells everyone there is a machine underneath.",
    },
  },

  handoff: {
    eyebrow: "5 · The person",
    title: "111 conversations out of 2,329 were handed to a person",
    lead: "Fewer than one in twenty. The automation closed everything else on its own.",
    figure: "4.8%",
    figureLabel: "handed to a person",
    control: {
      tag: "Control stays with the client",
      title: "It switches off one conversation at a time",
      line: "This is the piece a demo never shows. From the control panel, the association switches the automation off on a single conversation and carries on by hand, without touching the others. From that moment the chat is theirs and the bot stays out of it.",
    },
    fee: {
      tag: "No dancing around the fee",
      title: "It answers in public",
      line: "The association does get paid, as a percentage of what it recovers. In the comments, \"what does this cost me\" comes up every day, often with an edge to it. The reply says the assessment and the claim are free and that you pay only if the refund arrives, and it doesn't try to move the question into private. With an audience that has heard too many promises already, an evasive answer is worth less than nothing.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-1-facebook-commenti.png",
      alt: "Comments under an ADifesa post, in Italian: the question about cost and the assistant's public reply.",
      zoom: { ratio: "779 / 330", z: 1.12, x: 100, y: 90 },
      caption: "Real comments under a post from September 18, 2026, in Italian. The question about cost comes in public, and the answer stays in public. Names and photos are destroyed in the pixels.",
    },
  },

  instagram: {
    eyebrow: "Instagram",
    title: "Instagram came later, and it shows",
    lead: "The project started on Facebook. Instagram direct messages took an extra step: five permissions to be approved by Meta, each with a demonstration video.",
    steps: [
      { n: "May", title: "The first submission", line: "It didn't go through." },
      { n: "May 28", title: "Five videos re-shot", line: "With a different method, showing the chain of identity between the Meta portal and the system. This time it went through." },
    ],
    odd: {
      tag: "A detail worth the story on its own",
      line: "Meta asked for a demonstration of a function that doesn't exist in its own API: editing an Instagram comment. You can create, hide or delete one; you cannot edit it. The demonstration was rewritten around what the API actually does.",
    },
    chart: {
      title: "Qualified contacts from Instagram",
      ariaLabel: "Qualified contacts coming from Instagram: May 6, June 29, July 117, August 22, September 6 (through the 16th).",
      months: [
        { label: "May", value: 6 },
        { label: "Jun", value: 29 },
        { label: "Jul", value: 117 },
        { label: "Aug", value: 22 },
        { label: "Sep", value: 6 },
      ],
      note: "September through the 16th.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-3-instagram-dm.png",
      alt: "Instagram direct message, in Italian, with the assistant's replies: the record is completed in three replies.",
      caption: "An Instagram direct message, August 24, 2026, in Italian. The purple bubbles are how the inbox tells Instagram apart from Messenger. The record is completed in three replies: phone and times first, then the email.",
    },
  },

  cost: {
    eyebrow: "The cost",
    title: "The post that cost eighteen dollars a day",
    lead: "In July one of the association's posts went viral in the worst way: thousands of angry political comments, not one of them a case to take on.",
    problem: {
      figure: "About $18",
      label: "a day, answering nobody",
      line: "The automation read them one by one and correctly classified them as irrelevant, but to know that it had to call the model first.",
    },
    fix: {
      tag: "The fix",
      title: "A counter, not stricter filters",
      line: "Every post keeps a tally of the comments seen and how many turned out to be spam. Past a threshold, that single post is muted and its comments stop reaching the model.",
    },
    stats: [
      { figure: "257", label: "posts tracked, in the window observed" },
      { figure: "37", label: "muted, in the window observed" },
    ],
    safe: {
      tag: "It doesn't go blind",
      line: "A muted post still lets through the words that point to a real product, like the name of a lender or \"salary-backed loan\".",
      test: "We checked it against real comments, not invented examples, before it went live: no good case lost out of thirty-five tried, and all ten genuine leads recognized.",
    },
  },

  mistakes: {
    eyebrow: "6 · Mistakes",
    title: "What we got wrong, and fixed",
    lead: "If we only told you what worked, it would be an ad.",
    tags: { found: "The problem", fix: "How it ended" },
    items: [
      {
        title: "\"They withhold a fifth of my salary\" was landing in spam",
        found: "The filter discarded anyone talking about a fraction of their salary, to keep out generic venting. But a fifth is literally a fifth: the association's main product was being mistaken for noise.",
        fix: "Fixed.",
      },
      {
        title: "The opening message went out twice",
        found: "Someone already in a chat, coming back to comment under an ad, received a second \"how can we help you?\".",
        fix: "Now if the conversation is already open, the second message doesn't go out.",
      },
      {
        title: "Reels shared in private restarted the bot",
        found: "Instagram sends a shared video as a message with no text, and the automation replied to every share.",
        fix: "Now an attachment with no words gets no reply.",
      },
      {
        title: "On Instagram every contact was called \"User c168f1\"",
        found: "The name was being read from a field that doesn't exist on Instagram.",
        fix: "Fixed, and the old names recovered: from 33 nameless contacts down to 4.",
      },
    ],
  },

  clients: {
    eyebrow: "7 · Clients",
    title: "How many of those contacts become clients",
    lead: "Our database stops at the complete record. What happens next, once the adviser calls, only the association knows, so we asked them.",
    figure: "3 in 10",
    figureLabel: "complete records that become clients, with at least one case opened",
    line: "It's their number, out of their system rather than ours, and we report it as they gave it to us. It isn't 30% of everyone who comments: it's 30% of the people who reached the end of the conversation and left a name, a phone number, an email and a product.",
    limits: {
      tag: "What these numbers don't say",
      lines: [
        "We don't count the human work after a handover, because from that point the conversation continues inside Meta's own tools and not in our system. And the outcome of the eligibility check isn't recorded as such: the adviser makes that call, with the documents in hand.",
        "How many refunds came through after that, and for how much, is not our figure and doesn't belong here. A case study that promises revenue without holding the revenue figure is an ad in disguise.",
      ],
    },
  },

  faq: {
    eyebrow: "Frequently asked questions",
    title: "What people ask us most",
    items: [
      {
        q: "How many conversations did the automation handle?",
        a: "From May 1 to September 16, 2026 it handled 2,329 conversations across comments and private messages on Facebook and Instagram, with 1,794 different people. They produced 1,033 qualified contacts and 524 records complete with name, phone and email.",
      },
      {
        q: "Does it answer public comments too, or only private messages?",
        a: "Both. Under a public comment it replies after a deliberate three-minute wait, and opens the private conversation in parallel. In the window observed it wrote 1,262 public replies and 1,676 private messages.",
      },
      {
        q: "What happens if someone posts their phone number in a comment?",
        a: "The comment is hidden and the conversation moves into private messages. A phone number sitting in the open under an ad is a risk to the person who wrote it, not a lead to collect.",
      },
      {
        q: "When does a person step in?",
        a: "Whenever the client decides: from the control panel the automation is switched off on that single conversation and the team carries on by hand. It happened on 111 conversations out of 2,329, fewer than one in twenty.",
      },
      {
        q: "How many of those contacts become clients?",
        a: "According to the association, 3 out of every 10 complete records become clients with at least one case opened. That is their figure, from their system: our database stops at the complete record, meaning name, phone, email and product.",
      },
      {
        q: "How long does it take to set up?",
        a: "It depends on how well defined the rules are. The long part isn't the software, it's writing down exactly when a case qualifies and when it doesn't: here that meant ten rules with windows of years, minimum amounts and named lenders. For Instagram direct messages, factor in Meta's approval of the permissions as well.",
      },
    ],
  },

  cta: {
    title: "Do you run campaigns on Meta? There's already a queue of people under your ads asking you something",
    line: "The question is whether your rules are written well enough for someone else to answer in your place. Thirty minutes, and we'll tell you where we'd start.",
    more: { text: "If you'd like to see how we work before we talk,", label: "here's how we build automations", href: "/how-we-work" },
  },
};

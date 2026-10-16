import "@/components/v2/ui/v2.css";
import "./woocommerce.css";
import "./shopify.css";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CardGrid from "@/components/v2/ui/CardGrid";
import SystemCard from "@/components/v2/ui/SystemCard";
import Steps from "@/components/v2/ui/Steps";
import CtaBand from "@/components/v2/ui/CtaBand";
import { pageClass } from "@/components/v2/ui/toneClass";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import { addLangPrefix } from "@/lib/locales";

/*
  Landing Shopify (IT 14/10/2026; EN e PT dall'italiano, stesse sezioni e stesse voci): come la WooCommerce, da file statico (public/ecommerce-static/shopify, ancora raggiungibile
  su /it/ecommerce/shopify-prima) a rotta del sito, con lo stesso header, lo stesso footer e gli stessi componenti v2/v3.
  Testi invariati rispetto alla landing di prima. Differenza voluta con la WooCommerce: qui non c'è un caso su Shopify
  (il primo negozio pilota non è partito), quindi niente prove: la pagina non cita clienti né dice «in produzione».
  Resta non indicizzata finché non c'è il pilota.
*/
const BOOKING = {
  it: "https://api.leadconnectorhq.com/widget/bookings/automis-it",
  en: "https://api.leadconnectorhq.com/widget/bookings/discover-automis",
  pt: "https://api.leadconnectorhq.com/widget/bookings/pt-automis",
};
const SIDEKICK_GUIDE = "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/sidekick/features";

const COPY = {
  it: {
    hero: {
      eyebrow: "Per negozi Shopify che fanno pubblicità",
      title: "Dove Sidekick finisce, iniziamo noi.",
      highlight: "iniziamo noi",
      lead: "Sidekick, l'assistente IA di Shopify, ti lascia una lista di cose da fare. Se non hai tempo, resta lì. I nostri agenti IA se ne occupano ogni notte, anche fuori da Shopify, e al mattino trovi il riepilogo.",
      cta: "Prenota il check-up gratuito",
    },
    outside: {
      title: "E lavoriamo dove Sidekick non arriva.",
      lead: "Sidekick lavora dentro Shopify e non parla con i tuoi clienti. Annunci, catalogo di Meta e conto in banca restano fuori.",
      items: [
        { icon: "target", title: "Paghi gli annunci di un prodotto che non hai più.", line: "Ogni notte incrociamo campagne e scorte. Taglia finita? Abbiamo già preparato lo stop all'annuncio: confermi tu." },
        { icon: "chat", title: "Ti scrivono su WhatsApp, Instagram, email. E chiamano.", line: "Rispondiamo ovunque con le tue regole. I casi delicati arrivano a te." },
        { icon: "database", title: "Il catalogo che vede Meta non è quello del negozio.", line: "Ogni notte confrontiamo catalogo, prezzi e disponibilità. Le differenze arrivano con la correzione pronta." },
        { icon: "receipt", title: "Meta ti dice che gli annunci rendono. Il conto in banca non sempre è d'accordo.", line: "Ogni mese dividiamo quello che hai incassato su Shopify per quello che hai speso in annunci: il ritorno vero, non quello che Meta si attribuisce." },
      ],
    },
    sidekick: {
      title: "Quello che Sidekick fa già, non te lo facciamo pagare.",
      lead: "Le fa bene, e noi non le rifacciamo.",
      headLeft: "Lo fa già Sidekick",
      headRight: "Da noi costa",
      price: "0 €",
      items: [
        "Scrive descrizioni dei prodotti e testi di marketing",
        "Crea automazioni di Flow descrivendole a parole",
        "Cambia le impostazioni del tema",
        "Prepara report e risponde a domande sul negozio",
      ],
      noteBefore: "Funzioni verificate il 10 ottobre 2026 sulla",
      noteLink: "guida ufficiale di Shopify",
      noteAfter: ". Sidekick non cambia nulla senza la tua approvazione.",
    },
    how: {
      title: "All'inizio controlliamo noi ogni azione. Poi quelle sicure partono da sole.",
      steps: [
        { title: "Check-up gratuito", line: "Ci dai l'indirizzo del negozio. Ti diciamo cosa non va e quanto ti costa." },
        { title: "Rodaggio", line: "Per i primi 30-60 giorni ogni azione passa da noi prima di partire. Tu vedi tutto." },
        { title: "Autonomia, un'azione alla volta", line: "Un'azione diventa automatica solo dopo tante approvazioni senza correzioni." },
        { title: "Se vuoi, lo fai tuo", line: "Paghi un canone mensile. Se un giorno vuoi fare da solo, lo riscatti, come con un leasing." },
      ],
      rulesTitle: "Tre controlli su ogni azione",
      rules: [
        { icon: "shield", title: "Una regola fissa blocca", line: "Prezzi, rimborsi e resi mai da soli." },
        { icon: "search", title: "Un'altra IA rilegge", line: "Le azioni, prima che partano." },
        { icon: "check", title: "Tu approvi", line: "Quello che costa, con un ok." },
      ],
    },
    cta: {
      title: "Il tuo negozio Shopify, seguito 24 ore su 24.",
      line: "È come avere un team che guarda il negozio giorno e notte, fatto di agenti IA. Sidekick resta dove è bravo. Gli agenti seguono annunci, clienti, catalogo e incassi, e ti scrivono solo quando serve.",
      button: "Prenota il check-up gratuito",
    },
    back: "← Torna alla pagina e-commerce",
  },
  en: {
    hero: {
      eyebrow: "For Shopify stores that run ads",
      title: "Where Sidekick ends, we begin.",
      highlight: "we begin",
      lead: "Sidekick, Shopify's AI assistant, leaves you a to-do list. If you don't have time, it just sits there. Our AI agents take care of it every night, including outside Shopify, and in the morning you find the summary.",
      cta: "Book your free check-up",
    },
    outside: {
      title: "And we work where Sidekick can't reach.",
      lead: "Sidekick works inside Shopify and doesn't talk to your customers. Ads, the Meta catalog and your bank account stay outside.",
      items: [
        { icon: "target", title: "You're paying for ads on a product you no longer have.", line: "Every night we cross-check campaigns against stock. Size sold out? We've already prepared the ad stop: you confirm." },
        { icon: "chat", title: "Customers write on WhatsApp, Instagram, email. And they call.", line: "We reply everywhere, following your rules. Sensitive cases come to you." },
        { icon: "database", title: "The catalog Meta sees isn't the one in your store.", line: "Every night we compare catalog, prices and availability. Differences reach you with the fix ready." },
        { icon: "receipt", title: "Meta says your ads are working. Your bank account doesn't always agree.", line: "Every month we divide what you collected on Shopify by what you spent on ads: the real return, not the one Meta credits itself." },
      ],
    },
    sidekick: {
      title: "What Sidekick already does, we won't charge you for.",
      lead: "It does them well, and we don't redo them.",
      headLeft: "Sidekick already does it",
      headRight: "With us it costs",
      price: "€0",
      items: [
        "Writes product descriptions and marketing copy",
        "Builds Flow automations from a plain-language description",
        "Changes theme settings",
        "Prepares reports and answers questions about the store",
      ],
      noteBefore: "Features checked on October 10, 2026 against",
      noteLink: "Shopify's official guide",
      noteAfter: ". Sidekick doesn't change anything without your approval.",
    },
    how: {
      title: "At first we check every action ourselves. Then the safe ones run on their own.",
      steps: [
        { title: "Free check-up", line: "You give us your store's address. We tell you what's wrong and what it's costing you." },
        { title: "Trial run", line: "For the first 30-60 days every action goes through us before it runs. You see everything." },
        { title: "Autonomy, one action at a time", line: "An action becomes automatic only after many approvals without corrections." },
        { title: "If you want, make it yours", line: "You pay a monthly fee. If one day you want to go it alone, you buy it out, like a lease." },
      ],
      rulesTitle: "Three checks on every action",
      rules: [
        { icon: "shield", title: "A fixed rule blocks", line: "Prices, refunds and returns are never handled automatically." },
        { icon: "search", title: "Another AI reviews", line: "The actions, before they run." },
        { icon: "check", title: "You approve", line: "Anything that costs money, with one OK." },
      ],
    },
    cta: {
      title: "Your Shopify store, watched 24 hours a day.",
      line: "It's like having a team watching the store day and night, made of AI agents. Sidekick stays where it's good. The agents follow ads, customers, catalog and revenue, and write to you only when needed.",
      button: "Book your free check-up",
    },
    back: "← Back to the e-commerce page",
  },
  pt: {
    hero: {
      eyebrow: "Para lojas Shopify que fazem publicidade",
      title: "Onde o Sidekick acaba, começamos nós.",
      highlight: "começamos nós",
      lead: "O Sidekick, o assistente de IA da Shopify, deixa-lhe uma lista de tarefas. Se não tiver tempo, fica lá parada. Os nossos agentes de IA tratam disso todas as noites, mesmo fora da Shopify, e de manhã encontra o resumo.",
      cta: "Marque o diagnóstico gratuito",
    },
    outside: {
      title: "E trabalhamos onde o Sidekick não chega.",
      lead: "O Sidekick trabalha dentro da Shopify e não fala com os seus clientes. Anúncios, catálogo do Meta e conta bancária ficam de fora.",
      items: [
        { icon: "target", title: "Está a pagar anúncios de um produto que já não tem.", line: "Todas as noites cruzamos campanhas e stock. Tamanho esgotado? Já deixámos preparada a paragem do anúncio: a confirmação é sua." },
        { icon: "chat", title: "Escrevem-lhe no WhatsApp, no Instagram, por email. E ligam.", line: "Respondemos em todo o lado, com as suas regras. Os casos delicados chegam a si." },
        { icon: "database", title: "O catálogo que o Meta vê não é o da loja.", line: "Todas as noites comparamos catálogo, preços e disponibilidade. As diferenças chegam com a correção pronta." },
        { icon: "receipt", title: "O Meta diz-lhe que os anúncios rendem. A conta bancária nem sempre concorda.", line: "Todos os meses dividimos o que cobrou na Shopify pelo que gastou em anúncios: o retorno verdadeiro, não o que o Meta atribui a si próprio." },
      ],
    },
    sidekick: {
      title: "O que o Sidekick já faz, não lhe cobramos.",
      lead: "Fá-las bem, e nós não as refazemos.",
      headLeft: "O Sidekick já faz",
      headRight: "Connosco custa",
      price: "0 €",
      items: [
        "Escreve descrições de produtos e textos de marketing",
        "Cria automatismos no Flow descrevendo-os por palavras",
        "Altera as definições do tema",
        "Prepara relatórios e responde a perguntas sobre a loja",
      ],
      noteBefore: "Funcionalidades verificadas a 10 de outubro de 2026 no",
      noteLink: "guia oficial da Shopify",
      noteAfter: ". O Sidekick não altera nada sem a sua aprovação.",
    },
    how: {
      title: "No início, controlamos nós cada ação. Depois, as seguras arrancam sozinhas.",
      steps: [
        { title: "Diagnóstico gratuito", line: "Dá-nos o endereço da loja. Dizemos-lhe o que está mal e quanto lhe custa." },
        { title: "Período de rodagem", line: "Nos primeiros 30-60 dias, cada ação passa por nós antes de arrancar. Vê tudo." },
        { title: "Autonomia, uma ação de cada vez", line: "Uma ação só passa a automática depois de muitas aprovações sem correções." },
        { title: "Se quiser, fica sua", line: "Paga uma mensalidade. Se um dia quiser fazer sozinho, resgata-o, como num leasing." },
      ],
      rulesTitle: "Três controlos em cada ação",
      rules: [
        { icon: "shield", title: "Uma regra fixa bloqueia", line: "Preços, reembolsos e devoluções nunca são feitos sozinhos." },
        { icon: "search", title: "Outra IA relê", line: "As ações, antes de arrancarem." },
        { icon: "check", title: "A aprovação é sua", line: "O que custa dinheiro, com um ok." },
      ],
    },
    cta: {
      title: "A sua loja Shopify, acompanhada 24 horas por dia.",
      line: "É como ter uma equipa a vigiar a loja de dia e de noite, feita de agentes de IA. O Sidekick fica onde é bom. Os agentes acompanham anúncios, clientes, catálogo e receitas, e só lhe escrevem quando for preciso.",
      button: "Marque o diagnóstico gratuito",
    },
    back: "← Voltar à página de e-commerce",
  },
};

export default function ShopifyPage({ tono, locale = "it" }) {
  const c = COPY[locale] || COPY.en;
  const booking = BOOKING[locale] || BOOKING.en;

  return (
    <main id="main" className={`${pageClass(tono)} hsp`}>
      <SmoothScroll />
      <PageStory />
      <PageHeroV3
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        highlight={c.hero.highlight}
        lead={c.hero.lead}
        extra={
          <>
            <div className="hv3-ctas">
              <a className="hv3-btn hv3-btn--p" href={booking} target="_blank" rel="noopener">
                {c.hero.cta} <span aria-hidden="true">&nbsp;→</span>
              </a>
            </div>
          </>
        }
      />

      <Section tone="deep" id="fuori" aria-labelledby="shop-outside">
        <SectionHeader id="shop-outside" title={c.outside.title} lead={c.outside.lead} />
        <CardGrid cols={2}>
          {c.outside.items.map((o) => (
            <SystemCard key={o.title} icon={o.icon} title={o.title} line={o.line} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="light" aria-labelledby="shop-sidekick">
        <SectionHeader id="shop-sidekick" align="center" title={c.sidekick.title} lead={c.sidekick.lead} />
        <ul className="hsp-sheet" data-fx="stagger">
          <li className="hsp-sheet__head" aria-hidden="true">
            <span>{c.sidekick.headLeft}</span>
            <span>{c.sidekick.headRight}</span>
          </li>
          {c.sidekick.items.map((s) => (
            <li key={s} className="v2-card hsp-sheet__row">
              <span>{s}</span>
              <b>{c.sidekick.price}</b>
            </li>
          ))}
        </ul>
        <p className="hwc-small">
          {c.sidekick.noteBefore}{" "}
          <a href={SIDEKICK_GUIDE} target="_blank" rel="noopener">
            {c.sidekick.noteLink}
          </a>
          {c.sidekick.noteAfter}
        </p>
      </Section>

      <Section tone="deep" aria-labelledby="shop-how">
        <SectionHeader id="shop-how" title={c.how.title} />
        <Steps items={c.how.steps} />
        <h3 className="hwc-rules__title">{c.how.rulesTitle}</h3>
        <CardGrid cols={3}>
          {c.how.rules.map((r) => (
            <SystemCard key={r.title} icon={r.icon} title={r.title} line={r.line} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand tone="dark" blue title={c.cta.title} line={c.cta.line} button={{ label: c.cta.button, href: booking, external: true }} />

      <Section tone="dark" pad="sm" width="narrow">
        <p className="hwc-small">
          <a href={addLangPrefix("/ecommerce", locale)}>{c.back}</a>
        </p>
      </Section>
    </main>
  );
}

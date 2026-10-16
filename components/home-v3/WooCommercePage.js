import "@/components/v2/ui/v2.css";
import "@/components/v2/use-cases/use-cases.css";
import "./woocommerce.css";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CardGrid from "@/components/v2/ui/CardGrid";
import SystemCard from "@/components/v2/ui/SystemCard";
import Steps from "@/components/v2/ui/Steps";
import CtaBand from "@/components/v2/ui/CtaBand";
import Button from "@/components/v2/ui/Button";
import { pageClass } from "@/components/v2/ui/toneClass";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import { DaturaOpsScene, DaturaNumbers } from "@/components/home-v3/DaturaScenesV3";
import { getDaturaCopy } from "@/components/v2/use-cases/daturaCopy";
import { DATURA_SLUG } from "@/components/v2/use-cases/constants";
import { addLangPrefix } from "@/lib/locales";

/*
  Landing WooCommerce (IT 14/10/2026; EN e PT dall'italiano, stesse sezioni e stesse voci): era un file statico (public/ecommerce-static/woocommerce, ancora raggiungibile su
  /it/ecommerce/woocommerce-prima), ora è una rotta del sito, con lo stesso header e lo stesso footer delle altre pagine.
  La prova viene dal caso Datura Clothing: la scena del presidio e i tre numeri sono quelli del caso (components/v2/copy/use-case-datura.it.js),
  nessuna cifra scritta qui. Il resto dei testi è quello della landing di prima.
*/
const BOOKING = {
  it: "https://api.leadconnectorhq.com/widget/bookings/automis-it",
  en: "https://api.leadconnectorhq.com/widget/bookings/discover-automis",
  pt: "https://api.leadconnectorhq.com/widget/bookings/pt-automis",
};

const COPY = {
  it: {
    hero: {
      eyebrow: "Per negozi WooCommerce",
      title: "Chi guarda il tuo WooCommerce mentre dormi?",
      highlight: "WooCommerce",
      lead: "Email che non partono, catalogo Meta che non combacia, attività ferme per settimane: di solito nessuno ti avvisa. Su Datura Clothing una cosa così è durata 23 giorni. Oggi i nostri agenti IA controllano il negozio ogni notte.",
      cta: "Prenota il check-up gratuito",
      note: "Gratis. Scegli giorno e ora: ti diciamo cosa non va e quanto ti costa. Serve un accesso di sola lettura (può guardare, non toccare).",
    },
    who: {
      title: "Ognuno guarda il suo pezzo. Nessuno guarda il negozio.",
      lead: "Hosting, sito, annunci, email: ogni fornitore controlla la sua parte. Quando una cosa si ferma, nessuno se ne accorge.",
      rows: [
        { who: "Hosting", does: "Tiene acceso il server.", blind: "Non vede se il checkout funziona" },
        { who: "Chi mantiene il sito", does: "Aggiorna i plugin ogni tanto.", blind: "Non controlla cosa si rompe dopo" },
        { who: "Chi gestisce gli annunci", does: "Guarda Meta.", blind: "Non vede il catalogo che non combacia" },
        { who: "Il plugin delle email", does: "Dice «pubblicata».", blind: "Non dice se parte davvero" },
        { who: "Tu", does: "Hai un negozio da far crescere.", blind: "Lo scopri quando scrive un cliente" },
      ],
      note: "Esempi di come va di solito. Il tuo negozio può essere diverso.",
    },
    caso: {
      eyebrow: "Caso reale · Datura Clothing",
      honestTitle: "Dove non è andata bene.",
      honest: "Il 4 settembre un nostro controllo sbagliato ha annullato un aggiornamento di WooCommerce che era andato bene. Prima di riprovare, lo stringiamo.",
      link: "Leggi il caso completo",
    },
    breaks: {
      title: "Dove si rompe senza dirtelo.",
      lead: "Un negozio WooCommerce è fatto di tanti pezzi collegati. Quando uno si ferma, di solito non c'è nessun errore.",
      items: [
        { icon: "clock", title: "Le attività programmate si fermano e nessun errore te lo dice.", line: "Ogni notte verifichiamo che email, catalogo e scadenze partano davvero." },
        { icon: "repeat", title: "I plugin si aggiornano ogni tanto, senza controllare il dopo.", line: "Aggiorniamo di notte e verifichiamo il sito dopo ogni aggiornamento. Se qualcosa si rompe, si torna indietro: lo decide una regola fissa, non un'IA." },
        { icon: "database", title: "Il catalogo che vede Meta non è quello del negozio.", line: "Ogni notte rigeneriamo il catalogo e controlliamo prodotti, prezzi e sconti." },
        { icon: "web", title: "Il sito rallenta e dai la colpa a chi non c'entra.", line: "Ogni 5 minuti una sentinella, un controllo automatico, guarda se risponde. Se si blocca, leggiamo i registri del server e troviamo la causa." },
      ],
    },
    how: {
      title: "All'inizio controlliamo noi ogni azione. Poi quelle sicure partono da sole.",
      steps: [
        { title: "Check-up gratuito", line: "Ci dai l'indirizzo del negozio e un accesso di sola lettura. Ti diciamo cosa non va e quanto ti costa." },
        { title: "Rodaggio", line: "Per i primi 30-60 giorni ogni azione passa da noi prima di partire. Tu vedi tutto." },
        { title: "Autonomia, un'azione alla volta", line: "Un'azione diventa automatica solo dopo tante approvazioni senza correzioni." },
        { title: "Se vuoi, lo fai tuo", line: "Paghi un canone mensile. Se un giorno vuoi fare da solo, lo riscatti, come con un leasing." },
      ],
      rulesTitle: "Tre regole su ogni azione",
      rules: [
        { icon: "shield", title: "Una regola fissa decide", line: "Ripristini, prezzi e rimborsi mai a un'IA." },
        { icon: "check", title: "Si verifica dopo", line: "Dopo ogni modifica il sito viene controllato." },
        { icon: "repeat", title: "Tu approvi", line: "Quello che costa o tocca il negozio." },
      ],
    },
    cta: {
      title: "Il tuo WooCommerce, seguito 24 ore su 24.",
      line: "È come avere un team che guarda il negozio giorno e notte, fatto di agenti IA. Una sentinella lo controlla ogni 5 minuti, un giro di controlli lo verifica ogni notte, e gli agenti ti scrivono solo quando serve.",
      button: "Prenota il check-up gratuito",
    },
  },
  en: {
    hero: {
      eyebrow: "For WooCommerce stores",
      title: "Who's watching your WooCommerce while you sleep?",
      highlight: "WooCommerce",
      lead: "Emails that don't go out, a Meta catalog that doesn't match, scheduled tasks stopped for weeks: usually nobody tells you. At Datura Clothing something like that lasted 23 days. Today our AI agents check the store every night.",
      cta: "Book your free check-up",
      note: "Free. Pick a day and time: we tell you what's wrong and what it's costing you. We need read-only access (it can look, not touch).",
    },
    who: {
      title: "Everyone watches their own piece. Nobody watches the store.",
      lead: "Hosting, site, ads, email: each provider checks its own part. When something stops, nobody notices.",
      rows: [
        { who: "Hosting", does: "Keeps the server running.", blind: "Doesn't see whether checkout works" },
        { who: "Whoever maintains the site", does: "Updates plugins now and then.", blind: "Doesn't check what breaks afterwards" },
        { who: "Whoever runs the ads", does: "Looks at Meta.", blind: "Doesn't see the catalog that doesn't match" },
        { who: "The email plugin", does: "Says “sent”.", blind: "Doesn't say whether it really goes out" },
        { who: "You", does: "Have a store to grow.", blind: "Find out when a customer writes in" },
      ],
      note: "Examples of how it usually goes. Your store may be different.",
    },
    caso: {
      eyebrow: "Real case · Datura Clothing",
      honestTitle: "Where it didn't go well.",
      honest: "On September 4, a faulty check of ours rolled back a WooCommerce update that had gone fine. Before we try again, we're tightening it.",
      link: "Read the full case",
    },
    breaks: {
      title: "Where it breaks without telling you.",
      lead: "A WooCommerce store is made of many connected pieces. When one stops, there's usually no error.",
      items: [
        { icon: "clock", title: "Scheduled tasks stop and no error tells you.", line: "Every night we check that emails, catalog and deadlines actually go out." },
        { icon: "repeat", title: "Plugins get updated now and then, with no check on what happens next.", line: "We update at night and check the site after every update. If something breaks, we roll back: a fixed rule decides, not an AI." },
        { icon: "database", title: "The catalog Meta sees isn't the one in your store.", line: "Every night we regenerate the catalog and check products, prices and discounts." },
        { icon: "web", title: "The site slows down and you blame the wrong people.", line: "Every 5 minutes a sentinel, an automatic check, sees whether it responds. If it stops, we read the server logs and find the cause." },
      ],
    },
    how: {
      title: "At first we check every action ourselves. Then the safe ones run on their own.",
      steps: [
        { title: "Free check-up", line: "You give us your store's address and read-only access. We tell you what's wrong and what it's costing you." },
        { title: "Trial run", line: "For the first 30-60 days every action goes through us before it runs. You see everything." },
        { title: "Autonomy, one action at a time", line: "An action becomes automatic only after many approvals without corrections." },
        { title: "If you want, make it yours", line: "You pay a monthly fee. If one day you want to go it alone, you buy it out, like a lease." },
      ],
      rulesTitle: "Three rules on every action",
      rules: [
        { icon: "shield", title: "A fixed rule decides", line: "Rollbacks, prices and refunds are never left to an AI." },
        { icon: "check", title: "We verify afterwards", line: "After every change, the site is checked." },
        { icon: "repeat", title: "You approve", line: "Anything that costs money or touches the store." },
      ],
    },
    cta: {
      title: "Your WooCommerce, watched 24 hours a day.",
      line: "It's like having a team watching the store day and night, made of AI agents. A sentinel checks it every 5 minutes, a round of checks verifies it every night, and the agents write to you only when needed.",
      button: "Book your free check-up",
    },
  },
  pt: {
    hero: {
      eyebrow: "Para lojas WooCommerce",
      title: "Quem vigia o seu WooCommerce enquanto dorme?",
      highlight: "WooCommerce",
      lead: "Emails que não saem, catálogo do Meta que não bate certo, tarefas agendadas paradas durante semanas: normalmente ninguém o avisa. Na Datura Clothing, uma coisa destas durou 23 dias. Hoje os nossos agentes de IA verificam a loja todas as noites.",
      cta: "Marque o diagnóstico gratuito",
      note: "Grátis. Escolha o dia e a hora: dizemos-lhe o que está mal e quanto lhe custa. É preciso um acesso só de leitura (pode ver, não mexe).",
    },
    who: {
      title: "Cada um vigia o seu bocado. Ninguém vigia a loja.",
      lead: "Alojamento, site, anúncios, email: cada fornecedor verifica a sua parte. Quando uma coisa pára, ninguém dá por isso.",
      rows: [
        { who: "Alojamento", does: "Mantém o servidor ligado.", blind: "Não vê se o checkout funciona" },
        { who: "Quem mantém o site", does: "Atualiza os plugins de vez em quando.", blind: "Não verifica o que se estraga depois" },
        { who: "Quem gere os anúncios", does: "Olha para o Meta.", blind: "Não vê o catálogo que não bate certo" },
        { who: "O plugin de email", does: "Diz «publicada».", blind: "Não diz se sai mesmo" },
        { who: "O dono da loja", does: "Tem uma loja para fazer crescer.", blind: "Fica a saber quando um cliente escreve" },
      ],
      note: "Exemplos de como costuma ser. A sua loja pode ser diferente.",
    },
    caso: {
      eyebrow: "Caso real · Datura Clothing",
      honestTitle: "Onde não correu bem.",
      honest: "A 4 de setembro, uma verificação nossa errada anulou uma atualização do WooCommerce que tinha corrido bem. Antes de voltar a tentar, apertamo-la.",
      link: "Leia o caso completo",
    },
    breaks: {
      title: "Onde se estraga sem lhe dizer.",
      lead: "Uma loja WooCommerce é feita de muitas peças ligadas. Quando uma pára, normalmente não aparece nenhum erro.",
      items: [
        { icon: "clock", title: "As tarefas agendadas param e nenhum erro o avisa.", line: "Todas as noites verificamos se os emails, o catálogo e os prazos saem mesmo." },
        { icon: "repeat", title: "Os plugins atualizam-se de vez em quando, sem ninguém verificar o depois.", line: "Atualizamos de noite e verificamos o site a seguir a cada atualização. Se algo se estraga, volta-se atrás: quem decide é uma regra fixa, não uma IA." },
        { icon: "database", title: "O catálogo que o Meta vê não é o da loja.", line: "Todas as noites regeneramos o catálogo e verificamos produtos, preços e descontos." },
        { icon: "web", title: "O site fica lento e a culpa vai para quem não tem nada a ver.", line: "De 5 em 5 minutos uma sentinela, uma verificação automática, vê se responde. Se parar, lemos os registos do servidor e encontramos a causa." },
      ],
    },
    how: {
      title: "No início, controlamos nós cada ação. Depois, as seguras arrancam sozinhas.",
      steps: [
        { title: "Diagnóstico gratuito", line: "Dá-nos o endereço da loja e um acesso só de leitura. Dizemos-lhe o que está mal e quanto lhe custa." },
        { title: "Período de rodagem", line: "Nos primeiros 30-60 dias, cada ação passa por nós antes de arrancar. Vê tudo." },
        { title: "Autonomia, uma ação de cada vez", line: "Uma ação só passa a automática depois de muitas aprovações sem correções." },
        { title: "Se quiser, fica sua", line: "Paga uma mensalidade. Se um dia quiser fazer sozinho, resgata-o, como num leasing." },
      ],
      rulesTitle: "Três regras em cada ação",
      rules: [
        { icon: "shield", title: "Uma regra fixa decide", line: "Reposições, preços e reembolsos nunca ficam entregues a uma IA." },
        { icon: "check", title: "Verifica-se depois", line: "Depois de cada alteração, o site é verificado." },
        { icon: "repeat", title: "A aprovação é sua", line: "O que custa dinheiro ou mexe na loja." },
      ],
    },
    cta: {
      title: "O seu WooCommerce, acompanhado 24 horas por dia.",
      line: "É como ter uma equipa a vigiar a loja de dia e de noite, feita de agentes de IA. Uma sentinela verifica-a de 5 em 5 minutos, uma ronda de verificações confirma-a todas as noites, e os agentes só lhe escrevem quando for preciso.",
      button: "Marque o diagnóstico gratuito",
    },
  },
};

export default function WooCommercePage({ tono, locale = "it" }) {
  const c = COPY[locale] || COPY.en;
  const booking = BOOKING[locale] || BOOKING.en;
  const t = getDaturaCopy(locale);

  return (
    <main id="main" className={pageClass(tono)}>
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
            <p className="hwc-note">{c.hero.note}</p>
          </>
        }
      />

      <Section tone="deep" aria-labelledby="woo-who">
        <SectionHeader id="woo-who" title={c.who.title} lead={c.who.lead} />
        <ul className="hwc-who" data-fx="stagger">
          {c.who.rows.map((r) => (
            <li key={r.who} className="v2-card hwc-who__row">
              <b className="hwc-who__who">{r.who}</b>
              <span className="hwc-who__does">{r.does}</span>
              <span className="hwc-who__blind">{r.blind}</span>
            </li>
          ))}
        </ul>
        <p className="hwc-small">{c.who.note}</p>
      </Section>

      {/* Il caso v3 (presidio + numeri) esiste ancora solo in components/v2/copy/use-case-datura.it.js: finché en/pt non hanno le stesse chiavi la sezione si salta. */}
      {t.presidio && t.numbers && (
      <div className="v2-caso">
        <Section fx={false} tone="light" className="v2c-sec" id="caso">
          <SectionHeader
            align="center"
            eyebrow={c.caso.eyebrow}
            title={t.presidio.title}
            lead={t.presidio.lead}
            className="v2c-scenehead"
          />
          <DaturaOpsScene p={t.presidio} />
        </Section>
        <Section fx={false} tone="light" className="v2c-sec" id="numeri">
          <SectionHeader align="center" eyebrow={t.numbers.eyebrow} title={t.numbers.title} className="v2c-scenehead" />
          <DaturaNumbers n={t.numbers} />
          <p className="hwc-honest">
            <b>{c.caso.honestTitle}</b> {c.caso.honest}
          </p>
          <div className="dsv3-prodlink">
            <Button href={addLangPrefix(`/use-cases/${DATURA_SLUG}`, locale)} variant="link">
              {c.caso.link}
            </Button>
          </div>
        </Section>
      </div>
      )}

      <Section tone="deep" aria-labelledby="woo-breaks">
        <SectionHeader id="woo-breaks" title={c.breaks.title} lead={c.breaks.lead} />
        <CardGrid cols={2}>
          {c.breaks.items.map((b) => (
            <SystemCard key={b.title} icon={b.icon} title={b.title} line={b.line} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="dark" aria-labelledby="woo-how">
        <SectionHeader id="woo-how" title={c.how.title} />
        <Steps items={c.how.steps} />
        <h3 className="hwc-rules__title">{c.how.rulesTitle}</h3>
        <CardGrid cols={3}>
          {c.how.rules.map((r) => (
            <SystemCard key={r.title} icon={r.icon} title={r.title} line={r.line} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand tone="dark" blue title={c.cta.title} line={c.cta.line} button={{ label: c.cta.button, href: booking, external: true }} />
    </main>
  );
}

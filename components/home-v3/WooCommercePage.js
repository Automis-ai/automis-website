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
  Landing WooCommerce (solo IT, 14/10/2026): era un file statico (public/ecommerce-static/woocommerce, ancora raggiungibile su
  /it/ecommerce/woocommerce-prima), ora è una rotta del sito, con lo stesso header e lo stesso footer delle altre pagine.
  La prova viene dal caso Datura Clothing: la scena del presidio e i tre numeri sono quelli del caso (components/v2/copy/use-case-datura.it.js),
  nessuna cifra scritta qui. Il resto dei testi è quello della landing di prima.
*/
const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/automis-it";
const CHECKUP_NOTE = "Gratis. Scegli giorno e ora: ti diciamo cosa non va e quanto ti costa. Serve un accesso di sola lettura (può guardare, non toccare).";

const WHO = [
  { who: "Hosting", does: "Tiene acceso il server.", blind: "Non vede se il checkout funziona" },
  { who: "Chi mantiene il sito", does: "Aggiorna i plugin ogni tanto.", blind: "Non controlla cosa si rompe dopo" },
  { who: "Chi gestisce gli annunci", does: "Guarda Meta.", blind: "Non vede il catalogo che non combacia" },
  { who: "Il plugin delle email", does: "Dice «pubblicata».", blind: "Non dice se parte davvero" },
  { who: "Tu", does: "Hai un negozio da far crescere.", blind: "Lo scopri quando scrive un cliente" },
];

const BREAKS = [
  { icon: "clock", title: "Le attività programmate si fermano e nessun errore te lo dice.", line: "Ogni notte verifichiamo che email, catalogo e scadenze partano davvero." },
  { icon: "repeat", title: "I plugin si aggiornano ogni tanto, senza controllare il dopo.", line: "Aggiorniamo di notte e verifichiamo il sito dopo ogni aggiornamento. Se qualcosa si rompe, si torna indietro: lo decide una regola fissa, non un'IA." },
  { icon: "database", title: "Il catalogo che vede Meta non è quello del negozio.", line: "Ogni notte rigeneriamo il catalogo e controlliamo prodotti, prezzi e sconti." },
  { icon: "web", title: "Il sito rallenta e dai la colpa a chi non c'entra.", line: "Ogni 5 minuti una sentinella, un controllo automatico, guarda se risponde. Se si blocca, leggiamo i registri del server e troviamo la causa." },
];

const STEPS = [
  { title: "Check-up gratuito", line: "Ci dai l'indirizzo del negozio e un accesso di sola lettura. Ti diciamo cosa non va e quanto ti costa." },
  { title: "Rodaggio", line: "Per i primi 30-60 giorni ogni azione passa da noi prima di partire. Tu vedi tutto." },
  { title: "Autonomia, un'azione alla volta", line: "Un'azione diventa automatica solo dopo tante approvazioni senza correzioni." },
  { title: "Se vuoi, lo fai tuo", line: "Paghi un canone mensile. Se un giorno vuoi fare da solo, lo riscatti, come con un leasing." },
];

const RULES = [
  { icon: "shield", title: "Una regola fissa decide", line: "Ripristini, prezzi e rimborsi mai a un'IA." },
  { icon: "check", title: "Si verifica dopo", line: "Dopo ogni modifica il sito viene controllato." },
  { icon: "repeat", title: "Tu approvi", line: "Quello che costa o tocca il negozio." },
];

export default function WooCommercePage({ tono }) {
  const locale = "it";
  const t = getDaturaCopy(locale);

  return (
    <main id="main" className={pageClass(tono)}>
      <SmoothScroll />
      <PageStory />
      <PageHeroV3
        eyebrow="Per negozi WooCommerce"
        title="Chi guarda il tuo WooCommerce mentre dormi?"
        highlight="WooCommerce"
        lead="Email che non partono, catalogo Meta che non combacia, attività ferme per settimane: di solito nessuno ti avvisa. Su Datura Clothing una cosa così è durata 23 giorni. Oggi i nostri agenti IA controllano il negozio ogni notte."
        extra={
          <>
            <div className="hv3-ctas">
              <a className="hv3-btn hv3-btn--p" href={BOOKING} target="_blank" rel="noopener">
                Prenota il check-up gratuito <span aria-hidden="true">&nbsp;→</span>
              </a>
            </div>
            <p className="hwc-note">{CHECKUP_NOTE}</p>
          </>
        }
      />

      <Section tone="deep" aria-labelledby="woo-who">
        <SectionHeader
          id="woo-who"
          title="Ognuno guarda il suo pezzo. Nessuno guarda il negozio."
          lead="Hosting, sito, annunci, email: ogni fornitore controlla la sua parte. Quando una cosa si ferma, nessuno se ne accorge."
        />
        <ul className="hwc-who" data-fx="stagger">
          {WHO.map((r) => (
            <li key={r.who} className="v2-card hwc-who__row">
              <b className="hwc-who__who">{r.who}</b>
              <span className="hwc-who__does">{r.does}</span>
              <span className="hwc-who__blind">{r.blind}</span>
            </li>
          ))}
        </ul>
        <p className="hwc-small">Esempi di come va di solito. Il tuo negozio può essere diverso.</p>
      </Section>

      <div className="v2-caso">
        <Section fx={false} tone="light" className="v2c-sec" id="caso">
          <SectionHeader
            align="center"
            eyebrow="Caso reale · Datura Clothing"
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
            <b>Dove non è andata bene.</b> Il 4 settembre un nostro controllo sbagliato ha annullato un aggiornamento di WooCommerce che era andato bene. Prima di riprovare, lo stringiamo.
          </p>
          <div className="dsv3-prodlink">
            <Button href={addLangPrefix(`/use-cases/${DATURA_SLUG}`, locale)} variant="link">
              Leggi il caso completo
            </Button>
          </div>
        </Section>
      </div>

      <Section tone="deep" aria-labelledby="woo-breaks">
        <SectionHeader id="woo-breaks" title="Dove si rompe senza dirtelo." lead="Un negozio WooCommerce è fatto di tanti pezzi collegati. Quando uno si ferma, di solito non c'è nessun errore." />
        <CardGrid cols={2}>
          {BREAKS.map((b) => (
            <SystemCard key={b.title} icon={b.icon} title={b.title} line={b.line} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="dark" aria-labelledby="woo-how">
        <SectionHeader id="woo-how" title="All'inizio controlliamo noi ogni azione. Poi quelle sicure partono da sole." />
        <Steps items={STEPS} />
        <h3 className="hwc-rules__title">Tre regole su ogni azione</h3>
        <CardGrid cols={3}>
          {RULES.map((r) => (
            <SystemCard key={r.title} icon={r.icon} title={r.title} line={r.line} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        tone="dark"
        blue
        title="Il tuo WooCommerce, seguito 24 ore su 24."
        line="È come avere un team che guarda il negozio giorno e notte, fatto di agenti IA. Una sentinella lo controlla ogni 5 minuti, un giro di controlli lo verifica ogni notte, e gli agenti ti scrivono solo quando serve."
        button={{ label: "Prenota il check-up gratuito", href: BOOKING, external: true }}
      />

      <Section tone="dark" pad="sm" width="narrow">
        <p className="hwc-small">WooCommerce è un marchio di Automattic Inc. Automis non è affiliata a WooCommerce né ad Automattic.</p>
      </Section>
    </main>
  );
}

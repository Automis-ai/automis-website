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

/*
  Landing Shopify (solo IT, 14/10/2026): come la WooCommerce, da file statico (public/ecommerce-static/shopify, ancora raggiungibile
  su /it/ecommerce/shopify-prima) a rotta del sito, con lo stesso header, lo stesso footer e gli stessi componenti v2/v3.
  Testi invariati rispetto alla landing di prima. Differenza voluta con la WooCommerce: qui non c'è un caso su Shopify
  (il primo negozio pilota non è partito), quindi niente prove: la pagina non cita clienti né dice «in produzione».
  Resta non indicizzata finché non c'è il pilota.
*/
const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/automis-it";
const SIDEKICK_GUIDE = "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/sidekick/features";

const OUTSIDE = [
  { icon: "target", title: "Paghi gli annunci di un prodotto che non hai più.", line: "Ogni notte incrociamo campagne e scorte. Taglia finita? Abbiamo già preparato lo stop all'annuncio: confermi tu." },
  { icon: "chat", title: "Ti scrivono su WhatsApp, Instagram, email. E chiamano.", line: "Rispondiamo ovunque con le tue regole. I casi delicati arrivano a te." },
  { icon: "database", title: "Il catalogo che vede Meta non è quello del negozio.", line: "Ogni notte confrontiamo catalogo, prezzi e disponibilità. Le differenze arrivano con la correzione pronta." },
  { icon: "receipt", title: "Meta ti dice che gli annunci rendono. Il conto in banca non sempre è d'accordo.", line: "Ogni mese dividiamo quello che hai incassato su Shopify per quello che hai speso in annunci: il ritorno vero, non quello che Meta si attribuisce." },
];

const SIDEKICK = [
  "Scrive descrizioni dei prodotti e testi di marketing",
  "Crea automazioni di Flow descrivendole a parole",
  "Cambia le impostazioni del tema",
  "Prepara report e risponde a domande sul negozio",
];

const STEPS = [
  { title: "Check-up gratuito", line: "Ci dai l'indirizzo del negozio. Ti diciamo cosa non va e quanto ti costa." },
  { title: "Rodaggio", line: "Per i primi 30-60 giorni ogni azione passa da noi prima di partire. Tu vedi tutto." },
  { title: "Autonomia, un'azione alla volta", line: "Un'azione diventa automatica solo dopo tante approvazioni senza correzioni." },
  { title: "Se vuoi, lo fai tuo", line: "Paghi un canone mensile. Se un giorno vuoi fare da solo, lo riscatti, come con un leasing." },
];

const RULES = [
  { icon: "shield", title: "Una regola fissa blocca", line: "Prezzi, rimborsi e resi mai da soli." },
  { icon: "search", title: "Un'altra IA rilegge", line: "Le azioni, prima che partano." },
  { icon: "check", title: "Tu approvi", line: "Quello che costa, con un ok." },
];

export default function ShopifyPage({ tono }) {
  return (
    <main id="main" className={`${pageClass(tono)} hsp`}>
      <SmoothScroll />
      <PageStory />
      <PageHeroV3
        eyebrow="Per negozi Shopify che fanno pubblicità"
        title="Dove Sidekick finisce, iniziamo noi."
        highlight="iniziamo noi"
        lead="Sidekick, l'assistente IA di Shopify, ti lascia una lista di cose da fare. Se non hai tempo, resta lì. I nostri agenti IA se ne occupano ogni notte, anche fuori da Shopify, e al mattino trovi il riepilogo."
        extra={
          <>
            <div className="hv3-ctas">
              <a className="hv3-btn hv3-btn--p" href={BOOKING} target="_blank" rel="noopener">
                Prenota il check-up gratuito <span aria-hidden="true">&nbsp;→</span>
              </a>
            </div>
          </>
        }
      />

      <Section tone="deep" id="fuori" aria-labelledby="shop-outside">
        <SectionHeader
          id="shop-outside"
          title="E lavoriamo dove Sidekick non arriva."
          lead="Sidekick lavora dentro Shopify e non parla con i tuoi clienti. Annunci, catalogo di Meta e conto in banca restano fuori."
        />
        <CardGrid cols={2}>
          {OUTSIDE.map((o) => (
            <SystemCard key={o.title} icon={o.icon} title={o.title} line={o.line} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="light" aria-labelledby="shop-sidekick">
        <SectionHeader
          id="shop-sidekick"
          align="center"
          title="Quello che Sidekick fa già, non te lo facciamo pagare."
          lead="Le fa bene, e noi non le rifacciamo."
        />
        <ul className="hsp-sheet" data-fx="stagger">
          <li className="hsp-sheet__head" aria-hidden="true">
            <span>Lo fa già Sidekick</span>
            <span>Da noi costa</span>
          </li>
          {SIDEKICK.map((s) => (
            <li key={s} className="v2-card hsp-sheet__row">
              <span>{s}</span>
              <b>0 €</b>
            </li>
          ))}
        </ul>
        <p className="hwc-small">
          Funzioni verificate il 10 ottobre 2026 sulla{" "}
          <a href={SIDEKICK_GUIDE} target="_blank" rel="noopener">
            guida ufficiale di Shopify
          </a>
          . Sidekick non cambia nulla senza la tua approvazione.
        </p>
      </Section>

      <Section tone="deep" aria-labelledby="shop-how">
        <SectionHeader id="shop-how" title="All'inizio controlliamo noi ogni azione. Poi quelle sicure partono da sole." />
        <Steps items={STEPS} />
        <h3 className="hwc-rules__title">Tre controlli su ogni azione</h3>
        <CardGrid cols={3}>
          {RULES.map((r) => (
            <SystemCard key={r.title} icon={r.icon} title={r.title} line={r.line} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        tone="dark"
        blue
        title="Il tuo negozio Shopify, seguito 24 ore su 24."
        line="È come avere un team che guarda il negozio giorno e notte, fatto di agenti IA. Sidekick resta dove è bravo. Gli agenti seguono annunci, clienti, catalogo e incassi, e ti scrivono solo quando serve."
        button={{ label: "Prenota il check-up gratuito", href: BOOKING, external: true }}
      />

      <Section tone="dark" pad="sm" width="narrow">
        <p className="hwc-small">
          <a href="/it/ecommerce">← Torna alla pagina e-commerce</a>
        </p>
      </Section>
    </main>
  );
}

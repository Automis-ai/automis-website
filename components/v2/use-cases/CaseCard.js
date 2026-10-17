import Link from "next/link";
import Icon from "@/components/v2/ui/icons";
import Logo from "@/components/v2/ui/Logo";
import Tile from "@/components/v2/use-cases/Tile";
import { CountUp, LiveStage } from "@/components/v2/use-cases/fx";
import { CHAINS } from "@/components/v2/use-cases/constants";
import "@/components/v2/use-cases/use-cases.css";

/*
  Scheda di un caso nell'indice: logo (o il nome del cliente se non ha un logo pubblico), tipo di sistema (etichetta di
  testo, non una pillola: non è un link), il numero grande con la sua base, la catena dei moduli veri del caso, titolo, link.
  Tutta la scheda è cliccabile (il link è il titolo). Un numero solo, sulla base del titolo del caso, scritto una volta sola.
  La catena sono le tessere di vetro della hero 3D (call → calendar per la clinica, social → chat → crm per ADifesa,
  camera → check → book per l'album, shield → spark → ads → chart per Datura) collegate da un filo con un pacchetto che
  corre; sull'ultima l'anello d'oro, a turno da una scheda all'altra (--cd). Ferma fuori schermo (LiveStage).
  Movimento: la scheda entra allo scroll insieme alle altre (la griglia ha data-fx="stagger", vedi UseCasesIndex) e si
  inclina in 3D seguendo il puntatore (data-fx="tilt": Tilt3D del kit, components/v2/wow/fx). Il numero entra cifra per
  cifra e il suo valore è sempre quello vero (CountUp). Testi dal copy, mai scritti qui.
*/
export default function CaseCard({ item, logoSrc, href, linkLabel, index = 0 }) {
  const chain = CHAINS[item.slug] || [];
  return (
    <article className="v2-card v2-card--link v2c-card" data-fx="tilt">
      <div className="v2c-card__head">
        {logoSrc ? <Logo logo={{ src: logoSrc, alt: item.client }} name={item.client} /> : <span className="v2c-card__client">{item.client}</span>}
        <span className="v2c-card__tag">{item.tag}</span>
      </div>
      <div className="v2c-card__main">
        <div className="v2c-card__stat">
          <p className={`v2c-card__num${item.figure.length > 10 ? " v2c-card__num--long" : ""}`}>
            <CountUp text={item.figure} delay={index * 90} />
          </p>
          <p className="v2c-card__numlabel">{item.figureLabel}</p>
        </div>
        {chain.length ? (
          <LiveStage max={0} className="v2c-chain" aria-hidden="true" style={{ "--n": chain.length, "--cd": `${index * 1.1}s` }}>
            <span className="v2c-chain__wire" />
            {chain.map((g, i) => (
              <Tile key={g} glyph={g} size="sm" className={i === chain.length - 1 ? "v2c-tile--last" : undefined} style={{ "--k": i }} />
            ))}
            <i className="v2c-chain__pkt" />
          </LiveStage>
        ) : null}
      </div>
      <h2 className="v2c-card__title">
        <Link href={href} className="v2-card__link">
          {item.title}
        </Link>
      </h2>
      <span className="v2c-card__cta" aria-hidden="true">
        {linkLabel}
        <Icon name="arrow" size={18} strokeWidth={2.2} />
      </span>
    </article>
  );
}

import "./story.css";

/*
  Involucro della rete di schede (la coreografia sta in stages/net.js, montata da PageStory).
  <NetGrid mode="assemble|chain"> contiene una griglia (CardGrid / CategoryGrid con className="v2fx-netgrid" e fx="own")
  e le sue schede, ciascuna dentro <NetCell>. Il server manda tutto già al suo posto: la rete (fili, pacchetti, bordi di luce)
  la crea lo script, solo se il movimento è consentito.
    mode="assemble"  i moduli si ricompongono nella griglia (hub /systems)
    mode="chain"     le schede entrano in catena, una dopo l'altra, unite da fili (pagine di categoria)
*/
export function NetGrid({ mode = "chain", className = "", children }) {
  return (
    <div className={`v2fx-net ${className}`.trim()} data-story="net" data-net={mode} data-fx="own">
      <div className="v2fx-net__wires" data-net-wires aria-hidden="true" />
      {children}
    </div>
  );
}

export function NetCell({ children }) {
  return (
    <div className="v2fx-cell" data-net-cell>
      {children}
    </div>
  );
}

export default NetGrid;

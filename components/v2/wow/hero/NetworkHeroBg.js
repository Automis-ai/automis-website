// Sfondo della hero della home. Punto di aggancio per la rete 3D dei moduli Automis (brief §13):
// per ora rende lo sfondo statico di prima; l'agente della hero sostituisce l'interno di questo file.
export default function NetworkHeroBg({ lang = "en" }) {
  return (
    <div className="v2hp-aurora" data-lang={lang}>
      <i />
      <i />
    </div>
  );
}

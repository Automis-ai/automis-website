/* I casi con pagina propria costruita sul kit v2 non stanno in components/use-cases/cases.js: quell'elenco
   alimenta il template dei casi con sfida/soluzione/risultati (e le pagine generate di Clínica e ADifesa).
   Le tre rotte [slug] riconoscono questi slug e rendono il caso giusto (vedi registry.js).
   Gli slug sono uguali nelle tre lingue, come quelli di Clínica e ADifesa. */
export const ALBUM_AI_SLUG = "album-ai";
export const DATURA_SLUG = "datura-clothing";

/* I moduli veri di ogni caso, nell'ordine della catena (gli id sono quelli delle tessere della hero 3D,
   components/v2/wow/fx/scene/icons.js, più «camera» in Tile.js). Una tessera di vetro per modulo, collegate da un filo
   con un pacchetto che corre: nell'indice, nella sfumatura sotto la hero e nello schema del sistema.
     Clínica     la chiamata → l'appuntamento in calendario
     ADifesa     commenti e messaggi → la conversazione → la scheda completa
     Album AI    gli scatti → la scelta → l'album
     Datura      presidio → feed e catalogo → campagne → report (le stesse quattro della hero del caso) */
export const CHAINS = {
  "clinica-santa-maria": ["call", "calendar"],
  adifesa: ["social", "chat", "crm"],
  [ALBUM_AI_SLUG]: ["camera", "check", "book"],
  [DATURA_SLUG]: ["shield", "spark", "ads", "chart"],
};

import Accent from "@/components/v2/ui/Accent";
import { nb } from "@/components/v2/ui/nb";

// Le parole di 1-2 lettere (o, la, a...) restano attaccate alla parola dopo, con uno spazio non separabile:
// niente articolo solo a fine riga (es. «o / seu negócio»). Le altre parole si spezzano come al solito,
// così a 320 px nulla esce dal contenitore.
function glueShortWords(phrase) {
  const words = phrase.split(" ");
  return words.reduce((out, w, i) => (i === 0 ? w : out + (words[i - 1].length <= 2 ? " " : " ") + w), "");
}

/* Evidenzia dentro un titolo la frase `accent` (una volta per sezione, come chiede il kit).
   Il titolo resta una stringa sola nel copy; `accent` nomina la parte da evidenziare.
   Se la frase non compare nel titolo, il titolo esce senza evidenza. */
export function withAccent(text, accent) {
  if (!accent) return text;
  const i = text.indexOf(accent);
  if (i < 0) return nb(text);
  return (
    <>
      {nb(text.slice(0, i))}
      <Accent>{glueShortWords(accent)}</Accent>
      {nb(text.slice(i + accent.length))}
    </>
  );
}

export default withAccent;

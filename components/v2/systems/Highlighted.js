import Accent from "@/components/v2/ui/Accent";
import { nb } from "@/components/v2/ui/nb";

/* Titolo con una parte in enfasi (giallo, una volta per sezione). `highlight` deve comparire nel titolo
   identica; se non compare, il titolo esce intero e senza enfasi. */
export default function Highlighted({ text, highlight }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0) return nb(text);
  return (
    <>
      {nb(text.slice(0, i))}
      <Accent>{highlight}</Accent>
      {nb(text.slice(i + highlight.length))}
    </>
  );
}

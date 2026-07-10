import HtmlLang from "@/components/HtmlLang";

// Declares this subtree's language to the browser, assistive tech, and the
// cookie banner (which reads <html lang> to pick its own language).
export default function EsLayout({ children }) {
  return (
    <>
      <HtmlLang lang="es" />
      {children}
    </>
  );
}

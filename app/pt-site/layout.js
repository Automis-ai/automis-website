import HtmlLang from "@/components/HtmlLang";

// Declares this subtree's language (European Portuguese) to the browser,
// assistive tech, and the cookie banner (which reads <html lang> to pick its
// own language). The public URL is /pt (middleware rewrites /pt -> /pt-site on
// the main host); the voice-only lander stays at app/pt untouched.
export default function PtLayout({ children }) {
  return (
    <>
      <HtmlLang lang="pt-PT" />
      {children}
    </>
  );
}

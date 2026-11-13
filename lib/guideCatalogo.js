// Catalogo guide per pagina e route: dal bucket Supabase con cache di 5 minuti, ripiego su data/guide-catalogo.json.
// Logica e formato in lib/guideCatalogoLoader.js.
import fallback from "../data/guide-catalogo.json";
import { loadCatalogo } from "./guideCatalogoLoader.js";

export const getCatalogo = () => loadCatalogo({ fallback });

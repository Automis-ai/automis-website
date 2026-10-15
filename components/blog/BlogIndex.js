"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import "@/components/home-v3/home-v3.css";
import "./blog-v3.css";

/**
 * Blog listing. Dark, on-brand. `posts` is frontmatter-only (from getAllPosts).
 * "All" view groups posts into topic SECTIONS (canonical order below); picking a
 * chip filters to a flat grid of that topic. Sections render only if they have
 * posts, so the page fills out as content is published.
 */

// Canonical topic order (EN + IT + PT labels share the ranking).
const CATEGORY_ORDER = [
  "Voice AI", "Assistente Vocale", "Assistente de Voz",
  "WhatsApp & Chatbots", "WhatsApp e Chatbot", "WhatsApp e Chatbots",
  "Lead Gen & Ads", "Lead e Pubblicità", "Contactos e Publicidade",
  "AI for Business", "IA per le Aziende", "IA para Empresas",
  "Getting Started", "Come Iniziare", "Como Começar",
];
const catRank = (c) => {
  const i = CATEGORY_ORDER.indexOf(c);
  return i === -1 ? 900 : i;
};

/** Intl locale for card dates, derived from the blog's base path. */
const DATE_LOCALE = { en: "en-US", it: "it-IT", pt: "pt-PT" };

function localeFromBasePath(basePath) {
  if (basePath.startsWith("/it")) return "it";
  if (basePath.startsWith("/pt")) return "pt";
  return "en";
}

function PostCard({ post, basePath, labels, locale }) {
  return (
    <Link href={`${basePath}/${post.slug}`} className="hv3-bcard">
      {post.image && (
        <div className="hv3-bcard__img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="hv3-bcard__body">
        <div className="hv3-bcard__meta">
          {post.category && <span className="hv3-bcard__cat">{post.category}</span>}
          {post.date && (
            <span>
              {new Date(post.date).toLocaleDateString(
                DATE_LOCALE[locale] || "en-US",
                { month: "short", year: "numeric" }
              )}
            </span>
          )}
        </div>
        <h2
          className="font-display"
          dangerouslySetInnerHTML={{ __html: post.htmlTitle || post.title }}
        />
        <p className="hv3-bcard__desc">{post.description}</p>
        <span className="hv3-bcard__go">
          {labels.readMore} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function BlogIndex({ posts, basePath = "/blog", labels }) {
  const locale = localeFromBasePath(basePath);
  const viewAll =
    labels.viewAll ||
    { it: "Vedi tutti", pt: "Ver todos" }[locale] ||
    "View all";
  const allLabel = { it: "Tutti", pt: "Todos" }[locale] || "All";

  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => p.category && set.add(p.category));
    const arr = Array.from(set).sort((a, b) => catRank(a) - catRank(b));
    return ["All", ...arr];
  }, [posts]);

  const sections = useMemo(() => {
    const map = new Map();
    posts.forEach((p) => {
      const c = p.category || "Other";
      if (!map.has(c)) map.set(c, []);
      map.get(c).push(p);
    });
    return Array.from(map.entries()).sort((a, b) => catRank(a[0]) - catRank(b[0]));
  }, [posts]);

  const [active, setActive] = useState("All");

  // Il filtro parte da "All" e si sposta dopo il mount se l'URL chiede una categoria.
  //
  // Prima questa riga era `useSearchParams()`, e la differenza non e' stilistica:
  // useSearchParams() obbliga Next a fare bail-out al client del <Suspense> che
  // avvolge questo componente, ma SOLO quando l'app e' resa staticamente. Finche' il
  // root layout ha letto headers() ogni pagina era dinamica, il boundary si risolveva
  // in SSR e non si vedeva niente. Il giorno che il sito torna statico, l'HTML servito
  // dei tre indici blog conterrebbe il fallback — cioe' `null` — e sparirebbero i link
  // a TUTTI gli articoli: le pagine che stiamo cercando di far indicizzare
  // resterebbero raggiungibili solo dalla sitemap, che e' esattamente il buco da cui
  // veniamo. Leggere la query string qui evita l'intera categoria di problema.
  //
  // Il prezzo: su un link profondo con ?category=X la griglia appare un istante su
  // "All" e poi filtra. Vale il cambio.
  useEffect(() => {
    try {
      const richiesta = new URLSearchParams(window.location.search).get("category");
      if (richiesta && categories.includes(richiesta)) setActive(richiesta);
    } catch {
      // location non disponibile: si resta su "All", che e' una vista valida.
    }
  }, [categories]);

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <section id="articoli" className="hv3 hv3-tone hv3-blog">
      <div className="hv3-blog__in">
        {/* topic filter bar */}
        <div className="hv3-bchips">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={"hv3-bchip" + (active === cat ? " is-on" : "")}
            >
              {cat === "All" ? allLabel : cat}
            </button>
          ))}
        </div>

        {active === "All" ? (
          /* grouped topic sections */
          <div>
            {sections.map(([cat, catPosts]) => (
              <div key={cat} className="hv3-bsec">
                <div className="hv3-bsec__head">
                  <h2 className="font-display">{cat}</h2>
                  <button onClick={() => setActive(cat)} className="hv3-bsec__all">
                    {viewAll} <span aria-hidden="true">→</span>
                  </button>
                </div>
                <div className="hv3-bgrid">
                  {catPosts.slice(0, 3).map((post) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      basePath={basePath}
                      labels={labels}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* filtered flat grid */
          <div className="hv3-bgrid">
            {filtered.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                basePath={basePath}
                labels={labels}
                locale={locale}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 && <p className="hv3-blog__empty">{labels.empty}</p>}
      </div>
    </section>
  );
}

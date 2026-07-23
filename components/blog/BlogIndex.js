"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Blog listing with a moonb-style category filter bar.
 * Dark, on-brand cards. `posts` is frontmatter-only (from getAllPosts).
 */
export default function BlogIndex({ posts, basePath = "/blog", labels }) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") || "All";

  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState(
    categories.includes(initial) ? initial : "All"
  );

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <section className="bg-bg-primary pt-2 pb-24">
      <div className="container mx-auto px-4">
        {/* category filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={
                "px-4 py-2 rounded-full small-text font-medium transition-all duration-300 border " +
                (active === cat
                  ? "bg-yellow-light text-black border-yellow-light"
                  : "bg-blue-darkest/30 text-white/80 border-blue-middle/20 hover:text-white hover:border-blue-middle/50")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* card grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group flex flex-col bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:border-yellow-light/40 transition-all duration-300"
            >
              {post.image && (
                <div className="relative overflow-hidden h-52">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  {post.category && (
                    <span className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full small-text">
                      {post.category}
                    </span>
                  )}
                  {post.date && (
                    <span className="text-white/50 small-text">
                      {new Date(post.date).toLocaleDateString(
                        basePath.startsWith("/it") ? "it-IT" : "en-US",
                        { month: "short", year: "numeric" }
                      )}
                    </span>
                  )}
                </div>
                <h2
                  className="card-heading font-medium text-white group-hover:text-yellow-light transition-all duration-300 mb-3"
                  dangerouslySetInnerHTML={{
                    __html: post.htmlTitle || post.title,
                  }}
                />
                <p className="body-text text-white/80 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-2 text-blue-middle group-hover:text-yellow-light transition-all duration-300 font-medium mt-4">
                  {labels.readMore}{" "}
                  <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="body-text text-white/60 text-center py-12">
            {labels.empty}
          </p>
        )}
      </div>
    </section>
  );
}

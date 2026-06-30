"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading, Grad, useReveal } from "./_ui";

const testimonials = [
  {
    rating: 5,
    text: "Em 6 meses reativámos contactos antigos que já dávamos como perdidos — mais de 120 000 € em negócio recuperado. A IA liga com uma consistência que a equipa não conseguia.",
    author: "Marco Silva",
    role: "CEO, Imobiliária — Lisboa",
  },
  {
    rating: 5,
    text: "Zero chamadas perdidas. Os pacientes marcam até às 23h e a agenda enche-se sozinha. Receita a subir cerca de 6 000 €/mês.",
    author: "Dra. Joana Costa",
    role: "Clínica Dentária — Porto",
  },
  {
    rating: 5,
    text: "Reduzimos as faltas às marcações em cerca de 40%. A IA gere as reservas durante o serviço, quando ninguém pode atender o telefone.",
    author: "Luís Pereira",
    role: "Restaurante — Lisboa",
  },
];

export default function TestimonialsSection() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section-padding relative overflow-hidden bg-deep-blue text-white"
    >
      <div className="av-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute -top-24 left-0 h-80 w-80 rounded-full bg-warm-yellow/8 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className={`av-reveal ${visible ? "is-visible" : ""}`}>
          <SectionHeading
            eyebrow="Prova social"
            title={
              <>
                Empresas portuguesas que <Grad>confiam em nós</Grad>
              </>
            }
            subtitle="Veja como empresas em Portugal estão a transformar a forma como gerem os seus clientes com a Automis Voice AI."
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {testimonials.map((item, index) => (
            <figure
              key={item.author}
              className={`av-gradient-border av-reveal relative flex flex-col rounded-2xl p-7 backdrop-blur-md ${
                visible ? "is-visible" : ""
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <Quote
                className="absolute right-6 top-6 h-8 w-8 text-bright-blue/15"
                strokeWidth={1.5}
              />
              <div className="mb-4 flex gap-1 text-warm-yellow">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 font-open-sans text-[0.95rem] italic leading-relaxed text-white/85">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-montserrat text-sm font-bold text-white">
                  {item.author}
                </p>
                <p className="font-plex-mono text-xs uppercase tracking-wide text-soft-blue/70">
                  {item.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

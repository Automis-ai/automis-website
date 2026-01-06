'use client';
import React, { useEffect, useState, useRef } from 'react';
import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import CTAButton from "@/components/CTAButton";
import {
  Target,
  TrendingUp,
  FileText,
  Phone,
  CheckCircle,
  Users,
  Building2,
  Home,
  Sparkles,
  Wrench,
  Zap,
  Rocket,
  ArrowRight,
  Brain,
  LineChart,
  Clock,
  Award,
  Briefcase,
  DollarSign,
  Shield,
  AlertCircle,
  PlusCircle,
  Calendar,
  Gift,
  Star,
  BarChart3,
  Search,
  Settings,
  TrendingDown,
  Activity,
  FileCheck,
  Gauge,
  MessageSquare,
  CheckSquare,
  XCircle,
  ChevronDown,
  Minus,
  Plus
} from 'lucide-react';

const JumpstartAudit = () => {
  const [lineHeight, setLineHeight] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const desktopTimelineRef = useRef(null);
  const mobileTimelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const timelineRef = window.innerWidth >= 992 ? desktopTimelineRef : mobileTimelineRef;

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = rect.top;
        const timelineHeight = rect.height;

        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
          const visibleStart = Math.max(0, windowHeight - timelineTop);
          const progress = Math.min(visibleStart / timelineHeight, 1);
          setLineHeight(progress * 100);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleCardExpansion = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <AkpagerLayout>

      {/* HERO */}
      <section className="hero-padding bg-bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className="absolute inset-0 bg-black/60 z-1"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-5/6">
              <div className="hero-content text-center">
                <h1
                  className="hero-heading text-white mb-6"
                  data-aos="fade-up"
                  data-aos-duration={1200}
                >
                  <span>
                    Jumpstart Marketing
                  </span>
                  <br />
                  <span className="text-white">& AI Audit</span>
                </h1>

                <p
                  className="text-white/90 text-xl mb-8 max-w-3xl mx-auto"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  data-aos-duration={1200}
                >
                  In 15 giorni ti mostriamo esattamente come ridurre sprechi pubblicitari e trasformare più lead in fatturato, grazie ad Agenti IA e automazioni su misura.
                </p>

                {/* BENEFIT PILLS */}
                <div
                  className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-6xl mx-auto mb-8"
                  data-aos="fade-up"
                  data-aos-delay={200}
                  data-aos-duration={1200}
                >
                  {[
                    "CPA più bassi",
                    "Contatto più veloce",
                    "Meno chiamate perse",
                    "Più fatturato"
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-middle/20 to-yellow-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                      <div className="relative px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-yellow-light/10 transition-all duration-300 hover:scale-[1.02] hover:border-yellow-light/30 overflow-hidden">
                        <span className="text-white font-semibold text-base lg:text-lg xl:text-xl block text-center whitespace-nowrap group-hover:text-yellow-light transition-colors duration-300">
                          {benefit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SCARCITY */}
                <div
                  className="mb-10"
                  data-aos="fade-up"
                  data-aos-delay={300}
                  data-aos-duration={1200}
                >
                  <p className="small-text text-yellow-light font-semibold flex items-center justify-center gap-2 mx-auto">
                    Solo 5 audit disponibili ogni mese per garantire implementazione live nella call finale
                  </p>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/automis-it"
                    external={true}
                    variant="primary"
                    size="large"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Prenota una Call
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section-padding bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-middle/10 rounded-full blur-3xl" />
          <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-yellow-light/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Cosa ottieni
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Due audit completi con risultati chiari e immediatamente applicabili
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-20">
            {/* MARKETING AUDIT */}
            <div className="flex flex-col lg:flex-row items-center gap-12" data-aos="fade-up" data-aos-duration={1200}>
              <div className="flex-1 order-2 lg:order-1">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <BarChart3 className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <h3 className="sub-heading text-white">Audit delle Performance Marketing</h3>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-blue-middle/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Individuiamo e correggiamo gli sprechi</h4>
                    <p className="body-text text-white/90">Decisioni chiare su cosa fermare, ottimizzare e scalare su Google, Meta e LinkedIn.</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-blue-middle/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Targeting e funnel più efficaci</h4>
                    <p className="body-text text-white/90">Ottimizzazioni su pubblico, offerta e landing per aumentare le conversioni.</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-blue-middle/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Tracking che dice la verità</h4>
                    <p className="body-text text-white/90">Correzioni semplici all’attribuzione per decisioni realmente data-driven.</p>
                  </div>
                </div>

                <div>
                  <p className="small-text text-white/90 uppercase tracking-wider mb-3">Risultato Finale</p>
                  <p className="body-text text-white/90">Scorecard per canale, note su targeting e creatività, checklist di tracking, Top 3 raccomandazioni.</p>
                </div>
              </div>

              <div className="flex-1 order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-middle/20 to-blue-lightest/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                  <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-blue-middle/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-middle/10 via-transparent to-blue-lightest/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <BarChart3 className="w-24 h-24 text-blue-middle mx-auto mb-4" />
                        <p className="card-heading text-white">Analisi Performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI OPS AUDIT */}
            <div className="flex flex-col lg:flex-row items-center gap-12" data-aos="fade-up" data-aos-duration={1200}>
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-light/20 to-yellow-dark/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                  <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-yellow-light/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-light/10 via-transparent to-yellow-dark/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Brain className="w-24 h-24 text-yellow-light mx-auto mb-4" />
                        <p className="card-heading text-white">Operazioni AI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/30 transition-all duration-300">
                      <Brain className="w-8 h-8 text-yellow-light" />
                    </div>
                    <h3 className="sub-heading text-white">Audit delle Operazioni AI</h3>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-yellow-light/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Identifichiamo le perdite</h4>
                    <p className="body-text text-white/90">Mappiamo l’intero flusso lead → prenotazione (speed-to-lead, chiamate perse, follow-up, no-show).</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-yellow-light/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Opportunità ad alto ROI</h4>
                    <p className="body-text text-white/90">Una shortlist prioritaria di automazioni che generano impatto reale.</p>
                  </div>
                  <div className="p-4 bg-[#0D2552]/50 backdrop-blur-lg rounded-xl border border-yellow-light/20 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
                    <h4 className="sub-heading text-white mb-1">Implementazione sicura</h4>
                    <p className="body-text text-white/90">Indicazioni pratiche su privacy e compliance quando necessario (es. healthcare).</p>
                  </div>
                </div>

                <div>
                  <p className="small-text text-white/90 uppercase tracking-wider mb-3">Risultato Finale</p>
                  <p className="body-text text-white/90">Mappa dei flussi, shortlist opportunità (impatto vs sforzo), linee guida di implementazione.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BONUSES */}
      <section className="section-padding bg-bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D2552]/50 backdrop-blur-lg rounded-full border border-yellow-light/20 mb-4">
                <Gift className="w-4 h-4 text-yellow-light" />
                <span className="small-text text-yellow-light font-semibold">Offerta a Tempo Limitato</span>
              </div>
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Bonus (inclusi)
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                <span className="section-heading text-yellow-light">€1,850</span> di valore totale — incluso gratuitamente
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* BONUS 1 */}
            <div data-aos="fade-up" data-aos-duration={1200} className="group">
              <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 h-full">
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/30 transition-all duration-300">
                      <Zap className="w-8 h-8 text-yellow-light" />
                    </div>
                    <span className="px-3 py-1 bg-yellow-light/10 rounded-full small-text text-yellow-light font-semibold">
                      €750 value
                    </span>
                  </div>

                  <h3 className="card-heading text-white mb-2">Implementazione Veloce</h3>
                  <p className="text-yellow-light small-text font-semibold mb-3">Chiavi in mano</p>
                  <p className="body-text text-white/90">
                    Costruiamo e attiviamo un’automazione su misura, focalizzata sul tuo principale problema. Setup live + 14 giorni di supporto.
                  </p>
                </div>
              </div>
            </div>

            {/* BONUS 2 */}
            <div data-aos="fade-up" data-aos-delay={100} data-aos-duration={1200} className="group">
              <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 h-full">
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <Calendar className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <span className="px-3 py-1 bg-blue-middle/10 rounded-full small-text text-blue-middle font-semibold">
                      €600 value
                    </span>
                  </div>

                  <h3 className="card-heading text-white mb-2">Piano d’Azione 90 Giorni</h3>
                  <p className="text-blue-middle small-text font-semibold mb-3">Roadmap step-by-step</p>
                  <p className="body-text text-white/90">
                    Un piano operativo chiaro che puoi consegnare subito al tuo team: priorità, responsabili e obiettivi.
                  </p>
                </div>
              </div>
            </div>

            {/* BONUS 3 */}
            <div data-aos="fade-up" data-aos-delay={200} data-aos-duration={1200} className="group">
              <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 h-full">
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <DollarSign className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <span className="px-3 py-1 bg-yellow-light/10 rounded-full small-text text-yellow-light font-semibold">
                      €500 value
                    </span>
                  </div>

                  <h3 className="card-heading text-white mb-2">Previsione “Money Slide”</h3>
                  <p className="text-yellow-light small-text font-semibold mb-3">Pronta per il management</p>
                  <p className="body-text text-white/90">
                    Proiezioni chiare su riduzione CPL/CPA e ore risparmiate, per mostrare l’impatto economico reale al management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="section-padding relative bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Garanzie senza rischio
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Ci assumiamo il rischio insieme a te
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-blue-middle/20" data-aos="fade-up" data-aos-duration={1200}>
              <div className="relative bg-[#0D2552]/50 backdrop-blur-lg p-8 lg:p-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-light/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-yellow-light" />
                    </div>
                    <div>
                      <h3 className="sub-heading text-white">Garanzia di Chiarezza</h3>
                      <p className="small-text text-yellow-light font-semibold">Risultati o rimborso</p>
                    </div>
                  </div>

                  <p className="body-text text-white/90 mb-6">
                    Se l’audit non mostra un percorso chiaro verso almeno uno di questi risultati, rimborsiamo il 100%:
                  </p>

                  <div className="space-y-3">
                    {[
                      "Riduzione costi di acquisizione ≥10%",
                      "Aumento prenotazioni ≥5%",
                      "Risparmio ≥10 ore/settimana"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-yellow-light/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-yellow-light" />
                        </div>
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative bg-[#0D2552]/50 backdrop-blur-lg p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-blue-middle/20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-middle/10 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-blue-middle" />
                    </div>
                    <div>
                      <h3 className="sub-heading text-white">Promessa “Board-Ready”</h3>
                      <p className="small-text text-blue-middle font-semibold">Chiarezza executive-level</p>
                    </div>
                  </div>

                  <p className="body-text text-white/90 mb-6">
                    La presentazione sarà rifinita e pronta per management e stakeholders:
                  </p>

                  <div className="bg-blue-darkest/50 backdrop-blur-sm rounded-xl p-4 space-y-2 border border-blue-middle/20">
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Revisioni fino a perfezione</span>
                      <span className="text-blue-middle font-semibold">∞</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Costo extra</span>
                      <span className="text-blue-middle font-semibold">€0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Presentazione pronta</span>
                      <span className="text-blue-middle font-semibold">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center small-text text-white/90 mt-6">
              * Le garanzie richiedono accessi tempestivi in sola lettura e dati storici accurati
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="process-timeline-section !py-20 !relative !overflow-hidden bg-bg-primary">
        <div className="!absolute !inset-0 !pointer-events-none">
          <div
            className="!absolute !inset-0 !opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center !mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading !text-white !mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Come funziona
              </h2>
              <p
                className="body-text !text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Dall’avvio all’implementazione in soli 14 giorni
              </p>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block " ref={desktopTimelineRef}>
            <div className="!relative !max-w-5xl !mx-auto">
              <div className="!absolute !left-1/2 !top-0 !bottom-0 !w-0.5 !-translate-x-1/2 !overflow-hidden !bg-slate-800/30">
                <div
                  className="!absolute !left-0 !top-0 !w-full !bg-gradient-to-b !from-yellow-light !via-blue-middle !to-yellow-light !transition-all !duration-300 !ease-out"
                  style={{ height: `€{lineHeight}%` }}
                />
              </div>

              {[
                {
                  day: "Giorno 0–1",
                  title: "Kickoff (obiettivi e accessi)",
                  what: "Allineamento su obiettivi e KPI; conferma ICP, offerte e criteri di successo.",
                  collect: "Accesso in sola lettura a Google/Meta/LinkedIn Ads, CRM, call log/sistema telefonico e calendario.",
                  result: "Riepilogo call + checklist di ciò che manca.",
                  icon: <Rocket className="!w-6 !h-6" />
                },
                {
                  day: "Giorno 1–3",
                  title: "Raccolta dati e baseline",
                  what: "Estraiamo i numeri reali: lead, CPL/CPA, speed-to-lead, % chiamate perse, show-rate, close-rate e LTV. Individuiamo eventuali gap di tracking.",
                  icon: <BarChart3 className="!w-6 !h-6" />
                },
                {
                  day: "Giorno 3–5",
                  title: "Mappatura funnel e individuazione problemi",
                  what: "Mappiamo il flusso lead → prenotazione (ads → acquisizione lead → contatto → booking → follow-up). Evidenziamo perdite: risposta lenta, chiamate perse, passaggi manuali, rischio no-show.",
                  icon: <Activity className="!w-6 !h-6" />
                },
                {
                  day: "Giorno 6–9",
                  title: "Matrice opportunità (impatto vs sforzo)",
                  what: "Selezioniamo 3–6 azioni ad alto ROI (marketing + AI) e le ordiniamo per impatto/sforzo. Fix pratici su targeting, creatività, landing e tracking; più automazioni operative.",
                  icon: <Target className="!w-6 !h-6" />
                },
                {
                  day: "Giorno 10",
                  title: "Allineamento di metà audit (30–45 min)",
                  what: "Revisione della matrice e piano di intervento. Validiamo le priorità col tuo team. Scegliamo L'intervento veloce da implementare.",
                  result: "Via libera su ciò che conta davvero, senza supposizioni.",
                  icon: <Users className="!w-6 !h-6" />
                },
                {
                  day: "Giorno 10–12",
                  title: "Creazione e prima implementazione veloce",
                  what: "Configuriamo il primo implementazione veloce concordato e lo testiamo sulla tua struttura.",
                  icon: <Settings className="!w-6 !h-6" />
                },
                {
                  day: "Giorno 12–13",
                  title: "Previsioni e piano 90 giorni",
                  what: "Modelliamo risparmi/aumento atteso e ritorno sull'investimento; prepariamo il Piano Previsioni. Creiamo un Piano d’Azione 90 Giorni settimana per settimana con owner e milestone.",
                  icon: <LineChart className="!w-6 !h-6" />
                },
                {
                  day: "Giorno 14",
                  title: "Presentazione finale → attivazione live",
                  what: "Presentiamo i risultati, confermiamo il piano e attiviamo l'implementazione veloce in live. Rispondiamo a ogni domanda e definiamo i prossimi step.",
                  result: "Se vuoi che eseguiamo il piano 90 giorni, applichiamo un credito di €500.",
                  icon: <Award className="!w-6 !h-6" />
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className={`!relative !flex !items-center !mb-12 €{index % 2 === 0 ? '!justify-start' : '!justify-end'}`}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-duration={1200}
                >
                  <div className="!absolute !left-1/2 !w-12 !h-12 !bg-gradient-to-r !from-yellow-light !to-blue-middle !rounded-full !-translate-x-1/2 !flex !items-center !justify-center !shadow-lg">
                    {step.icon}
                  </div>

                  <div className={`!w-5/12 !bg-slate-900 !rounded-xl !p-6 !border !border-slate-800 hover:!border-[#FEC458]/50 !transition-all €{index % 2 === 0 ? '!mr-auto' : '!ml-auto'}`}>
                    <span className="!text-[#FEC458] !text-sm !font-bold">{step.day}</span>
                    <h4 className="!text-xl !font-bold !text-white !mb-2">{step.title}</h4>
                    <p className="!text-gray-400 !text-sm !mb-3">
                      <span className="!font-semibold !text-gray-300">Cosa facciamo:</span> {step.what}
                    </p>
                    {step.collect && (
                      <p className="!text-gray-400 !text-sm !mb-3">
                        <span className="!font-semibold !text-gray-300">Cosa raccogliamo:</span> {step.collect}
                      </p>
                    )}
                    {step.result && (
                      <p className="!text-blue-400 !text-sm">
                        <span className="!font-semibold">Ottieni:</span> {step.result}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE */}
          <div className="lg:hidden" ref={mobileTimelineRef}>
            <div className="!relative !pl-8">
              <div className="!absolute !left-4 !top-0 !bottom-0 !w-0.5 !overflow-hidden !bg-slate-800/30">
                <div
                  className="!absolute !left-0 !top-0 !w-full !bg-gradient-to-b !from-yellow-light !via-blue-middle !to-yellow-light !transition-all !duration-300 !ease-out"
                  style={{ height: `€{lineHeight}%` }}
                />
              </div>

              {[
                {
                  day: "Giorno 0–1",
                  title: "Kickoff",
                  fullTitle: "Kickoff (obiettivi e accessi)",
                  what: "Allineamento su obiettivi e KPI; conferma ICP, offerte e criteri di successo.",
                  collect: "Accesso in sola lettura a Google/Meta/LinkedIn Ads, CRM, call log/sistema telefonico e calendario.",
                  result: "Riepilogo call + checklist di ciò che manca.",
                  icon: <Rocket />
                },
                {
                  day: "Giorno 1–3",
                  title: "Dati e baseline",
                  fullTitle: "Raccolta dati e baseline",
                  what: "Estraiamo i numeri reali: lead, CPL/CPA, speed-to-lead, % chiamate perse, show-rate, close-rate e LTV. Individuiamo eventuali gap di tracking.",
                  icon: <BarChart3 />
                },
                {
                  day: "Giorno 3–5",
                  title: "Mappa funnel",
                  fullTitle: "Mappatura funnel e colli di bottiglia",
                  what: "Mappiamo il flusso lead → prenotazione (ads → acquisizione lead → contatto → booking → follow-up). Evidenziamo perdite: risposta lenta, chiamate perse, passaggi manuali, rischio no-show.",
                  icon: <Activity />
                },
                {
                  day: "Giorno 6–9",
                  title: "Opportunità",
                  fullTitle: "Shortlist opportunità (impatto vs sforzo)",
                  what: "Selezioniamo 3–6 azioni ad alto ROI (marketing + AI) e le ordiniamo per impatto/sforzo. Fix pratici su targeting, creatività, landing e tracking; più automazioni operative.",
                  icon: <Target />
                },
                {
                  day: "Giorno 10",
                  title: "Allineamento",
                  fullTitle: "Allineamento di metà audit (30–45 min)",
                  what: "Review di flow map e shortlist. Validiamo le priorità col tuo team. Scegliamo il Quick Win da implementare.",
                  result: "Via libera su ciò che conta davvero, senza supposizioni.",
                  icon: <Users />
                },
                {
                  day: "Giorno 10–12",
                  title: "Build Quick Win",
                  fullTitle: "Build e test del Quick Win",
                  what: "Configuriamo il Quick Win concordato e lo testiamo end-to-end sul tuo stack.",
                  icon: <Settings />
                },
                {
                  day: "Giorno 12–13",
                  title: "Previsioni e piano",
                  fullTitle: "Previsioni e piano 90 giorni",
                  what: "Modelliamo risparmi/aumento atteso e payback; prepariamo il piano previsionale. Creiamo un Piano d’Azione 90 Giorni settimana per settimana con owner e milestone.",
                  icon: <LineChart />
                },
                {
                  day: "Giorno 14",
                  title: "Go Live!",
                  fullTitle: "Presentazione finale → attivazione live",
                  what: "Presentiamo i risultati, confermiamo il piano e attiviamo l'implementazione veloce in live. Rispondiamo a ogni domanda e definiamo i prossimi step.",
                  result: "Se vuoi che eseguiamo il piano 90 giorni, applichiamo un credito di €500.",
                  icon: <Award />
                }
              ].map((step, index) => (
                <div key={index} className="!relative !mb-8" data-aos="fade-up" data-aos-duration={1000}>
                  <div className="!absolute !left-0 !w-8 !h-8 !bg-gradient-to-r !from-[#FEC458] !to-[#3C91E6] !rounded-full !flex !items-center !justify-center">
                    {React.cloneElement(step.icon, { className: "!w-4 !h-4 !text-white" })}
                  </div>
                  <div
                    className="!ml-9 !bg-slate-900 !rounded-lg !p-4 !border !border-slate-800 !cursor-pointer hover:!border-[#FEC458]/50 !transition-all"
                    onClick={() => toggleCardExpansion(index)}
                  >
                    <div className="!flex !items-start !justify-between">
                      <div className="!flex-1">
                        <span className="!text-[#FEC458] !text-xs !font-bold">{step.day}</span>
                        <h5 className="!text-lg !font-bold !text-white">{step.title}</h5>
                      </div>
                      <div className="!w-6 !h-6 !rounded-full !bg-[#FEC458]/20 !flex !items-center !justify-center !flex-shrink-0 !ml-2">
                        <ChevronDown
                          className={`!w-4 !h-4 !text-[#FEC458] !transition-transform !duration-300 €{expandedCards[index] ? '!rotate-180' : ''}`}
                        />
                      </div>
                    </div>

                    {expandedCards[index] && (
                      <div className="!mt-4 !pt-4 !border-t !border-slate-700">
                        <h6 className="!text-base !font-semibold !text-white !mb-3">{step.fullTitle}</h6>
                        <p className="!text-gray-400 !text-sm !mb-3">
                          <span className="!font-semibold !text-gray-300">Cosa facciamo:</span> {step.what}
                        </p>
                        {step.collect && (
                          <p className="!text-gray-400 !text-sm !mb-3">
                            <span className="!font-semibold !text-gray-300">Cosa raccogliamo:</span> {step.collect}
                          </p>
                        )}
                        {step.result && (
                          <p className="!text-blue-400 !text-sm">
                            <span className="!font-semibold">Ottieni:</span> {step.result}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section-padding bg-bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap justify-center mb-16">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-4"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Per chi è / Per chi non è
              </h2>
              <p
                className="body-text text-white/90"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Verifichiamo insieme se è la soluzione giusta per il tuo business
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* PERFECT FOR */}
              <div data-aos="fade-right" data-aos-duration={1500} className="relative">
                <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-yellow-light/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-yellow-light/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/30 transition-all duration-300">
                      <CheckCircle className="w-8 h-8 text-yellow-light" />
                    </div>
                    <h3 className="sub-heading text-white">Ideale per:</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-light mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Aziende guidate da lead</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-light mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Che investono in Google / Meta / LinkedIn Ads</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-light mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Che vogliono più prenotazioni senza aumentare il personale</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* NOT FOR */}
              <div data-aos="fade-left" data-aos-duration={1500} className="relative">
                <div className="bg-[#0D2552]/50 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-blue-middle/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-light/20 transition-all duration-300">
                      <XCircle className="w-8 h-8 text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                    </div>
                    <h3 className="sub-heading text-white">Non adatto a:</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-middle mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Assenza di sistemi di tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-middle mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Nessuna attività advertising</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-middle mt-2 flex-shrink-0" />
                      <span className="body-text text-text-light">Nessuna disponibilità a concedere accessi in sola lettura</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE (TESTO MINIMO, PREZZI INVARIATI) */}
      <section className=" bg-bg-primary relative overflow-hidden">
        <div className="section-padding container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2
                className="section-heading text-white mb-12"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Audit
              </h2>

              <div data-aos="fade-up" data-aos-delay={100} data-aos-duration={1200}>
                <div className="mb-16">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="text-gray-500 line-through" style={{ fontSize: '2.5rem', fontWeight: '600', lineHeight: '1', letterSpacing: '-0.02em' }}>€3,300</span>
                    <span className="text-yellow-light" style={{ fontSize: '4rem', fontWeight: '700', lineHeight: '1', letterSpacing: '-0.03em' }}>€1,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-16 bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/10 to-warm-yellow/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="section-heading font-bold text-white mb-4">Pronto a individuare le perdite di crescita?</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Unisciti a oltre 50 aziende che hanno usato il Jumpstart Audit per sbloccare fatturato “nascosto” nel funnel.
          </p>
          <CTAButton
            href="https://api.leadconnectorhq.com/widget/bookings/automis-it"
            external={true}
            variant="primary"
            size="large"
            className="btn-primary-cta"
          >
            Prenota una Call
          </CTAButton>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        sectionTitle="Domande Frequenti"
        sectionSubtitle="FAQ"
        sectionDescription="Sappiamo che potresti avere domande sul Jumpstart Audit. Qui trovi le risposte più comuni. Se non trovi ciò che cerchi, contattaci."
        iconClass="fas fa-question-circle"
        bgColor="bg-section-black"
        faqs={[
          {
            question: "Quanto velocemente vedremo impatto?",
            answer: `Entro 14 giorni.

• Giorno 0–10: avrai baseline, mappa delle perdite e shortlist prioritaria (core).

• Giorno 14: attiviamo il Quick Win in live (bonus), così chiudi la call finale con qualcosa già operativo.

Segnali iniziali tipici: speed-to-lead più veloce, recupero chiamate perse o più risposte/prenotazioni da reminder e reattivazioni—dipende dal Quick Win che implementiamo.`
          },
          {
            question: "Eseguite voi il piano 90 giorni?",
            answer: `Sì—se lo desideri.

• L’audit è completo di per sé: ricevi piano, previsioni e potenziale implementazione veloce.
• Se vuoi che il nostro team implementi, offriamo un retainer e accreditiamo $500 del costo audit se inizi entro 14 giorni.

• In ogni caso, l'implementazione veloce include 14 giorni di supporto (bonus) per continuare a generare risultati.`
          },
          {
            question: "GDPR Compliant?",
            answer: `Supportiamo configurazioni GDPR Compliant dove necessario.

• Progettiamo automazioni per minimizzare l’esposizione di dati sensibili (PHI), limitare la retention e usare canali sicuri.

• Opzioni: nessuna registrazione o trascrizioni redatte, accessi a privilegi minimi, linguaggio di consenso chiaro.

• Indichiamo cosa è “safe” vs “non safe” nel tuo stack e forniamo una checklist compliance su richiesta.

(Se la tua organizzazione richiede un accordo specifico o policy review, lo definiamo nel kickoff.)`
          },
          {
            question: "Che accessi vi servono?",
            answer: `Accessi in sola lettura per analizzare senza modificare nulla:

• Piattaforme Ads: Google, Meta, LinkedIn (vista).

• CRM: stati lead, timestamp e outcome (esporta o vista).

• Sistema telefonico/call log: chiamate perse, metriche base (registrazioni opzionali).

• Calendario/scheduling: view su prenotazioni e no-show / API.

In più: un referente per domande rapide e approvazioni. Forniamo una checklist breve durante il kickoff.`
          },
          {
            question: "E se non potete aiutarci?",
            answer: `Riduciamo il rischio con due tutele:

• Idoneità garantita (Kickoff): se emergono limiti di dati/stack che impediscono impatto sui KPI core, rimborsiamo subito.

• Trasparenza garantita (Final): se l’audit non mostra un percorso data-backed per 10% costi in meno o 5% prenotazioni in più o 10 ore/settimana risparmiate, rimborsiamo l’audit.

(Le garanzie richiedono accessi tempestivi in sola lettura e dati storici accurati.)`
          }
        ]}
      />

      {/* FINAL CTA */}
      <section className="section-padding bg-gradient-to-b from-black to-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full lg:w-2/3 text-center">
              <h2
                className="section-heading text-white mb-6"
                data-aos="fade-up"
                data-aos-duration={1200}
              >
                Pronto a trasformare il tuo funnel?
              </h2>
              <p
                className="sub-heading text-white/90 mb-8"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1200}
              >
                Unisciti alle aziende che hanno ridotto i costi fino al 45% e aumentato le prenotazioni del 250%
              </p>
              <div
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={1200}
              >
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/automis-it"
                  external={true}
                  variant="secondary"
                  size="large"
                >
                  <Rocket className="w-6 h-6 mr-2" />
                  Prenota una Discovery Call
                </CTAButton>
                <p className="mt-6 small-text text-yellow-light font-semibold">
                  Solo 5 audit disponibili ogni mese per garantire implementazione live nella call finale
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default JumpstartAudit;

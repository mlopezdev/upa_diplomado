"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { NodeNetwork } from "./NodeNetwork";

const stats = [
  { value: "84", unit: "h", label: "de formación" },
  { value: "4", unit: "módulos", label: "temáticos" },
  { value: "Jun–Jul", unit: "2026", label: "Inicio" },
  { value: "6", unit: "docentes", label: "especializados" },
];

export function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.07, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 0.6 }
      );
    });
    return () => ctx.revert();
  }, []);

  const titleWords = ["Gestión", "Pública", "4.0"];
  const subtitleWords = ["Inteligencia", "Artificial", "y", "Gobernanza", "Digital"];

  return (
    <section className="relative min-h-screen flex flex-col bg-[#f7f5f0] overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <NodeNetwork />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f5f0] to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col justify-center px-4 sm:px-6 pt-20 sm:pt-24 pb-12">
        <div className="max-w-6xl mx-auto w-full">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#2563eb]">
              Diplomado
            </span>
            <span className="h-px w-8 bg-[#2563eb]/40" />
            <span className="text-xs tracking-widest text-[#111827]/30 uppercase hidden sm:block">
              UPB Bucaramanga
            </span>
          </motion.div>

          {/* Title + subtitle */}
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-3">
              <div className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-0">
                {titleWords.map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <span
                      className="hero-word inline-block font-semibold leading-none tracking-tight text-[#111827]"
                      style={{
                        opacity: 0,
                        fontSize: "clamp(2.6rem, 11vw, 7rem)",
                      }}
                    >
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            </h1>

            <div ref={lineRef} className="h-[3px] w-32 sm:w-48 bg-[#2563eb] mb-4 sm:mb-5 origin-left scale-x-0" />

            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              {subtitleWords.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <span
                    className="hero-word inline-block text-[#111827]/50 font-light"
                    style={{
                      opacity: 0,
                      fontSize: "clamp(0.95rem, 3vw, 1.5rem)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center gap-3 mb-10 sm:mb-14"
          >
            <a
              href="#inscripcion"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#111827] text-white font-semibold text-sm hover:bg-[#1f2937] transition-colors duration-200"
            >
              Inscríbete ahora
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#programa"
              className="text-sm text-[#111827]/40 hover:text-[#111827] transition-colors flex items-center gap-1.5"
            >
              Ver programa
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Stats — 2×2 mobile, 4×1 desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="px-4 sm:px-5 py-4 sm:py-5 bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-black/[0.06] flex flex-col gap-0.5"
              >
                <span className="text-xl sm:text-2xl font-semibold text-[#111827] leading-none">
                  {s.value}
                  <span className="text-[#2563eb] ml-1 text-sm font-normal">{s.unit}</span>
                </span>
                <span className="text-xs text-[#111827]/40 uppercase tracking-wide mt-1">{s.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

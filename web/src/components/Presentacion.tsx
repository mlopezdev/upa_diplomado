"use client";

import { FadeIn } from "./FadeIn";

const pilares = [
  { label: "Teoría política", icon: "01" },
  { label: "Análisis de datos", icon: "02" },
  { label: "Inteligencia Artificial", icon: "03" },
  { label: "Democracia digital", icon: "04" },
  { label: "Ética pública", icon: "05" },
];

export function Presentacion() {
  return (
    <section id="programa" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-black/[0.06] bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <FadeIn>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563eb] mb-3 block">
              Sobre el programa
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827] leading-tight mb-5">
              Forma líderes públicos para la era del gobierno digital
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#111827]/60 leading-relaxed mb-4 text-sm sm:text-base">
              La Facultad de Ciencias Políticas y Gobierno de la UPB Bucaramanga
              presenta un programa diseñado para quienes toman decisiones en el
              sector público: comprender, interpretar y utilizar tecnologías
              emergentes con criterio político y fundamento ético.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[#111827]/60 leading-relaxed text-sm sm:text-base">
              La digitalización del Estado no es neutral. Implica decisiones
              políticas, riesgos éticos, sesgos algorítmicos y desafíos en materia
              de derechos fundamentales. Este diplomado entrega las herramientas
              para navegar ese territorio con responsabilidad y visión.
            </p>
          </FadeIn>
        </div>

        <div>
          <FadeIn delay={0.1}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111827]/30 mb-4">
              Ejes temáticos
            </p>
          </FadeIn>
          <div className="space-y-px">
            {pilares.map((p, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.07} direction="left">
                <div className="flex items-center gap-4 px-4 sm:px-5 py-3.5 sm:py-4 bg-[#f7f5f0] hover:bg-[#eeece6] transition-colors duration-200 group border-l-2 border-transparent hover:border-[#2563eb]">
                  <span className="text-xs font-mono text-[#2563eb]/40 group-hover:text-[#2563eb] transition-colors flex-shrink-0">
                    {p.icon}
                  </span>
                  <span className="text-[#111827]/70 group-hover:text-[#111827] transition-colors text-sm">
                    {p.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

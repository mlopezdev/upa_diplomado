"use client";

import { FadeIn } from "./FadeIn";

const perfiles = [
  {
    categoria: "Sector Público",
    items: [
      "Funcionarios públicos",
      "Concejales y diputados",
      "Asesores legislativos",
      "Equipos de planeación territorial",
      "Profesionales de gobierno local y nacional",
    ],
  },
  {
    categoria: "Análisis y Consultoría",
    items: [
      "Analistas políticos",
      "Consultores de gobierno",
      "Investigadores",
      "Miembros de organizaciones sociales",
      "Asesores y periodistas políticos",
    ],
  },
  {
    categoria: "Academia",
    items: [
      "Ciencias Políticas",
      "Derecho",
      "Administración Pública",
      "Economía",
      "Ingeniería y tecnología",
    ],
  },
];

export function Dirigido() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-black/[0.06] bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563eb] mb-3 block">
            ¿A quién va dirigido?
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827] mb-10 sm:mb-14 leading-tight">
            Para quienes lideran,
            <br />
            <span className="text-[#111827]/35">analizan y construyen gobierno</span>
          </h2>
        </FadeIn>

        {/* Mobile: accordion-style list / Desktop: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden">
          {perfiles.map((perfil, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1} direction="up">
              <div className="bg-white px-5 sm:px-8 py-6 sm:py-8 h-full">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2563eb] mb-4">
                  {perfil.categoria}
                </p>
                <ul className="space-y-2.5">
                  {perfil.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#111827]/60">
                      <span className="mt-2 w-1.5 h-px bg-[#111827]/20 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

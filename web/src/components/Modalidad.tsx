"use client";

import { FadeIn } from "./FadeIn";

const caracteristicas = [
  {
    titulo: "Clases en tiempo real",
    descripcion: "Participas en vivo con el docente y tus compañeros por videoconferencia, en el horario establecido.",
  },
  {
    titulo: "Desde cualquier lugar",
    descripcion: "Sin necesidad de desplazarte al campus. Solo necesitas conexión a internet y un dispositivo.",
  },
  {
    titulo: "Interacción directa",
    descripcion: "Preguntas, debates y ejercicios en tiempo real — la misma dinámica de una clase presencial.",
  },
  {
    titulo: "Grabaciones disponibles",
    descripcion: "Las sesiones quedan grabadas para que puedas repasar el contenido cuando lo necesites.",
  },
];

export function Modalidad() {
  return (
    <section id="modalidad" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-black/[0.06] bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <FadeIn>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563eb] mb-3 block">
              Modalidad
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827] leading-tight mb-5">
              Telepresencial:
              <br />
              <span className="text-[#111827]/35">lo mejor de dos mundos</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#111827]/60 leading-relaxed mb-4 text-sm sm:text-base">
              La modalidad <strong className="text-[#111827]/80">telepresencial</strong> no es simplemente
              &ldquo;virtual&rdquo;. Es una experiencia sincrónica donde docentes y estudiantes
              se encuentran en tiempo real a través de plataformas de videoconferencia.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[#111827]/60 leading-relaxed text-sm sm:text-base">
              Tienes la flexibilidad de conectarte desde cualquier ciudad del país
              sin perder la riqueza del debate académico y la interacción directa
              que caracteriza a la UPB.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="mt-6 sm:mt-8">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full border border-black/10 text-[#111827]/50">
                Mar, mié y jue
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-black/10 text-[#111827]/50">
                6:00 – 10:00 pm
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full border border-[#2563eb]/25 text-[#2563eb]">
                80% asistencia mínima
              </span>
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {caracteristicas.map((c, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.1} direction="left">
              <div className="p-4 sm:p-5 rounded-xl border border-black/[0.07] bg-[#f7f5f0] h-full">
                <div className="w-8 h-8 rounded-lg bg-[#2563eb]/8 border border-[#2563eb]/15 flex items-center justify-center mb-3">
                  <span className="text-xs font-mono text-[#2563eb]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#111827] mb-1.5">{c.titulo}</h4>
                <p className="text-xs text-[#111827]/50 leading-relaxed">{c.descripcion}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

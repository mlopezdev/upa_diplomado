"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sesiones = [
  { n: 1,  fecha: "Jue, 11 jun", modulo: "M1", tema: "Democracia electrónica y plataformas participativas", docente: "Christian Camilo Luna" },
  { n: 2,  fecha: "Mar, 16 jun", modulo: "M1", tema: "Movilización digital y acción colectiva", docente: "Christian Camilo Luna" },
  { n: 3,  fecha: "Mié, 17 jun", modulo: "M1", tema: "Riesgos de desinformación y manipulación algorítmica", docente: "Christian Camilo Luna" },
  { n: 4,  fecha: "Jue, 18 jun", modulo: "M1", tema: "Diseño de estrategias digitales para participación territorial", docente: "Christian Camilo Luna" },
  { n: 5,  fecha: "Mar, 23 jun", modulo: "M1", tema: "Transformación digital del Estado", docente: "Natalia Albañil" },
  { n: 6,  fecha: "Mié, 24 jun", modulo: "M1", tema: "Gobierno abierto y datos abiertos", docente: "Natalia Albañil" },
  { n: 7,  fecha: "Jue, 25 jun", modulo: "M1", tema: "Ecosistemas digitales y políticas públicas", docente: "Natalia Albañil" },
  { n: 8,  fecha: "Mar, 30 jun", modulo: "M1", tema: "Experiencias comparadas en América Latina", docente: "Natalia Albañil" },
  { n: 9,  fecha: "Mié, 1 jul",  modulo: "M2", tema: "Fundamentos de IA y automatización administrativa", docente: "Miguel López" },
  { n: 10, fecha: "Jue, 2 jul",  modulo: "M2", tema: "IA en políticas sociales y focalización", docente: "Miguel López" },
  { n: 11, fecha: "Mar, 7 jul",  modulo: "M2", tema: "Chatbots y atención ciudadana", docente: "Miguel López" },
  { n: 12, fecha: "Mié, 8 jul",  modulo: "M2", tema: "Sesgos algorítmicos y riesgos democráticos", docente: "Miguel López" },
  { n: 13, fecha: "Jue, 9 jul",  modulo: "M2", tema: "Fundamentos de big data en el sector público", docente: "María Alejandra Santos" },
  { n: 14, fecha: "Mar, 14 jul", modulo: "M2", tema: "Fuentes de datos públicos en Colombia", docente: "María Alejandra Santos" },
  { n: 15, fecha: "Mié, 15 jul", modulo: "M2", tema: "Análisis de comportamiento electoral y opinión pública", docente: "María Alejandra Santos" },
  { n: 16, fecha: "Jue, 16 jul", modulo: "M2", tema: "Toma de decisiones basada en evidencia", docente: "María Alejandra Santos" },
  { n: 17, fecha: "Mar, 21 jul", modulo: "M3", tema: "Políticas públicas experimentales", docente: "Edmundo Arias" },
  { n: 18, fecha: "Mié, 22 jul", modulo: "M3", tema: "Laboratorios de innovación gubernamental", docente: "Edmundo Arias" },
  { n: 19, fecha: "Jue, 23 jul", modulo: "M3", tema: "Evaluación de impacto y analítica predictiva", docente: "Edmundo Arias" },
  { n: 20, fecha: "Mar, 28 jul", modulo: "M4", tema: "Ética pública, tecnología y protección de datos", docente: "Luisa García" },
  { n: 21, fecha: "Mié, 29 jul", modulo: "M4", tema: "Derechos fundamentales, vigilancia digital y transparencia algorítmica", docente: "Luisa García" },
];

const moduloColors: Record<string, string> = {
  M1: "text-blue-600 bg-blue-50 border-blue-200",
  M2: "text-amber-700 bg-amber-50 border-amber-200",
  M3: "text-emerald-700 bg-emerald-50 border-emerald-200",
  M4: "text-rose-700 bg-rose-50 border-rose-200",
};

export function Cronograma() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section id="cronograma" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-black/[0.06] bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563eb] mb-3 block"
          >
            Cronograma
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827] mb-1.5"
          >
            21 sesiones · Jun 11 – Jul 29
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#111827]/40 text-sm"
          >
            Martes, miércoles y jueves · 6:00 – 10:00 pm
          </motion.p>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-black/[0.07] bg-white">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-black/[0.06] bg-[#f7f5f0]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#111827]/30 uppercase tracking-wider w-8">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#111827]/30 uppercase tracking-wider">Fecha</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#111827]/30 uppercase tracking-wider w-12">Mód.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#111827]/30 uppercase tracking-wider">Tema</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#111827]/30 uppercase tracking-wider">Docente</th>
              </tr>
            </thead>
            <tbody>
              {sesiones.map((s, i) => (
                <motion.tr
                  key={s.n}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.02 }}
                  className="border-b border-black/[0.04] hover:bg-[#f7f5f0] transition-colors duration-100 last:border-0"
                >
                  <td className="px-4 py-3 text-xs font-mono text-[#111827]/20">{String(s.n).padStart(2, "0")}</td>
                  <td className="px-4 py-3 text-sm text-[#111827]/50 whitespace-nowrap">{s.fecha}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${moduloColors[s.modulo]}`}>{s.modulo}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#111827]/70">{s.tema}</td>
                  <td className="px-4 py-3 text-sm text-[#111827]/40 whitespace-nowrap">{s.docente}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: card list */}
        <div className="sm:hidden space-y-2">
          {sesiones.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.02 }}
              className="bg-white rounded-xl border border-black/[0.06] px-4 py-3.5 flex gap-3 items-start"
            >
              <span className={`mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${moduloColors[s.modulo]}`}>
                {s.modulo}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#111827]/80 leading-snug mb-1">{s.tema}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[#111827]/40">{s.fecha}</span>
                  <span className="text-[#111827]/20 text-xs">·</span>
                  <span className="text-xs text-[#111827]/40">{s.docente}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

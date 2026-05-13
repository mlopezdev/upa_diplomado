"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const modulos = [
  {
    numero: "01", horas: "32 h",
    titulo: "Democracia Digital y Participación Ciudadana",
    descripcion: "Fundamentos de Gobernanza Digital",
    fechas: "11 jun – 1 jul 2026",
    temas: [
      "Democracia electrónica y plataformas participativas",
      "Presupuestos participativos digitales",
      "Movilización digital y acción colectiva",
      "Desinformación y manipulación algorítmica",
      "Transformación digital del Estado",
      "Gobierno abierto y datos abiertos",
      "Ecosistemas digitales y políticas públicas",
      "Experiencias comparadas en América Latina",
    ],
    docentes: ["Christian Camilo Luna Chacón", "Natalia Albañil"],
  },
  {
    numero: "02", horas: "32 h",
    titulo: "Inteligencia Artificial y Gestión Pública",
    descripcion: "Big Data y Análisis Político",
    fechas: "1 – 16 jul 2026",
    temas: [
      "Fundamentos de IA y automatización administrativa",
      "IA en políticas sociales y focalización",
      "Chatbots y atención ciudadana",
      "Sesgos algorítmicos y riesgos democráticos",
      "Big data en el sector público",
      "Fuentes de datos públicos en Colombia",
      "Análisis de comportamiento electoral",
      "Toma de decisiones basada en evidencia",
    ],
    docentes: ["Miguel López", "María Alejandra Santos"],
  },
  {
    numero: "03", horas: "12 h",
    titulo: "Innovación y Laboratorios de Gobierno",
    descripcion: "Políticas Basadas en Datos",
    fechas: "21 – 23 jul 2026",
    temas: [
      "Políticas públicas experimentales",
      "Laboratorios de innovación gubernamental",
      "Evaluación de impacto y analítica predictiva",
      "Diseño de proyectos de innovación pública",
    ],
    docentes: ["Edmundo Arias"],
  },
  {
    numero: "04", horas: "8 h",
    titulo: "Ética, Derechos y Regulación Digital",
    descripcion: "Responsabilidad en la Era Algorítmica",
    fechas: "28 – 29 jul 2026",
    temas: [
      "Ética pública y tecnología",
      "Protección de datos personales",
      "Derechos fundamentales y vigilancia digital",
      "Transparencia algorítmica y responsabilidad política",
    ],
    docentes: ["Luisa García"],
  },
];

function ModuloCard({ mod, index }: { mod: (typeof modulos)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col border border-black/[0.07] rounded-2xl overflow-hidden hover:border-[#2563eb]/30 transition-colors duration-300 bg-white"
    >
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-black/[0.05]">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl sm:text-4xl font-mono font-thin text-[#2563eb]/15 group-hover:text-[#2563eb]/40 transition-colors duration-300">
            {mod.numero}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-[#2563eb]/25 text-[#2563eb] bg-[#2563eb]/5">
            {mod.horas}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-[#111827] leading-snug mb-1">
          {mod.titulo}
        </h3>
        <p className="text-xs sm:text-sm text-[#111827]/40">{mod.descripcion}</p>
      </div>

      <div className="px-5 sm:px-6 py-4 flex-1 bg-[#f7f5f0]/50">
        <ul className="space-y-2">
          {mod.temas.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#111827]/55">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#2563eb]/40 flex-shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-5 sm:px-6 py-3.5 border-t border-black/[0.05] bg-white flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-[#111827]/30 uppercase tracking-wider mb-0.5">Fechas</p>
          <p className="text-xs text-[#111827]/60">{mod.fechas}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#111827]/30 uppercase tracking-wider mb-0.5">Docentes</p>
          {mod.docentes.map((d, i) => (
            <p key={i} className="text-xs text-[#111827]/60">{d}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Modulos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section id="modulos" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-black/[0.06] bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563eb] mb-3 block"
          >
            Contenido del programa
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827]"
          >
            4 módulos para transformar
            <br />
            <span className="text-[#111827]/35">tu visión del gobierno digital</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {modulos.map((mod, i) => (
            <ModuloCard key={i} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

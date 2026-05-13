"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─── */
const MODULOS = [
  {
    num: 1,
    titulo: "Fundamentos de la Gestión Pública en la Era Digital",
    duracion: "3 semanas · 21 horas",
    descripcion:
      "Comprende el marco institucional del Estado colombiano y cómo la transformación digital redefine los procesos administrativos. Explora los principios de buen gobierno, transparencia y accountability.",
    temas: [
      "Estado, administración pública y gobernanza contemporánea",
      "Transformación digital en el sector público colombiano",
      "Marcos normativos: Ley 1712, Decreto 1078 y Política de Gobierno Digital",
      "Indicadores de gestión y medición del desempeño institucional",
    ],
  },
  {
    num: 2,
    titulo: "Tecnologías Emergentes al Servicio del Estado",
    duracion: "3 semanas · 21 horas",
    descripcion:
      "Domina las herramientas tecnológicas que están transformando la gestión pública: inteligencia artificial, big data, blockchain y plataformas de gobierno electrónico.",
    temas: [
      "Inteligencia Artificial y machine learning en decisiones públicas",
      "Big data y analítica para políticas basadas en evidencia",
      "Gobierno electrónico, trámites en línea y servicios ciudadanos digitales",
      "Ciberseguridad y protección de datos en entidades del Estado",
    ],
  },
  {
    num: 3,
    titulo: "Gestión Financiera y Presupuesto Público 4.0",
    duracion: "3 semanas · 21 horas",
    descripcion:
      "Adquiere competencias para la planificación, ejecución y control del presupuesto público usando herramientas digitales, con énfasis en transparencia y eficiencia del gasto.",
    temas: [
      "Ciclo presupuestal y planeación estratégica pública",
      "SIIF Nación, SECOP II y herramientas de e-procurement",
      "Control fiscal y auditoría en entornos digitales",
      "Contratación pública digital y Colombia Compra Eficiente",
    ],
  },
  {
    num: 4,
    titulo: "Liderazgo, Innovación y Gestión del Cambio",
    duracion: "3 semanas · 21 horas",
    descripcion:
      "Desarrolla habilidades de liderazgo transformacional para gestionar equipos y procesos de cambio organizacional en entidades del sector público.",
    temas: [
      "Liderazgo público y gestión del talento humano",
      "Metodologías ágiles (Scrum, Kanban) en proyectos del Estado",
      "Gestión del cambio e innovación pública",
      "Comunicación estratégica y rendición de cuentas",
    ],
  },
];

const APRENDE = [
  "Aplicar marcos normativos digitales en tu entidad pública",
  "Usar IA y big data para tomar decisiones basadas en datos",
  "Dominar SECOP II, SIIF y herramientas de gobierno digital",
  "Diseñar estrategias de transformación digital institucional",
  "Liderar equipos con metodologías ágiles en el sector público",
  "Implementar estándares de transparencia y rendición de cuentas",
  "Gestionar presupuestos públicos con plataformas digitales",
  "Entender ciberseguridad aplicada al Estado colombiano",
];

const AUDIENCIA = [
  { icon: "🏛️", label: "Funcionarios públicos de nivel directivo y profesional" },
  { icon: "⚖️", label: "Abogados y asesores de entidades del Estado" },
  { icon: "📊", label: "Profesionales en planeación y control interno" },
  { icon: "🎓", label: "Egresados en Ciencias Políticas, Derecho, Administración Pública" },
  { icon: "🏢", label: "Consultores y contratistas del sector público" },
  { icon: "🌐", label: "Interesados en transformación digital gubernamental" },
];

const FAQS = [
  {
    q: "¿Cuál es el horario de clases?",
    a: "Las sesiones son martes, miércoles y jueves. El diplomado tiene modalidad Telepresencial: las clases en vivo se transmiten por plataforma virtual, con acceso a grabaciones.",
  },
  {
    q: "¿Qué certificación obtengo?",
    a: "Al completar el diplomado con mínimo el 80% de asistencia recibes un Diploma expedido por la Universidad Pontificia Bolivariana, Seccional Bucaramanga.",
  },
  {
    q: "¿Cuál es el costo total y cómo se paga?",
    a: "El valor es $1.715.000 COP. Puedes realizar pago en línea o generar una colilla de pago bancario. UPB también tiene convenios de financiamiento.",
  },
  {
    q: "¿Se requiere experiencia previa?",
    a: "Se recomienda experiencia en el sector público o formación profesional afín. No se requiere conocimiento técnico previo en tecnología.",
  },
  {
    q: "¿Cómo es la modalidad Telepresencial?",
    a: "Las clases son en vivo por videoconferencia (no pregrabadas), con interacción directa con el docente y los demás participantes. Se necesita conexión a internet estable.",
  },
];

/* ─── Star Rating ─── */
function Stars({ rating = 4.8, count = 0 }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-bold text-[#f5c518] text-sm">{rating.toFixed(1)}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.floor(rating) ? "#f5c518" : "#e5e7eb"}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      {count > 0 && <span className="text-xs text-[#0056D2] underline">({count.toLocaleString()} reseñas)</span>}
    </div>
  );
}

/* ─── Check icon ─── */
function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
      <path d="M4 10l5 5 7-8" stroke="#0056D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Module accordion card ─── */
function ModuleCard({ m, isOpen, onToggle }: { m: typeof MODULOS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-[#f9fafb] transition-colors"
      >
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0056D2]/10 text-[#0056D2] text-xs font-bold flex items-center justify-center">
            {m.num}
          </span>
          <div>
            <p className="font-semibold text-[#1a1a1a] text-sm sm:text-base leading-snug">{m.titulo}</p>
            <p className="text-xs text-[#6b7280] mt-1">{m.duracion}</p>
          </div>
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className={`flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-17 ml-12 border-t border-[#f3f4f6]">
              <p className="text-sm text-[#4b5563] mt-4 mb-3 leading-relaxed">{m.descripcion}</p>
              <ul className="space-y-2">
                {m.temas.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="6" fill="#0056D2" fillOpacity="0.1" />
                      <circle cx="8" cy="8" r="2.5" fill="#0056D2" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Enrollment Card ─── */
function EnrollCard({ sticky = false }: { sticky?: boolean }) {
  return (
    <div className={sticky ? "" : "bg-white rounded-xl shadow-lg border border-[#e5e7eb] overflow-hidden"}>
      {!sticky && (
        <div className="aspect-video bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" fillOpacity="0.9">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <p className="text-xs text-white/60 uppercase tracking-wider">Diplomado UPB</p>
          </div>
        </div>
      )}
      <div className={sticky ? "flex items-center gap-6" : "p-5"}>
        {!sticky && (
          <>
            <p className="text-2xl font-bold text-[#1a1a1a] mb-1">$1.715.000 <span className="text-sm font-normal text-[#6b7280]">COP</span></p>
            <p className="text-xs text-[#6b7280] mb-4">Inicio: 11 de junio de 2026</p>
          </>
        )}
        <Link
          href="/inscripcion"
          className={`block w-full text-center py-3 rounded-lg font-semibold text-sm transition-colors ${
            sticky
              ? "px-6 py-2 rounded-full bg-[#0056D2] text-white hover:bg-[#004bb5] whitespace-nowrap"
              : "bg-[#0056D2] text-white hover:bg-[#004bb5]"
          }`}
        >
          Inscríbete ahora
        </Link>
        {!sticky && (
          <>
            <p className="text-xs text-center text-[#9ca3af] mt-3 mb-4">30 días de garantía de devolución</p>
            <div className="space-y-2.5 border-t border-[#f3f4f6] pt-4">
              {[
                "84 horas de contenido en vivo",
                "Acceso a grabaciones de sesiones",
                "4 módulos temáticos especializados",
                "Diploma UPB al completar el programa",
                "Acompañamiento docente directo",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l4 4 6-7" stroke="#0056D2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function V2Page() {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) setShowSticky(window.scrollY > heroRef.current.offsetHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Fixed right card — desktop only, always visible ── */}
      <div
        className="hidden lg:block fixed z-40 overflow-y-auto"
        style={{
          top: 80,
          right: "max(calc((100vw - 1152px) / 2 + 24px), 24px)",
          width: 340,
          maxHeight: "calc(100vh - 96px)",
        }}
      >
        <EnrollCard />
        <div className="mt-4 p-4 rounded-xl bg-[#f0f7ff] border border-[#bfdbfe]">
          <p className="text-xs font-semibold text-[#0056D2] uppercase tracking-wider mb-2">Información del programa</p>
          <div className="space-y-2">
            {[
              ["Inicio", "11 jun 2026"],
              ["Fin", "14 ago 2026"],
              ["Duración", "84 horas · 12 semanas"],
              ["Modalidad", "Telepresencial"],
              ["Días", "Mar · Mié · Jue"],
              ["Campus", "UPB Bucaramanga"],
              ["Cupos", "30 disponibles"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-[#6b7280]">{k}</span>
                <span className="text-[#1a1a1a] font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky top bar ── */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e7eb] shadow-sm"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <p className="font-semibold text-[#1a1a1a] text-sm truncate">Diplomado en Gestión Pública 4.0</p>
                <Stars rating={4.8} />
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="hidden sm:block font-bold text-[#1a1a1a]">$1.715.000</span>
                <Link
                  href="/inscripcion"
                  className="px-5 py-2 rounded-full bg-[#0056D2] text-white text-sm font-semibold hover:bg-[#004bb5] transition-colors"
                >
                  Inscríbete
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero (dark) ── */}
      <div ref={heroRef} className="bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white/80 transition-colors">UPB</Link>
            <span>/</span>
            <span className="hover:text-white/80 transition-colors cursor-default">Ciencias Políticas</span>
            <span>/</span>
            <span className="text-white/80">Diplomado en Gestión Pública 4.0</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
            {/* Left */}
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#60a5fa] mb-3">
                Diplomado · UPB Bucaramanga
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white">
                Gestión Pública 4.0
              </h1>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
                Lidera la transformación digital del Estado colombiano. Domina las herramientas, marcos normativos y habilidades que el sector público necesita hoy.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Stars rating={4.8} count={0} />
                <span className="text-white/50 text-xs">·</span>
                <span className="text-sm text-white/70"><strong className="text-white">30</strong> cupos disponibles</span>
                <span className="text-white/50 text-xs hidden sm:block">·</span>
                <span className="text-sm text-white/70 hidden sm:block"><strong className="text-white">84 horas</strong> de contenido</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: "📡", label: "Telepresencial" },
                  { icon: "🗓️", label: "11 jun – 14 ago 2026" },
                  { icon: "🏛️", label: "Nivel profesional" },
                  { icon: "🎓", label: "Diploma UPB" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs border border-white/10"
                  >
                    <span>{b.icon}</span> {b.label}
                  </span>
                ))}
              </div>

              {/* Offered by */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <Image src="/logo-blanco.png" alt="UPB" width={80} height={22} className="h-6 w-auto object-contain opacity-80" />
                <span className="text-white/40 text-xs">Facultad de Ciencias Políticas y Gobierno</span>
              </div>
            </div>

            {/* spacer for the fixed card column */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-28 lg:pb-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">

        {/* Left column */}
        <div className="space-y-14">

          {/* What you'll learn */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-6">Lo que aprenderás</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {APRENDE.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check />
                  <p className="text-sm text-[#374151] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-5">Habilidades que ganarás</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Gobierno Digital", "Política Pública", "SECOP II", "Gestión Presupuestal",
                "Transformación Digital", "Inteligencia Artificial", "Liderazgo Público",
                "Transparencia", "Big Data", "Metodologías Ágiles", "Ciberseguridad", "SIIF Nación",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full border border-[#d1d5db] text-xs text-[#374151] hover:border-[#0056D2] hover:text-[#0056D2] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Modules */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a]">Contenido del diplomado</h2>
                <p className="text-sm text-[#6b7280] mt-1">4 módulos · 84 horas · 12 semanas</p>
              </div>
              <button
                onClick={() => setOpenModule(openModule !== null ? null : 0)}
                className="text-xs text-[#0056D2] hover:underline"
              >
                {openModule !== null ? "Contraer todos" : "Expandir todos"}
              </button>
            </div>
            <div className="space-y-3">
              {MODULOS.map((m, i) => (
                <ModuleCard
                  key={m.num}
                  m={m}
                  isOpen={openModule === i}
                  onToggle={() => setOpenModule(openModule === i ? null : i)}
                />
              ))}
            </div>
          </section>

          {/* About */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-4">Acerca del programa</h2>
            <div className="prose prose-sm max-w-none text-[#374151] space-y-4">
              <p>
                El <strong>Diplomado en Gestión Pública 4.0</strong> de la Universidad Pontificia Bolivariana Seccional Bucaramanga responde a las demandas de un Estado colombiano en plena transformación digital. Con la Política de Gobierno Digital (Decreto 1008 de 2018) y las exigencias de transparencia y eficiencia, los profesionales del sector público necesitan competencias que vayan más allá de la administración tradicional.
              </p>
              <p>
                A través de 4 módulos intensivos con sesiones telepresenciales interactivas, los participantes adquirirán conocimiento práctico en tecnologías emergentes aplicadas al Estado, gestión presupuestal digital, liderazgo transformacional y marcos normativos vigentes.
              </p>
              <p>
                Al finalizar, recibirás un <strong>Diploma UPB</strong> que certifica tus competencias ante empleadores e instituciones del sector público, con el respaldo de una de las universidades más prestigiosas de Colombia.
              </p>
            </div>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-6">Docente</h2>
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0056D2] to-[#0a1628] flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                CL
              </div>
              <div>
                <p className="font-bold text-[#0056D2] text-base hover:underline cursor-pointer">
                  Christian Camilo Luna Chacón
                </p>
                <p className="text-sm text-[#6b7280] mt-0.5">
                  Facultad de Ciencias Políticas y Gobierno · UPB Bucaramanga
                </p>
                <Stars rating={4.8} />
                <p className="text-sm text-[#374151] mt-3 leading-relaxed">
                  Docente investigador especializado en gobernanza digital, política pública y transformación del Estado. Con amplia experiencia en formación de funcionarios públicos y asesoría a entidades del orden nacional y territorial.
                </p>
                <div className="flex gap-4 mt-3">
                  <a href="mailto:christian.luna@upb.edu.co" className="text-xs text-[#0056D2] hover:underline">
                    christian.luna@upb.edu.co
                  </a>
                  <a href="tel:+573167437060" className="text-xs text-[#0056D2] hover:underline">
                    316 743 7060
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Audience */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-5">¿A quién va dirigido?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AUDIENCIA.map((a) => (
                <div key={a.label} className="flex items-start gap-3 p-4 rounded-lg border border-[#e5e7eb] hover:border-[#0056D2]/30 transition-colors">
                  <span className="text-xl flex-shrink-0">{a.icon}</span>
                  <p className="text-sm text-[#374151] leading-relaxed">{a.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-6">Preguntas frecuentes</h2>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-[#f9fafb] transition-colors"
                  >
                    <p className="font-medium text-[#1a1a1a] text-sm">{faq.q}</p>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    >
                      <path d="M5 8l5 5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-[#4b5563] leading-relaxed border-t border-[#f3f4f6] pt-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#6b7280]">
              ¿Más preguntas?{" "}
              <a href="mailto:christian.luna@upb.edu.co" className="text-[#0056D2] hover:underline">
                Contáctanos
              </a>
            </p>
          </section>
        </div>

        {/* Right column: spacer — card+info are fixed from hero */}
        <div className="hidden lg:block" />

      </div>

      {/* ── Why UPB ── */}
      <div className="bg-[#f9fafb] border-t border-[#e5e7eb] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-8 text-center">
            Por qué elegir UPB
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🏆",
                title: "Excelencia académica",
                desc: "Una de las universidades más reconocidas de Colombia, con más de 80 años de trayectoria en formación de líderes.",
              },
              {
                icon: "🌐",
                title: "Conexión con el sector público",
                desc: "Red de egresados y vínculos directos con entidades del Estado a nivel nacional, departamental y municipal.",
              },
              {
                icon: "📜",
                title: "Diploma con respaldo institucional",
                desc: "Certificación reconocida por empleadores del sector público y privado en toda Colombia.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-[#0a1628] text-white py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">¿Listo para dar el siguiente paso?</h2>
          <p className="text-white/60 mb-8 text-sm sm:text-base">
            30 cupos disponibles. El diplomado inicia el <strong className="text-white">11 de junio de 2026</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/inscripcion"
              className="px-8 py-3.5 rounded-full bg-[#0056D2] text-white font-semibold hover:bg-[#004bb5] transition-colors"
            >
              Inscríbete ahora — $1.715.000
            </Link>
            <a
              href="mailto:christian.luna@upb.edu.co"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white/80 font-semibold hover:border-white/40 transition-colors"
            >
              Solicitar información
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e5e7eb] py-6 pb-24 lg:pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Image src="/logo-color.png" alt="UPB" width={80} height={22} className="h-6 w-auto object-contain opacity-50" />
          <p className="text-xs text-[#9ca3af] text-center">
            Universidad Pontificia Bolivariana · Seccional Bucaramanga · Facultad de Ciencias Políticas y Gobierno
          </p>
          <Link href="/" className="text-xs text-[#0056D2] hover:underline">
            Ver versión original
          </Link>
        </div>
      </footer>

      {/* ── Mobile fixed bottom bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e7eb] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="font-bold text-[#1a1a1a] text-base">$1.715.000 <span className="text-xs font-normal text-[#6b7280]">COP</span></p>
            <p className="text-xs text-[#6b7280]">Inicio 11 jun · 84 h · Telepresencial</p>
          </div>
          <Link
            href="/inscripcion"
            className="flex-shrink-0 px-5 py-2.5 rounded-full bg-[#0056D2] text-white text-sm font-semibold hover:bg-[#004bb5] transition-colors"
          >
            Inscríbete
          </Link>
        </div>
      </div>

    </div>
  );
}

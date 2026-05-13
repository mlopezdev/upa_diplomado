"use client";

import { FadeIn } from "./FadeIn";
import Image from "next/image";

export function CTA() {
  return (
    <section id="inscripcion" className="py-16 sm:py-24 px-4 sm:px-6 border-t border-black/[0.06] bg-[#f7f5f0]">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl border border-[#2563eb]/20 bg-white p-6 sm:p-12 md:p-16 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(37,99,235,0.05) 0%, transparent 60%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <FadeIn>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2563eb] mb-3 block">
                  Inscripción abierta
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111827] leading-tight mb-5">
                  Sé parte del cambio
                  <br />
                  en la gestión pública
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-[#111827]/50 leading-relaxed mb-2 text-sm sm:text-base">
                  El diplomado inicia el <strong className="text-[#111827]/80">11 de junio de 2026</strong>.
                  Cupos limitados. Certifícate con la UPB Bucaramanga.
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-[#2563eb] mb-7">
                  $1.715.000 COP
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/inscripcion"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2563eb] text-white font-semibold text-sm hover:bg-[#1d4ed8] transition-colors duration-200"
                  >
                    Inscríbete ahora
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:christian.luna@upb.edu.co"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-black/[0.12] text-[#111827] font-semibold text-sm hover:border-[#2563eb]/40 transition-colors duration-200"
                  >
                    Solicitar información
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} direction="left">
              <div className="space-y-3">
                <div className="p-4 sm:p-5 rounded-xl border border-black/[0.07] bg-[#f7f5f0]">
                  <p className="text-xs text-[#111827]/30 uppercase tracking-wider mb-1.5">Docente encargado</p>
                  <p className="text-[#111827] font-medium text-sm sm:text-base">Christian Camilo Luna Chacón</p>
                  <p className="text-[#111827]/50 text-xs sm:text-sm mt-0.5">Facultad de Ciencias Políticas y Gobierno</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="mailto:christian.luna@upb.edu.co"
                    className="p-3.5 sm:p-4 rounded-xl border border-black/[0.07] bg-[#f7f5f0] hover:border-[#2563eb]/25 transition-colors"
                  >
                    <p className="text-xs text-[#111827]/30 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-xs text-[#111827]/60 break-all">christian.luna@upb.edu.co</p>
                  </a>
                  <a
                    href="tel:+573167437060"
                    className="p-3.5 sm:p-4 rounded-xl border border-black/[0.07] bg-[#f7f5f0] hover:border-[#2563eb]/25 transition-colors"
                  >
                    <p className="text-xs text-[#111827]/30 uppercase tracking-wider mb-1">Teléfono</p>
                    <p className="text-xs text-[#111827]/60">316 743 7060</p>
                  </a>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl border border-black/[0.07] bg-[#f7f5f0]">
                  <p className="text-xs text-[#111827]/30 uppercase tracking-wider mb-1">Certificación</p>
                  <p className="text-xs sm:text-sm text-[#111827]/60">Diploma UPB · Mínimo 80% de asistencia</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/logo-color.png"
            alt="UPB Ciencias Políticas"
            width={90}
            height={32}
            className="object-contain opacity-40 h-7 w-auto"
          />
          <p className="text-xs text-[#111827]/25 text-center">
            Universidad Pontificia Bolivariana · Seccional Bucaramanga
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Facultad de Ciencias Políticas y Gobierno
          </p>
          <p className="text-xs text-[#111827]/25">© 2026 UPB</p>
        </div>
      </div>
    </section>
  );
}

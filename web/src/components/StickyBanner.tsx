"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function StickyBanner() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 600], [0, 1]);
  const y = useTransform(scrollY, [400, 600], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="pointer-events-auto border-t border-black/[0.08] bg-white/92 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.07)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Desktop */}
          <div className="hidden sm:flex items-center justify-between gap-4 py-3.5">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#111827]/40 uppercase tracking-wider">Inicio</span>
                <span className="text-sm font-medium text-[#111827]">11 jun 2026</span>
              </div>
              <div className="h-3.5 w-px bg-black/10" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#111827]/40 uppercase tracking-wider">Duración</span>
                <span className="text-sm font-medium text-[#111827]">84 horas</span>
              </div>
              <div className="h-3.5 w-px bg-black/10" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#111827]/40 uppercase tracking-wider">Modalidad</span>
                <span className="text-sm font-medium text-[#111827]">Telepresencial</span>
              </div>
              <div className="h-3.5 w-px bg-black/10" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-[#111827]/40 uppercase tracking-wider">Inversión</span>
                <span className="text-sm font-semibold text-[#2563eb]">$1.715.000</span>
              </div>
            </div>
            <a
              href="/inscripcion"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2563eb] text-white font-semibold text-sm hover:bg-[#1d4ed8] transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              Inscríbete ahora
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Mobile — compact two-row */}
          <div className="sm:hidden py-3 flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-[#111827]">11 jun 2026</span>
                <span className="text-[#111827]/20 text-xs">·</span>
                <span className="text-xs text-[#111827]/50">84 h</span>
                <span className="text-[#111827]/20 text-xs">·</span>
                <span className="text-xs text-[#111827]/50">Telepresencial</span>
              </div>
              <span className="text-xs font-semibold text-[#2563eb]">$1.715.000</span>
            </div>
            <a
              href="/inscripcion"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2563eb] text-white font-semibold text-sm hover:bg-[#1d4ed8] transition-colors duration-200"
            >
              Inscríbete
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

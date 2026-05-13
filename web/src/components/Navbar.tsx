"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { label: "Programa", href: "#programa" },
  { label: "Módulos", href: "#modulos" },
  { label: "Cronograma", href: "#cronograma" },
  { label: "Modalidad", href: "#modalidad" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(247,245,240,0)", "rgba(247,245,240,0.97)"]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      >
        <motion.div
          style={{ borderBottomColor: `rgba(0,0,0,${borderOpacity})` }}
          className="border-b"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="h-9 flex items-center flex-shrink-0">
              <Image
                src="/logo-color.png"
                alt="UPB Ciencias Políticas"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#111827]/50 hover:text-[#111827] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <a
                href="#inscripcion"
                className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-full border border-[#2563eb]/50 text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition-all duration-200"
              >
                Inscríbete
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Menú"
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-[#111827] origin-center transition-colors"
                />
                <motion.span
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block w-5 h-px bg-[#111827]"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-[#111827] origin-center"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-14 left-0 right-0 z-40 md:hidden bg-white/98 backdrop-blur-md border-b border-black/[0.07] shadow-lg"
            >
              <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="py-3.5 text-base text-[#111827]/70 hover:text-[#111827] border-b border-black/[0.05] last:border-0 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#inscripcion"
                  onClick={close}
                  className="mt-4 inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-[#2563eb] text-white font-semibold text-sm hover:bg-[#1d4ed8] transition-colors"
                >
                  Inscríbete ahora
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

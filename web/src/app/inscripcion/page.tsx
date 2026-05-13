"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── Colombian cities with UPB codes ─── */
const CIUDADES_CO = [
  { label: "Bogotá D.C.", value: "11001", state: "11", stateLabel: "Bogotá D.C." },
  { label: "Medellín", value: "05001", state: "05", stateLabel: "Antioquia" },
  { label: "Cali", value: "76001", state: "76", stateLabel: "Valle del Cauca" },
  { label: "Barranquilla", value: "08001", state: "08", stateLabel: "Atlántico" },
  { label: "Bucaramanga", value: "68001", state: "68", stateLabel: "Santander" },
  { label: "Cartagena", value: "13001", state: "13", stateLabel: "Bolívar" },
  { label: "Cúcuta", value: "54001", state: "54", stateLabel: "Norte Santander" },
  { label: "Pereira", value: "66001", state: "66", stateLabel: "Risaralda" },
  { label: "Manizales", value: "17001", state: "17", stateLabel: "Caldas" },
  { label: "Santa Marta", value: "47001", state: "47", stateLabel: "Magdalena" },
  { label: "Ibagué", value: "73001", state: "73", stateLabel: "Tolima" },
  { label: "Neiva", value: "41001", state: "41", stateLabel: "Huila" },
  { label: "Villavicencio", value: "50001", state: "50", stateLabel: "Meta" },
  { label: "Montería", value: "23001", state: "23", stateLabel: "Córdoba" },
  { label: "Pasto", value: "52001", state: "52", stateLabel: "Nariño" },
  { label: "Floridablanca", value: "68276", state: "68", stateLabel: "Santander" },
  { label: "Barrancabermeja", value: "68081", state: "68", stateLabel: "Santander" },
  { label: "Tunja", value: "15001", state: "15", stateLabel: "Boyacá" },
  { label: "Armenia", value: "63001", state: "63", stateLabel: "Quindío" },
  { label: "Popayán", value: "19001", state: "19", stateLabel: "Cauca" },
  { label: "Valledupar", value: "20001", state: "20", stateLabel: "Cesar" },
  { label: "Sincelejo", value: "70001", state: "70", stateLabel: "Sucre" },
  { label: "Rionegro", value: "05615", state: "05", stateLabel: "Antioquia" },
  { label: "Envigado", value: "05266", state: "05", stateLabel: "Antioquia" },
  { label: "Bello", value: "05088", state: "05", stateLabel: "Antioquia" },
  { label: "Dosquebradas", value: "66170", state: "66", stateLabel: "Risaralda" },
  { label: "Girón", value: "68307", state: "68", stateLabel: "Santander" },
  { label: "Piedecuesta", value: "68547", state: "68", stateLabel: "Santander" },
  { label: "Lebrija", value: "68406", state: "68", stateLabel: "Santander" },
];

const TIPOS_DOC = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "PA", label: "Pasaporte" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "RC", label: "Registro Civil" },
  { value: "PE", label: "Permiso Especial de Permanencia" },
  { value: "PT", label: "Permiso de Protección Temporal" },
];

/* ─── Types ─── */
interface FormData {
  document_type: string;
  document: string;
  confirmDocument: string;
  expedition_date: string;
  expedition_city: string;
  expedition_city_text: string;
  birthdate: string;
  first_name: string;
  middle_name: string;
  first_lastname: string;
  second_lastname: string;
  streetline1: string;
  streetline2: string;
  streetline3: string;
  phone_area: string;
  phone_number: string;
  celular: string;
  confirmCelular: string;
  email: string;
  confirmEmail: string;
  country: string;
  state: string;
  city: string;
  city_text: string;
  autHabeas: boolean;
}

const INITIAL: FormData = {
  document_type: "", document: "", confirmDocument: "",
  expedition_date: "", expedition_city: "68001", expedition_city_text: "Bucaramanga",
  birthdate: "",
  first_name: "", middle_name: "", first_lastname: "", second_lastname: "",
  streetline1: "", streetline2: "", streetline3: "",
  phone_area: "7", phone_number: "", celular: "", confirmCelular: "",
  email: "", confirmEmail: "",
  country: "170", state: "68", city: "68001", city_text: "Bucaramanga",
  autHabeas: false,
};

/* ─── Step definitions ─── */
const STEPS = [
  { id: 1, label: "Identificación", icon: "01" },
  { id: 2, label: "Datos personales", icon: "02" },
  { id: 3, label: "Contacto", icon: "03" },
  { id: 4, label: "Confirmación", icon: "04" },
];

/* ─── Reusable Field ─── */
function Field({ label, required, children, error }: {
  label: string; required?: boolean; children: React.ReactNode; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#374151] tracking-wide">
        {label}{required && <span className="text-[#2563eb] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] bg-white text-[#111827] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all"
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] bg-white text-[#111827] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all appearance-none cursor-pointer"
    >
      {children}
    </select>
  );
}

/* ─── City autocomplete ─── */
function CitySelect({ value, onChange }: {
  value: string;
  onChange: (code: string, label: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selected = CIUDADES_CO.find((c) => c.value === value);
  const filtered = query.length > 1
    ? CIUDADES_CO.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : CIUDADES_CO;

  return (
    <div className="relative">
      <input
        type="text"
        value={query || (selected ? selected.label : "")}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Buscar ciudad..."
        className="w-full px-3.5 py-2.5 rounded-lg border border-black/[0.12] bg-white text-[#111827] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-auto rounded-lg border border-black/[0.1] bg-white shadow-lg">
          {filtered.slice(0, 12).map((c) => (
            <button
              key={c.value}
              type="button"
              onMouseDown={() => {
                onChange(c.value, c.label);
                setQuery("");
                setOpen(false);
              }}
              className="w-full text-left px-3.5 py-2 text-sm text-[#111827] hover:bg-[#eff6ff] transition-colors"
            >
              <span className="font-medium">{c.label}</span>
              <span className="text-[#9CA3AF] text-xs ml-1.5">— {c.stateLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function InscripcionPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [dir, setDir] = useState(1);

  function set(field: keyof FormData, value: string | boolean) {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(s: number): boolean {
    const e: typeof errors = {};
    if (s === 1) {
      if (!data.document_type) e.document_type = "Selecciona el tipo de documento";
      if (!data.document) e.document = "Ingresa tu número de documento";
      if (data.document !== data.confirmDocument) e.confirmDocument = "Los documentos no coinciden";
      if (!data.expedition_date) e.expedition_date = "Ingresa la fecha de expedición";
      if (!data.birthdate) e.birthdate = "Ingresa tu fecha de nacimiento";
    }
    if (s === 2) {
      if (!data.first_name) e.first_name = "Requerido";
      if (!data.first_lastname) e.first_lastname = "Requerido";
    }
    if (s === 3) {
      if (!data.celular) e.celular = "Requerido";
      if (data.celular !== data.confirmCelular) e.confirmCelular = "Los celulares no coinciden";
      if (!data.email) e.email = "Requerido";
      if (data.email !== data.confirmEmail) e.confirmEmail = "Los correos no coinciden";
      if (!data.autHabeas) e.autHabeas = "Debes autorizar el uso de tus datos";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir(-1);
    setStep((s) => s - 1);
  }

  async function submit() {
    if (!validate(3)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/inscribir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      function extractMessage(obj: unknown): string {
        if (typeof obj === "string") return obj;
        if (obj && typeof obj === "object") {
          const o = obj as Record<string, unknown>;
          if (typeof o.message === "string") return o.message;
          if (typeof o.msg === "string") return o.msg;
          if (typeof o.error === "string") return o.error;
        }
        return "Ocurrió un error al procesar tu inscripción.";
      }

      if (json.success) {
        const msg = extractMessage(json) || "¡Inscripción exitosa! Recibirás un correo con los detalles de pago.";
        setResult({ success: true, message: msg });
        setDir(1);
        setStep(5);
      } else {
        setResult({ success: false, message: extractMessage(json) });
        setDir(1);
        setStep(5);
      }
    } catch {
      setResult({ success: false, message: "Error de conexión. Por favor intenta nuevamente." });
      setDir(1);
      setStep(5);
    } finally {
      setLoading(false);
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo-color.png" alt="UPB" width={100} height={28} className="h-7 w-auto object-contain" />
          </Link>
          <span className="text-xs text-[#111827]/40">Inscripción · Diplomado Gestión Pública 4.0</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-24">
        {/* Course info pill */}
        <div className="mb-8 p-4 rounded-xl border border-[#2563eb]/15 bg-white flex flex-wrap gap-3 items-center justify-between">
          <div>
            <p className="text-xs text-[#111827]/40 uppercase tracking-wider mb-0.5">Diplomado</p>
            <p className="text-sm font-semibold text-[#111827]">Gestión Pública 4.0</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#111827]/50 text-xs">11 jun – 14 ago 2026</span>
            <span className="font-bold text-[#2563eb]">$1.715.000</span>
          </div>
        </div>

        {step <= 4 && (
          /* Step indicator */
          <div className="mb-8 flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step > s.id
                        ? "bg-[#2563eb] text-white"
                        : step === s.id
                        ? "bg-[#2563eb] text-white ring-4 ring-[#2563eb]/15"
                        : "bg-black/[0.06] text-[#9CA3AF]"
                    }`}
                  >
                    {step > s.id ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      s.id
                    )}
                  </div>
                  <span className={`text-[10px] font-medium hidden sm:block transition-colors ${step === s.id ? "text-[#2563eb]" : "text-[#9CA3AF]"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-colors duration-300 ${step > s.id ? "bg-[#2563eb]" : "bg-black/[0.08]"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >

            {/* ── Step 1: Identificación ── */}
            {step === 1 && (
              <StepCard title="Datos de identificación" subtitle="Información de tu documento de identidad">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field label="Tipo de documento" required error={errors.document_type}>
                      <Select value={data.document_type} onChange={(e) => set("document_type", e.target.value)}>
                        <option value="">Selecciona una opción</option>
                        {TIPOS_DOC.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </Select>
                    </Field>
                  </div>
                  <Field label="Número de documento" required error={errors.document}>
                    <Input value={data.document} onChange={(e) => set("document", e.target.value)} placeholder="Ej: 1098765432" maxLength={15} />
                  </Field>
                  <Field label="Confirmar número de documento" required error={errors.confirmDocument}>
                    <Input value={data.confirmDocument} onChange={(e) => set("confirmDocument", e.target.value)} placeholder="Repite el número" maxLength={15} />
                  </Field>
                  <Field label="Fecha de expedición del documento" required error={errors.expedition_date}>
                    <Input type="text" value={data.expedition_date} onChange={(e) => set("expedition_date", e.target.value)} placeholder="DD/MM/AAAA" />
                  </Field>
                  <Field label="Ciudad de expedición" required>
                    <CitySelect
                      value={data.expedition_city}
                      onChange={(code, label) => { set("expedition_city", code); set("expedition_city_text", label); }}
                    />
                  </Field>
                  <Field label="Fecha de nacimiento" required error={errors.birthdate}>
                    <Input type="text" value={data.birthdate} onChange={(e) => set("birthdate", e.target.value)} placeholder="DD/MM/AAAA" />
                  </Field>
                </div>
              </StepCard>
            )}

            {/* ── Step 2: Datos personales ── */}
            {step === 2 && (
              <StepCard title="Datos personales" subtitle="Tu nombre completo y dirección de residencia">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Primer nombre" required error={errors.first_name}>
                    <Input value={data.first_name} onChange={(e) => set("first_name", e.target.value)} placeholder="Nombre" />
                  </Field>
                  <Field label="Segundo nombre">
                    <Input value={data.middle_name} onChange={(e) => set("middle_name", e.target.value)} placeholder="Segundo nombre (opcional)" />
                  </Field>
                  <Field label="Primer apellido" required error={errors.first_lastname}>
                    <Input value={data.first_lastname} onChange={(e) => set("first_lastname", e.target.value)} placeholder="Apellido" />
                  </Field>
                  <Field label="Segundo apellido">
                    <Input value={data.second_lastname} onChange={(e) => set("second_lastname", e.target.value)} placeholder="Segundo apellido (opcional)" />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Dirección de residencia">
                      <Input value={data.streetline1} onChange={(e) => set("streetline1", e.target.value)} placeholder="Calle, Carrera, Avenida..." maxLength={75} />
                    </Field>
                  </div>
                  <Field label="Información adicional">
                    <Input value={data.streetline2} onChange={(e) => set("streetline2", e.target.value)} placeholder="Apto, piso, torre..." maxLength={75} />
                  </Field>
                  <Field label="Barrio">
                    <Input value={data.streetline3} onChange={(e) => set("streetline3", e.target.value)} placeholder="Nombre del barrio" maxLength={75} />
                  </Field>
                </div>
              </StepCard>
            )}

            {/* ── Step 3: Contacto ── */}
            {step === 3 && (
              <StepCard title="Información de contacto" subtitle="Datos para comunicarnos contigo">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field label="Ciudad de residencia" required>
                      <CitySelect
                        value={data.city}
                        onChange={(code, label) => {
                          set("city", code);
                          set("city_text", label);
                          const found = CIUDADES_CO.find((c) => c.value === code);
                          if (found) set("state", found.state);
                        }}
                      />
                    </Field>
                  </div>
                  <Field label="Indicativo telefónico">
                    <Input value={data.phone_area} onChange={(e) => set("phone_area", e.target.value)} placeholder="7" maxLength={3} />
                  </Field>
                  <Field label="Teléfono fijo (opcional)">
                    <Input value={data.phone_number} onChange={(e) => set("phone_number", e.target.value)} placeholder="6432100" maxLength={10} />
                  </Field>
                  <Field label="Celular" required error={errors.celular}>
                    <Input value={data.celular} onChange={(e) => set("celular", e.target.value)} placeholder="3167437060" maxLength={20} />
                  </Field>
                  <Field label="Confirmar celular" required error={errors.confirmCelular}>
                    <Input value={data.confirmCelular} onChange={(e) => set("confirmCelular", e.target.value)} placeholder="3167437060" maxLength={20} />
                  </Field>
                  <Field label="Correo electrónico" required error={errors.email}>
                    <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="correo@ejemplo.com" />
                  </Field>
                  <Field label="Confirmar correo electrónico" required error={errors.confirmEmail}>
                    <Input type="email" value={data.confirmEmail} onChange={(e) => set("confirmEmail", e.target.value)} placeholder="correo@ejemplo.com" />
                  </Field>
                  <div className="sm:col-span-2">
                    <label className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${data.autHabeas ? "border-[#2563eb]/30 bg-[#eff6ff]" : "border-black/[0.1] bg-white"}`}>
                      <input
                        type="checkbox"
                        checked={data.autHabeas}
                        onChange={(e) => set("autHabeas", e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#2563eb] flex-shrink-0"
                      />
                      <span className="text-xs text-[#374151] leading-relaxed">
                        Autorizo el uso de mis datos personales conforme a la{" "}
                        <a href="https://www.upb.edu.co/es/politica-de-privacidad-upb" target="_blank" className="text-[#2563eb] underline-offset-2 hover:underline">
                          Política de protección de datos personales
                        </a>{" "}
                        de la Universidad Pontificia Bolivariana.
                      </span>
                    </label>
                    {errors.autHabeas && <p className="text-xs text-red-500 mt-1">{errors.autHabeas}</p>}
                  </div>
                </div>
              </StepCard>
            )}

            {/* ── Step 4: Confirmación ── */}
            {step === 4 && (
              <StepCard title="Confirma tu inscripción" subtitle="Revisa tus datos antes de enviar">
                <div className="space-y-3">
                  <SummarySection label="Identificación">
                    <SummaryRow label="Tipo" value={TIPOS_DOC.find((t) => t.value === data.document_type)?.label ?? data.document_type} />
                    <SummaryRow label="Documento" value={data.document} />
                    <SummaryRow label="Expedición" value={`${data.expedition_date} · ${data.expedition_city_text}`} />
                    <SummaryRow label="Nacimiento" value={data.birthdate} />
                  </SummarySection>
                  <SummarySection label="Datos personales">
                    <SummaryRow label="Nombre" value={`${data.first_name} ${data.middle_name} ${data.first_lastname} ${data.second_lastname}`.trim()} />
                    {data.streetline1 && <SummaryRow label="Dirección" value={data.streetline1} />}
                  </SummarySection>
                  <SummarySection label="Contacto">
                    <SummaryRow label="Ciudad" value={data.city_text} />
                    <SummaryRow label="Celular" value={data.celular} />
                    <SummaryRow label="Correo" value={data.email} />
                  </SummarySection>
                  <div className="p-4 rounded-xl border border-[#2563eb]/20 bg-[#eff6ff]">
                    <p className="text-xs text-[#2563eb] font-semibold uppercase tracking-wider mb-1">Programa</p>
                    <p className="text-sm font-medium text-[#111827]">Diplomado en Gestión Pública 4.0</p>
                    <p className="text-xs text-[#374151]/60 mt-1">11 jun – 14 ago 2026 · UPB Bucaramanga · <strong>$1.715.000</strong></p>
                  </div>
                </div>
              </StepCard>
            )}

            {/* ── Step 5: Result ── */}
            {step === 5 && result && (
              <div className="flex flex-col items-center text-center py-8 gap-6">
                {result.success ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M8 18l7 7 13-13" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#111827] mb-2">¡Inscripción exitosa!</h2>
                      <p className="text-[#374151]/60 max-w-sm">{result.message}</p>
                    </div>
                    <p className="text-xs text-[#374151]/40 max-w-xs">
                      Recibirás un correo con la colilla de pago. Para garantizar tu cupo, realiza el pago antes de la fecha de vencimiento.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/[0.12] text-sm font-medium text-[#111827] hover:border-[#2563eb]/40 transition-colors">
                      Volver al inicio
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M18 12v8M18 24h.01" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round"/>
                        <circle cx="18" cy="18" r="14" stroke="#d97706" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#111827] mb-2">Algo salió mal</h2>
                      <p className="text-[#374151]/60 max-w-sm text-sm">{result.message}</p>
                    </div>
                    <p className="text-xs text-[#374151]/50 max-w-xs">
                      También puedes inscribirte directamente en el micrositio de la UPB o comunicarte con{" "}
                      <a href="mailto:christian.luna@upb.edu.co" className="text-[#2563eb]">christian.luna@upb.edu.co</a>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => { setStep(1); setResult(null); setDir(-1); }}
                        className="px-6 py-2.5 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors"
                      >
                        Intentar de nuevo
                      </button>
                      <a
                        href="https://micrositios.upb.edu.co/fcontinua/pages/index.php?nrc=51998&period=202650"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full border border-black/[0.12] text-sm font-medium text-[#111827] hover:border-[#2563eb]/40 transition-colors"
                      >
                        Ir al micrositio UPB
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {step <= 4 && (
          <div className={`mt-6 flex gap-3 ${step === 1 ? "justify-end" : "justify-between"}`}>
            {step > 1 && (
              <button
                onClick={back}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/[0.12] text-sm font-medium text-[#111827] hover:border-[#2563eb]/30 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M12 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Atrás
              </button>
            )}
            {step < 4 && (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors"
              >
                Continuar
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            {step === 4 && (
              <button
                onClick={submit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  <>
                    Confirmar inscripción
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ─── Helper sub-components ─── */
function StepCard({ title, subtitle, children }: {
  title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.07] p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h1 className="text-lg sm:text-xl font-semibold text-[#111827]">{title}</h1>
        <p className="text-xs text-[#9CA3AF] mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function SummarySection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-black/[0.07] overflow-hidden">
      <div className="px-4 py-2.5 bg-[#f7f5f0] border-b border-black/[0.06]">
        <p className="text-xs font-semibold text-[#374151] uppercase tracking-wider">{label}</p>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-[#9CA3AF]">{label}</span>
      <span className="text-[#111827] font-medium text-right">{value || "—"}</span>
    </div>
  );
}

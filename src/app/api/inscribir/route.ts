import { NextRequest, NextResponse } from "next/server";

const UPB_ENDPOINT = "https://micrositios.upb.edu.co/fcontinua/models/mregister.php";

const COURSE_STATIC = {
  period: "202650",
  nrc: "51998",
  valor_curso: "1715000",
  campus_code: "BUP",
  campus: "Bucaramanga",
  programa: "BFEC",
  code_detail: "BFDG",
  course_name: "Diplomado en Gestión Pública 4.0",
  start_date: "Junio 11 de 2026",
  end_date: "Agosto 14 de 2026",
  login: "0",
  ID: "",
};

async function postToUPB(params: Record<string, string>) {
  const body = new URLSearchParams(params).toString();
  const res = await fetch(UPB_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "Referer": "https://micrositios.upb.edu.co/fcontinua/pages/index.php",
      "Origin": "https://micrositios.upb.edu.co",
    },
    body,
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();

    const baseParams = {
      ...COURSE_STATIC,
      document_type: form.document_type ?? "",
      document: form.document ?? "",
      first_name: form.first_name ?? "",
      middle_name: form.middle_name ?? "",
      first_lastname: form.first_lastname ?? "",
      second_lastname: form.second_lastname ?? "",
      birthdate: form.birthdate ?? "",
      expedition_date: form.expedition_date ?? "",
      expedition_city: form.expedition_city ?? "68001",
      expedition_city_text: form.expedition_city_text ?? "Bucaramanga",
      phone_area: form.phone_area ?? "7",
      phone_number: form.phone_number ?? "",
      celular: form.celular ?? "",
      email: form.email ?? "",
      streetline1: form.streetline1 ?? "",
      streetline2: form.streetline2 ?? "",
      streetline3: form.streetline3 ?? "",
      country: form.country ?? "170",
      state: form.state ?? "",
      city: form.city ?? "",
      city_text: form.city_text ?? "",
      autHabeas: "1",
      ID_ATTEMPT: "",
    };

    // Step 1: register
    const registerResult = await postToUPB({ ...baseParams, task: "register" });

    if (!registerResult.success) {
      const message =
        typeof registerResult.message === "string"
          ? registerResult.message
          : typeof registerResult.msg === "string"
          ? registerResult.msg
          : "No fue posible completar el registro. Verifica tus datos e intenta de nuevo.";
      return NextResponse.json({ success: false, step: "register", message }, { status: 200 });
    }

    const ID_ATTEMPT = String(registerResult.ID_ATTEMPT ?? "");

    // Step 2: inscription
    const inscriptionResult = await postToUPB({
      ...baseParams,
      task: "inscription",
      ID_ATTEMPT,
    });

    const message =
      typeof inscriptionResult.message === "string"
        ? inscriptionResult.message
        : typeof inscriptionResult.msg === "string"
        ? inscriptionResult.msg
        : inscriptionResult.success
        ? "Inscripción completada exitosamente."
        : "Error al completar la inscripción.";

    return NextResponse.json({
      success: Boolean(inscriptionResult.success),
      step: "inscription",
      ID_ATTEMPT,
      message,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Error interno", detail: String(err) },
      { status: 500 }
    );
  }
}

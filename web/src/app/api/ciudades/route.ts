import { NextRequest, NextResponse } from "next/server";

const UPB_BASE = "https://micrositios.upb.edu.co/fcontinua/models";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // "states" | "cities"
  const country = searchParams.get("country");
  const state = searchParams.get("state");

  try {
    let url = "";
    let body = "";

    if (type === "states") {
      url = `${UPB_BASE}/mstates.php`;
      body = new URLSearchParams({ task: "get", country: country ?? "170" }).toString();
    } else if (type === "cities") {
      url = `${UPB_BASE}/mcities.php`;
      body = new URLSearchParams({
        task: "get",
        state: state ?? "",
        country: country ?? "170",
      }).toString();
    } else {
      return NextResponse.json({ error: "invalid type" }, { status: 400 });
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error fetching data from UPB", detail: String(err) }, { status: 500 });
  }
}

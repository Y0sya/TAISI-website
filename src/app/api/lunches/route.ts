import { NextRequest, NextResponse } from "next/server";

const PAT      = process.env.AIRTABLE_PAT!;
const BASE_ID  = "appVfG77MoQbG3bgi";
const TABLE_ID = "tblEibxWtnJK05BfR";
const API      = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;

const DATE_FIELDS = [
  "Jun6",  "Jun13", "Jun20", "Jun27",
  "Jun7",  "Jun14", "Jun21", "Jun28",
  "Jul4",  "Jul11", "Jul18", "Jul25",
  "Jul5",  "Jul12", "Jul19", "Jul26",
  "Aug1",  "Aug8",  "Aug15", "Aug22",
  "Aug2",  "Aug9",  "Aug16", "Aug23",
];

function atHeaders() {
  return { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" };
}

async function fetchAllRecords() {
  const records: Record<string, unknown>[] = [];
  let offset: string | null = null;
  do {
    const qs = new URLSearchParams({ pageSize: "100" });
    if (offset) qs.set("offset", offset);
    const res  = await fetch(`${API}?${qs}`, { headers: atHeaders() });
    const data = await res.json();
    records.push(...(data.records ?? []));
    offset = data.offset ?? null;
  } while (offset);
  return records;
}

// GET /api/lunches           → { counts }
// GET /api/lunches?token=T   → { counts, record }
export async function GET(req: NextRequest) {
  const token   = req.nextUrl.searchParams.get("token");
  const records = await fetchAllRecords();

  const counts: Record<string, number> = Object.fromEntries(DATE_FIELDS.map(f => [f, 0]));
  for (const rec of records) {
    const fields = rec.fields as Record<string, string>;
    for (const f of DATE_FIELDS) {
      if (fields[f] === "yes") counts[f]++;
    }
  }

  let record = null;
  if (token) {
    record = records.find(r => (r.fields as Record<string, string>).EditToken === token) ?? null;
  }

  return NextResponse.json({ counts, record });
}

// POST /api/lunches → create record, returns { id }
export async function POST(req: NextRequest) {
  const { name, email, org, availability, token } = await req.json();

  const fields: Record<string, string> = {
    Name: name,
    Email: email,
    Organization: org ?? "",
    EditToken: token,
  };
  for (const f of DATE_FIELDS) {
    fields[f] = (availability[f] as string) || "";
  }

  const res = await fetch(API, {
    method: "POST",
    headers: atHeaders(),
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json({ id: data.id });
}

// PATCH /api/lunches → update record by id
export async function PATCH(req: NextRequest) {
  const { recordId, name, email, org, availability } = await req.json();

  const fields: Record<string, string> = {
    Name: name,
    Email: email,
    Organization: org ?? "",
  };
  for (const f of DATE_FIELDS) {
    fields[f] = (availability[f] as string) || "";
  }

  const res = await fetch(`${API}/${recordId}`, {
    method: "PATCH",
    headers: atHeaders(),
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JABATAN, KEHADIRAN as KEH, EVENT } from "@/lib/event";

export const dynamic = "force-dynamic";




export async function POST(req: NextRequest) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
  }
  const s = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const nama = s("nama"), email = s("email").toLowerCase(), whatsapp = s("whatsapp").replace(/[\s-]/g, "");
  const institusi = s("institusi"), programStudi = s("programStudi"), jabatan = s("jabatan"), kehadiran = s("kehadiran");

  const errors: Record<string, string> = {};
  if (!nama) errors.nama = "Nama lengkap wajib diisi";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Format email tidak valid";
  if (!/^(\+62|62|0)8\d{7,12}$/.test(whatsapp)) errors.whatsapp = "Nomor WhatsApp tidak valid (contoh: 081234567890)";
  if (!institusi) errors.institusi = "Institusi wajib diisi";
  if (!programStudi) errors.programStudi = "Program studi wajib diisi";
  if (!JABATAN.includes(jabatan)) errors.jabatan = "Pilih jabatan";
  if (!KEH.some((k) => k.value === kehadiran)) errors.kehadiran = "Pilih kategori kehadiran";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Validasi gagal", errors }, { status: 400 });

  if (!errors.kehadiran) {
    const terisi = await prisma.peserta.count({ where: { kehadiran } });
    const kuota = kehadiran === "Luring" ? EVENT.kuotaLuring : EVENT.kuotaDaring;
    if (terisi >= kuota) return NextResponse.json({ error: `Kuota ${kehadiran} sudah penuh`, errors: { kehadiran: "Kuota kategori ini sudah penuh" } }, { status: 409 });
  }
  if (await prisma.peserta.findUnique({ where: { email } })) {
    return NextResponse.json(
      { error: "Email sudah terdaftar", errors: { email: "Email ini sudah terdaftar" } },
      { status: 409 }
    );
  }

  try {
    const tmp = `TMP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const created = await prisma.peserta.create({
      data: { noRegistrasi: tmp, nama, email, whatsapp, institusi, programStudi, jabatan, kehadiran },
    });
    const noRegistrasi = `APPSI-2026-${String(created.id).padStart(4, "0")}`;
    const peserta = await prisma.peserta.update({ where: { id: created.id }, data: { noRegistrasi } });
    return NextResponse.json({ peserta }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const pin = req.headers.get("x-admin-pin");
  if (pin !== (process.env.ADMIN_PIN || "APPSI2026")) {
    return NextResponse.json({ error: "PIN salah" }, { status: 401 });
  }
  const peserta = await prisma.peserta.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ peserta, total: peserta.length });
}

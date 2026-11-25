import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LAINNYA, PROVINSI } from "@/lib/registrasi";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
  }
  const s = (k: string) => (typeof b[k] === "string" ? (b[k] as string).trim() : "");
  const email = s("email").toLowerCase(), namaLengkap = s("namaLengkap"), whatsapp = s("whatsapp").replace(/[\s-]/g, "");
  const jabatan = s("jabatan"), perguruanTinggi = s("perguruanTinggi"), provinsi = s("provinsi");
  const fakultas = s("fakultas"), programStudi = s("programStudi"), pertanyaan = s("pertanyaan");

  const errors: Record<string, string> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Format email tidak valid";
  if (!namaLengkap) errors.namaLengkap = "Nama lengkap wajib diisi";
  if (!/^(\+62|62|0)8\d{7,12}$/.test(whatsapp)) errors.whatsapp = "Nomor WhatsApp tidak valid (contoh: 081234567890)";
  if (!jabatan || jabatan === LAINNYA || jabatan.length > 150) errors.jabatan = "Jabatan wajib diisi";
  if (!perguruanTinggi) errors.perguruanTinggi = "Nama perguruan tinggi wajib diisi";
  if (!PROVINSI.includes(provinsi)) errors.provinsi = "Pilih provinsi";
  if (!fakultas) errors.fakultas = "Fakultas / UPPS wajib diisi";
  if (!programStudi) errors.programStudi = "Program studi & jenjang wajib diisi";
  if (pertanyaan.length > 2000) errors.pertanyaan = "Maksimal 2000 karakter";
  if (b.konfirmasiHadir !== true) errors.konfirmasiHadir = "Konfirmasi kehadiran wajib dicentang";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Validasi gagal", errors }, { status: 400 });

  if (await prisma.peserta.findUnique({ where: { email } })) {
    return NextResponse.json({ error: "Email sudah terdaftar", errors: { email: "Email ini sudah terdaftar" } }, { status: 409 });
  }

  try {
    const tmp = `TMP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const created = await prisma.peserta.create({
      data: {
        noRegistrasi: tmp, email, namaLengkap, whatsapp, jabatan, perguruanTinggi, provinsi, fakultas, programStudi,
        pertanyaan: pertanyaan || null, konfirmasiHadir: true,
      },
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

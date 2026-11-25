import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EVENT, TOTAL_KUOTA } from "@/lib/event";

export const dynamic = "force-dynamic";

export async function GET() {
  const [luring, daring] = await Promise.all([
    prisma.peserta.count({ where: { kehadiran: "Luring" } }),
    prisma.peserta.count({ where: { kehadiran: "Daring" } }),
  ]);
  return NextResponse.json({
    total: { kuota: TOTAL_KUOTA, terdaftar: luring + daring, sisa: TOTAL_KUOTA - luring - daring },
    luring: { kuota: EVENT.kuotaLuring, terdaftar: luring, sisa: Math.max(0, EVENT.kuotaLuring - luring) },
    daring: { kuota: EVENT.kuotaDaring, terdaftar: daring, sisa: Math.max(0, EVENT.kuotaDaring - daring) },
  });
}

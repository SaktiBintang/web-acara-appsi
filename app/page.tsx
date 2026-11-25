import Link from "next/link";
import { EVENT } from "@/lib/event";

const CARDS = [
  { judul: "Hari / Tanggal", isi: EVENT.hari, sub: "Format Hybrid" },
  { judul: "Waktu", isi: EVENT.waktu, sub: "Waktu Indonesia Barat" },
  { judul: "Luring (Onsite)", isi: EVENT.venueLuring, sub: `Kuota: ${EVENT.kuotaLuring} Peserta` },
  { judul: "Daring (Online)", isi: EVENT.platformDaring, sub: `Kuota: ${EVENT.kuotaDaring} Peserta` },
];

export default function Beranda() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-appsi-red">
            {EVENT.badge}
          </span>
          <h1 className="mt-5 max-w-4xl break-words text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {EVENT.headlineA}
            <span className="text-appsi-blue">{EVENT.headlineB}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">{EVENT.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/pendaftaran" className="btn-primary">Daftar Acara Sekarang</Link>
            <Link href="/tentang" className="btn-secondary">Pelajari APPSI</Link>
          </div>
        </div>
      </section>

      <section className="bg-appsi-soft">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Ringkasan Acara</h2>
          <div className="mt-2 h-1 w-14 bg-appsi-red" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((h) => (
              <div key={h.judul} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-appsi-red">{h.judul}</p>
                <p className="mt-2 break-words text-lg font-bold text-appsi-blue">{h.isi}</p>
                <p className="mt-1 text-sm text-slate-600">{h.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Rangkaian Agenda</h3>
            <ol className="mt-4 divide-y divide-slate-100">
              {EVENT.agenda.map((a, i) => (
                <li key={a} className="flex gap-4 py-3">
                  <span className="w-6 shrink-0 font-bold text-appsi-blue">{i + 1}.</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

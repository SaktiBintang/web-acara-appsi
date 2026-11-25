import Link from "next/link";
import { SOSIALISASI as S } from "@/lib/registrasi";

export default function Beranda() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-appsi-red">
            Sosialisasi Nasional APPSI 2026
          </span>
          <h1 className="mt-5 max-w-4xl break-words text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Sinergi Nasional Pengelola Program Studi Rumpun Infokom untuk{" "}
            <span className="text-appsi-blue">Akselerasi Mutu Program Studi INFOKOM</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Sosialisasi bersama LAM INFOKOM dan Pengurus Pusat APPSI untuk seluruh pengelola program studi rumpun Infokom di Indonesia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/pendaftaran" className="btn-primary">Daftar Acara Sekarang</Link>
            <Link href="/tentang" className="btn-secondary">Pelajari APPSI</Link>
          </div>
        </div>
      </section>

      <section className="bg-appsi-soft">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Ringkasan Acara</h2>
          <div className="mt-2 flex h-1 w-20"><span className="w-1/2 bg-appsi-blue" /><span className="w-1/2 bg-appsi-red" /></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { j: "Waktu", i: S.hari, s: S.waktu },
              { j: "Media", i: "Daring", s: "Zoom Meeting Conference" },
              { j: "Informasi Teknis", i: "Via Email / WhatsApp", s: "Tautan Zoom dikirim ke kontak yang didaftarkan" },
            ].map((c) => (
              <div key={c.j} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-appsi-red">{c.j}</p>
                <p className="mt-2 break-words text-lg font-bold text-appsi-blue">{c.i}</p>
                <p className="mt-1 text-sm text-slate-600">{c.s}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold">Narasumber</h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {S.narasumber.map((n, i) => (
                <li key={n.nama} className="flex gap-4 rounded-lg bg-appsi-soft p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-appsi-blue font-bold text-white">{i + 1}</span>
                  <span><b className="block break-words">{n.nama}</b><span className="text-sm text-slate-600">{n.peran}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

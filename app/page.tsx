import Link from "next/link";
import { SOSIALISASI as S } from "@/lib/registrasi";

export default function Beranda() {
  const layananUtama = [
    {
      judul: "Pendaftaran Kegiatan",
      deskripsi: "Registrasi daring peserta sosialisasi, lokakarya, dan forum nasional APPSI.",
      href: "/pendaftaran",
      labelLink: "Daftar Sekarang",
    },
    {
      judul: "Profil & Kepengurusan",
      deskripsi: "Informasi visi, misi, serta struktur Pengurus Pusat APPSI periode berjalan.",
      href: "/tentang",
      labelLink: "Lihat Profil",
    },
    {
      judul: "Sinergi LAM INFOKOM",
      deskripsi: "Pendampingan standar mutu dan akreditasi program studi rumpun Infokom.",
      href: "#kegiatan",
      labelLink: "Pelajari Program",
    },
  ];

  const fokusKegiatan = [
    {
      kategori: "Akreditasi & Mutu",
      judul: "Sosialisasi & Pendampingan Mutu Program Studi INFOKOM",
      deskripsi:
        "Diseminasi instrumen akreditasi, standar mutu pendidikan tinggi, dan penguatan tata kelola bersama LAM INFOKOM bagi pengelola prodi.",
    },
    {
      kategori: "Kurikulum & OBE",
      judul: "Lokakarya Kurikulum Rumpun Informatika & Komputer",
      deskripsi:
        "Penyelarasan kurikulum berbasis Outcome-Based Education (OBE) dan Capaian Pembelajaran Lulusan (CPL) sesuai perkembangan teknologi terkini.",
    },
    {
      kategori: "Jejaring Nasional",
      judul: "Forum Koordinasi Pengelola Program Studi se-Indonesia",
      deskripsi:
        "Wadah komunikasi, berbagi praktik baik (best practices), serta kolaborasi tridarma antar-pengelola program studi Informatika dan Komputer.",
    },
  ];

  return (
    <>
      {/* Hero Banner Institusi ala Portal LAM INFOKOM */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0D3878] to-appsi-blue text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200 sm:text-sm">
            Portal Resmi Asosiasi Pengelola Program Studi Informatika dan Komputer
          </p>
          <h1 className="mt-4 max-w-4xl break-words text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Sinergi Nasional Pengelola Program Studi Rumpun Infokom untuk{" "}
            <span className="text-amber-300">Akselerasi Mutu Program Studi INFOKOM</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
            Pusat informasi kegiatan, penguatan tata kelola, pendampingan akreditasi, dan jejaring kolaborasi pengelola program studi rumpun Infokom di seluruh Indonesia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pendaftaran"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-bold text-navy shadow-md transition hover:bg-blue-50"
            >
              Pendaftaran Acara
            </Link>
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/20"
            >
              Tentang APPSI
            </Link>
          </div>
        </div>
      </section>

      {/* Kartu Akses Cepat (Quick Access Cards) */}
      <section className="bg-appsi-soft pb-8 pt-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {layananUtama.map((item) => (
              <div
                key={item.judul}
                className="flex flex-col justify-between rounded-xl border border-slate-200 border-t-4 border-t-appsi-blue bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <h2 className="text-lg font-bold text-navy">{item.judul}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.deskripsi}</p>
                </div>
                <div className="mt-5">
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-sm font-bold text-appsi-blue hover:text-navy"
                  >
                    {item.labelLink} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Kegiatan & Program Utama APPSI */}
      <section id="kegiatan" className="bg-appsi-soft py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Kegiatan &amp; Program APPSI</h2>
          <div className="mt-2 flex h-1 w-20">
            <span className="w-2/3 bg-appsi-blue" />
            <span className="w-1/3 bg-appsi-gold" />
          </div>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            Fokus program kerja dan kegiatan APPSI dalam mendukung peningkatan mutu akademik serta akreditasi program studi rumpun Infokom.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {fokusKegiatan.map((item) => (
              <div
                key={item.judul}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-appsi-blue/40 hover:shadow-md"
              >
                <span className="inline-block rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-appsi-blue">
                  {item.kategori}
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy">{item.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Agenda Terdekat */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Agenda Kegiatan Terdekat</h2>
              <div className="mt-2 flex h-1 w-20">
                <span className="w-2/3 bg-appsi-blue" />
                <span className="w-1/3 bg-appsi-gold" />
              </div>
            </div>
            <Link href="/pendaftaran" className="btn-primary">
              Daftar Kegiatan Ini
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { j: "Waktu Pelaksanaan", i: S.hari, s: S.waktu },
              { j: "Media Pelaksanaan", i: "Daring", s: "Zoom Meeting Conference" },
              { j: "Informasi Teknis", i: "Via Email / WhatsApp", s: "Tautan Zoom dikirim ke kontak yang didaftarkan" },
            ].map((c) => (
              <div key={c.j} className="rounded-xl border border-slate-200 bg-appsi-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-appsi-blue">{c.j}</p>
                <p className="mt-2 break-words text-lg font-bold text-navy">{c.i}</p>
                <p className="mt-1 text-sm text-slate-600">{c.s}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-appsi-soft p-6">
            <h3 className="text-lg font-bold text-navy">Narasumber</h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {S.narasumber.map((n, i) => (
                <li key={n.nama} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-appsi-blue font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <b className="block break-words text-navy">{n.nama}</b>
                    <span className="text-sm text-slate-600">{n.peran}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
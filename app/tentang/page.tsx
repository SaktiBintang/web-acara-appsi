import Link from "next/link";
import { EVENT, JABATAN, TOTAL_KUOTA } from "@/lib/event";

const TUJUAN = [
  "Menyusun, membahas, dan menetapkan Garis Besar Program Kerja Pengurus Pusat APPSI Periode 2026–2030.",
  "Mengenalkan profil, lambang, visi-misi, AD/ART, tata cara keanggotaan, serta agenda strategis APPSI kepada seluruh pimpinan UPPS Rumpun Infokom di Indonesia.",
  "Memberikan pemahaman mendalam mengenai teknik pemenuhan indikator LED dan LKPS berbasis instrumen kriteria akreditasi LAM INFOKOM bagi UPPS.",
  "Membangun konsorsium jejaring kolaborasi tridharma perguruan tinggi antar UPPS anggota APPSI di seluruh wilayah Indonesia.",
];

const JADWAL = [
  { l: "Hari / Tanggal", v: EVENT.hari, icon: "📅" },
  { l: "Waktu", v: EVENT.waktu, icon: "🕘" },
  { l: "Tempat Luring", v: EVENT.venueLuring, icon: "📍" },
  { l: "Platform Online", v: EVENT.platformDaring, icon: "💻" },
];

function Heading({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-appsi-red">{no}</span>
      <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{children}</h2>
      <div className="mt-2 flex h-1 w-20"><span className="w-1/2 bg-appsi-blue" /><span className="w-1/2 bg-appsi-red" /></div>
    </div>
  );
}

export default function Tentang() {
  return (
    <>
      {/* 1. Latar belakang */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <h1 className="mb-10 text-3xl font-extrabold sm:text-5xl">
            Tentang <span className="text-appsi-blue">APPSI</span>
          </h1>
          <Heading no="01">Latar Belakang & Profil APPSI</Heading>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border-l-4 border-appsi-blue bg-appsi-soft p-6 text-slate-700 leading-relaxed">
              Perkembangan pesat ilmu pengetahuan, teknologi, dan industri digital berbasis kecerdasan buatan (<i>Artificial Intelligence</i>), <i>data science</i>,
              serta komputasi awan menuntut pengelolaan Pendidikan Tinggi Rumpun Informatika dan Komputer (Infokom) untuk terus melakukan pembaruan dan penjaminan mutu secara berkelanjutan.{" "}
              <b className="text-navy">Asosiasi Pengelola Program Studi Informatika dan Komputer (APPSI)</b> hadir sebagai wadah komunikasi, kolaborasi, dan kemitraan strategis
              antar-Unit Pengelola Program Studi (UPPS) di seluruh Indonesia.
            </div>
            <div className="rounded-xl border-l-4 border-appsi-red bg-appsi-soft p-6 text-slate-700 leading-relaxed">
              Dalam rangka menyusun, sosialisasi program kerja dan arah kebijakan serta mendampingi UPPS dalam memenuhi kriteria acuan akreditasi Lembaga Akreditasi Mandiri INFOKOM (LAM INFOKOM),
              APPSI menyelenggarakan <b className="text-navy">Rangkaian Kegiatan Perdana Nasional</b> yang terdiri dari Rapat Kerja Pengurus Pusat, Sosialisasi APPSI, serta Workshop Bedah Instrumen Akreditasi LAM INFOKOM.
              Kegiatan ini dirancang secara hybrid dengan memusatkan venue utama di <b className="text-navy">Yogyakarta</b> sebagai tempat kelahiran APPSI, berlokasi di{" "}
              <b className="text-navy">FMIPA Universitas Gadjah Mada (UGM) Yogyakarta</b>.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tema */}
      <section className="bg-appsi-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <Heading no="02">Tema Kegiatan</Heading>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <span className="absolute inset-y-0 left-0 w-2 bg-appsi-blue" />
            <span className="absolute inset-x-0 bottom-0 h-1.5 bg-appsi-red" />
            <p className="text-xs font-bold uppercase tracking-widest text-appsi-red">Tema</p>
            <blockquote className="mt-3 break-words text-2xl font-extrabold leading-snug text-navy sm:text-3xl">
              &ldquo;Sinergi Nasional Pengelola Program Studi Rumpun Infokom untuk <span className="text-appsi-blue">Akselerasi Mutu Program Studi INFOKOM</span>&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* 3. Tujuan */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <Heading no="03">Tujuan Kegiatan</Heading>
          <div className="grid gap-5 md:grid-cols-2">
            {TUJUAN.map((t, i) => (
              <div key={i} className="flex gap-4 rounded-xl border-t-4 border-appsi-blue bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-appsi-blue text-lg font-bold text-white">{i + 1}</span>
                <p className="text-slate-700">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sasaran */}
      <section className="bg-appsi-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <Heading no="04">Sasaran dan Target Peserta</Heading>
          <div className="rounded-2xl bg-navy p-6 text-white sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="shrink-0 text-center md:text-left">
                <p className="text-6xl font-extrabold text-white sm:text-7xl">{TOTAL_KUOTA}</p>
                <p className="mt-1 text-sm font-bold uppercase tracking-wide text-red-300">Target Peserta</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">Pimpinan Unit Pengelola Program Studi Rumpun Infokom se-Indonesia</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/10 p-4"><b className="text-2xl">{EVENT.kuotaLuring}</b> <span className="text-sm">peserta luring / onsite di FMIPA UGM</span></div>
                  <div className="rounded-lg bg-white/10 p-4"><b className="text-2xl">{EVENT.kuotaDaring}</b> <span className="text-sm">peserta daring via Zoom Meeting</span></div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="mt-10 text-lg font-bold">Unsur Peserta yang Ditargetkan</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {JABATAN.map((j, i) => (
              <li key={j} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${i === JABATAN.length - 1 ? "bg-appsi-red" : "bg-appsi-blue"}`} aria-hidden>
                  {i === JABATAN.length - 1 ? "★" : "🎓"}
                </span>
                <span className="break-words text-sm font-medium text-slate-700">{j}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Waktu & tempat + CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <Heading no="05">Waktu dan Tempat Pelaksanaan</Heading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {JADWAL.map((j) => (
              <div key={j.l} className="rounded-xl border border-slate-200 bg-appsi-soft p-5">
                <span className="text-2xl" aria-hidden>{j.icon}</span>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-appsi-red">{j.l}</p>
                <p className="mt-1 break-words font-bold text-appsi-blue">{j.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/pendaftaran" className="btn-primary px-10 py-4 text-lg">Daftar Sekarang</Link>
          </div>
        </div>
      </section>
    </>
  );
}

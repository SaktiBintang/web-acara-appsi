import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-appsi-blue2 bg-navy text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo-appsi.png"
            alt="Logo APPSI"
            width={72}
            height={72}
            className="h-16 w-16 shrink-0 rounded-lg bg-white object-contain p-1 shadow-sm"
          />
          <div>
            <p className="text-lg font-extrabold tracking-tight text-white">APPSI</p>
            <p className="text-xs text-slate-300 sm:text-sm">
              Asosiasi Pengelola Program Studi Informatika dan Komputer
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Mitra Strategis Penguatan Mutu &amp; Akreditasi Program Studi Rumpun Infokom
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-slate-400 md:items-end">
          <div className="flex gap-4 text-slate-300">
            <Link href="/" className="hover:text-white">Beranda</Link>
            <Link href="/tentang" className="hover:text-white">Tentang APPSI</Link>
            <Link href="/pendaftaran" className="hover:text-white">Pendaftaran Acara</Link>
          </div>
          <p>© 2026 APPSI. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
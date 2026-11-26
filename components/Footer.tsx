import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-appsi-blue2 bg-navy text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-2.5">
          <div className="inline-block rounded-lg bg-white px-4 py-2.5 shadow-sm">
            <Image
              src="/images/logo-appsi.png"
              alt="Logo APPSI - Asosiasi Pengelola Program Studi Informatika dan Komputer"
              width={360}
              height={120}
              className="h-16 w-auto object-contain md:h-20"
            />
          </div>
          <p className="text-xs text-slate-400">
            Mitra Strategis Penguatan Mutu &amp; Akreditasi Program Studi Rumpun Infokom
          </p>
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
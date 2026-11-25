import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t-4 border-appsi-red bg-navy text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo-appsi.jpeg" alt="Logo APPSI" width={44} height={44} className="h-11 w-11 rounded bg-white object-contain p-0.5" />
          <div>
            <p className="font-bold text-white">APPSI</p>
            <p className="text-xs">Asosiasi Pengelola Program Studi Informatika dan Komputer</p>
          </div>
        </div>
        <p className="text-xs">© 2026 APPSI. Hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}

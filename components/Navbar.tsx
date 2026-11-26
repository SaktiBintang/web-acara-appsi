"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang APPSI" },
  { href: "/pendaftaran", label: "Pendaftaran Acara" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:py-1">
        <Link href="/" className="flex items-center py-1">
          <Image
            src="/images/logo-appsi.png"
            alt="Logo APPSI - Asosiasi Pengelola Program Studi Informatika dan Komputer"
            width={420}
            height={140}
            className="h-16 w-auto shrink-0 object-contain md:h-[88px]"
            priority
          />
        </Link>
        <nav className="-mx-1 flex gap-1 overflow-x-auto">
          {MENU.map((m) => {
            const active = m.href === "/" ? path === "/" : path.startsWith(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`whitespace-nowrap border-b-[3px] px-3 py-3 text-sm font-semibold transition md:py-8 ${active ? "border-appsi-red text-appsi-blue" : "border-transparent text-slate-700 hover:text-appsi-blue"
                  }`}
              >
                {m.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
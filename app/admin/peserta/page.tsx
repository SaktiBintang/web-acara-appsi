"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EVENT, TOTAL_KUOTA, kehadiranLabel } from "@/lib/event";

type Peserta = {
  id: number; noRegistrasi: string; nama: string; email: string; whatsapp: string;
  institusi: string; programStudi: string; jabatan: string; kehadiran: string; createdAt: string;
};

export default function AdminPeserta() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState<Peserta[]>([]);
  const [q, setQ] = useState("");

  const load = useCallback(async (p: string) => {
    const res = await fetch("/api/peserta", { headers: { "x-admin-pin": p }, cache: "no-store" });
    if (!res.ok) { setAuthed(false); setErr("PIN salah"); sessionStorage.removeItem("appsi-pin"); return false; }
    const j = await res.json();
    setData(j.peserta); setAuthed(true); setErr(""); sessionStorage.setItem("appsi-pin", p);
    return true;
  }, []);

  useEffect(() => {
    const p = sessionStorage.getItem("appsi-pin");
    if (p) { setPin(p); load(p); }
  }, [load]);

  // real-time: polling tiap 5 detik
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => load(pin), 5000);
    return () => clearInterval(t);
  }, [authed, pin, load]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return data.filter((d) => [d.noRegistrasi, d.nama, d.email, d.institusi, d.programStudi, d.jabatan, d.whatsapp].some((v) => v.toLowerCase().includes(s)));
  }, [data, q]);

  function exportCsv() {
    const head = ["No Registrasi", "Nama", "Email", "WhatsApp", "Institusi", "Program Studi", "Jabatan", "Kehadiran", "Waktu Daftar"];
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = filtered.map((d) => [d.noRegistrasi, d.nama, d.email, "'" + d.whatsapp, d.institusi, d.programStudi, d.jabatan, kehadiranLabel(d.kehadiran), new Date(d.createdAt).toLocaleString("id-ID")].map(esc).join(","));
    const csv = "\uFEFF" + [head.map(esc).join(","), ...rows].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = "peserta-appsi.csv";
    a.click();
  }

  if (!authed) {
    return (
      <section className="bg-appsi-soft">
        <div className="mx-auto max-w-sm px-4 py-20">
          <form onSubmit={(e) => { e.preventDefault(); load(pin); }} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-xl font-extrabold">Admin Peserta</h1>
            <p className="mt-1 text-sm text-slate-600">Masukkan PIN untuk melanjutkan.</p>
            <input type="password" className="input mt-4" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN" />
            {err && <p className="mt-2 text-sm text-appsi-red">{err}</p>}
            <button className="btn-primary mt-4 w-full">Masuk</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-appsi-soft">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">Data Peserta</h1>
            <p className="mt-1 text-sm text-slate-600">
              Total pendaftar: <b data-testid="total" className="text-appsi-blue">{data.length}</b>{" / "}{TOTAL_KUOTA}
              {" • "}Luring: <b data-testid="n-luring">{data.filter((d) => d.kehadiran === "Luring").length}</b>/{EVENT.kuotaLuring}
              {" • "}Daring: <b data-testid="n-daring">{data.filter((d) => d.kehadiran === "Daring").length}</b>/{EVENT.kuotaDaring}
              {q && <> • Hasil pencarian: <b>{filtered.length}</b></>}
            </p>
          </div>
          <button onClick={exportCsv} className="btn-primary">Export ke Excel/CSV</button>
        </div>
        <input className="input mt-5 max-w-md" placeholder="Cari nama, email, institusi…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-navy text-xs uppercase tracking-wide text-white">
              <tr>{["No Reg", "Nama", "Email", "WhatsApp", "Institusi", "Prodi", "Jabatan", "Hadir", "Waktu"].map((h) => <th key={h} className="whitespace-nowrap px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-slate-500">Belum ada data.</td></tr>}
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-appsi-blue">{d.noRegistrasi}</td>
                  <td className="px-4 py-3 font-medium">{d.nama}</td>
                  <td className="px-4 py-3">{d.email}</td>
                  <td className="whitespace-nowrap px-4 py-3">{d.whatsapp}</td>
                  <td className="px-4 py-3">{d.institusi}</td>
                  <td className="px-4 py-3">{d.programStudi}</td>
                  <td className="min-w-[220px] px-4 py-3">{d.jabatan}</td>
                  <td className="whitespace-nowrap px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${d.kehadiran === "Luring" ? "bg-red-50 text-appsi-red" : "bg-blue-50 text-appsi-blue"}`}>{kehadiranLabel(d.kehadiran)}</span></td>
                  <td className="whitespace-nowrap px-4 py-3">{new Date(d.createdAt).toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

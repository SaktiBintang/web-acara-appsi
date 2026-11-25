"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

type Peserta = {
  id: number; noRegistrasi: string; email: string; namaLengkap: string; whatsapp: string; jabatan: string;
  perguruanTinggi: string; provinsi: string; fakultas: string; programStudi: string;
  pertanyaan: string | null; konfirmasiHadir: boolean; createdAt: string;
};

export default function AdminPeserta() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [err, setErr] = useState("");
  const [data, setData] = useState<Peserta[]>([]);
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<Peserta | null>(null);

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
    return data.filter((d) =>
      [d.noRegistrasi, d.email, d.namaLengkap, d.whatsapp, d.jabatan, d.perguruanTinggi, d.provinsi, d.fakultas, d.programStudi, d.pertanyaan ?? ""]
        .some((v) => v.toLowerCase().includes(s)));
  }, [data, q]);

  function exportCsv() {
    const head = ["No Registrasi", "Email", "Nama Lengkap & Gelar", "WhatsApp", "Jabatan", "Perguruan Tinggi", "Provinsi", "Fakultas / UPPS", "Program Studi & Jenjang", "Pertanyaan", "Konfirmasi Hadir", "Waktu Daftar"];
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = filtered.map((d) => [
      d.noRegistrasi, d.email, d.namaLengkap, "'" + d.whatsapp, d.jabatan, d.perguruanTinggi, d.provinsi, d.fakultas,
      d.programStudi, d.pertanyaan ?? "", d.konfirmasiHadir ? "Ya" : "Tidak", new Date(d.createdAt).toLocaleString("id-ID"),
    ].map(esc).join(","));
    const csv = "\uFEFF" + [head.map(esc).join(","), ...rows].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = "peserta-sosialisasi-appsi-2026.csv";
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

  const cols = ["No Reg", "Email", "Nama Lengkap & Gelar", "WhatsApp", "Jabatan", "Perguruan Tinggi", "Provinsi", "Fakultas / UPPS", "Prodi & Jenjang", "Pertanyaan", "Hadir", "Waktu"];

  return (
    <section className="bg-appsi-soft">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">Data Peserta Sosialisasi APPSI 2026</h1>
            <p className="mt-1 text-sm text-slate-600">
              Total pendaftar: <b data-testid="total" className="text-appsi-blue">{data.length}</b>
              {q && <> &bull; Hasil pencarian: <b>{filtered.length}</b></>}
            </p>
          </div>
          <button onClick={exportCsv} className="btn-primary">Export ke Excel/CSV</button>
        </div>
        <input className="input mt-5 max-w-md" placeholder="Cari nama, email, institusi, provinsi..." value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-navy text-xs uppercase tracking-wide text-white">
              <tr>{cols.map((h) => <th key={h} className="whitespace-nowrap px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100 align-top">
              {filtered.length === 0 && <tr><td colSpan={cols.length} className="px-4 py-8 text-center text-slate-500">Belum ada data.</td></tr>}
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-appsi-blue">{d.noRegistrasi}</td>
                  <td className="px-4 py-3">{d.email}</td>
                  <td className="min-w-[200px] px-4 py-3 font-medium">{d.namaLengkap}</td>
                  <td className="whitespace-nowrap px-4 py-3">{d.whatsapp}</td>
                  <td className="min-w-[180px] px-4 py-3">{d.jabatan}</td>
                  <td className="min-w-[180px] px-4 py-3">{d.perguruanTinggi}</td>
                  <td className="whitespace-nowrap px-4 py-3">{d.provinsi}</td>
                  <td className="min-w-[180px] px-4 py-3">{d.fakultas}</td>
                  <td className="min-w-[180px] px-4 py-3">{d.programStudi}</td>
                  <td className="min-w-[160px] px-4 py-3">
                    {d.pertanyaan ? (
                      <button onClick={() => setDetail(d)} className="text-left text-appsi-blue underline">
                        {d.pertanyaan.length > 40 ? d.pertanyaan.slice(0, 40) + "..." : d.pertanyaan}
                      </button>
                    ) : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3"><span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-appsi-blue">{d.konfirmasiHadir ? "Ya" : "Tidak"}</span></td>
                  <td className="whitespace-nowrap px-4 py-3">{new Date(d.createdAt).toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div role="dialog" aria-modal="true" onClick={() => setDetail(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4">
          <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <p className="text-xs font-bold text-appsi-red">{detail.noRegistrasi}</p>
            <h2 className="mt-1 text-lg font-extrabold">{detail.namaLengkap}</h2>
            <p className="text-sm text-slate-600">{detail.perguruanTinggi}</p>
            <h3 className="mt-4 text-sm font-bold">Pertanyaan / Topik Diskusi</h3>
            <p className="mt-1 whitespace-pre-wrap break-words text-slate-700">{detail.pertanyaan}</p>
            <button onClick={() => setDetail(null)} className="btn-primary mt-6 w-full">Tutup</button>
          </div>
        </div>
      )}
    </section>
  );
}

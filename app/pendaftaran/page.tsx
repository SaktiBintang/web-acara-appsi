"use client";
import { useCallback, useEffect, useState } from "react";
import { EVENT, JABATAN, KEHADIRAN, TOTAL_KUOTA } from "@/lib/event";

type Errors = Record<string, string>;
type Kuota = {
  total: { sisa: number; terdaftar: number };
  luring: { sisa: number; kuota: number };
  daring: { sisa: number; kuota: number };
};
const INIT = { nama: "", email: "", whatsapp: "", institusi: "", programStudi: "", jabatan: "", kehadiran: "" };

export default function Pendaftaran() {
  const [f, setF] = useState(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [success, setSuccess] = useState<{ noRegistrasi: string; nama: string } | null>(null);
  const [kuota, setKuota] = useState<Kuota | null>(null);

  const loadKuota = useCallback(() => {
    fetch("/api/kuota", { cache: "no-store" }).then((r) => r.json()).then(setKuota).catch(() => {});
  }, []);
  useEffect(() => {
    loadKuota();
    const t = setInterval(loadKuota, 5000);
    return () => clearInterval(t);
  }, [loadKuota]);

  const set = (k: string, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  function validate(): Errors {
    const e: Errors = {};
    if (!f.nama.trim()) e.nama = "Nama lengkap wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Format email tidak valid";
    if (!/^(\+62|62|0)8\d{7,12}$/.test(f.whatsapp.replace(/[\s-]/g, ""))) e.whatsapp = "Nomor WhatsApp tidak valid (contoh: 081234567890)";
    if (!f.institusi.trim()) e.institusi = "Institusi wajib diisi";
    if (!f.programStudi.trim()) e.programStudi = "Program studi wajib diisi";
    if (!f.jabatan) e.jabatan = "Pilih jabatan / unsur peserta";
    if (!f.kehadiran) e.kehadiran = "Pilih kategori kehadiran";
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerErr("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      const res = await fetch("/api/peserta", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else setServerErr(data.error || "Terjadi kesalahan");
        loadKuota();
      } else {
        setSuccess({ noRegistrasi: data.peserta.noRegistrasi, nama: data.peserta.nama });
        setF(INIT);
        loadKuota();
      }
    } catch {
      setServerErr("Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-xs text-appsi-red">{errors[k]}</p> : null);
  const sisaOf = (v: string) => (kuota ? (v === "Luring" ? kuota.luring.sisa : kuota.daring.sisa) : null);

  return (
    <section className="bg-appsi-soft">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Pendaftaran <span className="text-appsi-blue">Acara</span>
        </h1>
        <div className="mt-3 h-1 w-14 bg-appsi-red" />
        <p className="mt-4 text-slate-600">
          {EVENT.nama} &bull; {EVENT.hari}, {EVENT.waktu}.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-appsi-red">Kuota Peserta</p>
          <p className="mt-1 text-sm text-slate-600">
            Target {TOTAL_KUOTA} peserta ({EVENT.kuotaLuring} Luring di FMIPA UGM &amp; {EVENT.kuotaDaring} Daring via Zoom Meeting).
            {kuota && <> Sisa kuota total: <b data-testid="sisa-total" className="text-appsi-blue">{kuota.total.sisa}</b>.</>}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              { l: "Luring / Onsite", id: "luring", k: kuota?.luring, max: EVENT.kuotaLuring },
              { l: "Daring / Online", id: "daring", k: kuota?.daring, max: EVENT.kuotaDaring },
            ].map((x) => {
              const sisa = x.k?.sisa ?? x.max;
              const pct = ((x.max - sisa) / x.max) * 100;
              return (
                <div key={x.id} className="rounded-lg bg-appsi-soft p-3">
                  <div className="flex justify-between gap-2 text-sm font-semibold">
                    <span>{x.l}</span>
                    <span data-testid={`sisa-${x.id}`}>Sisa {sisa} / {x.max}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full bg-appsi-blue transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={submit} noValidate className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div>
            <label className="label" htmlFor="nama">Nama Lengkap & Gelar *</label>
            <input id="nama" className="input" value={f.nama} onChange={(e) => set("nama", e.target.value)} placeholder="Dr. Budi Santoso, M.Kom." />
            <Err k="nama" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="email">Email Aktif *</label>
              <input id="email" type="email" className="input" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="nama@kampus.ac.id" />
              <Err k="email" />
            </div>
            <div>
              <label className="label" htmlFor="wa">Nomor WhatsApp *</label>
              <input id="wa" type="tel" className="input" value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="081234567890" />
              <Err k="whatsapp" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="inst">Asal Perguruan Tinggi / Institusi *</label>
            <input id="inst" className="input" value={f.institusi} onChange={(e) => set("institusi", e.target.value)} />
            <Err k="institusi" />
          </div>
          <div>
            <label className="label" htmlFor="prodi">Program Studi / Fakultas *</label>
            <input id="prodi" className="input" value={f.programStudi} onChange={(e) => set("programStudi", e.target.value)} placeholder="Informatika" />
            <Err k="programStudi" />
          </div>
          <div>
            <label className="label" htmlFor="jab">Jabatan / Unsur Peserta *</label>
            <select id="jab" className="input" value={f.jabatan} onChange={(e) => set("jabatan", e.target.value)}>
              <option value="">Pilih jabatan / unsur peserta...</option>
              {JABATAN.map((j) => <option key={j} value={j}>{j}</option>)}
            </select>
            <Err k="jabatan" />
          </div>
          <div>
            <span className="label">Kategori Kehadiran *</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {KEHADIRAN.map((k) => {
                const sisa = sisaOf(k.value);
                const penuh = sisa === 0;
                return (
                  <label key={k.value} className={`rounded-lg border-2 px-4 py-3 text-sm font-semibold transition ${penuh ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400" : f.kehadiran === k.value ? "cursor-pointer border-appsi-blue bg-blue-50 text-appsi-blue" : "cursor-pointer border-slate-200 hover:border-slate-400"}`}>
                    <input type="radio" name="kehadiran" className="sr-only" disabled={penuh} checked={f.kehadiran === k.value} onChange={() => set("kehadiran", k.value)} />
                    {k.label}
                    <span className="mt-1 block text-xs font-normal">{penuh ? "Kuota penuh" : sisa !== null ? `Sisa kuota: ${sisa}` : ""}</span>
                  </label>
                );
              })}
            </div>
            <Err k="kehadiran" />
          </div>
          {serverErr && <p className="rounded-lg bg-red-50 p-3 text-sm text-appsi-red">{serverErr}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Menyimpan..." : "Kirim Pendaftaran"}</button>
        </form>
      </div>

      {success && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">&#10003;</div>
            <h2 className="mt-4 text-2xl font-extrabold">Pendaftaran Berhasil!</h2>
            <p className="mt-2 text-slate-600">Terima kasih, {success.nama}. Simpan nomor registrasi Anda:</p>
            <p data-testid="no-reg" className="mt-4 break-all rounded-lg bg-blue-50 py-3 text-xl font-extrabold tracking-wide text-appsi-blue">{success.noRegistrasi}</p>
            <button onClick={() => setSuccess(null)} className="btn-primary mt-6 w-full">Tutup</button>
          </div>
        </div>
      )}
    </section>
  );
}

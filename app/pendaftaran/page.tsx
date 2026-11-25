"use client";
import { useState } from "react";
import { JABATAN_STRUKTURAL, LAINNYA, PROVINSI, SOSIALISASI as S } from "@/lib/registrasi";

type Errors = Record<string, string>;
const INIT = {
  email: "", namaLengkap: "", whatsapp: "", jabatanPilihan: "", jabatanLain: "",
  perguruanTinggi: "", provinsi: "", fakultas: "", programStudi: "", pertanyaan: "", konfirmasiHadir: false,
};

function Section({ no, title, children }: { no: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-appsi-blue text-sm font-bold text-white">{no}</span>
        <h2 className="text-lg font-extrabold">{title}</h2>
      </div>
      {children}
    </fieldset>
  );
}

export default function Pendaftaran() {
  const [f, setF] = useState(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [success, setSuccess] = useState<{ noRegistrasi: string; nama: string } | null>(null);

  const set = <K extends keyof typeof INIT>(k: K, v: (typeof INIT)[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "", ...(k === "jabatanPilihan" || k === "jabatanLain" ? { jabatan: "" } : {}) }));
  };
  const jabatanFinal = f.jabatanPilihan === LAINNYA ? f.jabatanLain.trim() : f.jabatanPilihan;

  function validate(): Errors {
    const e: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Format email tidak valid";
    if (!f.namaLengkap.trim()) e.namaLengkap = "Nama lengkap wajib diisi";
    if (!/^(\+62|62|0)8\d{7,12}$/.test(f.whatsapp.replace(/[\s-]/g, ""))) e.whatsapp = "Nomor WhatsApp tidak valid (contoh: 081234567890)";
    if (!f.jabatanPilihan) e.jabatan = "Pilih jabatan struktural";
    else if (!jabatanFinal) e.jabatan = "Tuliskan jabatan Anda";
    if (!f.perguruanTinggi.trim()) e.perguruanTinggi = "Nama perguruan tinggi wajib diisi";
    if (!f.provinsi) e.provinsi = "Pilih provinsi";
    if (!f.fakultas.trim()) e.fakultas = "Fakultas / UPPS wajib diisi";
    if (!f.programStudi.trim()) e.programStudi = "Program studi & jenjang wajib diisi";
    if (!f.konfirmasiHadir) e.konfirmasiHadir = "Anda harus mencentang konfirmasi kehadiran";
    return e;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerErr("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector("[data-error='1']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      const { jabatanPilihan, jabatanLain, ...rest } = f;
      void jabatanPilihan; void jabatanLain;
      const res = await fetch("/api/peserta", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, jabatan: jabatanFinal }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else setServerErr(data.error || "Terjadi kesalahan");
      } else {
        setSuccess({ noRegistrasi: data.peserta.noRegistrasi, nama: data.peserta.namaLengkap });
        setF(INIT);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setServerErr("Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p data-error="1" className="mt-1 text-xs text-appsi-red">{errors[k]}</p> : null);
  const Req = () => <span className="text-appsi-red"> *</span>;

  return (
    <section className="bg-appsi-soft">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-appsi-red">{S.hari} &bull; {S.waktu}</span>
        <h1 className="mt-4 break-words text-3xl font-extrabold leading-tight sm:text-4xl">{S.judul}</h1>
        <div className="mt-3 flex h-1 w-20"><span className="w-1/2 bg-appsi-blue" /><span className="w-1/2 bg-appsi-red" /></div>
        <p className="mt-5 text-lg font-semibold text-appsi-blue">&ldquo;{S.tema}&rdquo;</p>

        <div className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 text-sm shadow-sm sm:grid-cols-2">
          <div><p className="font-bold text-appsi-red">Waktu</p><p>{S.hari}</p><p>{S.waktu}</p></div>
          <div><p className="font-bold text-appsi-red">Media</p><p>{S.media}</p></div>
          <div className="sm:col-span-2">
            <p className="font-bold text-appsi-red">Narasumber</p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              {S.narasumber.map((n) => <li key={n.nama}><b>{n.nama}</b> ({n.peran})</li>)}
            </ol>
          </div>
          <p className="rounded-lg bg-blue-50 p-3 text-appsi-blue sm:col-span-2"><b>Catatan:</b> {S.catatan}</p>
        </div>

        <form onSubmit={submit} noValidate className="mt-6 space-y-6">
          <Section no={1} title="Identitas Peserta">
            <div>
              <label className="label" htmlFor="email">Alamat Email Aktif<Req /></label>
              <input id="email" type="email" className="input" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="nama@kampus.ac.id" />
              <Err k="email" />
            </div>
            <div>
              <label className="label" htmlFor="nama">Nama Lengkap beserta Gelar Akademik<Req /></label>
              <input id="nama" className="input" value={f.namaLengkap} onChange={(e) => set("namaLengkap", e.target.value)} placeholder="Contoh: Dr. Budi Santoso, S.Kom., M.Cs." />
              <Err k="namaLengkap" />
            </div>
            <div>
              <label className="label" htmlFor="wa">Nomor WhatsApp Aktif<Req /></label>
              <input id="wa" type="tel" inputMode="numeric" className="input" value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value.replace(/[^\d+\s-]/g, ""))} placeholder="Contoh: 081234567890" />
              <Err k="whatsapp" />
            </div>
            <div>
              <span className="label">Jabatan Struktural Saat Ini<Req /></span>
              <div className="grid gap-2 sm:grid-cols-2">
                {[...JABATAN_STRUKTURAL, LAINNYA].map((j) => (
                  <label key={j} className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition ${f.jabatanPilihan === j ? "border-appsi-blue bg-blue-50 text-appsi-blue" : "border-slate-200 hover:border-slate-400"}`}>
                    <input type="radio" name="jabatan" className="h-4 w-4 shrink-0 accent-appsi-blue" checked={f.jabatanPilihan === j} onChange={() => set("jabatanPilihan", j)} />
                    <span>{j}</span>
                  </label>
                ))}
              </div>
              {f.jabatanPilihan === LAINNYA && (
                <input aria-label="Jabatan lainnya" className="input mt-3" value={f.jabatanLain} onChange={(e) => set("jabatanLain", e.target.value)} placeholder="Tuliskan jabatan Anda" />
              )}
              <Err k="jabatan" />
            </div>
          </Section>

          <Section no={2} title="Asal Institusi & Program Studi">
            <div>
              <label className="label" htmlFor="pt">Nama Perguruan Tinggi / Institusi<Req /></label>
              <p className="mb-1.5 text-xs text-slate-500">Tuliskan nama lengkap tanpa singkatan.</p>
              <input id="pt" className="input" value={f.perguruanTinggi} onChange={(e) => set("perguruanTinggi", e.target.value)} placeholder="Contoh: Universitas Gadjah Mada" />
              <Err k="perguruanTinggi" />
            </div>
            <div>
              <label className="label" htmlFor="prov">Provinsi Asal Perguruan Tinggi<Req /></label>
              <select id="prov" className="input" value={f.provinsi} onChange={(e) => set("provinsi", e.target.value)}>
                <option value="">Pilih provinsi...</option>
                {PROVINSI.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <Err k="provinsi" />
            </div>
            <div>
              <label className="label" htmlFor="fak">Nama Fakultas / Unit Pengelola Program Studi (UPPS)<Req /></label>
              <input id="fak" className="input" value={f.fakultas} onChange={(e) => set("fakultas", e.target.value)} placeholder="Contoh: Fakultas Teknologi Informasi / FMIPA / Fakultas Ilmu Komputer" />
              <Err k="fakultas" />
            </div>
            <div>
              <label className="label" htmlFor="prodi">Nama Program Studi & Jenjang<Req /></label>
              <input id="prodi" className="input" value={f.programStudi} onChange={(e) => set("programStudi", e.target.value)} placeholder="Contoh: S1 Teknik Informatika / S1 Sistem Informasi / D3 Manajemen Informatika" />
              <Err k="programStudi" />
            </div>
          </Section>

          <Section no={3} title="Konfirmasi Kehadiran Sosialisasi">
            <div>
              <label className="label" htmlFor="tanya">Pertanyaan atau Hal yang Ingin Didiskusikan pada Sesi Tanya Jawab <span className="font-normal text-slate-500">(opsional)</span></label>
              <textarea id="tanya" rows={4} maxLength={2000} className="input" value={f.pertanyaan} onChange={(e) => set("pertanyaan", e.target.value)} />
              <Err k="pertanyaan" />
            </div>
            <div>
              <label className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-4 text-sm font-medium ${f.konfirmasiHadir ? "border-appsi-blue bg-blue-50" : "border-slate-200"}`}>
                <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-appsi-blue" checked={f.konfirmasiHadir} onChange={(e) => set("konfirmasiHadir", e.target.checked)} />
                <span>{S.konfirmasi}<Req /></span>
              </label>
              <Err k="konfirmasiHadir" />
            </div>
          </Section>

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
            <p className="mt-4 text-sm text-slate-600">{S.catatan}</p>
            <button onClick={() => setSuccess(null)} className="btn-primary mt-6 w-full">Tutup</button>
          </div>
        </div>
      )}
    </section>
  );
}

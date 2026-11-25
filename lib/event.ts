// Data resmi acara — mudah diedit di sini.
export const EVENT = {
  badge: "Rangkaian Kegiatan Perdana Nasional APPSI",
  headlineA: "Sinergi Nasional Pengelola Program Studi Rumpun Infokom untuk ",
  headlineB: "Akselerasi Mutu Program Studi INFOKOM",
  subheadline:
    "Rapat Kerja Pengurus Pusat, Sosialisasi APPSI, serta Workshop Bedah Instrumen Akreditasi LAM INFOKOM (LED & LKPS).",
  nama: "Rangkaian Kegiatan Perdana Nasional APPSI",
  hari: "Kamis, 17 Desember 2026",
  waktu: "Pukul 09.00 – 12.00 WIB",
  kuotaLuring: 100,
  kuotaDaring: 200,
  venueLuring: "FMIPA Universitas Gadjah Mada (UGM), Yogyakarta",
  platformDaring: "Zoom Meeting Conference",
  agenda: [
    "Rapat Kerja Pengurus Pusat APPSI (Periode 2026–2030)",
    "Sosialisasi APPSI",
    "Workshop Bedah Instrumen Akreditasi LAM INFOKOM (LED & LKPS)",
  ],
};

export const TOTAL_KUOTA = EVENT.kuotaLuring + EVENT.kuotaDaring;

export const JABATAN = [
  "Dekan / Wakil Dekan Fakultas Teknologi Informasi (FTI)",
  "Dekan / Wakil Dekan Fakultas Ilmu Komputer (FASILKOM)",
  "Dekan / Wakil Dekan Fakultas Teknik / Fakultas Teknik & Komputer (FTEK / FTIK)",
  "Dekan / Wakil Dekan Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)",
  "Ketua Jurusan / Ketua Departemen / Ketua Program Studi Rumpun Infokom",
  "Pengurus Pusat APPSI",
];

export const KEHADIRAN = [
  { value: "Luring", label: "Luring / Onsite (FMIPA UGM Yogyakarta)" },
  { value: "Daring", label: "Daring / Online (Zoom Meeting Conference)" },
];
export const kehadiranLabel = (v: string) => KEHADIRAN.find((k) => k.value === v)?.label ?? v;

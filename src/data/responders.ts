export interface VerifiedResponder {
  id: string;
  name: string;
  institution: string;
  role: 'Bantuan Hukum' | 'Konseling Psikologis' | 'Layanan Medis';
  area: string;
  verified: boolean;
  responseTime: string;
}

export const VERIFIED_RESPONDERS: VerifiedResponder[] = [
  {
    id: 'resp-01',
    name: 'Sari Kusuma, S.H.',
    institution: 'LBH APIK Jakarta',
    role: 'Bantuan Hukum',
    area: 'Daring & Nasional',
    verified: true,
    responseTime: 'Respons cepat',
  },
  {
    id: 'resp-02',
    name: 'dr. Ratna Dewi, Sp.KJ',
    institution: 'Klinik Pulih Sejahtera',
    role: 'Konseling Psikologis',
    area: 'Sesi Daring Terjadwal',
    verified: true,
    responseTime: 'Terverifikasi',
  },
  {
    id: 'resp-03',
    name: 'Unit Layanan Terpadu (UPTD PPA)',
    institution: 'Layanan Pendampingan Daerah',
    role: 'Layanan Medis',
    area: 'Pendampingan Kasus',
    verified: true,
    responseTime: 'Resmi',
  },
];
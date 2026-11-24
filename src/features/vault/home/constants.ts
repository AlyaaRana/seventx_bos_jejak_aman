import {
  Camera,
  Cloud,
  CloudRain,
  Edit3,
  FileText,
  Flower,
  Flower2,
  HeartHandshake,
  Leaf,
  Mic,
  Sprout,
  TreePine,
  VolumeX,
  Waves,
} from 'lucide-react';
import type {
  ActionConfig,
  BreathingPhase,
  EvidenceKind,
  IconStyle,
  Mood,
  MoodConfig,
  SoundOption,
} from './types';

export const MOOD_ORDER: readonly Mood[] = ['tenang', 'cemas', 'butuh_teman'];

/** Sebelum korban memilih suasana hati, Home tidak berasumsi apa pun tentang perasaannya. */
export const NEUTRAL_MESSAGE = 'Hai, aku di sini menemanimu. Tidak ada yang perlu buru-buru.';
export const NEUTRAL_GLOW = ['bg-emerald-200/40', 'bg-violet-200/50', 'bg-amber-100/50'] as const;

export const MOODS: Record<Mood, MoodConfig> = {
  tenang: {
    icon: Leaf,
    label: 'Tenang',
    message: 'Senang melihatmu merasa tenang. Aku di sini menjaga ruang amanmu.',
    chipActive: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    glow: ['bg-emerald-200/50', 'bg-violet-200/50', 'bg-amber-100/60'],
  },
  cemas: {
    icon: Cloud,
    label: 'Cemas',
    message: 'Napas pelan-pelan ya. Kamu aman di sini, tidak ada yang terburu-buru.',
    chipActive: 'border-sky-200 bg-sky-50 text-sky-700',
    glow: ['bg-sky-200/50', 'bg-indigo-100/70', 'bg-amber-100/50'],
  },
  butuh_teman: {
    icon: HeartHandshake,
    label: 'Butuh Teman',
    message: 'Kamu tidak sendirian. Aku dan tim pendamping siap membantumu kapan pun.',
    chipActive: 'border-violet-200 bg-violet-50 text-violet-700',
    glow: ['bg-fuchsia-200/40', 'bg-violet-200/60', 'bg-rose-100/70'],
  },
};

/** Balasan maskot setiap kali dipeluk (berputar). */
export const HUG_REPLIES: readonly string[] = [
  'Pelukan hangat untukmu.',
  'Kamu hebat sudah sampai di sini.',
  'Aku di sini, tidak ke mana-mana.',
  'Kamu berharga, apa pun yang terjadi.',
  'Peluk erat. Kamu aman bersamaku.',
];

export const SOOTHING_QUOTES: readonly string[] = [
  'Apapun yang kamu rasakan saat ini valid. Kamu berhak merasa aman, didengar, dan dilindungi.',
  'Kamu sangat berani melangkah sejauh ini. Ambil napas pelan, kamu pegang kendali penuh.',
  'Semua bukti dan ceritamu disimpan rapat di brankas ini, dan dirancang agar hanya kamu yang bisa membukanya.',
  'Kamu tidak harus kuat setiap saat. Boleh istirahat sebentar di sini.',
  'Satu langkah kecil hari ini sudah sangat berarti. Aku bangga padamu.',
  'Kamu layak diperlakukan dengan lembut, termasuk oleh dirimu sendiri.',
];

export const SOUND_OPTIONS: readonly SoundOption[] = [
  { id: 'off', label: 'Mati', icon: VolumeX },
  { id: 'rain', label: 'Hujan', icon: CloudRain },
  { id: 'waves', label: 'Ombak', icon: Waves },
  { id: 'forest', label: 'Hutan', icon: TreePine },
];

/**
 * Napas pelan: tarik 4 detik, hembuskan 6 detik.
 * Sengaja tanpa fase menahan napas, karena menahan napas dapat memicu trauma pada sebagian penyintas.
 */
export const BREATHING_PHASES: readonly BreathingPhase[] = [
  { id: 'inhale', label: 'Tarik napas', hint: 'pelan lewat hidung', seconds: 4, scale: 1.45 },
  { id: 'exhale', label: 'Hembuskan', hint: 'lembut lewat mulut', seconds: 6, scale: 0.85 },
];

export const BREATHING_REST_SCALE = 0.85;
export const BREATHING_CYCLE_SECONDS = BREATHING_PHASES.reduce((total, phase) => total + phase.seconds, 0);

/** Gaya bunga di Taman Ketenangan. Dipilih berurutan, tanpa angka atau target. */
export const GARDEN_BLOOMS: readonly IconStyle[] = [
  { icon: Flower2, tone: 'text-rose-400' },
  { icon: Flower, tone: 'text-violet-400' },
  { icon: Sprout, tone: 'text-emerald-500' },
  { icon: Flower2, tone: 'text-amber-400' },
  { icon: Flower, tone: 'text-sky-400' },
  { icon: Flower2, tone: 'text-fuchsia-400' },
];
export const MAX_GARDEN_SIZE = 12;

/** Kontak pendamping. Pastikan nomor ini sesuai layanan resmi sebelum rilis. */
export const SUPPORT_CONTACT = { label: 'SAPA 129', href: 'tel:129' } as const;

export const ACTIONS: readonly ActionConfig[] = [
  {
    id: 'photo',
    label: 'Ambil Foto',
    hint: 'Tidak masuk galeri',
    icon: Camera,
    screen: 's05-capture-photo',
    bubble: 'bg-[#FFF0EC] text-[#EF5B3F]',
  },
  {
    id: 'audio',
    label: 'Rekam Suara',
    hint: 'Hanya kamu yang dengar',
    icon: Mic,
    screen: 's06-record-audio',
    bubble: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'file',
    label: 'Pilih Berkas',
    hint: 'Chat, foto, dokumen',
    icon: FileText,
    screen: 's06b-pick-file',
    bubble: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'note',
    label: 'Tulis Cerita',
    hint: 'Pelan-pelan saja',
    icon: Edit3,
    screen: 's06c-write-note',
    bubble: 'bg-amber-50 text-amber-600',
  },
];

export const EVIDENCE_KIND_STYLE: Record<EvidenceKind, IconStyle> = {
  photo: { icon: Camera, tone: 'bg-[#FFF0EC] text-[#EF5B3F]' },
  audio: { icon: Mic, tone: 'bg-violet-50 text-violet-600' },
  document: { icon: FileText, tone: 'bg-emerald-50 text-emerald-600' },
  note: { icon: Edit3, tone: 'bg-amber-50 text-amber-600' },
};

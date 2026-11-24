// Layar S09: Sapaan hangat untuk pendamping sebelum verifikasi dimulai (sengaja tanpa indikator langkah).
import React from 'react';
import { BadgeCheck, CreditCard, Lock, Mail, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import aimImg from '../../assets/smile.png';
import { useVaultStore } from '../../store/useVaultStore';
import { ACCESS_GRANT, EVIDENCE_ITEMS, RESPONDER, ROUTES } from './responderData';
import { Button, Card, Pill, ResponderScreen } from './ResponderUi';
import '../../styles/cute-animations.css';
import './responder-animations.css';

interface PrepItem {
  icon: LucideIcon;
  title: string;
  hint: string;
}

/** Hal-hal yang perlu disiapkan pendamping, supaya tidak kaget di tengah proses. */
const PREP_ITEMS: readonly PrepItem[] = [
  { icon: CreditCard, title: 'e-KTP asli milikmu', hint: 'Chip dibaca lewat NFC, lalu data dikenali dengan OCR' },
  { icon: Mail, title: 'Akses ke email pemulihan', hint: 'Kode 6 digit dikirim ke sana untuk konfirmasi akhir' },
];

export const ResponderWelcomeScreen: React.FC = () => {
  const { setScreen } = useVaultStore();

  const grantSummary = [ACCESS_GRANT.durationLabel, ACCESS_GRANT.modeLabel, `${EVIDENCE_ITEMS.length} bukti`].join(' · ');

  return (
    <ResponderScreen>
      <header className="flex items-center justify-between pb-2">
        <span className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#C4B5FD] to-[#8B5CF6] text-[11px] font-bold text-white shadow-sm">
            JA
          </span>
          Jejak Aman
        </span>
        <Pill tone="neutral" icon={BadgeCheck}>
          Pendamping
        </Pill>
      </header>

      <main className="flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-y-auto py-2">
        <section className="rp-reveal flex flex-col items-center gap-3 rounded-[32px] border border-purple-100 bg-gradient-to-br from-[#F4F0FF] via-white to-[#ECFDF5] px-5 pb-6 pt-7 text-center shadow-[0_12px_36px_rgba(124,58,237,0.08)]">
          <div className="relative">
            <span aria-hidden className="ja-halo absolute inset-0 rounded-[28px] bg-emerald-300/40" />
            <div className="ja-float relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white bg-gradient-to-br from-emerald-100 to-emerald-200/70 p-2.5 shadow-[0_10px_26px_rgba(16,185,129,0.22)]">
              <img src={aimImg} alt="" className="h-full w-full object-contain" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Hai, Kak Pendamping!</h1>
            <p className="mx-auto max-w-[280px] text-[14px] leading-relaxed text-slate-600">
              Terima kasih sudah mendampingi. Yuk, kita verifikasi dulu identitasmu supaya bukti penyintas tetap aman.
            </p>
          </div>

          <Pill tone="success" icon={BadgeCheck}>
            {RESPONDER.institution}
          </Pill>
        </section>

        <div className="rp-reveal" style={{ animationDelay: '120ms' }}>
          <Card className="space-y-3">
            <p className="text-[12px] font-extrabold uppercase tracking-wider text-slate-500">Siapkan dulu ya</p>
            <ul className="space-y-3">
              {PREP_ITEMS.map(({ icon: Icon, title, hint }) => (
                <li key={title} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-bold text-slate-900">{title}</span>
                    <span className="block text-[12px] leading-snug text-slate-500">{hint}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div
          className="rp-reveal flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-3.5 py-3"
          style={{ animationDelay: '240ms' }}
        >
          <Lock size={15} className="shrink-0 text-emerald-600" />
          <p className="text-[12px] font-medium text-emerald-900">
            Izin akses: <span className="font-bold">{grantSummary}</span>
          </p>
        </div>
      </main>

      <Button icon={ShieldCheck} onClick={() => setScreen(ROUTES.nfc)}>
        Ayo mulai verifikasi
      </Button>
    </ResponderScreen>
  );
};

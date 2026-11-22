// Modal pop-up pemberian izin berjangka berbasis konfirmasi OTP 6-digit dari email penyintas.
import React, { useState } from 'react';
import { AccessibleButton } from '../../components/ui/AccessibleButton';
import { requestConsentOtp, verifyConsentOtp } from '../../services/consentService';

interface ConsentOtpModalProps {
  responderName: string;
  responderInstitution: string;
  responderId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ConsentOtpModal: React.FC<ConsentOtpModalProps> = ({
  responderName,
  responderInstitution,
  responderId,
  onClose,
  onSuccess,
}) => {
  const [duration, setDuration] = useState<'24h' | '7d'>('7d');
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [maskedEmail, setMaskedEmail] = useState<string>('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRequestOtp = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await requestConsentOtp({ responderId, duration });
      setChallengeId(res.challengeId);
      setMaskedEmail(res.maskedVictimEmail);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal mengirim OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeId) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      await verifyConsentOtp({
        challengeId,
        otpCode,
        responderId,
        duration,
      });
      onSuccess();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Verifikasi OTP gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-700 rounded-3xl p-6 text-slate-100 space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-white">Bagikan dengan Aman</h2>
            <p className="text-xs text-slate-300 mt-0.5">{responderName} · {responderInstitution}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 text-lg px-2">✕</button>
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-2 font-medium">Pilih Durasi Izin</label>
          <div className="grid grid-cols-2 gap-2.5">
            {(['24h', '7d'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setDuration(opt)}
                className={`min-h-[48px] rounded-2xl font-semibold text-sm border transition-all ${
                  duration === opt
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-[#0F172A] border-slate-700 text-slate-300'
                }`}
              >
                {opt === '24h' ? '24 Jam' : '7 Hari'}
              </button>
            ))}
          </div>
        </div>

        {!challengeId ? (
          <AccessibleButton onClick={handleRequestOtp} disabled={loading} fullWidth>
            {loading ? 'Mengirim OTP...' : 'Kirim Kode OTP Persetujuan'}
          </AccessibleButton>
        ) : (
          <form onSubmit={handleConfirmOtp} className="space-y-4">
            <p className="text-xs text-emerald-300 bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60">
              Kode OTP 6-digit dikirim ke email ({maskedEmail}). Masukkan untuk mengonfirmasi izin {duration === '24h' ? '24 Jam' : '7 Hari'}.
            </p>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Kode OTP 6 Digit</label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full min-h-[48px] px-4 rounded-2xl bg-[#0F172A] border border-slate-700 text-white tracking-widest text-center text-xl font-mono"
                required
              />
            </div>

            <AccessibleButton type="submit" disabled={loading || otpCode.length < 4} fullWidth>
              {loading ? 'Memverifikasi...' : 'Konfirmasi & Beri Akses'}
            </AccessibleButton>
          </form>
        )}

        {errorMsg && (
          <p className="text-xs text-red-400 bg-red-950/60 p-3 rounded-2xl">{errorMsg}</p>
        )}
      </div>
    </div>
  );
};
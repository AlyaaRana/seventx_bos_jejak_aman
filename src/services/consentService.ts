// Layanan API untuk meminta OTP ke email korban, memverifikasi OTP, dan mencabut izin pendamping.
export interface OtpRequestResult {
  challengeId: string;
  maskedVictimEmail: string;
  expiresAtIso: string;
}

export interface OtpVerifyResult {
  granted: boolean;
  grantId: string;
  expiresAtIso: string;
}

export async function requestConsentOtp(params: {
  responderId: string;
  duration: '24h' | '7d';
}): Promise<OtpRequestResult> {
  void params;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        challengeId: 'ch_' + Math.random().toString(36).substring(2, 9),
        maskedVictimEmail: 'a***a@gmail.com',
        expiresAtIso: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      });
    }, 400);
  });
}

export async function verifyConsentOtp(params: {
  challengeId: string;
  otpCode: string;
  responderId: string;
  duration: '24h' | '7d';
}): Promise<OtpVerifyResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params.otpCode.length >= 4) {
        resolve({
          granted: true,
          grantId: 'grant_' + Math.random().toString(36).substring(2, 9),
          expiresAtIso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });
      } else {
        reject(new Error('Kode OTP tidak valid.'));
      }
    }, 400);
  });
}
/** Getaran sangat singkat sebagai umpan balik lembut (jika perangkat mendukung). */
export function softHaptic(durationMs = 12): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(durationMs);
  }
}

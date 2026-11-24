# Usulan kontrak API Jejak Aman

Dokumen ini merangkum kontrak awal untuk backend. Nama path dan payload masih usulan; konfirmasi dengan tim backend sebelum dijadikan kontrak final.

## Status implementasi sekarang

UI responder memakai `mockResponderApi` dan bagian Vault memakai `mockVaultApi`. Keduanya berjalan lokal di memori, tidak melakukan request jaringan dan tidak menyimpan data secara permanen. Ganti binding `responderApi` atau `vaultApi` ke adapter HTTP setelah backend tersedia.

Model bersama ada di `src/types/responder.ts` dan `src/types/evidence.ts`. Daftar endpoint usulan juga ada sebagai komentar di `src/features/responder/responderApi.ts` dan `src/features/vault/vaultApi.ts`.

## Konsep produk Jejak Aman

Jejak Aman adalah ruang pribadi dan aman untuk penyintas menyimpan serta membagikan bukti secara terkendali. Ada dua peran utama:

- **Penyintas** menyimpan foto, audio, dokumen, dan catatan sebagai bukti, mengatur izin, serta menentukan pendamping yang dapat mengakses bukti.
- **Pendamping** memverifikasi identitasnya, mendapatkan OTP dari penyintas/backend, lalu membuka bukti yang telah diberikan izin.

Konsep utama bukan sekadar verifikasi identitas. Sistem harus memisahkan identitas pendamping, izin akses penyintas, dan bukti yang boleh dilihat.

### Alur penyintas

1. Penyintas masuk ke Ruang Aman menggunakan PIN.
2. Penyintas mengambil atau mengunggah bukti: foto, rekaman suara, dokumen, atau catatan kronologi.
3. Bukti akan dienkripsi di perangkat sebelum disimpan atau dikirim.
4. Penyintas dapat melihat riwayat bukti dan memeriksa status integritas/rantai hash.
5. Penyintas mencari atau memilih pendamping yang terdaftar.
6. Penyintas membuat izin akses dengan masa berlaku, misalnya 24 jam atau 7 hari.
7. Penyintas memilih mode akses, saat ini dirancang sebagai `hanya lihat`; bukti tidak dapat diunduh oleh pendamping.
8. Backend mengirim OTP ke email pemulihan yang ditautkan ke proses izin.
9. Penyintas atau pemilik izin mengonfirmasi bahwa pendamping tertentu boleh membuka bukti.
10. Penyintas dapat mencabut izin sebelum masa berlaku berakhir.

### Alur pendamping

1. Pendamping memilih role `Saya Pendamping` dari layar sambutan.
2. Backend/layar mengarahkan pendamping ke proses verifikasi e-KTP.
3. Pendamping memindai UID e-KTP melalui NFC native Android. Browser Web NFC tidak dianggap cukup untuk data e-KTP.
4. Jika perlu, pendamping memotret e-KTP dan OCR membaca identitas yang tersedia.
5. Backend mencocokkan atau membuat data pendamping berdasarkan UID/NIK.
6. Backend memeriksa apakah ada grant/izin aktif untuk identitas pendamping dan kasus penyintas.
7. Backend mengirim OTP ke email pemulihan yang terdaftar pada proses izin.
8. Pendamping memasukkan kode OTP 6 digit.
9. Backend memverifikasi UID/NIK, OTP, identitas pendamping, status grant, dan masa berlaku.
10. Jika berhasil, akses dashboard dibuka dan hanya bukti yang tercakup grant yang dikembalikan.
11. Bukti ditampilkan read-only, diberi watermark identitas pendamping/kasus, dan tidak dapat diunduh.
12. Pendamping dapat menjalankan pemeriksaan integritas hash/rantai bukti.
13. Pendamping dapat meminta bukti tambahan kepada penyintas.
14. Permintaan tambahan harus disetujui atau ditolak oleh penyintas; pendamping tidak mendapat akses otomatis.
15. Akses dihentikan otomatis saat masa berlaku habis atau saat izin dicabut.

### Obyek/domain backend yang dibutuhkan

Backend perlu merepresentasikan setidaknya:

- pengguna/akun penyintas;
- profil dan identitas terverifikasi pendamping;
- hasil verifikasi e-KTP dalam bentuk aman, termasuk UID/NIK ter-mask atau referensi verifikasi;
- kasus/permintaan pendamping;
- grant izin dengan `grantId`, `caseId`, `responderId`, batas waktu, mode akses, dan status aktif/revoked;
- challenge OTP dengan waktu kadaluarsa, percobaan maksimal, dan status terpakai;
- metadata bukti beserta tipe, waktu perangkat, waktu server, hash, dan status sinkron;
- payload bukti terenkripsi beserta referensi penyimpanan;
- log integritas, audit akses, permintaan bukti tambahan, serta pencabutan izin.

Jangan menyimpan OTP atau NIK lengkap sebagai log biasa. Jangan mengembalikan NIK penuh ke frontend bila hanya masking yang dibutuhkan UI.

## Alur pendamping

| Urutan | Operasi usulan | Request | Response utama |
| --- | --- | --- | --- |
| Baca e-KTP | Bridge NFC Android, bukan Web NFC biasa | — | `scanId`, waktu baca |
| Pengenalan identitas | `POST /api/responders/identity/ocr` | `scanId` (atau hasil OCR perangkat jika OCR dilakukan on-device) | `responderId`, `name`, `institution`, `caseId`, `maskedNik` |
| Kirim OTP | `POST /api/consents/otp/request` | `responderId`, `caseId`, `duration` (`24h` / `7d`) | `challengeId`, `maskedEmail`, `expiresAtIso` |
| Verifikasi OTP | `POST /api/consents/otp/verify` | `challengeId`, `otpCode`, `responderId`, `duration` | `grantId`, masa akses |
| Dashboard | `GET /api/responders/dashboard?grantId={grantId}` | token/izin akses | identitas pendamping, izin, daftar bukti |
| Daftar bukti kasus | `GET /api/cases/{caseId}/evidence` | — | daftar bukti read-only |
| Periksa keutuhan | `GET /api/evidence/{evidenceId}/integrity` | — | status hash dan riwayat hash |
| Minta bukti tambahan | `POST /api/cases/{caseId}/evidence-requests` | `evidenceId` (opsional) | `requestId`, status |

## Kontrak backend minimum berdasarkan domain

### Identitas dan verifikasi

Endpoint verifikasi perlu menyimpan bukti bahwa pendamping memang diverifikasi melalui NFC/OCR, tanpa mengembalikan data sensitif e-KTP ke setiap layar.

Wajib tersedia:

- pemeriksaan UID/NFC;
- pencocokan identitas pendamping dengan kasus/pendamping terdaftar;
- OCR atau referensi hasil OCR;
- status verifikasi identitas;
- pembatasan bahwa UID/NIK tidak boleh ditampilkan atau dicatat penuh di log.

### OTP dan grant izin

Endpoint OTP dan grant harus menjadi satu sesi terkontrol:

1. Request OTP dikaitkan dengan `responderId`, `caseId`, dan grant yang akan dibuat.
2. OTP memakai masa berlaku dan batas percobaan.
3. OTP yang berhasil diverifikasi hanya dapat dipakai sekali.
4. Verifikasi menghasilkan `grantId` dan waktu kedaluwarsa.
5. Dashboard hanya boleh menerima data jika grant masih aktif dan belum dicabut.

Contoh respons grant:

```json
{
  "grantId": "grant-001",
  "caseId": "case-001",
  "responderId": "responder-001",
  "duration": "7d",
  "mode": "read_only",
  "status": "active",
  "expiresAtIso": "2026-12-01T13:00:00+07:00"
}
```

### Bukti penyintas

Bukti yang dikembalikan ke dashboard pendamping hanya boleh berupa:

- metadata yang diizinkan;
- referensi/pratinjau terenkripsi;
- status integritas;
- timestamp perangkat dan server;
- tanda bahwa bukti read-only.

URL atau token pratinjau sebaiknya berumur pendek dan dikaitkan dengan grant aktif. Token lama harus ditolak setelah grant dicabut atau kedaluwarsa.

### Permintaan bukti tambahan

Permintaan tambahan perlu status eksplisit:

- `pending`;
- `approved`;
- `rejected`;
- `expired`.

Penyintas mengontrol persetujuan. Pendamping tidak boleh mendapatkan bukti tambahan sebelum status berubah menjadi `approved`.

### Audit dan keamanan

Backend perlu mencatat audit untuk:

- percobaan verifikasi NFC/OCR;
- request dan verifikasi OTP;
- pembuatan, perubahan, dan pencabutan grant;
- pembukaan pratinjau bukti;
- pemeriksaan hash;
- permintaan bukti tambahan;
- sinkronisasi/upload bukti.

Audit tidak boleh menyimpan payload bukti atau OTP mentah. Log akses perlu mencatat waktu, aktor, kasus, grant, bukti, dan hasil, dengan privacy-by-design.

NFC e-KTP perlu integrasi Android/native yang berwenang; browser Web NFC standar tidak cukup. Tentukan bersama backend apakah OCR dijalankan on-device atau server. Jika gambar dikirim ke server, perlu persetujuan eksplisit, transport aman, retensi terbatas, dan kebijakan penghapusan.

## Alur Vault

| Operasi usulan | Endpoint | Catatan |
| --- | --- | --- |
| Simpan bukti | `POST /api/vault/evidence` | Metadata + payload yang sudah dienkripsi di perangkat |
| Riwayat bukti | `GET /api/vault/evidence` | Mengembalikan metadata, status sinkron, dan referensi bukti |
| Periksa integritas | `GET /api/vault/evidence/{evidenceId}/integrity` | Mengembalikan hash dan status verifikasi |
| Baca antrean offline | `GET /api/vault/sync-queue` | Bisa tetap menjadi antrean lokal; endpoint hanya jika backend perlu status sinkron |
| Sinkronkan antrean | `POST /api/vault/sync-queue/retry` | Client mengirim ulang bukti terenkripsi saat jaringan tersedia; `wifiOnly` adalah preferensi client |

Contoh body simpan bukti:

```json
{
  "title": "Catatan Kronologi",
  "type": "note",
  "encryptedPayload": {
    "cipherTextBase64": "...",
    "ivBase64": "..."
  }
}
```

Jangan kirim teks catatan, foto, audio, isi berkas, NIK lengkap, atau OTP dalam bentuk plaintext atau ke log. Saat ini mock Vault hanya menyimpan metadata; enkripsi client-side, penyimpanan lokal yang aman, upload berkas terenkripsi, dan sinkronisasi nyata belum dibuat.

## Perilaku dummy saat ini

- NFC demo menghasilkan `scanId`; OCR demo mengembalikan identitas contoh.
- OTP demo menerima sembarang 6 digit dan tidak mengirim email.
- Dashboard, bukti kasus, dan hasil pemeriksaan integritas berasal dari data contoh.
- Vault demo mencatat metadata foto/audio/berkas/catatan ke memori aplikasi. File dan isi catatan tidak diunggah atau disimpan permanen.
- Antrean dan sinkronisasi demo hanya mengubah status lokal.

## Ringkasan alur data untuk tim backend

```text
Penyintas menyimpan bukti
  -> metadata + payload terenkripsi
  -> hash/rantai integritas
  -> bukti tersimpan untuk kasus

Penyintas membuat izin
  -> memilih pendamping
  -> memilih durasi
  -> memilih mode read-only
  -> backend membuat grant

Pendamping memverifikasi identitas
  -> NFC/OCR
  -> pencocokan identitas
  -> request OTP
  -> verify OTP
  -> grant aktif

Pendamping membuka dashboard
  -> backend mengecek grant
  -> backend mengembalikan bukti dalam cakupan grant
  -> pratinjau bertanda watermark
  -> bukti tidak dapat diunduh

Pendamping meminta bukti tambahan
  -> permintaan dikirim ke penyintas
  -> penyintas menyetujui atau menolak
  -> grant diperluas hanya jika disetujui
```

Backend harus menolak seluruh pembukaan bukti apabila grant tidak ada, tidak aktif, kedaluwarsa, atau dicabut. Aturan ini lebih penting daripada sekadar menyembunyikan tombol unduh di frontend.

## Keputusan backend yang masih diperlukan

1. Mekanisme autentikasi/token dan otorisasi per kasus.
2. SDK/protokol NFC e-KTP Android yang sah, termasuk data apa yang boleh dibaca.
3. OCR on-device atau server; format input dan kebijakan penghapusan gambar.
4. Provider email OTP, masa berlaku, batas percobaan, rate limit, dan format error.
5. Algoritma enkripsi, pengelolaan kunci, format payload, ukuran maksimum, dan retensi.
6. Strategi antrean offline, retry, duplikasi/idempotency, serta timestamp client/server.

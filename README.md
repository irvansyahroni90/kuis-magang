# Platform Kuis Magang (dengan pengawasan kamera)

Isi folder:

| File | Fungsi |
|---|---|
| `index.html` | Halaman kuis untuk peserta |
| `admin.html` | Halaman laporan untuk pembimbing (dilindungi PIN) |
| `config.js` | Alamat API dan setelan sensitivitas deteksi |
| `apps-script/Code.gs` | Server di Google Sheets: soal, timer, nilai, log, foto |

Alurnya: peserta membuka `index.html` → soal diambil dari Google Sheets → jawaban, log kejadian, dan foto disimpan ke Sheets dan Google Drive milikmu → kamu melihat hasilnya di `admin.html`.

---

## 1. Siapkan Google Sheets bank soal

1. Upload `bank_soal_gnss.xlsx` ke Google Drive, buka, lalu pilih **File → Simpan sebagai Google Spreadsheet**.
2. Di sheet **Bank Soal**, pilih kolom **N (Pakai)**, lalu **Sisipkan → Kotak centang**. Centang 50 soal pilihanmu.
3. Upload isi `gambar_gnss.zip` (12 file PNG) ke satu folder Google Drive. Buka folder itu dan salin **ID folder** dari URL, yaitu bagian setelah `/folders/`.

## 2. Pasang server (Apps Script)

1. Di Google Sheets tadi: **Ekstensi → Apps Script**.
2. Hapus isi `Code.gs` bawaan, tempel isi `apps-script/Code.gs`, lalu simpan.
3. Pilih fungsi **setup** di toolbar, lalu klik **Jalankan**. Izinkan akses saat diminta.
   Ini akan membuat sheet `Sesi`, `Hasil`, `Log`, folder Drive **Snapshot Kuis Magang**, dan menambah baris pengaturan baru.
4. Buka sheet **Pengaturan** dan isi:
   - **Folder gambar (ID)**: ID folder dari langkah 1.3
   - **PIN admin**: ganti dari `1234`
   - **Token peserta**: kode yang kamu bagikan ke peserta saat kuis
   - **Kuis dibuka**: `Ya` atau `Tidak`
5. **Terapkan → Deployment baru → jenis: Aplikasi web**
   - Jalankan sebagai: **Saya**
   - Yang memiliki akses: **Siapa saja**
   - Salin **URL aplikasi web** (berakhiran `/exec`).

> Kalau nanti `Code.gs` diubah: **Terapkan → Kelola deployment → Edit → Versi baru**. URL tetap sama.

## 3. Pasang halaman kuis (GitHub Pages)

1. Buka `config.js`, lalu ganti `API_URL` dengan URL dari langkah 2.5.
2. Push folder ini ke repo GitHub. Di repo: **Settings → Pages → Branch: main / (root)**.
3. Alamat yang dipakai:
   - Peserta: `https://<username>.github.io/<repo>/`
   - Kamu: `https://<username>.github.io/<repo>/admin.html`

Kamera hanya bisa jalan di HTTPS. GitHub Pages sudah HTTPS.

## 4. Uji coba sebelum hari H (penting)

1. Buka `.../index.html?debug=1` di laptop yang akan dipakai, lalu kerjakan kuis sebagai peserta.
   Panel hijau di pojok kiri bawah menampilkan angka deteksi langsung: `yaw` (toleh), `pitch` (tunduk), `eye` (arah mata).
2. Coba menunduk melihat HP, menoleh, keluar dari kamera, dan pindah aplikasi. Lalu cek hasilnya di `admin.html`.
3. Kalau terlalu sensitif atau kurang sensitif, ubah angka di bagian `DETEKSI` dalam `config.js`.
4. Setelah uji coba, hapus baris uji di sheet **Hasil**, **Sesi**, dan **Log**.

## 5. Hari pelaksanaan

- Set **Kuis dibuka = Ya**, lalu bagikan link dan token.
- Peserta mengisi nama dan token, mengizinkan kamera, kalibrasi 5 detik, lalu kuis berjalan dalam layar penuh selama 60 menit.
- Kalau laptop peserta mati atau browser tertutup, peserta cukup membuka link lagi dan memasukkan nama yang sama. Kuis berlanjut dengan sisa waktu yang tetap berjalan, dan kejadian ini tercatat sebagai "Halaman dimuat ulang".
- Setelah selesai, set **Kuis dibuka = Tidak**.
- Peserta tidak melihat nilai. Nilai hanya muncul di `admin.html` dan sheet **Hasil**.

## 6. Yang dicatat sebagai indikasi kecurangan

| Kejadian | Cara deteksi |
|---|---|
| Wajah tidak terdeteksi | Tidak ada wajah di kamera ≥ 3 detik (kemungkinan meninggalkan tempat) |
| Lebih dari satu orang | Ada ≥ 2 wajah atau orang di kamera |
| Menunduk / pandangan ke bawah | Posisi kepala atau mata turun dibanding saat kalibrasi ≥ 3 detik (kemungkinan melihat HP, buku, atau catatan) |
| Menoleh ke samping / mendongak | Kepala berpaling dari posisi kalibrasi ≥ 3 detik |
| HP terdeteksi / buku terdeteksi | Objek HP atau buku terlihat di kamera |
| Keluar dari jendela kuis | Pindah tab, aplikasi, atau jendela lain |
| Keluar layar penuh | Menekan Esc atau keluar dari layar penuh |
| Copy/paste, tombol terlarang | Ctrl+C/V, PrintScreen, F12, dan sejenisnya |
| Kamera mati, monitor tambahan | Kamera terputus, atau laptop tersambung ke layar kedua |

Setiap kejadian disertai detik mulai dan selesai, serta foto saat kejadian. Ada juga foto acak berkala sebagai pembanding. Skor risiko dihitung dari jenis dan lamanya kejadian: **Rendah** < 15, **Sedang** 15–39, **Tinggi** ≥ 40.

## 7. Batasan yang perlu dipahami

- Halaman web **tidak bisa memblokir** aplikasi lain. Yang bisa dilakukan adalah mendeteksi dan mencatat saat peserta keluar dari kuis.
- Hasil deteksi adalah **indikasi**, bukan bukti. Orang yang berpikir sambil menunduk juga bisa tercatat. Selalu cek fotonya.
- HP atau buku hanya terdeteksi kalau terlihat di kamera. Indikator utamanya tetap arah kepala dan pandangan.
- Gunakan **Chrome atau Edge versi terbaru**. Pada laptop yang sangat lambat, deteksi bisa berkurang frekuensinya.

## 8. Ganti topik (fotogrametri, LiDAR, USV, …)

Tambahkan soal baru ke sheet **Bank Soal** dengan kolom **Topik** yang sesuai, centang **Pakai**, lalu ubah **Topik aktif** di sheet **Pengaturan**. Kode tidak perlu diubah.

## Mengulang kuis untuk satu peserta

Di sheet **Sesi**, hapus baris peserta tersebut atau ubah statusnya. Setelah itu, peserta bisa mulai lagi dengan token.

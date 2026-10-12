# Platform Kuis Magang v3 (multi-kuis)

| File | Fungsi |
|---|---|
| `index.html` | Halaman peserta (termasuk mode uji `?uji=1` dan pratinjau admin) |
| `admin.html` | Panel admin |
| `config.js` | Hanya berisi `API_URL` |
| `apps-script/Code.gs` | Server di Google Sheets |

## Konsep
- **Topik** adalah kelompok bank soal, misalnya GNSS, Fotogrametri UAV, atau LiDAR.
- **Kuis** adalah acara ujian yang mengambil soal dari **satu topik**, dengan soal pilihan, durasi, jadwal, pengawasan, dan **peserta** sendiri.
- Beberapa kuis boleh berjalan bersamaan.
- **Satu akun hanya bisa mengerjakan satu kali per kuis.** Akun yang sama dipakai untuk semua kuis.

## Memperbarui dari versi sebelumnya
1. Apps Script: ganti seluruh isi `Kode.gs` dengan `apps-script/Code.gs`, lalu simpan.
2. Jalankan **setup**. Data lama dipindahkan otomatis: pengaturan dan pilihan soal sebelumnya menjadi kuis **KUIS-001** (misalnya "Kuis GNSS"), dan sesi serta hasil lama ikut tertaut ke kuis itu.
3. **Terapkan → Kelola deployment → ✏️ → Versi baru → Terapkan.**
4. GitHub: upload `index.html`, `admin.html`, dan `README.md`. **Jangan upload `config.js`.**

## Tab admin
| Tab | Isi |
|---|---|
| **Monitor** | Pilih kuis lewat tombol di atas. Isinya kartu per peserta kuis itu (foto kamera dan layar, progres, sisa waktu, sinyal, kejadian), tombol +5/+10 menit, paksa kumpulkan, izinkan mengulang, serta buka/tutup kuis. |
| **Kuis** | Daftar kuis Aktif/Arsip. Di sini bisa **buat**, edit, buka/tutup, monitor, lihat hasil, pratinjau, duplikat, arsipkan/pulihkan, dan hapus kuis (hanya yang belum pernah dikerjakan). |
| **Bank Soal** | Tab per topik, filter, edit/hapus soal, pilih banyak soal, **pindahkan ke topik**, **ganti nama topik**, buat kuis dari topik atau dari soal pilihan, dan lihat kuis mana yang memakai soal tertentu. |
| **Impor Soal** | Pilih **topik tujuan** (topik lama, topik baru, atau ikuti kolom Excel), lalu upload ZIP, Excel, atau gambar. Ada pratinjau dan validasi, lalu **Buat kuis dari soal ini**. |
| **Peserta** | Akun dengan kolom **Kelompok**, status dan nilai per kuis, serta cetak kartu akun per kelompok. |
| **Hasil** | Pilih kuis (termasuk yang sudah diarsipkan). Berisi detail per peserta (foto, video, jawaban), analisis soal, nilai ulang, dan CSV. |
| **Penyimpanan** | Foto dan video per peserta dan per kuis: hapus, unduh ZIP, dan bersihkan file lama. |
| **Pengaturan** | Pengaturan umum: nama aplikasi, folder gambar, hapus otomatis, PIN, dan tautan peserta/uji. |

## Membuat kuis baru
1. **Impor Soal**: pilih topik tujuan, upload paket, lalu klik **Simpan**.
2. Klik **+ Buat kuis dari soal ini**, atau buka tab **Kuis → + Buat kuis baru**.
3. Isi:
   - nama kuis
   - centang soal (atau **Pilih otomatis** sesuai komposisi)
   - jumlah soal per peserta
   - durasi
   - jadwal (Ditutup / Dibuka sekarang / Terjadwal)
   - pengawasan
   - **peserta**: semua akun, per kelompok, lalu tambah atau kecualikan akun tertentu
4. Klik **Simpan kuis**. Pakai **👁 Pratinjau** untuk melihat tampilan kuis seperti yang dilihat peserta.

## Sisi peserta
- Login dengan username dan kode akses.
- Kalau hanya satu kuis yang terbuka untuknya, peserta langsung masuk ke kuis itu. Kalau ada lebih dari satu, muncul **daftar pilihan kuis**.
- Hanya satu kuis yang bisa dikerjakan pada satu waktu. Kalau ada kuis yang belum selesai, peserta akan melanjutkan kuis itu dulu.

## Batasan
- Halaman web tidak bisa memblokir aplikasi lain. Yang bisa dilakukan adalah mendeteksi, memotret, dan menampilkan layar ke pembimbing.
- Hasil deteksi adalah **indikasi**, bukan bukti. Selalu cek foto/video.
- Bagikan layar dan rekaman membutuhkan Chrome/Edge di laptop.

# Platform Kuis Magang v2

| File | Fungsi |
|---|---|
| `index.html` | Halaman kuis peserta (termasuk mode uji `?uji=1` dan pratinjau admin) |
| `admin.html` | Panel admin: Monitor, Bank Soal, Impor Soal, Pengaturan, Peserta, Hasil, Penyimpanan |
| `config.js` | Hanya berisi `API_URL`, yaitu URL Web App Apps Script |
| `apps-script/Code.gs` | Server di Google Sheets |

Semua pengaturan (topik, jadwal, durasi, pengawasan, akun, PIN) dilakukan dari **admin.html**. Kode tidak perlu diubah.

---

## Memperbarui dari versi sebelumnya

1. **Apps Script:** hapus seluruh isi `Kode.gs`, tempel `apps-script/Code.gs` yang baru, lalu simpan.
2. **(Disarankan) Aktifkan Drive API** supaya fitur "hapus permanen" bisa dipakai: di editor Apps Script, klik **Layanan +** di panel kiri, pilih **Drive API**, lalu klik **Tambahkan**.
3. Pilih fungsi **setup** lalu klik **▷ Jalankan**. Izinkan akses jika diminta (ada izin baru untuk pembersihan otomatis terjadwal).
4. **Terapkan → Kelola deployment → ✏️ → Versi: Versi baru → Terapkan.** URL `/exec` tidak berubah.
5. **GitHub:** upload `index.html`, `admin.html`, dan `README.md`. **Jangan upload `config.js`**, karena config.js lama di GitHub sudah berisi URL API-mu dan tetap kompatibel.
6. Buka `admin.html` lalu masuk dengan PIN admin.

`setup()` aman dijalankan berulang kali. Pengaturan lama dipindahkan otomatis: "Kuis dibuka: Ya" menjadi "Mode akses: Dibuka".

## Pemasangan baru (dari nol)

1. Upload `bank_soal_gnss.xlsx` ke Drive, lalu simpan sebagai Google Spreadsheet.
2. Ekstensi → Apps Script, tempel `Code.gs`, aktifkan Drive API (opsional), lalu jalankan `setup`.
3. Terapkan sebagai **Aplikasi web**: Jalankan sebagai **Saya**, Akses **Siapa saja**. Salin URL `/exec`.
4. Isi `API_URL` di `config.js`, lalu upload semua file ke GitHub Pages.
5. Buka `admin.html` dengan PIN awal `1234`, lalu langsung ganti PIN di tab Pengaturan → Keamanan.

---

## Tab admin

**Monitor**: status kuis, tombol buka/tutup cepat, dan kartu per peserta.
- Foto kamera dan tangkapan layar diperbarui tiap 10–30 detik.
- Progres jawaban, sisa waktu, dan "terakhir aktif" (berwarna merah jika sinyal hilang).
- Jumlah kejadian dan kejadian terakhir.
- Aksi per peserta: **+5/+10 menit**, **Paksa kumpulkan**, **Izinkan mengulang**, **Lihat hasil**.

**Bank Soal**
- Pilih soal dengan centang, lalu klik **Simpan pilihan**.
- **Pilih otomatis** mengikuti komposisi Mudah/Sedang/Sulit.
- Ada filter tingkat, subtopik, dan pencarian.
- **Edit/Hapus soal**. Kalau kunci diubah, kamu ditawari untuk menilai ulang hasil yang sudah ada.
- 👁 **Pratinjau** satu soal atau seluruh pilihan, persis seperti tampilan peserta (tanpa kamera, tidak tercatat).

**Impor Soal**
- Upload **ZIP** (Excel + gambar), **Excel** saja, atau **gambar** saja.
- Pratinjau dan validasi dulu sebelum disimpan. Yang diperiksa: kunci, opsi kosong, gambar hilang, ID ganda, dan soal kembar.
- Gambar otomatis dikecilkan dan disimpan di subfolder per topik.
- Unduh template Excel, ekspor bank soal, dan tambah soal manual.

**Pengaturan**
- Judul, topik aktif, jumlah soal, durasi, komposisi, acak soal dan opsi.
- **Jadwal**: Ditutup / Dibuka sekarang / Terjadwal (jam buka dan jam tutup). Pada jam tutup, peserta yang masih mengerjakan otomatis dikumpulkan.
- **Pengawasan**: kamera wajib, sensitivitas, durasi minimal kejadian, foto rutin, pantauan langsung, bagikan layar (Tidak/Opsional/Wajib), rekam video kamera/layar.
- Hapus foto dan video otomatis setelah N hari, folder gambar, dan ganti PIN.

**Peserta**: ubah nama, buat kode baru 🔄, aktif/nonaktif, tambah akun, rekap nilai per topik, dan **Cetak kartu akun**.

**Hasil**
- Daftar nilai per topik dan ekspor CSV.
- **Detail** per peserta: timeline kejadian, foto, jawaban per soal, dan **rekaman video** (klik waktu kejadian untuk melompat ke detik itu).
- **Analisis soal**: persentase benar dan sebaran jawaban, dengan peringatan jika ada opsi lain yang lebih banyak dipilih daripada kunci.
- **Nilai ulang** menggunakan kunci terbaru.

**Penyimpanan**
- Ukuran foto dan video per peserta.
- Bisa menghapus foto rutin saja, semua foto, video, atau semuanya. Bisa juga menghapus file yang lebih lama dari N hari.
- **Unduh ZIP** sebelum menghapus.
- Foto pantauan Monitor **tidak** disimpan di Drive. Gambar soal tidak ikut terhapus.

## Perkiraan pemakaian data per peserta (60 menit)

| Fitur | Data |
|---|---|
| Foto kejadian | ± 1–2 MB |
| Pantauan kamera + layar (tiap 15 dtk) | ± 9–10 MB |
| Rekam video kamera | ± 60–70 MB |
| Rekam video layar | ± 40–60 MB |

## Mode khusus

- `index.html?uji=1`: mode uji dengan **PIN admin**. Kamera dilewati, bagikan layar opsional, dan hasil bertanda [UJI].
- `index.html?debug=1`: menampilkan angka deteksi wajah untuk menyetel sensitivitas.
- Pratinjau: dibuka dari tombol 👁 di admin. Tidak ada yang tercatat.

## Batasan

- Halaman web tidak bisa **memblokir** aplikasi lain. Yang bisa dilakukan adalah mendeteksi, memotret, dan menampilkan layar ke pembimbing.
- Hasil deteksi adalah **indikasi**, bukan bukti pasti. Selalu cek foto/video.
- Bagikan layar dan rekaman memerlukan **Chrome/Edge di laptop**.
- Pantauan Monitor diperbarui berkala (bukan video live), karena Apps Script tidak bisa mengalirkan video.

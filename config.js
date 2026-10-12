// Ganti API_URL dengan URL Web App dari Apps Script (Deploy → Aplikasi web → URL berakhiran /exec)
window.KUIS_CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycbxnqMizNEyGdKg1wbWqZ-qDmuTN0yoRj2WIY8PsIwjg43jfX6ryMcvSXvRKzQlQfEe8/exec",
  JUDUL: "Kuis Magang SIG",

  // Pengaturan deteksi. Buka index.html?debug=1 untuk melihat angka langsung saat menyetel.
  DETEKSI: {
    durasiMinimal: 3,       // detik: perilaku harus bertahan selama ini sebelum dicatat
    ambangToleh: 0.12,      // simpangan rasio toleh kiri/kanan dari posisi kalibrasi
    ambangTunduk: 0.07,     // simpangan rasio tunduk dari posisi kalibrasi
    ambangMataBawah: 0.25,  // kenaikan skor "mata melihat ke bawah" dari kalibrasi
    ambangObjek: 0.5,       // keyakinan minimal deteksi HP/buku (0–1)
    fpsWajah: 6,            // frekuensi analisis wajah per detik
    intervalObjekMs: 1200,  // jeda analisis HP/buku
    fotoRutinMenit: 5       // foto acak berkala sebagai pembanding
  }
};

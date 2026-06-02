document.addEventListener("DOMContentLoaded", function () {

    // Validasi Input Telepon Hanya Angka (Real-time)

    var inputTelp = document.querySelector("input[type='tel']");
    if (inputTelp) {
        inputTelp.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
        });
    }


    // 1. NOTIFIKASI TOMBOL "Selengkapnya" (home.html)

    document.querySelectorAll("a.btn").forEach(function(button) {
        button.addEventListener("click", function(e) {
            var href = this.getAttribute("href");
            
            if (href === "kamera.html") {
                e.preventDefault();
                if (confirm("Anda akan diarahkan ke halaman Katalog Kamera. Lanjutkan?")) {
                    window.location.href = href;
                }
            } else if (href === "sewa-hp.html") {
                e.preventDefault();
                if (confirm("Anda akan diarahkan ke halaman Sewa HP. Lanjutkan?")) {
                    window.location.href = href;
                }
            } else if (href === "fotografi.html") {
                e.preventDefault();
                if (confirm("Anda akan diarahkan ke halaman Jasa Fotografi. Lanjutkan?")) {
                    window.location.href = href;
                }
            }
        });
    });


    // 2. NOTIFIKASI TOMBOL HUBUNGI / SEWA SEKARANG / BOOKING (Direct)

    document.querySelectorAll("a[href='hubungi.html']").forEach(function(button) {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            
            var pesan = "Apakah Anda ingin menghubungi kami untuk melakukan pemesanan produk ini?";
            if (confirm(pesan)) {
                alert("Terima kasih! Anda akan diarahkan ke formulir pemesanan.");
                window.location.href = "hubungi.html";
            } else {
                alert("Pemesanan dibatalkan. Anda masih bisa melihat produk lain.");
            }
        });
    });
//

    // 3. NOTIFIKASI TOMBOL SUBMIT (hubungi.html)

    var formButton = document.querySelector("button[type='submit']");
    if (formButton) {
        formButton.addEventListener("click", function(e) {
            e.preventDefault();

            var inputNama = document.querySelector("input[type='text']");
            var inputEmail = document.querySelector("input[type='email']");
            var txtPesan = document.querySelector("textarea");

            var nama = inputNama ? inputNama.value.trim() : "";
            var email = inputEmail ? inputEmail.value.trim() : "";
            var telp = inputTelp ? inputTelp.value.trim() : "";
            var pesan = txtPesan ? txtPesan.value.trim() : "";

            if (nama === "" || email === "" || telp === "" || pesan === "") {
                alert("SEMUA KOLOM WAJIB DIISI!!!.");
                return;
            }

            var konfirmasi = confirm(
                "Konfirmasi Pengiriman Pesan:\n\n" +
                "Nama    : " + nama + "\n" +
                "Email   : " + email + "\n" +
                "Telepon : " + telp + "\n\n" +
                "Apakah data di atas sudah benar?"
            );

            if (konfirmasi) {
                alert("Pesan berhasil dikirim!\nTerima kasih, " + nama + ".\nTim LensCapture akan menghubungi Anda segera.");
                var formElement = document.querySelector("form");
                if (formElement) formElement.reset();
            } else {
                alert("KOLOM WAJIB DIISI!\nPastikan semua data sudah benar sebelum mengirim pesan.");
            }
        });
    }
});
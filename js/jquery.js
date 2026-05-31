window.jQuery = window.$ = function(selector) {
    return {
        ready: function(fn) { document.addEventListener("DOMContentLoaded", fn); },
        on: function(event, callback) {
            document.addEventListener(event, function(e) {
                if (e.target && e.target.matches(selector)) callback(e);
            });
        }
    };
};

document.addEventListener("DOMContentLoaded", function() {
    // Logika Hamburger Menu (Layar HP)
    var toggleBtn = document.querySelector('.navbar-toggle');
    var menuCollapse = document.querySelector('#navbar-menu');
    if (toggleBtn && menuCollapse) {
        toggleBtn.addEventListener('click', function() {
            if (menuCollapse.style.display === 'block') {
                menuCollapse.style.display = 'none';
            } else {
                menuCollapse.style.display = 'block';
            }
        });
    }

    // Logika Dropdown Jasa Foto (Bisa jalan di Laptop maupun HP)
    var dropdownToggle = document.querySelector('.dropdown-toggle');
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah loncat halaman saat mengklik teks induk
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        });

        // Menutup dropdown otomatis jika pengguna mengklik area luar menu
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
});
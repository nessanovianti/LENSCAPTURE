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

    // Dropdown Jasa Foto 
    var dropdownToggle = document.querySelector('.dropdown-toggle');
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault(); 
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        });


        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
});
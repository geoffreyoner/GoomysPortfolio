(function () {
    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
})();

(function () {
    document.documentElement.classList.add('js');

    window.addEventListener('error', function () {
        document.documentElement.classList.remove('js');
    }, true);

    var isDark = true;
    try {
        if (localStorage.getItem('theme') === 'light') {
            isDark = false;
        }
    } catch (error) {
    }

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
})();

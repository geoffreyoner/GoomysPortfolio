(function () {
    try {
        var saved = localStorage.getItem('theme');
        var isDark = saved
            ? saved === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    } catch (error) {
    }
})();
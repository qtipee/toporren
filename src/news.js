export function handleNews() {
    /**
     * Display more news when the 'Display more news button' is clicked.
     */
    document.getElementById('moreNewsBtn').addEventListener('click', (event) => {
        const newsItems = document.querySelectorAll('#newsWrapper .news');
        let count = 0;

        for (const newsItem of newsItems) {
            if (newsItem.classList.contains('hiddenNews')) {
                newsItem.classList.remove('hiddenNews');
                ++count;
        
                if (count == 2) {
                    // Break the loop when 2 more news are displayed
                    break;
                }
            }
        }

        // Disable the button if all news are displayed
        const hiddenNewsNumber = document.querySelectorAll('#newsWrapper .news.hiddenNews').length;
        if (hiddenNewsNumber == 0) {
            event.target.classList.add('disabled');
            event.target.disabled = true;
        }
    });
}

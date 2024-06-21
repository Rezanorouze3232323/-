const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        const url = `https://github.com/search?q=${query}`;
        window.location.href = url;
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const probabilityElement = document.getElementById('impact-probability');
    const newsContainer = document.getElementById('news-container');

    // Constants
    const UPDATE_INTERVALS = {
        PROBABILITY: 3000,
        NEWS: 30000
    };

    const BASE_PROBABILITY = 0.0042;
    const SEARCH_API_URL = 'https://frenchfaso.pythonanywhere.com/search';

    // Probability calculation with Infinite Improbability Drive
    function updateProbability() {
        const improbabilityFactor = Math.sin(Date.now() / 10000) * 0.0001;
        const probability = (BASE_PROBABILITY + improbabilityFactor).toFixed(4);
        probabilityElement.textContent = `${probability}%`;
    }

    // Fetch space news articles
    async function getSpaceNews() {
        const params = new URLSearchParams({
            query: 'latest news on asteroids',
        });

        try {
            const response = await fetch(`${SEARCH_API_URL}?${params}`);
            if (!response.ok) throw new Error('News network response was not ok');
            
            const data = await response.json();
            return data.map(article => ({
                title: article.Title,
                url: article.URL
            }));
        } catch (error) {
            console.error("Error fetching space news:", error);
            return [{
                title: "Sub-Etha Net temporarily unavailable",
                url: "#"
            }];
        }
    }

    // Update news display
    async function updateNews() {
        newsContainer.innerHTML = "Scanning Sub-Etha wavelengths...";
        
        try {
            const articles = await getSpaceNews();
            const newsItems = articles
                .map(article => `<p>► <a href="${article.url}" target="_blank">${article.title}</a></p>`)
                .join('');
            
            newsContainer.innerHTML = newsItems || "No news from this sector of the galaxy";
        } catch (error) {
            console.error("Error updating news display:", error);
            newsContainer.innerHTML = "Sub-Etha Net temporarily unavailable";
        }
    }

    // Initialize and set update intervals
    function initialize() {
        updateProbability();
        updateNews();

        setInterval(updateProbability, UPDATE_INTERVALS.PROBABILITY);
        setInterval(updateNews, UPDATE_INTERVALS.NEWS);
    }

    // Start the application
    initialize();
});
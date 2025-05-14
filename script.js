async function searchAnime() {
    const query = document.getElementById('searchInput').value.trim();
    const container = document.getElementById('animeContainer');
    container.innerHTML = ''; // Clear previous results

    if (!query) {
        alert('Please enter an anime name');
        return;
    }

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`);
        const data = await response.json();

        if (data.data.length === 0) {
            container.innerHTML = '<p>No results found</p>';
            return;
        }

        data.data.forEach(anime => {
            const card = document.createElement('div');
            card.classList.add('anime-card');

            card.innerHTML = `
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p><strong>Episodes:</strong> ${anime.episodes || 'N/A'}</p>
                <p><strong>Score:</strong> ${anime.score || 'N/A'}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching anime:', error);
        container.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}

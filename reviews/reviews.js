const ratingLabels = [
    ['Food', 'food'],
    ['Sleep quality', 'sleep'],
    ['Neighborhood', 'neighborhood'],
    ['Hosts', 'hosts']
];

function renderStars(value) {
    if (value === null || value === undefined || value === '') {
        return {
            stars: 'Not rated',
            label: 'Not rated'
        };
    }

    const rating = Math.max(0, Math.min(5, Number(value)));
    return {
        stars: '★'.repeat(rating) + '☆'.repeat(5 - rating),
        label: `${rating} out of 5 stars`
    };
}

function renderStats() {
    const container = document.getElementById('review-stats');

    const stats = ratingLabels.map(([label, key]) => {
        const values = reviews
            .map((review) => review[key])
            .filter((value) => value !== null && value !== undefined && value !== '');
        const average = values.length
            ? values.reduce((sum, value) => sum + Number(value), 0) / values.length
            : 0;
        const percentage = (average / 5) * 100;

        return `
            <div class="stat-row">
                <span>${label}</span>
                <span class="stat-bar" role="img" aria-label="${label}: ${average.toFixed(1)} out of 5">
                    <span class="stat-fill" style="width: ${percentage}%"></span>
                </span>
                <strong>${average.toFixed(1)}/5</strong>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <h2>Extremely scientific results</h2>
        <div class="stats">${stats}</div>
    `;

    const count = reviews.length;
    const noun = count === 1 ? 'person has' : 'people have';
    document.getElementById('review-count').textContent =
        `${count} ${noun} entered the LeppaCaasa lore.`;
}

function renderReviews() {
    const container = document.getElementById('reviews-list');

    reviews.forEach((review) => {
        const article = document.createElement('article');
        article.className = 'review';

        const ratings = ratingLabels.map(([label, key]) => {
            const result = renderStars(review[key]);

            return `
                <div class="rating-row">
                    <dt>${label}</dt>
                    <dd class="stars" aria-label="${result.label}">${result.stars}</dd>
                </div>
            `;
        }).join('');

        article.innerHTML = `
            <h2>${review.name}</h2>
            <p class="connection">${review.connection}</p>
            <dl class="ratings">${ratings}</dl>
            <blockquote class="comment">${review.comment}</blockquote>
        `;

        container.appendChild(article);
    });
}

renderStats();
renderReviews();

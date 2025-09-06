// Google Reviews rendering and data fetch
// Replace with your Google Place ID (kept here to allow building maps link if needed)
const placeId = "ChIJU7O3P5IbdkgRVm-wppoH9-4"; // Example Place ID

function renderGoogleReviews(reviews) {
  const container = document.getElementById('google-reviews');
  if (!container) return;
  container.innerHTML = '';
  reviews.slice(0, 6).forEach((review, idx) => {
    const col = document.createElement('div');
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="testimonial-card h-100">
        <div class="stars mb-2">
          ${'<i class="fas fa-star text-warning"></i>'.repeat(5)}
        </div>
        <p>${review.text}</p>
        <div class="testimonial-author">
          <strong>${review.author_name}</strong>
          <span>${review.relative_time_description}</span>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Fetch Google reviews: try local bundled JSON first (for offline/dev), then fallback to remote API endpoint
const localReviewsPath = 'api/google-reviews.json';
const remoteReviewsPath = 'https://bullardlocks.com/api/google-reviews.json';

function handleReviewsData(data) {
  if (!data || !Array.isArray(data.reviews)) {
    throw new Error('Invalid reviews data');
  }
  const fiveStarReviews = data.reviews
    .filter(r => r.rating === 5)
    .sort((a, b) => b.time - a.time)
    .slice(0, 6);
  renderGoogleReviews(fiveStarReviews);
}

// Try local file first
fetch(localReviewsPath)
  .then(res => {
    if (!res.ok) throw new Error('Local reviews not found');
    return res.json();
  })
  .then(handleReviewsData)
  .catch(() => {
    // Fallback to remote URL
    fetch(remoteReviewsPath)
      .then(res => {
        if (!res.ok) throw new Error('Remote reviews not available');
        return res.json();
      })
      .then(handleReviewsData)
      .catch(() => {
        const container = document.getElementById('google-reviews');
        if (container) {
          container.innerHTML = `
            <div class="col-12 text-center">
              <p>Unable to load Google reviews at this time.</p>
            </div>
          `;
        }
      });
  });

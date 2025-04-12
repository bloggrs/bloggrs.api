// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search-input');
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
            }
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add lazy loading to images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Add click handlers for post interactions
    document.querySelectorAll('.post-card').forEach(card => {
        // Like button functionality
        const likeButton = card.querySelector('.likes-count');
        if (likeButton) {
            likeButton.addEventListener('click', async function() {
                const postId = this.dataset.postId;
                try {
                    const response = await fetch(`/api/posts/${postId}/like`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        this.querySelector('.count').textContent = data.likes;
                    }
                } catch (error) {
                    console.error('Error liking post:', error);
                }
            });
        }

        // Comment form functionality
        const commentForm = card.querySelector('.comment-form');
        if (commentForm) {
            commentForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const postId = this.dataset.postId;
                const commentInput = this.querySelector('.comment-input');
                const comment = commentInput.value.trim();

                if (comment) {
                    try {
                        const response = await fetch(`/api/posts/${postId}/comments`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ content: comment })
                        });
                        if (response.ok) {
                            commentInput.value = '';
                            // Refresh comments count
                            const commentsCount = card.querySelector('.comments-count .count');
                            if (commentsCount) {
                                commentsCount.textContent = parseInt(commentsCount.textContent) + 1;
                            }
                        }
                    } catch (error) {
                        console.error('Error posting comment:', error);
                    }
                }
            });
        }
    });
}); 
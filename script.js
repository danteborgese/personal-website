// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation highlighting on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Collapsible Sections Functionality
document.querySelectorAll('.section-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    // Toggle aria-expanded
    toggle.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle open class for animation
    if (isExpanded) {
      content.classList.remove('open');
    } else {
      content.classList.add('open');
    }
  });
});

// Load Podcast RSS Feed
async function loadPodcastFeed() {
  const feedContainer = document.getElementById('podcast-feed');
  if (!feedContainer) return;

  try {
    // Use CORS proxy to fetch RSS feed (since RSS feeds often have CORS restrictions)
    const rssUrl = 'https://api.substack.com/feed/podcast/3682988.rss';
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      // Display up to 5 latest episodes
      const episodes = data.items.slice(0, 5);
      
      feedContainer.innerHTML = episodes.map(episode => {
        const pubDate = new Date(episode.pubDate);
        const formattedDate = pubDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        // Extract description (remove HTML tags)
        const description = episode.description 
          ? episode.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
          : '';
        
        return `
          <div class="podcast-episode">
            <h4>${episode.title}</h4>
            <p>${formattedDate}</p>
            ${description ? `<p>${description}</p>` : ''}
            <a href="${episode.link}" target="_blank" rel="noopener noreferrer">Listen →</a>
          </div>
        `;
      }).join('');
    } else {
      feedContainer.innerHTML = '<p>Unable to load podcast episodes. <a href="https://wisdomoftheweek.substack.com/podcast" target="_blank" rel="noopener noreferrer">Visit podcast page →</a></p>';
    }
  } catch (error) {
    console.error('Error loading podcast feed:', error);
    feedContainer.innerHTML = '<p>Unable to load podcast episodes. <a href="https://wisdomoftheweek.substack.com/podcast" target="_blank" rel="noopener noreferrer">Visit podcast page →</a></p>';
  }
}

// Load podcast feed when page loads
loadPodcastFeed();

// Load YouTube Video Feed
async function loadYouTubeFeed() {
  const feedContainer = document.getElementById('youtube-feed');
  if (!feedContainer) return;

  try {
    const playlistId = 'PLlK2ayAQpVKcxpHCDg6vVCHMHNqddEWhq';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      // Get all videos from playlist (no Shorts)
      const videos = data.items;
      
      feedContainer.innerHTML = `
        <div class="youtube-carousel-container">
          <button class="carousel-arrow carousel-arrow-left" aria-label="Previous videos">‹</button>
          <div class="youtube-videos-carousel">
            ${videos.map(video => {
              // Extract video ID from link
              const videoId = video.link.split('v=')[1]?.split('&')[0] || '';
              
              return `
                <div class="youtube-video-item">
                  <a href="${video.link}" target="_blank" rel="noopener noreferrer" class="video-link">
                    <div class="video-thumbnail">
                      <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${video.title}" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                      <div class="play-overlay">▶</div>
                    </div>
                    <div class="video-info">
                      <h4>${video.title}</h4>
                    </div>
                  </a>
                </div>
              `;
            }).join('')}
          </div>
          <button class="carousel-arrow carousel-arrow-right" aria-label="Next videos">›</button>
        </div>
      `;
      
      // Initialize carousel navigation for this specific container
      const carouselContainer = feedContainer.querySelector('.youtube-carousel-container');
      if (carouselContainer) {
        initializeCarousel(carouselContainer);
      }
    } else {
      feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/@DanteBorgese" target="_blank" rel="noopener noreferrer">Visit channel →</a></p>';
    }
  } catch (error) {
    console.error('Error loading YouTube feed:', error);
    feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/@DanteBorgese" target="_blank" rel="noopener noreferrer">Visit channel →</a></p>';
  }
}

// Initialize carousel navigation
function initializeCarousel(container) {
  if (!container) {
    container = document;
  }
  const carousel = container.querySelector('.youtube-videos-carousel');
  const leftArrow = container.querySelector('.carousel-arrow-left');
  const rightArrow = container.querySelector('.carousel-arrow-right');
  
  if (!carousel || !leftArrow || !rightArrow) return;
  
  const videosPerView = 4;
  
  // Update arrow visibility based on scroll position
  function updateArrows() {
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    leftArrow.style.display = scrollLeft <= 0 ? 'none' : 'flex';
    rightArrow.style.display = scrollLeft >= maxScroll - 1 ? 'none' : 'flex';
  }
  
  // Scroll by videosPerView
  function scrollVideos(direction) {
    const videoItems = carousel.querySelectorAll('.youtube-video-item');
    if (videoItems.length === 0) return;
    
    // Get computed gap from CSS (1.5rem = 24px typically)
    const computedStyle = window.getComputedStyle(carousel);
    const gap = parseFloat(computedStyle.gap) || 24;
    const videoWidth = videoItems[0].offsetWidth;
    const scrollAmount = (videoWidth + gap) * videosPerView;
    
    if (direction === 'next') {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    } else {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
    
    // Update arrows after scroll animation
    setTimeout(updateArrows, 300);
  }
  
  // Next videos
  rightArrow.addEventListener('click', () => {
    scrollVideos('next');
  });
  
  // Previous videos
  leftArrow.addEventListener('click', () => {
    scrollVideos('prev');
  });
  
  // Update arrows on scroll
  carousel.addEventListener('scroll', updateArrows);
  
  // Initial arrow state
  updateArrows();
}

// Load YouTube feed when page loads
loadYouTubeFeed();

// Load Breakfast with Nana Playlist
async function loadPodcastPlaylist() {
  const feedContainer = document.getElementById('podcast-feed');
  if (!feedContainer) return;

  try {
    const playlistId = 'PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      // Get all videos from playlist
      const videos = data.items;
      
      feedContainer.innerHTML = `
        <div class="youtube-carousel-container">
          <button class="carousel-arrow carousel-arrow-left" aria-label="Previous videos">‹</button>
          <div class="youtube-videos-carousel">
            ${videos.map(video => {
              // Extract video ID from link
              const videoId = video.link.split('v=')[1]?.split('&')[0] || '';
              
              return `
                <div class="youtube-video-item">
                  <a href="${video.link}" target="_blank" rel="noopener noreferrer" class="video-link">
                    <div class="video-thumbnail">
                      <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${video.title}" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                      <div class="play-overlay">▶</div>
                    </div>
                    <div class="video-info">
                      <h4>${video.title}</h4>
                    </div>
                  </a>
                </div>
              `;
            }).join('')}
          </div>
          <button class="carousel-arrow carousel-arrow-right" aria-label="Next videos">›</button>
        </div>
      `;
      
      // Initialize carousel navigation for this specific container
      const carouselContainer = feedContainer.querySelector('.youtube-carousel-container');
      if (carouselContainer) {
        initializeCarousel(carouselContainer);
      }
    } else {
      feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM" target="_blank" rel="noopener noreferrer">Visit playlist →</a></p>';
    }
  } catch (error) {
    console.error('Error loading podcast playlist:', error);
    feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM" target="_blank" rel="noopener noreferrer">Visit playlist →</a></p>';
  }
}

// Load podcast playlist when page loads
loadPodcastPlaylist();

// Load Travel Videos Playlist
async function loadTravelVideosPlaylist() {
  const feedContainer = document.getElementById('travel-videos-feed');
  if (!feedContainer) return;

  try {
    const playlistId = 'PLlK2ayAQpVKeSkX_crwEtxLmOiIPhulQQ';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      // Get all videos from playlist
      const videos = data.items;
      
      feedContainer.innerHTML = `
        <div class="youtube-carousel-container">
          <button class="carousel-arrow carousel-arrow-left" aria-label="Previous videos">‹</button>
          <div class="youtube-videos-carousel">
            ${videos.map(video => {
              // Extract video ID from link
              const videoId = video.link.split('v=')[1]?.split('&')[0] || '';
              
              return `
                <div class="youtube-video-item">
                  <a href="${video.link}" target="_blank" rel="noopener noreferrer" class="video-link">
                    <div class="video-thumbnail">
                      <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${video.title}" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                      <div class="play-overlay">▶</div>
                    </div>
                    <div class="video-info">
                      <h4>${video.title}</h4>
                    </div>
                  </a>
                </div>
              `;
            }).join('')}
          </div>
          <button class="carousel-arrow carousel-arrow-right" aria-label="Next videos">›</button>
        </div>
      `;
      
      // Initialize carousel navigation for this specific container
      const carouselContainer = feedContainer.querySelector('.youtube-carousel-container');
      if (carouselContainer) {
        initializeCarousel(carouselContainer);
      }
    } else {
      feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKeSkX_crwEtxLmOiIPhulQQ" target="_blank" rel="noopener noreferrer">Visit playlist →</a></p>';
    }
  } catch (error) {
    console.error('Error loading travel videos playlist:', error);
    feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKeSkX_crwEtxLmOiIPhulQQ" target="_blank" rel="noopener noreferrer">Visit playlist →</a></p>';
  }
}

// Load travel videos playlist when page loads
loadTravelVideosPlaylist();

// Load Music Videos Playlist
async function loadMusicVideosPlaylist() {
  const feedContainer = document.getElementById('music-videos-feed');
  if (!feedContainer) return;

  try {
    const playlistId = 'PLlK2ayAQpVKcNJwoRxJhXd9tTaTpX64cI';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      // Get all videos from playlist
      const videos = data.items;
      
      feedContainer.innerHTML = `
        <div class="youtube-carousel-container">
          <button class="carousel-arrow carousel-arrow-left" aria-label="Previous videos">‹</button>
          <div class="youtube-videos-carousel">
            ${videos.map(video => {
              // Extract video ID from link
              const videoId = video.link.split('v=')[1]?.split('&')[0] || '';
              
              return `
                <div class="youtube-video-item">
                  <a href="${video.link}" target="_blank" rel="noopener noreferrer" class="video-link">
                    <div class="video-thumbnail">
                      <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${video.title}" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                      <div class="play-overlay">▶</div>
                    </div>
                    <div class="video-info">
                      <h4>${video.title}</h4>
                    </div>
                  </a>
                </div>
              `;
            }).join('')}
          </div>
          <button class="carousel-arrow carousel-arrow-right" aria-label="Next videos">›</button>
        </div>
      `;
      
      // Initialize carousel navigation for this specific container
      const carouselContainer = feedContainer.querySelector('.youtube-carousel-container');
      if (carouselContainer) {
        initializeCarousel(carouselContainer);
      }
    } else {
      feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcNJwoRxJhXd9tTaTpX64cI" target="_blank" rel="noopener noreferrer">Visit playlist →</a></p>';
    }
  } catch (error) {
    console.error('Error loading music videos playlist:', error);
    feedContainer.innerHTML = '<p>Unable to load videos. <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcNJwoRxJhXd9tTaTpX64cI" target="_blank" rel="noopener noreferrer">Visit playlist →</a></p>';
  }
}

// Load music videos playlist when page loads
loadMusicVideosPlaylist();

// Email Reveal Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const emailToggle = document.querySelector('.email-reveal-toggle');
  if (emailToggle) {
    const email = emailToggle.getAttribute('data-email');
    const originalText = emailToggle.textContent;
    
    emailToggle.addEventListener('click', () => {
      if (emailToggle.textContent === originalText) {
        emailToggle.textContent = email;
      } else {
        emailToggle.textContent = originalText;
      }
    });
  }
});

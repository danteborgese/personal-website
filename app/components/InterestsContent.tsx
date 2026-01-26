'use client';

import { useState } from 'react';
import YouTubeCarousel from './YouTubeCarousel';

function EmailRevealToggle({ email }: { email: string }) {
  const [showEmail, setShowEmail] = useState(false);
  const originalText = 'ping me here';

  return (
    <span 
      className="email-reveal-toggle" 
      onClick={() => setShowEmail(!showEmail)}
    >
      {showEmail ? email : originalText}
    </span>
  );
}

export default function InterestsContent() {
  return (
    <div id="interests" className="container" style={{ maxWidth: '1400px' }}>
      <div className="interests-list">
        <div className="interest-item">
          <div className="interest-content">
            <h3>Contrast Therapy</h3>
            <p>Exploring new sauna and cold plunge experiences in NYC. If you have any recommendations or want to go together, <EmailRevealToggle email="dlborgese@gmail.com" />.</p>
          </div>
          <div className="interest-image-wrapper">
            <img
              src="/sauna photo.jpeg"
              alt="Contrast Therapy"
              className="interest-image"
            />
          </div>
        </div>

        <div className="interest-item">
          <div className="interest-content">
            <h3>Golf</h3>
            <p>Started caddying at the Woods Hole Golf Club at age 11, where I worked for over a decade. I learned to play, and ended up making the high school team. I'm a life long student of the game. My favorite golf related app on the market is <a href="https://apps.apple.com/us/app/eden-golf-course-reviews/id6746735468" target="_blank" rel="noopener noreferrer">Eden</a>. Check it out.</p>
          </div>
          <div className="interest-image-wrapper">
            <img
              src="/golf photo.jpeg"
              alt="Golf"
              className="interest-image"
            />
          </div>
        </div>

        <div className="interest-item">
          <div className="interest-content">
            <h3>Bow-Hunting</h3>
            <p>Self-taught in 2022, learned everything from YouTube. Combining physical and mental toughness with respect for the outdoors.</p>
          </div>
          <div className="interest-image-wrapper">
            <img
              src="/hunting photo.jpeg"
              alt="Bow-Hunting"
              className="interest-image"
            />
          </div>
        </div>

        <div className="interest-item">
          <div className="interest-content">
            <h3>Music</h3>
            <p>Creating videos and content in the music space.</p>
          </div>
          <YouTubeCarousel 
            playlistId="PLlK2ayAQpVKcNJwoRxJhXd9tTaTpX64cI"
            playlistUrl="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcNJwoRxJhXd9tTaTpX64cI"
          />
          <p className="embed-link" style={{ marginTop: '1rem' }}>
            <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcNJwoRxJhXd9tTaTpX64cI" target="_blank" rel="noopener noreferrer">
              View Full Playlist →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

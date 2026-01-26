import { WobbleCard } from './ui/wobble-card';
import AuroraText from './AuroraText';
import YouTubeCarousel from './YouTubeCarousel';

export default function ContentSection() {
  return (
    <section id="content" className="section">
      <div className="container">
        <WobbleCard containerClassName="wobble-section-card">
          <div className="wobble-card-header">
            <h2>
              <AuroraText>Content</AuroraText>
            </h2>
          </div>
        </WobbleCard>
        <div id="content" className="container" style={{ maxWidth: '1400px' }}>
          <div className="content-embeds">
            <div className="embed-container">
              <h3>Two Minute Wisdom</h3>
              <p className="embed-bio">Translating timeless wisdom into practical insight for modern life.</p>
              <YouTubeCarousel 
                playlistId="PLlK2ayAQpVKcxpHCDg6vVCHMHNqddEWhq"
                channelUrl="https://www.youtube.com/@DanteBorgese"
              />
              <p className="embed-link">
                <a href="https://www.youtube.com/@DanteBorgese" target="_blank" rel="noopener noreferrer">
                  View Full Channel →
                </a>
              </p>
            </div>

            <div className="embed-container">
              <h3>Breakfast with Nana</h3>
              <p className="embed-bio">Dante (25) and Gloria "Nana" (95) sit down to chat about life, love, and everything in between. Nana's sharp mind and wealth of experience offer a unique window into almost a century of wisdom.</p>
              <YouTubeCarousel 
                playlistId="PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM"
                playlistUrl="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM"
              />
              <p className="embed-link">
                <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM" target="_blank" rel="noopener noreferrer">
                  View Full Playlist →
                </a>
              </p>
            </div>

            <div className="embed-container">
              <h3>My Original Travel Videos</h3>
              <p className="embed-bio">how it all got started...</p>
              <YouTubeCarousel 
                playlistId="PLlK2ayAQpVKeSkX_crwEtxLmOiIPhulQQ"
                playlistUrl="https://www.youtube.com/playlist?list=PLlK2ayAQpVKeSkX_crwEtxLmOiIPhulQQ"
              />
              <p className="embed-link">
                <a href="https://www.youtube.com/playlist?list=PLlK2ayAQpVKeSkX_crwEtxLmOiIPhulQQ" target="_blank" rel="noopener noreferrer">
                  View Full Playlist →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

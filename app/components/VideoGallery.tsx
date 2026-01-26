'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  subtitle?: string;
  url: string;
}

interface VideoGalleryProps {
  title: string;
  description?: string;
  playlistId: string;
  playlistUrl?: string;
}

export default function VideoGallery({ title, description, playlistId, playlistUrl }: VideoGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const videoList: Video[] = data.items.map((video: any, index: number) => {
            let videoId = '';
            if (video.link) {
              const urlMatch = video.link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
              if (urlMatch) {
                videoId = urlMatch[1];
              } else {
                videoId = video.link.split('v=')[1]?.split('&')[0] || '';
              }
            }

            if (!videoId && video.guid) {
              const guidMatch = video.guid.match(/video:([^:]+)/);
              if (guidMatch) {
                videoId = guidMatch[1];
              }
            }

            return {
              id: String(index),
              thumbnail: videoId,
              title: video.title,
              subtitle: title,
              url: video.link,
            };
          }).filter((v: Video) => v.thumbnail !== '');

          setVideos(videoList);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [playlistId, title]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="video-gallery">
        <div className="video-gallery-header">
          <div className="video-gallery-text">
            <h2 className="video-gallery-title">{title}</h2>
            {description && <p className="video-gallery-description">{description}</p>}
          </div>
        </div>
        <div className="video-gallery-loading">Loading videos...</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="video-gallery">
        <div className="video-gallery-header">
          <div className="video-gallery-text">
            <h2 className="video-gallery-title">{title}</h2>
            {description && <p className="video-gallery-description">{description}</p>}
          </div>
        </div>
        <div className="video-gallery-empty">
          Unable to load videos.{' '}
          {playlistUrl && (
            <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
              Visit playlist →
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="video-gallery">
      <div className="video-gallery-header">
        <div className="video-gallery-text">
          <h2 className="video-gallery-title">{title}</h2>
          {description && <p className="video-gallery-description">{description}</p>}
        </div>
        <div className="video-gallery-nav">
          <button
            className="gallery-nav-btn"
            onClick={() => scroll('left')}
            aria-label="Previous videos"
          >
            ←
          </button>
          <button
            className="gallery-nav-btn"
            onClick={() => scroll('right')}
            aria-label="Next videos"
          >
            →
          </button>
        </div>
      </div>

      <div className="video-gallery-carousel" ref={scrollRef}>
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-gallery-item"
          >
            <div className="video-thumbnail-wrapper">
              <Image
                src={`https://img.youtube.com/vi/${video.thumbnail}/maxresdefault.jpg`}
                alt={video.title}
                fill
                sizes="280px"
                className="video-thumbnail-img"
              />
              <div className="video-play-overlay">
                <span className="play-icon">▶</span>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              {video.subtitle && <p className="video-subtitle">{video.subtitle}</p>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

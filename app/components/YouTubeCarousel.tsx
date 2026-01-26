'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Video {
  title: string;
  link: string;
  videoId: string;
}

interface YouTubeCarouselProps {
  playlistId: string;
  channelUrl?: string;
  playlistUrl?: string;
}

export default function YouTubeCarousel({ playlistId, channelUrl, playlistUrl }: YouTubeCarouselProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const videoList: Video[] = data.items.map((video: any) => {
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
              title: video.title,
              link: video.link,
              videoId: videoId || '',
            };
          }).filter((v: Video) => v.videoId !== '');
          
          setVideos(videoList);
        }
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [playlistId]);

  useEffect(() => {
    if (!carouselRef.current || !leftArrowRef.current || !rightArrowRef.current) return;

    const carousel = carouselRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    function updateArrows() {
      const scrollLeft = carousel.scrollLeft;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      const maxScroll = scrollWidth - clientWidth;

      leftArrow.style.display = scrollLeft <= 0 ? 'none' : 'flex';
      rightArrow.style.display = scrollLeft >= maxScroll - 1 ? 'none' : 'flex';
    }

    function scrollVideos(direction: 'next' | 'prev') {
      const videoItems = carousel.querySelectorAll('.youtube-video-item');
      if (videoItems.length === 0) return;

      const computedStyle = window.getComputedStyle(carousel);
      const gap = parseFloat(computedStyle.gap) || 24;
      const videoWidth = (videoItems[0] as HTMLElement).offsetWidth;
      const scrollAmount = (videoWidth + gap) * 4;

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

      setTimeout(updateArrows, 300);
    }

    rightArrow.addEventListener('click', () => scrollVideos('next'));
    leftArrow.addEventListener('click', () => scrollVideos('prev'));
    carousel.addEventListener('scroll', updateArrows);

    updateArrows();

    return () => {
      rightArrow.removeEventListener('click', () => scrollVideos('next'));
      leftArrow.removeEventListener('click', () => scrollVideos('prev'));
      carousel.removeEventListener('scroll', updateArrows);
    };
  }, [videos]);

  if (loading) {
    return <div className="youtube-feed"><p>Loading videos...</p></div>;
  }

  if (videos.length === 0) {
    return (
      <div className="youtube-feed">
        <p>Unable to load videos. {playlistUrl && <a href={playlistUrl} target="_blank" rel="noopener noreferrer">Visit playlist →</a>}</p>
      </div>
    );
  }

  return (
    <div className="youtube-feed">
      <div className="youtube-carousel-container">
        <button 
          ref={leftArrowRef}
          className="carousel-arrow carousel-arrow-left" 
          aria-label="Previous videos"
          style={{ display: 'none' }}
        >
          ‹
        </button>
        <div ref={carouselRef} className="youtube-videos-carousel">
          {videos.map((video, index) => (
            <div key={index} className="youtube-video-item">
              <a href={video.link} target="_blank" rel="noopener noreferrer" className="video-link">
                <div className="video-thumbnail">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                    alt={video.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="play-overlay">▶</div>
                </div>
                <div className="video-info">
                  <h4>{video.title}</h4>
                </div>
              </a>
            </div>
          ))}
        </div>
        <button 
          ref={rightArrowRef}
          className="carousel-arrow carousel-arrow-right" 
          aria-label="Next videos"
        >
          ›
        </button>
      </div>
    </div>
  );
}

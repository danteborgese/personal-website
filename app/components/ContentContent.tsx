import VideoGallery from './VideoGallery';

export default function ContentContent() {
  return (
    <div id="content" className="content-section-inner">
      <VideoGallery
        title="Two Minute Wisdom"
        description="Translating timeless wisdom into practical insight for modern life."
        playlistId="PLlK2ayAQpVKcxpHCDg6vVCHMHNqddEWhq"
        playlistUrl="https://www.youtube.com/@DanteBorgese"
      />

      <div className="content-divider" />

      <VideoGallery
        title="Breakfast with Nana"
        description="Dante (25) and Gloria 'Nana' (95) sit down to chat about life, love, and everything in between."
        playlistId="PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM"
        playlistUrl="https://www.youtube.com/playlist?list=PLlK2ayAQpVKcCL4umDUydWmA3rCD6qscM"
      />
    </div>
  );
}

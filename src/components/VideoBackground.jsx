import { useRef, useEffect } from 'react';

/**
 * VideoBackground
 * Renders a single looping full-screen background video for a given page slug.
 * Uses a key on <video> so React remounts only when the src actually changes.
 */
export default function VideoBackground({ slug }) {
  const videoRef = useRef(null);

  // When slug changes, reload and play
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {
      // Autoplay may be blocked in some environments — ignore silently
    });
  }, [slug]);

  return (
    <div className="video-background" aria-hidden="true">
      <video
        ref={videoRef}
        key={slug}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={`/src/assets/videos/looped/${slug}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

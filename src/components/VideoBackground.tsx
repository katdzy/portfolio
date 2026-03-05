import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  slug: string;
}

const LOOPED_VIDEOS: Record<string, string> = {
  home:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/home_kabsui.webm",
  about:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/about_znuuri.webm",
  projects:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/projects_sb0vw4.webm",
  resume:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682228/resume_uir01z.webm",
  contacts:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/contacts_sdnji7.webm",
};

export default function VideoBackground({ slug }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Delay playback slightly for better first paint
    const id = setTimeout(() => {
      video.play().catch(() => { });
    }, 200);

    return () => clearTimeout(id);
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
        preload="none"
      >
        <source src={LOOPED_VIDEOS[slug]} />
      </video>
    </div>
  );
}
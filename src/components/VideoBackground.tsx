import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  slug: string;
}

const LOOPED_VIDEOS: Record<string, string> = {
  home:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/q_auto:low,f_auto,vc_auto,w_1280,br_1200k/home_vo7ze3.mp4",
  about:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/q_auto:low,f_auto,vc_auto,w_1280,br_1200k/about_wsdwep.mp4",
  projects:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/q_auto:low,f_auto,vc_auto,w_1280,br_1200k/projects_clwcqi.mp4",
  resume:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/q_auto:low,f_auto,vc_auto,w_1280,br_1200k/resume_h026oh.mp4",
  contacts:
    "https://res.cloudinary.com/dlrz42ibj/video/upload/q_auto:low,f_auto,vc_auto,w_1280,br_1200k/contacts_gmswla.mp4",
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
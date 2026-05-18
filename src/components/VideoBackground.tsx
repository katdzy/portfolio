import { useRef, useEffect } from "react";

export const BG_SLUGS = ["home", "about", "projects", "resume", "contacts"] as const;
export type BgSlug = (typeof BG_SLUGS)[number];

const BG_VIDEOS: Record<BgSlug, string> = {
  home:     "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/home_kabsui.webm",
  about:    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/about_znuuri.webm",
  projects: "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/projects_sb0vw4.webm",
  resume:   "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682228/resume_uir01z.webm",
  contacts: "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772682227/contacts_sdnji7.webm",
};

interface VideoBackgroundProps {
  slug: string;
}

export default function VideoBackground({ slug }: VideoBackgroundProps) {
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Whenever slug changes, play the new video and pause all others.
  // On first mount this also starts the initial page video.
  useEffect(() => {
    BG_SLUGS.forEach((key) => {
      const video = videoRefs.current.get(key);
      if (!video) return;

      if (key === slug) {
        if (video.paused) video.play().catch(() => {});
      } else {
        if (!video.paused) video.pause();
      }
    });
  }, [slug]);

  return (
    <div className="video-background" aria-hidden="true">
      {BG_SLUGS.map((key) => (
        <video
          key={key}
          ref={(el) => {
            if (el) videoRefs.current.set(key, el);
            else videoRefs.current.delete(key);
          }}
          muted
          loop
          playsInline
          // preload=auto: browser fetches the whole file immediately on mount.
          // All 5 bg videos are mounted once and never remounted — no re-fetching.
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            // CSS transition-less swap — the transition overlay covers this moment
            opacity: key === slug ? 1 : 0,
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
        >
          <source src={BG_VIDEOS[key]} type="video/webm" />
        </video>
      ))}
    </div>
  );
}
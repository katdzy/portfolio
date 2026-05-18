import {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

/**
 * Sequential page order — ONLY forward moves between adjacent entries
 * use a transition video. All other moves use a fade.
 */
const PAGE_ORDER = ["/", "/about", "/projects", "/resume", "/contacts"] as const;

/**
 * Map of sequential transition video sources.
 * Key format: "fromIndex-toIndex"
 * Only forward sequential pairs have transition videos.
 */
const TRANSITION_VIDEOS: Record<string, string> = {
  "0-1": "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683376/home-about_eirjg4.webm",
  "1-2": "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683378/about-projects_oumqc2.webm",
  "2-3": "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683378/projects-resume_yxjyyg.webm",
  "3-4": "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683379/resume-contacts_qrw8gi.webm",
};

const TRANSITION_KEYS = Object.keys(TRANSITION_VIDEOS);

const FADE_DURATION = 0.25; // seconds

export interface PageTransitionHandle {
  navigate: (to: string, from: string) => void;
}

const PageTransition = forwardRef<PageTransitionHandle, {}>(function PageTransition(
  _,
  ref
) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  // Map of pairKey → <video> element, all pre-buffered
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const isTransitioning = useRef<boolean>(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    navigate: (to: string, from: string) => {
      if (isTransitioning.current) return;
      if (to === from) return;

      const fromIdx = PAGE_ORDER.indexOf(from as any);
      const toIdx   = PAGE_ORDER.indexOf(to as any);
      const pairKey = `${fromIdx}-${toIdx}`;
      const hasVideo = TRANSITION_KEYS.includes(pairKey);

      if (hasVideo) {
        runVideoTransition(to, pairKey);
      } else {
        runFadeTransition(to);
      }
    },
  }));

  /**
   * Shared finish: navigate → fade overlay out → unlock.
   */
  const finish = useCallback(
    (overlay: HTMLDivElement, to: string) => {
      navigate(to);
      gsap.to(overlay, {
        opacity: 0,
        duration: FADE_DURATION,
        ease: "power1.out",
        onComplete: () => {
          isTransitioning.current = false;
        },
      });
    },
    [navigate]
  );

  const runVideoTransition = useCallback(
    (to: string, pairKey: string) => {
      const overlay = overlayRef.current;
      const video   = videoRefs.current.get(pairKey);
      if (!overlay) return;

      isTransitioning.current = true;

      // Hide all transition videos; reveal only the active one imperatively
      videoRefs.current.forEach((v) => {
        v.style.opacity = "0";
      });

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.15,
        ease: "none",
        onComplete: () => {
          if (!video) {
            // No video found — shouldn't happen, but fall back gracefully
            finish(overlay, to);
            return;
          }

          // Show the active transition video
          video.style.opacity = "1";
          // Seek to start so repeated nav plays from the top
          video.currentTime = 0;

          const cleanup = () => {
            video.removeEventListener("ended", onEnded);
            video.removeEventListener("error", onError);
          };

          const onEnded = () => { cleanup(); finish(overlay, to); };
          const onError = () => { cleanup(); finish(overlay, to); };

          video.addEventListener("ended", onEnded);
          video.addEventListener("error", onError);

          // Video is already buffered → play() fires in < 1 frame
          video.play().catch(() => {
            cleanup();
            finish(overlay, to);
          });
        },
      });
    },
    [finish]
  );

  const runFadeTransition = useCallback(
    (to: string) => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      isTransitioning.current = true;

      gsap.to(overlay, {
        opacity: 1,
        duration: FADE_DURATION,
        ease: "power1.in",
        onComplete: () => {
          finish(overlay, to);
        },
      });
    },
    [finish]
  );

  return (
    <div
      className="transition-overlay"
      ref={overlayRef}
      aria-hidden="true"
    >
      {TRANSITION_KEYS.map((pairKey) => (
        <video
          key={pairKey}
          ref={(el) => {
            if (el) videoRefs.current.set(pairKey, el);
            else videoRefs.current.delete(pairKey);
          }}
          muted
          playsInline
          // preload=auto: all transition clips are fetched immediately on app
          // mount and sit buffered in memory. play() at transition time has
          // zero network latency — the video starts in < 1 frame.
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: 0,
          }}
        >
          <source src={TRANSITION_VIDEOS[pairKey]} type="video/webm" />
        </video>
      ))}
    </div>
  );
});

export default PageTransition;
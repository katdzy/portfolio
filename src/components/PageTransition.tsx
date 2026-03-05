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
  "0-1":
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683376/home-about_eirjg4.webm",
  "1-2":
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683378/about-projects_oumqc2.webm",
  "2-3":
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683378/projects-resume_yxjyyg.webm",
  "3-4":
    "https://res.cloudinary.com/dlrz42ibj/video/upload/v1772683379/resume-contacts_qrw8gi.webm",
};

const FADE_DURATION = 0.25; // seconds

// 👇 What the parent component can call via ref
export interface PageTransitionHandle {
  navigate: (to: string, from: string) => void;
}

const PageTransition = forwardRef<PageTransitionHandle, {}>(function PageTransition(
  _,
  ref
) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isTransitioning = useRef<boolean>(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    navigate: (to: string, from: string) => {
      if (isTransitioning.current) return;
      if (to === from) return;

      const fromIdx = PAGE_ORDER.indexOf(from as any);
      const toIdx = PAGE_ORDER.indexOf(to as any);
      const pairKey = `${fromIdx}-${toIdx}`;
      const transitionSrc = TRANSITION_VIDEOS[pairKey] ?? null;

      if (transitionSrc) {
        runVideoTransition(to, transitionSrc);
      } else {
        runFadeTransition(to);
      }
    },
  }));

  /**
   * Shared finish: navigate → fade overlay out → unlock.
   * Called from both video-ended and error paths.
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
    (to: string, src: string) => {
      const overlay = overlayRef.current;
      const video = videoRef.current;
      if (!overlay || !video) return;

      isTransitioning.current = true;

      video.pause();
      video.src = src;
      video.load();

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.15,
        ease: "none",
        onComplete: () => {
          const cleanup = () => {
            video.removeEventListener("ended", onEnded);
            video.removeEventListener("error", onError);
          };

          const onEnded = () => {
            cleanup();
            finish(overlay, to);
          };

          const onError = () => {
            cleanup();
            finish(overlay, to);
          };

          video.addEventListener("ended", onEnded);
          video.addEventListener("error", onError);

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

      const video = videoRef.current;
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }

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
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
      />
    </div>
  );
});

export default PageTransition;
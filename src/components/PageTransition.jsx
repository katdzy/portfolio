import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Sequential page order — ONLY forward moves between adjacent entries
 * use a transition video. All other moves use a fade.
 */
const PAGE_ORDER = ['/', '/about', '/projects', '/resume', '/contacts'];

/**
 * Map of sequential transition video sources.
 * Key format: "fromIndex-toIndex"
 * Only forward sequential pairs have transition videos.
 */
const TRANSITION_VIDEOS = {
  '0-1': '/src/assets/videos/transition/home-about.mp4',
  '1-2': '/src/assets/videos/transition/about-projects.mp4',
  '2-3': '/src/assets/videos/transition/projects-resume.mp4',
  '3-4': '/src/assets/videos/transition/resume-contacts.mp4',
};

const FADE_DURATION = 0.25; // seconds

const PageTransition = forwardRef(function PageTransition(_, ref) {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const isTransitioning = useRef(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    navigate: (to, from) => {
      if (isTransitioning.current) return;
      if (to === from) return;

      const fromIdx = PAGE_ORDER.indexOf(from);
      const toIdx = PAGE_ORDER.indexOf(to);
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
  const finish = useCallback((overlay, to) => {
    navigate(to);
    gsap.to(overlay, {
      opacity: 0,
      duration: FADE_DURATION,
      ease: 'power1.out',
      onComplete: () => {
        // Only release lock AFTER overlay is fully gone
        isTransitioning.current = false;
      },
    });
  }, [navigate]);

  const runVideoTransition = useCallback((to, src) => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    if (!overlay || !video) return;

    isTransitioning.current = true;

    // Stop any previous playback and set new src
    video.pause();
    video.src = src;
    video.load();

    // Step 1: fade overlay to black
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.15,
      ease: 'none',
      onComplete: () => {
        // Step 2: play video — set up ended/error listeners BEFORE play()
        const cleanup = () => {
          video.removeEventListener('ended', onEnded);
          video.removeEventListener('error', onError);
        };

        const onEnded = () => {
          cleanup();
          finish(overlay, to);
        };

        const onError = () => {
          // Video failed to load/play — fall back immediately
          cleanup();
          finish(overlay, to);
        };

        video.addEventListener('ended', onEnded);
        video.addEventListener('error', onError);

        // If play() itself rejects (autoplay policy), treat as error
        video.play().catch(() => {
          cleanup();
          finish(overlay, to);
        });
      },
    });
  }, [navigate, finish]);

  const runFadeTransition = useCallback((to) => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    isTransitioning.current = true;

    // Clear any lingering video
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    gsap.to(overlay, {
      opacity: 1,
      duration: FADE_DURATION,
      ease: 'power1.in',
      onComplete: () => {
        finish(overlay, to);
      },
    });
  }, [navigate, finish]);

  return (
    <div
      className="transition-overlay"
      ref={overlayRef}
      aria-hidden="true"
    >
      {/* Single reused video element — src is set dynamically per transition */}
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

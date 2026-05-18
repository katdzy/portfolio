import { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageTransition from './components/PageTransition.tsx';
import VideoBackground from './components/VideoBackground.tsx';
import BottomNav from './components/BottomNav.tsx';

import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import Resume from './pages/Resume.tsx';
import Contacts from './pages/Contacts.tsx';

const ROUTE_SLUG: Record<string, string> = {
  '/':         'home',
  '/about':    'about',
  '/projects': 'projects',
  '/resume':   'resume',
  '/contacts': 'contacts',
};

export default function App() {
  const location = useLocation();
  const transitionRef = useRef(null);

  // Derive current bg slug from the URL — falls back to 'home' for unknown routes
  const bgSlug = ROUTE_SLUG[location.pathname] ?? 'home';

  const handleNavigate = (to: string) => {
    if (transitionRef.current) {
      (transitionRef.current as any).navigate(to, location.pathname);
    }
  };

  return (
    <>
      {/*
        VideoBackground is lifted here (outside Routes) so it NEVER unmounts.
        All 5 bg videos are pre-buffered on app start. slug prop controls which
        one is visible+playing; the rest stay paused but buffered in memory.
        The transition overlay covers any bg swap, so there is no visible flash.
      */}
      <VideoBackground slug={bgSlug} />

      <Routes>
        <Route path="/"         element={<Home     onNavigate={handleNavigate} />} />
        <Route path="/about"    element={<About    onNavigate={handleNavigate} />} />
        <Route path="/projects" element={<Projects onNavigate={handleNavigate} />} />
        <Route path="/resume"   element={<Resume   onNavigate={handleNavigate} />} />
        <Route path="/contacts" element={<Contacts onNavigate={handleNavigate} />} />
      </Routes>

      {/* Mobile/tablet icon bottom nav — hidden on desktop via CSS */}
      <BottomNav onNavigate={handleNavigate} />

      {/*
        Global transition overlay — always mounted.
        All 4 transition videos are pre-buffered here too.
      */}
      <PageTransition ref={transitionRef} />
    </>
  );
}

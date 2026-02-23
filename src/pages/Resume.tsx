import VideoBackground from '../components/VideoBackground.tsx';

import type { MouseEvent } from 'react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export default function Resume({ onNavigate }: PageProps) {
  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="about-page">
      <VideoBackground slug="resume" />

      {/* Bottom bar */}
      <div className="about-bottom">
        {/* Col 1 — identity */}
        <div className="about-identity">
          <span className="about-role clickable" onClick={(e) => handleLinkClick(e, '/')}>Karl Andrei Dungca</span>
          <h1 className="about-title">resume</h1>
        </div>

        {/* Col 2 — nav links */}
        <nav className="about-subnav" aria-label="Secondary navigation">
          <a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>about</a>
          <a href="/projects" onClick={(e) => handleLinkClick(e, '/projects')}>projects</a>
          <a href="/resume" onClick={(e) => handleLinkClick(e, '/resume')}>resume</a>
          <a href="/contacts" onClick={(e) => handleLinkClick(e, '/contacts')}>contact</a>
        </nav>

        {/* Placeholder columns to maintain layout grid */}
        <div className="about-skills__col" style={{ opacity: 0, pointerEvents: 'none' }}>
          <h2>&nbsp;</h2>
          <p>&nbsp;</p>
        </div>

        <div className="about-skills__col" style={{ opacity: 0, pointerEvents: 'none' }}>
          <h2>&nbsp;</h2>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

import VideoBackground from '../components/VideoBackground.tsx';

import type { MouseEvent } from 'react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export default function Contacts({ onNavigate }: PageProps) {
  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="about-page">
      <VideoBackground slug="contacts" />

      {/* SVG Filter for Liquid Glass */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="glass-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Center glassmorphism card */}
      <div className="contact-container">
        <h2 className="contact-title">Let’s Get In Touch</h2>

        <div className="contact-card">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form-row">
              <div className="contact-input-wrapper">
                <input type="text" placeholder="Name" required />
              </div>
              <div className="contact-input-wrapper">
                <input type="email" placeholder="Email" required />
              </div>
            </div>

            <div className="contact-input-wrapper">
              <input type="text" placeholder="Project Inquiry" />
            </div>

            <div className="contact-input-wrapper" style={{ height: '140px', borderRadius: '24px' }}>
              <textarea placeholder="Message" required />
            </div>
          </form>

          <div className="contact-extra-info">
            <p>hello@karlandrei.com &nbsp;|&nbsp; +1 (555) 123-4567</p>
            <div className="contact-extra-links">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">X (Twitter)</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="about-bottom">
        {/* Col 1 — identity */}
        <div className="about-identity">
          <span className="about-role clickable" onClick={(e) => handleLinkClick(e, '/')}>Karl Andrei Dungca</span>
          <h1 className="about-title">contact</h1>
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

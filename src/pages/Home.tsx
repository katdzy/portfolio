import VideoBackground from '../components/VideoBackground.tsx';
import profilePhoto from '../assets/home/karl-hero.png';
import featuredThumb from '../assets/home/inputhavenfeat.png';
import githubIcon from '../assets/home/github-viewproject.png';

import type { MouseEvent } from 'react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export default function Home({ onNavigate }: PageProps) {
  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="home-page">
      <VideoBackground slug="home" />

      {/* ── Desktop layout (hidden on mobile via CSS) ── */}
      <div className="home-desktop-layout">
        {/* Profile photo — bottom-left */}
        <div className="home-avatar">
          <img src={profilePhoto} alt="Karl Andrei Dungca" />
        </div>

        {/* Right column: featured card + tagline */}
        <div className="home-right-col">
          <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
            <filter id="home-glass-distortion">
              <feDisplacementMap in="SourceGraphic" scale="200" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          <div className="home-featured">
            <p className="home-featured__label">Featured Project</p>
            <div className="home-featured__body">
              <img className="home-featured__thumb" src={featuredThumb} alt="input haven project thumbnail" />
              <div className="home-featured__info">
                <p className="home-featured__title">input haven_</p>
                <p className="home-featured__desc">
                  A PHP/MySQL based computer peripheral e-commerce website showcasing features like......
                </p>
                <div className="home-featured__actions">
                  <a className="home-featured__btn" href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" className="home-featured__gh-icon" />
                    view project
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="home-tagline">
            An innovation-driven full-stack developer creating beautiful, responsive,
            and future-focused web applications.
          </p>
        </div>

        {/* Bottom identity block — nav + big name */}
        <div className="home-identity">
          <nav className="home-nav-row" aria-label="Home page navigation">
            <span className="home-role">Fullstack Developer</span>
            <a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>about</a>
            <a href="/projects" onClick={(e) => handleLinkClick(e, '/projects')}>projects</a>
            <a href="/resume" onClick={(e) => handleLinkClick(e, '/resume')}>resume</a>
            <a href="/contacts" onClick={(e) => handleLinkClick(e, '/contacts')}>contact</a>
          </nav>
          <h1 className="home-name">KARL ANDREI DUNGCA</h1>
        </div>

        <p className="home-footer-text">Made with React, GSAP and love</p>
      </div>

      {/* ── Mobile layout (shown only on mobile/tablet via CSS) ── */}
      <div className="home-mobile-layout">
        <div className="home-mobile-avatar">
          <img src={profilePhoto} alt="Karl Andrei Dungca" />
        </div>
        <h1 className="home-mobile-name">KARL ANDREI<br />DUNGCA</h1>
        <p className="home-mobile-role">Fullstack Developer</p>
        <p className="home-mobile-tagline">
          An innovation-driven full-stack developer creating beautiful,
          responsive, and future-focused web applications.
        </p>
      </div>
    </div>
  );
}

import VideoBackground from '../components/VideoBackground.tsx';
import educationIcon from '../assets/resume/education.png';
import orgsIcon from '../assets/resume/orgs.png';
import downloadIcon from '../assets/resume/download.png';
import karlPhoto from '../assets/resume/karl-cg.png';

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
    <div className="resume-page">
      <VideoBackground slug="resume" />

      {/* Hidden SVG displacement filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="resume-glass-distortion">
          <feDisplacementMap
            in="SourceGraphic"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Centre layout: header + 3 cards */}
      <div className="resume-layout">

        {/* "My Foundations" header pill */}
        <div className="resume-header-bar">
          <span className="resume-header-title">My Foundations</span>
        </div>

        {/* Cards row */}
        <div className="resume-cards-row">

          {/* Education card */}
          <div className="resume-card">
            <div className="resume-card__heading">
              <img src={educationIcon} alt="Education" className="resume-card__icon" />
              <span className="resume-card__label">Education</span>
            </div>
            <div className="resume-card__divider" />
            <div className="resume-card__entries">
              <div className="resume-entry">
                <span className="resume-entry__year">2021 – 2023</span>
                <span className="resume-entry__title">Senior High School</span>
                <span className="resume-entry__sub">Angeles City Science High School</span>
              </div>
              <div className="resume-card__divider" />
              <div className="resume-entry">
                <span className="resume-entry__year">2023 – 2026</span>
                <span className="resume-entry__title">Bachelor of Science in Information Technology (Current)</span>
                <span className="resume-entry__sub">Holy Angel University</span>
              </div>
            </div>
          </div>

          {/* Organizations card */}
          <div className="resume-card">
            <div className="resume-card__heading">
              <img src={orgsIcon} alt="Organizations" className="resume-card__icon" />
              <span className="resume-card__label">Organizations</span>
            </div>
            <div className="resume-card__divider" />
            <div className="resume-card__entries">
              <div className="resume-entry">
                <span className="resume-entry__year">2024 – 2026</span>
                <span className="resume-entry__title">Multimedia Aficionados For Interested Artists – HAU</span>
                <span className="resume-entry__sub">Member</span>
              </div>
              <div className="resume-card__divider" />
              <div className="resume-entry">
                <span className="resume-entry__year">2025 – 2026</span>
                <span className="resume-entry__title">Code Geeks – HAU</span>
                <span className="resume-entry__sub">Academics and Research – Head Officer</span>
              </div>
            </div>
          </div>

          {/* Photo card */}
          <div className="resume-card resume-card--photo">
            <img src={karlPhoto} alt="Karl Andrei Dungca" className="resume-card__photo" />
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="about-bottom">
        <div className="about-identity">
          <span className="about-role clickable" onClick={(e) => handleLinkClick(e, '/')}>
            Karl Andrei Dungca
          </span>
          <h1 className="about-title">resume</h1>
        </div>

        <nav className="about-subnav" aria-label="Secondary navigation">
          <a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>about</a>
          <a href="/projects" onClick={(e) => handleLinkClick(e, '/projects')}>projects</a>
          <a href="/resume" onClick={(e) => handleLinkClick(e, '/resume')}>resume</a>
          <a href="/contacts" onClick={(e) => handleLinkClick(e, '/contacts')}>contact</a>
        </nav>

        {/* Download Resume button — bottom-right */}
        <a
          href="/karl-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-download-btn"
        >
          <img src={downloadIcon} alt="" className="resume-download-btn__icon" />
          Download Resume
        </a>
      </div>
    </div>
  );
}

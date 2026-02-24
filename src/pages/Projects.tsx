import VideoBackground from '../components/VideoBackground.tsx';
import folderIcon from '../assets/projects/Folder.png';
import inputHavenThumb from '../assets/projects/inputhaven.png';
import sfwThumb from '../assets/projects/stud-free-wall.png';
import acttcThumb from '../assets/projects/acttc.png';

import type { MouseEvent } from 'react';

interface PageProps {
  onNavigate: (path: string) => void;
}

const projects = [
  {
    id: 1,
    title: 'input haven_',
    thumb: inputHavenThumb,
    techStack: ['PHP', 'MySQL'],
    link: 'https://github.com',
  },
  {
    id: 2,
    title: 'Student Freedom Wall',
    thumb: sfwThumb,
    techStack: ['MongoDB', 'Vue', 'Express'],
    link: 'https://github.com',
  },
  {
    id: 3,
    title: 'Angeles City Table Tennis Club',
    thumb: acttcThumb,
    techStack: ['WordPress'],
    link: 'https://github.com',
  },
];

export default function Projects({ onNavigate }: PageProps) {
  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="projects-page">
      <VideoBackground slug="projects" />

      {/* Hidden SVG displacement filter — same as About page */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="projects-glass-distortion">
          <feDisplacementMap
            in="SourceGraphic"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Centre column: folder header + cards */}
      <div className="projects-layout">

        {/* Folder header bar */}
        <div className="projects-folder-bar">
          <img src={folderIcon} alt="Folder" className="projects-folder-icon" />
          <span className="projects-folder-title">Karl's Folder</span>
        </div>

        {/* Project cards */}
        <div className="projects-cards-row">
          {projects.map((project) => (
            <div key={project.id} className="proj-card">
              {/* Thumbnail */}
              <div className="proj-card__thumb">
                <img src={project.thumb} alt={project.title} />
              </div>

              {/* Info section */}
              <div className="proj-card__info">
                <p className="proj-card__title">{project.title}</p>

                <div className="proj-card__tags">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="proj-card__tag">{tech}</span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="proj-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  view project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar — reuses about-page patterns */}
      <div className="about-bottom">
        <div className="about-identity">
          <span
            className="about-role clickable"
            onClick={(e) => handleLinkClick(e, '/')}
          >
            Karl Andrei Dungca
          </span>
          <h1 className="about-title">projects</h1>
        </div>

        <nav className="about-subnav" aria-label="Secondary navigation">
          <a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>about</a>
          <a href="/projects" onClick={(e) => handleLinkClick(e, '/projects')}>projects</a>
          <a href="/resume" onClick={(e) => handleLinkClick(e, '/resume')}>resume</a>
          <a href="/contacts" onClick={(e) => handleLinkClick(e, '/contacts')}>contact</a>
        </nav>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import VideoBackground from '../components/VideoBackground.tsx';
import folderIcon from '../assets/projects/Folder.png';
import inputHavenThumb from '../assets/projects/inputhaven.png';
import sfwThumb from '../assets/projects/stud-free-wall.png';
import acttcThumb from '../assets/projects/acttc.png';
import swtchThumb from '../assets/projects/swtch_thumb.png';
import boardwalkThumb from '../assets/projects/theboardwalk.png';

import type { MouseEvent } from 'react';

interface Project {
  id: number;
  title: string;
  thumb: string;
  techStack: string[];
  description: string;
  demo: string | null;
  source: string | null;
}

interface PageProps {
  onNavigate: (path: string) => void;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'input haven_',
    thumb: inputHavenThumb,
    techStack: ['PHP', 'MySQL'],
    description:
      'A PHP/MySQL based computer peripheral e-commerce website showcasing features like add-to-cart, product catalogues, and order management.',
    demo: 'http://inputhaven.onlinewebshop.net/',
    source: 'https://github.com/katdzy/inputhaven_',
  },
  {
    id: 2,
    title: 'Student Freedom Wall',
    thumb: sfwThumb,
    techStack: ['MongoDB', 'Vue', 'Express'],
    description:
      'An online social website where students can post their messages and images anonymously, with features like content moderation and post interactions.',
    demo: 'https://studentfreedomwall.vercel.app/',
    source: 'https://github.com/katdzy/6WCSERVER-WD-302-StudentFreedomWall',
  },
  {
    id: 3,
    title: 'Angeles City Table Tennis Club',
    thumb: acttcThumb,
    techStack: ['WordPress'],
    description:
      'A content-driven website for a local table tennis club, highlighting promotional pages, blogs, and articles, with built-in email forms and interactive comment sections.',
    demo: 'https://actabletennisclub.pro/',
    source: null,
  },
  {
    id: 4,
    title: 'SWTCH',
    thumb: swtchThumb,
    techStack: ['HTML', 'CSS', 'JavaScript'],
    description:
      'My first website project, SWTCH is an e-commerce platform showcasing computer peripherals such as mice, keyboards, and desk essentials. It features a vibrant and playful design, with products categorized based on user needs—whether for office work, gaming, or ergonomic comfort—making it easier for users to find suitable items.',
    demo: 'https://katdzy.github.io/SWTCH_KeysShop/',
    source: null,
  },
  {
    id: 5,
    title: 'The Boardwalk',
    thumb: boardwalkThumb,
    techStack: ['WordPress'],
    description:
      'The Boardwalk is a blog focused on keyboard building, where we share guides, tips, and discussions on how to create a high-quality custom keyboard. It serves as a resource for both beginners and enthusiasts interested in the mechanical keyboard hobby.',
    demo: 'https://theboardwalk85.wordpress.com/',
    source: null,
  },
];

export default function Projects({ onNavigate }: PageProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      if (scroller.scrollTop > 20 && scrollHintRef.current) {
        gsap.to(scrollHintRef.current, { opacity: 0, duration: 0.3 });
      } else if (scroller.scrollTop <= 20 && scrollHintRef.current) {
        gsap.to(scrollHintRef.current, { opacity: 1, duration: 0.3 });
      }
    };
    scroller.addEventListener('scroll', handleScroll);
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const openModal = (project: Project) => {
    setActiveProject(project);
  };

  const closeModal = () => {
    const overlay = document.querySelector('.proj-modal-overlay');
    const panel = document.querySelector('.proj-modal');
    if (overlay && panel) {
      gsap.to(panel, { scale: 0.96, opacity: 0, duration: 0.22, ease: 'power2.in' });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setActiveProject(null),
      });
    } else {
      setActiveProject(null);
    }
  };

  // Animate modal in whenever activeProject changes to non-null
  useEffect(() => {
    if (!activeProject) return;
    const overlay = document.querySelector('.proj-modal-overlay');
    const panel = document.querySelector('.proj-modal');
    if (!overlay || !panel) return;

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(
      panel,
      { scale: 0.94, opacity: 0, y: 18 },
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
    );
  }, [activeProject]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProject) closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeProject]);

  return (
    <div className="projects-page">
      <VideoBackground slug="projects" />

      {/* Hidden SVG displacement filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="projects-glass-distortion">
          <feDisplacementMap in="SourceGraphic" scale="200" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Centre column: folder header + cards */}
      <div className="projects-layout">
        {/* Folder header bar */}
        <div className="projects-folder-bar">
          <img src={folderIcon} alt="Folder" className="projects-folder-icon" />
          <span className="projects-folder-title">Karl's Folder</span>
        </div>

        {/* Project cards scroll area */}
        <div className="projects-cards-area" ref={scrollRef}>
          {/* Scroll Hint */}
          <div className="scroll-hint proj-scroll-hint" ref={scrollHintRef}>
            <span>Scroll for more</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" />
            </svg>
          </div>

          <div className="projects-cards-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="proj-card"
                onClick={() => openModal(project)}
                style={{ cursor: 'pointer' }}
              >
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

                <span className="proj-card__link">view project</span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="about-bottom">
        <div className="about-identity">
          <span className="about-role clickable" onClick={(e) => handleLinkClick(e, '/')}>
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

      {/* Project Modal */}
      {activeProject && (
        <div className="proj-modal-overlay" onClick={closeModal}>
          <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="proj-modal__close" onClick={closeModal} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Thumbnail */}
            <div className="proj-modal__thumb">
              <img src={activeProject.thumb} alt={activeProject.title} />
            </div>

            {/* Content */}
            <div className="proj-modal__body">
              <h2 className="proj-modal__title">{activeProject.title}</h2>

              {/* Tech tags */}
              <div className="proj-modal__tags">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="proj-card__tag">{tech}</span>
                ))}
              </div>

              {/* Description */}
              <p className="proj-modal__desc">{activeProject.description}</p>

              {/* Links */}
              <div className="proj-modal__links">
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    className="proj-modal__btn proj-modal__btn--demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {activeProject.source && (
                  <a
                    href={activeProject.source}
                    className="proj-modal__btn proj-modal__btn--source"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.912.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

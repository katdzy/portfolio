import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoBackground from '../components/VideoBackground.tsx';

gsap.registerPlugin(ScrollTrigger);

import type { MouseEvent } from 'react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export default function Projects({ onNavigate }: PageProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const ctx = gsap.context(() => {
      // Intro animation
      if (introRef.current) {
        gsap.from(introRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Project Cards stagger animation on scroll
      const cards = gsap.utils.toArray('.project-card');
      if (cards.length > 0) {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            scroller: scroller,
            start: 'top 85%',
          },
        });
      }
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      description:
        'A comprehensive analytics dashboard for online retailers. Focuses on transforming complex sales data into actionable, easy-to-read metrics with minimal latency.',
      techStack: ['React', 'TypeScript', 'Tailwind', 'Recharts'],
      features: [
        'Real-time data visualization',
        'Optimized data fetching with React Query',
        'Accessible, high-contrast UI components',
      ],
      liveLink: '#',
      githubLink: '#',
    },
    {
      id: 2,
      title: 'Healthcare Booking Platform',
      description:
        'A secure, streamlined scheduling application connecting patients with healthcare providers, prioritizing a frictionless user experience and data privacy.',
      techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
      features: [
        'Role-based access control (RBAC)',
        'Complex timezone-aware calendar integration',
        'End-to-end type safety',
      ],
      liveLink: '#',
      githubLink: '#',
    },
    {
      id: 3,
      title: 'Interactive WebGL Experience',
      description:
        'An immersive marketing site for a boutique agency. Leverages advanced 3D rendering directly in the browser to create a memorable brand interaction.',
      techStack: ['Three.js', 'React Three Fiber', 'GSAP'],
      features: [
        'Custom shader implementation',
        'Scroll-tied cinematic camera animations',
        'Performance optimized for mobile devices',
      ],
      liveLink: '#',
      githubLink: '#',
    },
  ];

  return (
    <div className="about-page">
      <VideoBackground slug="projects" />

      {/* Content Container */}
      <div className="projects-container" ref={scrollContainerRef}>
        {/* Intro */}
        <div className="projects-intro" ref={introRef}>
          <h2>Building digital experiences<br />with purpose.</h2>
          <p>
            A selection of my recent work focusing on scalable architecture,
            fluid motion design, and user-centric interfaces.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="projects-list" ref={projectsRef}>
          {featuredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-tech">
                {project.techStack.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>

              <ul className="project-features">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <div className="project-links">
                <a href={project.liveLink} className="project-link" target="_blank" rel="noreferrer">
                  Live Site
                </a>
                <a href={project.githubLink} className="project-link" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="about-bottom">
        {/* Col 1 — identity */}
        <div className="about-identity">
          <span className="about-role clickable" style={{ color: '#fff' }} onClick={(e) => handleLinkClick(e, '/')}>Karl Andrei Dungca</span>
          <h1 className="about-title" style={{ color: '#fff' }}>projects</h1>
        </div>

        {/* Col 2 — nav links */}
        <nav className="about-subnav" aria-label="Secondary navigation">
          <a href="/about" style={{ color: '#fff' }} onClick={(e) => handleLinkClick(e, '/about')}>about</a>
          <a href="/projects" style={{ color: '#fff' }} onClick={(e) => handleLinkClick(e, '/projects')}>projects</a>
          <a href="/resume" style={{ color: '#fff' }} onClick={(e) => handleLinkClick(e, '/resume')}>resume</a>
          <a href="/contacts" style={{ color: '#fff' }} onClick={(e) => handleLinkClick(e, '/contacts')}>contact</a>
        </nav>
      </div>
    </div>
  );
}

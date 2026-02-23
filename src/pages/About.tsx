import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoBackground from '../components/VideoBackground.tsx';
import profilePhoto from '../assets/images/about-karl.jpg';

// Skill Logos
import htmlLogo from '../assets/logos/html.png';
import cssLogo from '../assets/logos/css.png';
import jsLogo from '../assets/logos/js.jpg';
import reactLogo from '../assets/logos/react.webp';
import nodeLogo from '../assets/logos/Nodejs.webp';
import mysqlLogo from '../assets/logos/mysql.png';
import gitLogo from '../assets/logos/git_github.png';
import figmaLogo from '../assets/logos/figma.png';

gsap.registerPlugin(ScrollTrigger);

import type { MouseEvent } from 'react';

interface PageProps {
  onNavigate: (path: string) => void;
}

export default function About({ onNavigate }: PageProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    // Fade out scroll hint on scroll
    const handleScroll = () => {
      if (scroller.scrollTop > 20 && scrollHintRef.current) {
        gsap.to(scrollHintRef.current, { opacity: 0, duration: 0.3 });
      } else if (scroller.scrollTop <= 20 && scrollHintRef.current) {
        gsap.to(scrollHintRef.current, { opacity: 1, duration: 0.3 });
      }
    };
    scroller.addEventListener('scroll', handleScroll);

    // Context for GSAP animations
    const ctx = gsap.context(() => {
      // Skills animation
      const skillItems = gsap.utils.toArray('.skill-item');
      if (skillItems.length > 0) {
        gsap.to(skillItems, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            scroller: scroller,
            start: 'top 85%',
          },
        });
      }

      // Certifications animation
      const certCards = gsap.utils.toArray('.cert-card');
      if (certCards.length > 0) {
        gsap.to(certCards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: certsRef.current,
            scroller: scroller,
            start: 'top 85%',
          },
        });
      }
    }, scrollContainerRef);

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const skills = [
    { name: 'HTML', logo: htmlLogo },
    { name: 'CSS', logo: cssLogo },
    { name: 'JavaScript', logo: jsLogo },
    { name: 'React', logo: reactLogo },
    { name: 'Node.js', logo: nodeLogo },
    { name: 'MySQL', logo: mysqlLogo },
    { name: 'Git', logo: gitLogo },
    { name: 'Figma', logo: figmaLogo },
  ];

  const certifications = [
    { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2023' },
    { title: 'JavaScript Algorithms', issuer: 'freeCodeCamp', year: '2023' },
    { title: 'Front-End Development', issuer: 'Coursera', year: '2024' },
  ];

  return (
    <div className="about-page">
      <VideoBackground slug="about" />

      {/* Glassmorphism bio card */}
      <div className="about-card">
        <div className="about-card__photo">
          <img src={profilePhoto} alt="Karl Andrei Dungca" />
        </div>
        <div className="about-card__text" ref={scrollContainerRef}>
          {/* Intro Section */}
          <div className="about-section about-section--intro">
            <p>
              In my 1st year as a Web Development Student, I learned two coding
              languages namely Python and Java. Aside from that, I also have
              experience in creating websites using no-code platforms such as
              Wordpress and Google Sites.
            </p>
            <p>
              Currently a 3rd Year IT Web Development Student and I help
              re-envision your projects with the power of aesthetics and layouts.
              So far, I have learned HTML, CSS, Javascript, PHP, and MySQL and I
              have recently deployed a couple of websites.
            </p>
          </div>

          {/* Skills Section */}
          <div className="about-section" ref={skillsRef}>
            <h3>Skills</h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <img src={skill.logo} alt={`${skill.name} logo`} />
                  <span className="skill-label">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="about-section" ref={certsRef}>
            <h3>Certifications</h3>
            <div className="cert-list">
              {certifications.map((cert, i) => (
                <div key={i} className="cert-card">
                  <span className="cert-title">{cert.title}</span>
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-year">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="scroll-hint" ref={scrollHintRef}>
            <span>Scroll to see more</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="about-bottom">
        {/* Col 1 — identity */}
        <div className="about-identity">
          <span className="about-role clickable" onClick={(e) => handleLinkClick(e, '/')}>Karl Andrei Dungca</span>
          <h1 className="about-title">about</h1>
        </div>

        {/* Col 2 — nav links */}
        <nav className="about-subnav" aria-label="Secondary navigation">
          <a href="/about" onClick={(e) => handleLinkClick(e, '/about')}>about</a>
          <a href="/projects" onClick={(e) => handleLinkClick(e, '/projects')}>projects</a>
          <a href="/resume" onClick={(e) => handleLinkClick(e, '/resume')}>resume</a>
          <a href="/contacts" onClick={(e) => handleLinkClick(e, '/contacts')}>contact</a>
        </nav>

        {/* Col 3 — Technical Skills */}
        <div className="about-skills__col">
          <h2>Technical Skills</h2>
          <p>Frontend and Backend Development, Version Control, CRUD Operations, Data Handling &amp; Storage, Responsive Web Design</p>
        </div>

        {/* Col 4 — Soft Skills */}
        <div className="about-skills__col">
          <h2>Soft Skills</h2>
          <p>Problem-solving, Communication, Teamwork, Adaptability, Willingness to Learn</p>
        </div>
      </div>
    </div>
  );
}

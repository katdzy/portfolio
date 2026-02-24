import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoBackground from '../components/VideoBackground.tsx';
import profilePhoto from '../assets/images/about-karl.jpg';

// Skill Logos — Frontend
import htmlLogo from '../assets/logos/html.png';
import cssLogo from '../assets/logos/css.png';
import jsLogo from '../assets/logos/js.jpg';
import reactLogo from '../assets/logos/react.svg';
import angularLogo from '../assets/logos/angular.png';
import vueLogo from '../assets/logos/vue.png';
import flutterLogo from '../assets/logos/flutter.png';

// Skill Logos — Backend
import nodeLogo from '../assets/logos/Nodejs.png';
import expressLogo from '../assets/logos/express-js.png';
import phpLogo from '../assets/logos/php.svg';
import mysqlLogo from '../assets/logos/mysql.png';
import mongoLogo from '../assets/logos/mongodb.png';
import bunLogo from '../assets/logos/bun-js.png';

// Skill Logos — Tools & Dev
import gitLogo from '../assets/logos/github.png';
import figmaLogo from '../assets/logos/figma.png';
import vscodeLogo from '../assets/logos/vs_code.png';
import netlifyLogo from '../assets/logos/netlify.png';

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
  const softSkillsRef = useRef<HTMLDivElement>(null);

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

    const ctx = gsap.context(() => {
      // Skills animation
      const skillItems = gsap.utils.toArray('.skill-item');
      if (skillItems.length > 0) {
        gsap.to(skillItems, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
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

      // Soft skills pills animation
      const softPills = gsap.utils.toArray('.soft-pill');
      if (softPills.length > 0) {
        gsap.to(softPills, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: softSkillsRef.current,
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

  const skillCategories = [
    {
      label: 'Frontend',
      skills: [
        { name: 'HTML', logo: htmlLogo },
        { name: 'CSS', logo: cssLogo },
        { name: 'JavaScript', logo: jsLogo },
        { name: 'React', logo: reactLogo },
        { name: 'Angular', logo: angularLogo },
        { name: 'Vue', logo: vueLogo },
        { name: 'Flutter', logo: flutterLogo },
      ],
    },
    {
      label: 'Backend',
      skills: [
        { name: 'Node.js', logo: nodeLogo },
        { name: 'Express', logo: expressLogo },
        { name: 'PHP', logo: phpLogo },
        { name: 'MySQL', logo: mysqlLogo },
        { name: 'MongoDB', logo: mongoLogo },
        { name: 'Bun', logo: bunLogo },
      ],
    },
    {
      label: 'Tools & Dev',
      skills: [
        { name: 'Git / GitHub', logo: gitLogo },
        { name: 'Figma', logo: figmaLogo },
        { name: 'VS Code', logo: vscodeLogo },
        { name: 'Netlify', logo: netlifyLogo },
      ],
    },
  ];

  const softSkills = [
    'Problem-solving',
    'Communication',
    'Teamwork',
    'Adaptability',
    'Willingness to Learn',
  ];

  const technicalAreas = [
    'Frontend Development',
    'Backend Development',
    'Version Control',
    'CRUD Operations',
    'Data Handling & Storage',
    'Responsive Web Design',
  ];

  const certifications = [
    { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2024' },
    { title: 'Back-End Development And APIs', issuer: 'freeCodeCamp', year: '2025' },
    { title: 'JavaScript Essentials', issuer: 'Cisco', year: '2024' },
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
            <h3>About</h3>
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

          {/* Technical Skills Section */}
          <div className="about-section">
            <h3>Technical Skills</h3>
            <div className="tech-pills">
              {technicalAreas.map((area) => (
                <span key={area} className="tech-pill">{area}</span>
              ))}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="about-section" ref={skillsRef}>
            <h3>Technologies</h3>
            <div className="skill-categories">
              {skillCategories.map((cat) => (
                <div key={cat.label} className="skill-category">
                  <span className="skill-category__label">{cat.label}</span>
                  <div className="skills-grid">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <img src={skill.logo} alt={`${skill.name} logo`} />
                        <span className="skill-label">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="about-section" ref={softSkillsRef}>
            <h3>Soft Skills</h3>
            <div className="soft-pills">
              {softSkills.map((s) => (
                <span key={s} className="soft-pill">{s}</span>
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

      {/* Hidden SVG filter */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="displacementFilter">
            <feDisplacementMap
              in="SourceGraphic"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

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
      </div>
    </div>
  );
}

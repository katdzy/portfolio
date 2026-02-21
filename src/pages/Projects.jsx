import VideoBackground from '../components/VideoBackground';

export default function Projects({ onNavigate }) {
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="about-page">
      <VideoBackground slug="projects" />

      {/* Bottom bar */}
      <div className="about-bottom">
        {/* Col 1 — identity */}
        <div className="about-identity">
          <span className="about-role clickable" style={{ color: '#000' }} onClick={(e) => handleLinkClick(e, '/')}>Karl Andrei Dungca</span>
          <h1 className="about-title" style={{ color: '#000' }}>projects</h1>
        </div>

        {/* Col 2 — nav links */}
        <nav className="about-subnav" aria-label="Secondary navigation">
          <a href="/about" style={{ color: '#000' }} onClick={(e) => handleLinkClick(e, '/about')}>about</a>
          <a href="/projects" style={{ color: '#000' }} onClick={(e) => handleLinkClick(e, '/projects')}>projects</a>
          <a href="/resume" style={{ color: '#000' }} onClick={(e) => handleLinkClick(e, '/resume')}>resume</a>
          <a href="/contacts" style={{ color: '#000' }} onClick={(e) => handleLinkClick(e, '/contacts')}>contact</a>
        </nav>

        {/* Col 3 — placeholder skills or content could go here */}
        <div className="about-skills__col" style={{ opacity: 0, pointerEvents: 'none' }}>
            <h2>&nbsp;</h2>
            <p>&nbsp;</p>
        </div>

        {/* Col 4 — placeholder */}
        <div className="about-skills__col" style={{ opacity: 0, pointerEvents: 'none' }}>
            <h2>&nbsp;</h2>
            <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

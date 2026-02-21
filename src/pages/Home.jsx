import VideoBackground from '../components/VideoBackground';
import personIcon from '../assets/person-icon.svg';

export default function Home({ onNavigate }) {
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="home-page">
      <VideoBackground slug="home" />

      {/* Avatar */}
      <div className="home-avatar">
        <div className="home-avatar__icon">
          <img src={personIcon} alt="Profile avatar placeholder" />
        </div>
      </div>

      {/* Tagline — right side */}
      <p className="home-tagline">
        I create beautiful, functional, and user-friendly websites and applications.
        Specializing in modern web technologies and responsive design.
      </p>

      {/* Bottom identity block — combined nav and name matching Figma design */}
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
    </div>
  );
}

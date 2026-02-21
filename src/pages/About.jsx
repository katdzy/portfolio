import VideoBackground from '../components/VideoBackground';
import profilePhoto from '../assets/images/about-karl.jpg';

export default function About({ onNavigate }) {
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="about-page">
      <VideoBackground slug="about" />

      {/* Glassmorphism bio card */}
      <div className="about-card">
        <div className="about-card__photo">
          <img src={profilePhoto} alt="Karl Andrei Dungca" />
        </div>
        <div className="about-card__text">
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

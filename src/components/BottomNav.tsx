import type { MouseEvent } from "react";
import { NavLink } from "react-router-dom";

import homeIcon from "../assets/mobile/home-button.png";
import aboutIcon from "../assets/mobile/about-button.png";
import projectsIcon from "../assets/mobile/projects.png";
import resumeIcon from "../assets/mobile/resume-button.png";
import contactsIcon from "../assets/mobile/contacts-button.png";

const PAGES = [
  { path: "/", label: "Home", icon: homeIcon },
  { path: "/about", label: "About", icon: aboutIcon },
  { path: "/projects", label: "Projects", icon: projectsIcon },
  { path: "/resume", label: "Resume", icon: resumeIcon },
  { path: "/contacts", label: "Contact", icon: contactsIcon },
];

interface BottomNavProps {
  onNavigate: (path: string) => void;
}

export default function BottomNav({ onNavigate }: BottomNavProps) {
  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Page navigation">
      {PAGES.map(({ path, label, icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `mobile-bottom-nav__item${isActive ? " active" : ""}`
          }
          onClick={(e) => handleClick(e, path)}
        >
          <img src={icon} alt={label} className="mobile-bottom-nav__icon" />
          <span className="mobile-bottom-nav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
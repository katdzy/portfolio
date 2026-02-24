import type { MouseEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";

import homeIcon from "../assets/mobile/home.svg";
import aboutIcon from "../assets/mobile/about.svg";
import projectsIcon from "../assets/mobile/projects.svg";
import resumeIcon from "../assets/mobile/resume.svg";
import contactsIcon from "../assets/mobile/contacts.svg";

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
  const location = useLocation();
  const isProjects = location.pathname === "/projects";

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      {/* Hidden SVG filter for liquid-glass distortion */}
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="nav-glass-distortion">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.65"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <nav
        className={`mobile-bottom-nav${isProjects ? " mobile-bottom-nav--dark" : ""}`}
        aria-label="Page navigation"
      >
        {PAGES.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `mobile-bottom-nav__item${isActive ? " active" : ""}`
            }
            onClick={(e) => handleClick(e, path)}
            aria-label={label}
          >
            <img
              src={icon}
              alt={label}
              className="mobile-bottom-nav__icon"
            />
          </NavLink>
        ))}
      </nav>
    </>
  );
}
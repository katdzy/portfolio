import type { MouseEvent } from "react";
import { NavLink } from "react-router-dom";

const PAGES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/resume", label: "Resume" },
  { path: "/contacts", label: "Contacts" },
];

interface BottomNavProps {
  onNavigate: (path: string) => void;
}

/**
 * BottomNav
 * Fixed bottom navigation bar. Triggers transition through onNavigate
 * instead of navigating directly, so PageTransition can intercept.
 */
export default function BottomNav({ onNavigate }: BottomNavProps) {
  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <nav className="bottom-nav" aria-label="Page navigation">
      {PAGES.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={(e) => handleClick(e, path)}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
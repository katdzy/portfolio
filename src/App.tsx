import { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageTransition from './components/PageTransition.tsx';

import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import Resume from './pages/Resume.tsx';
import Contacts from './pages/Contacts.tsx';

export default function App() {
  const location = useLocation();
  const transitionRef = useRef(null);

  const handleNavigate = (to: string) => {
    if (transitionRef.current) {
      (transitionRef.current as any).navigate(to, location.pathname);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/about" element={<About onNavigate={handleNavigate} />} />
        <Route path="/projects" element={<Projects onNavigate={handleNavigate} />} />
        <Route path="/resume" element={<Resume onNavigate={handleNavigate} />} />
        <Route path="/contacts" element={<Contacts onNavigate={handleNavigate} />} />
      </Routes>

      {/* Global transition overlay — always mounted */}
      <PageTransition ref={transitionRef} />
    </>
  );
}

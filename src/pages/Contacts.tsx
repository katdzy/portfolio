import { useState } from 'react';
import VideoBackground from '../components/VideoBackground.tsx';

import linkedinIcon from '../assets/contacts/linkedin.svg';
import githubIcon from '../assets/contacts/github.svg';
import emailIcon from '../assets/contacts/email.svg';
import mapPinIcon from '../assets/contacts/map-pin.svg';

import type { MouseEvent, FormEvent } from 'react';

interface PageProps {
  onNavigate: (path: string) => void;
}

const contactLinks = [
  {
    icon: linkedinIcon,
    label: 'LinkedIn',
    value: 'karl-andrei-dungca',
    href: 'https://www.linkedin.com/in/karl-andrei-dungca-480891339',
  },
  {
    icon: githubIcon,
    label: 'GitHub',
    value: 'katdzy',
    href: 'https://github.com/katdzy',
  },
  {
    icon: emailIcon,
    label: 'Email',
    value: 'andreidungca6@gmail.com',
    href: 'mailto:andreidungca6@gmail.com',
  },
  {
    icon: mapPinIcon,
    label: 'Location',
    value: 'Angeles City, Pampanga, PH',
    href: 'https://maps.google.com/?q=Angeles+City+Pampanga+Philippines',
  },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqjoeqa';

export default function Contacts({ onNavigate }: PageProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleLinkClick = (e: MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <VideoBackground slug="contacts" />

      {/* Hidden SVG displacement filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="contact-glass-distortion">
          <feDisplacementMap
            in="SourceGraphic"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Centre card */}
      <div className="contact-layout">
        <h2 className="contact-title">Let's Get In Touch</h2>

        <div className="contact-card">

          {/* ── Contact info strip ── */}
          <div className="contact-info-row">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-info-item"
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                <img src={item.icon} alt={item.label} className="contact-info-icon" />
                <div className="contact-info-text">
                  <span className="contact-info-label">{item.label}</span>
                  <span className="contact-info-value">{item.value}</span>
                </div>
              </a>
            ))}
          </div>

          {/* ── Form ── */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-input-wrapper">
                <input name="name" type="text" placeholder="Name" required />
              </div>
              <div className="contact-input-wrapper">
                <input name="email" type="email" placeholder="Email" required />
              </div>
            </div>

            <div className="contact-input-wrapper">
              <input name="subject" type="text" placeholder="Project Inquiry" />
            </div>

            <div className="contact-input-wrapper contact-input-wrapper--textarea">
              <textarea name="message" placeholder="Message" required />
            </div>

            <div className="contact-form-footer">
              {status === 'sent' && (
                <p className="contact-form-feedback contact-form-feedback--ok">
                  ✓ Message sent! I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="contact-form-feedback contact-form-feedback--err">
                  Something went wrong — please try emailing directly.
                </p>
              )}

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="about-bottom">
        <div className="about-identity">
          <span className="about-role clickable" onClick={(e) => handleLinkClick(e, '/')}>
            Karl Andrei Dungca
          </span>
          <h1 className="about-title">contact</h1>
        </div>

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

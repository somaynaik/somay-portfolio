import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const scrollTo = (id: string) => {
  const target = document.getElementById(id) || (id === 'projects' ? document.getElementById('work') : null);
  target?.scrollIntoView({ behavior: 'smooth' });
};

const links = [
  { id: 'about', label: 'ABOUT ME' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      width: '100%', maxWidth: '100vw', boxSizing: 'border-box',
      backgroundColor: scrolled ? 'rgba(29, 78, 216, 0.94)' : '#1D4ED8',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(245, 240, 232, 0.22)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)',
        boxSizing: 'border-box',
        height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Home icon button with spring tap */}
        <motion.button
          onClick={() => scrollTo('home')}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          aria-label="Back to top"
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
            color: '#F5F0E8', display: 'flex', alignItems: 'center', gap: '8px',
            borderRadius: '9999px',
          }}
        >
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            backgroundColor: 'rgba(245, 240, 232, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(245, 240, 232, 0.3)',
          }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
            </svg>
          </div>
        </motion.button>

        {/* Desktop nav - Emil Kowalski fluid sliding pill indicator */}
        <div
          onMouseLeave={() => setHoveredTab(null)}
          style={{
            display: 'flex', alignItems: 'center', position: 'relative',
            backgroundColor: 'rgba(245, 240, 232, 0.1)',
            padding: '4px',
            borderRadius: '9999px',
            border: '1px solid rgba(245, 240, 232, 0.25)',
          }}
          className="desktop-nav"
        >
          {links.map(({ id, label }) => {
            const isHovered = hoveredTab === id;
            return (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                onMouseEnter={() => setHoveredTab(id)}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 22px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: '#F5F0E8',
                  fontFamily: 'Inter, sans-serif',
                  zIndex: 2,
                  outline: 'none',
                  whiteSpace: 'nowrap',
                  borderRadius: '9999px',
                }}
              >
                {isHovered && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(245, 240, 232, 0.22)',
                      borderRadius: '9999px',
                      zIndex: -1,
                    }}
                  />
                )}
                {label}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'none' }}
          aria-label="Menu"
          className="mobile-btn"
        >
          <svg width="26" height="26" fill="none" stroke="#F5F0E8" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </motion.button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ backgroundColor: '#1D4ED8', padding: '12px 32px 24px', borderTop: '1px solid rgba(245,240,232,0.2)' }}
        >
          {[{ id: 'home', label: 'HOME' }, ...links].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 0',
                fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.18em',
                color: '#F5F0E8', fontFamily: 'Inter, sans-serif',
                borderBottom: '1px solid rgba(245,240,232,0.15)',
              }}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

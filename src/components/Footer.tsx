import React from 'react';
import { motion } from 'framer-motion';

const scrollTo = (id: string) => {
  const target = document.getElementById(id) || (id === 'projects' ? document.getElementById('work') : null);
  target?.scrollIntoView({ behavior: 'smooth' });
};

const Footer: React.FC = () => (
  <footer style={{
    backgroundColor: '#1D4ED8',
    padding: 'clamp(40px, 6vw, 3.8rem) 0 2.5rem',
    borderTop: '1px solid rgba(245, 240, 232, 0.15)',
    width: '100%',
    maxWidth: '100vw',
    overflow: 'hidden',
    boxSizing: 'border-box',
  }}>
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 36px)', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <motion.button
          onClick={() => scrollTo('home')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: '2.4rem',
            color: '#F5F0E8', lineHeight: 1, padding: 0, textAlign: 'left',
          }}
        >
          Somay Naik
        </motion.button>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.8rem' }}>
          {[['home', 'Home'], ['about', 'About'], ['projects', 'Projects'], ['contact', 'Contact']].map(([id, lbl]) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                color: 'rgba(245, 240, 232, 0.85)', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245, 240, 232, 0.85)')}
            >
              {lbl}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.2rem' }}>
          {[
            { href: 'https://github.com/somaynaik', lbl: 'GitHub' },
            { href: 'https://www.linkedin.com/in/somay-naik-27a4aa248', lbl: 'LinkedIn' },
          ].map(({ href, lbl }) => (
            <motion.a
              key={lbl}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#F5F0E8',
                backgroundColor: 'rgba(245, 240, 232, 0.1)',
                border: '1px solid rgba(245, 240, 232, 0.2)',
                padding: '6px 14px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {lbl}
            </motion.a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2.8rem', paddingTop: '1.8rem', borderTop: '1px solid rgba(245, 240, 232, 0.12)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: 'rgba(245, 240, 232, 0.6)', margin: 0, letterSpacing: '0.04em' }}>
          Crafted with care &bull; &copy; {new Date().getFullYear()} Somay Naik. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

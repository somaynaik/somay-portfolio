import React from 'react';
import { motion } from 'framer-motion';

const data = [
  { year: '2025', text: 'Represented Goa at National Youth Festival via mygov.in — interacted with Shri Piyush Goyal Ji' },
  { year: '2024', text: 'Led GEC Coder Club as Event Manager' },
  { year: '2024', text: 'Led GEC Quiz Club as PR Manager' },
  { year: '2024', text: 'Secured 2nd place at Infofest College-level Quiz Competition' },
  { year: '2023', text: 'Joined Goa College of Engineering' },
  { year: '2022', text: 'Graduated 12th with 81%' },
  { year: '2020', text: 'Graduated 10th with 81.2%' },
];

const Achievements: React.FC = () => (
  <section id="achievements" style={{ backgroundColor: '#1D4ED8', padding: '90px 0', borderBottom: '1.5px solid rgba(255,255,255,0.15)' }}>
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 36px' }}>
      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.25em', color: 'rgba(245, 240, 232, 0.7)', textTransform: 'uppercase', marginBottom: '8px' }}
      >
        MILESTONES & TIMELINE
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 900, textTransform: 'uppercase',
          fontSize: 'clamp(2.4rem, 6vw, 4rem)',
          color: '#F5F0E8', letterSpacing: '-0.01em',
          marginBottom: '3.5rem',
        }}
      >
        ACHIEVEMENTS
      </motion.h2>

      <div style={{ position: 'relative' }}>
        {/* vertical line */}
        <div style={{ position: 'absolute', left: '88px', top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(245, 240, 232, 0.25)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {data.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '2.5rem' }}
            >
              {/* Year */}
              <div style={{ width: '88px', flexShrink: 0, textAlign: 'right', paddingRight: '1.5rem', position: 'relative' }}>
                <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 900, fontSize: '1.4rem', color: '#F5F0E8' }}>
                  {item.year}
                </span>
                <div style={{
                  position: 'absolute', right: '-6px', top: '9px',
                  width: '10px', height: '10px', borderRadius: '50%',
                  backgroundColor: '#F5F0E8', border: '3px solid #1D4ED8',
                  boxShadow: '0 0 0 2px rgba(245, 240, 232, 0.5)',
                }} />
              </div>
              {/* Card */}
              <div style={{
                flex: 1, backgroundColor: 'rgba(245, 240, 232, 0.12)',
                borderRadius: '16px', padding: '1.1rem 1.4rem',
                border: '1.5px solid rgba(245, 240, 232, 0.25)',
                backdropFilter: 'blur(4px)',
              }}>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#F5F0E8', lineHeight: 1.65, fontWeight: 600 }}>
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Achievements;


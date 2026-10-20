import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => (
  <section
    id="about"
    style={{
      backgroundColor: '#F5F0E8',
      padding: 'clamp(60px, 8vw, 95px) 0 clamp(50px, 8vw, 85px)',
      borderBottom: '1.5px solid rgba(29, 78, 216, 0.15)',
      width: '100%',
      maxWidth: '100vw',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 36px)', boxSizing: 'border-box' }}>

      {/* Top row: badge + big editorial statement */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'flex-start', marginBottom: '3rem', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: '0.78rem',
            letterSpacing: '0.22em',
            color: '#1D4ED8',
            backgroundColor: 'rgba(29, 78, 216, 0.08)',
            padding: '6px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(29, 78, 216, 0.2)',
          }}>
            ✦ ABOUT ME
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: 'clamp(1.7rem, 4.2vw, 3.4rem)',
            lineHeight: 1.15,
            color: '#1D4ED8',
            margin: 0,
            letterSpacing: '-0.015em',
            maxWidth: '100%',
            wordBreak: 'break-word',
          }}
        >
          I WRITE CODE & BUILD THINGS<br />PEOPLE STOP SCROLLING FOR.<br />ON PURPOSE, MOSTLY.
        </motion.h2>
      </div>

      {/* Bottom row: Tilted oval photo with handwritten speech bubbles + bio columns */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2.5rem, 5vw, 4rem)', alignItems: 'center' }}>

        {/* Photo container with gentle floating bubbles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          style={{
            flex: '0 0 auto',
            position: 'relative',
            width: 'clamp(240px, 75vw, 340px)',
            margin: '0 auto',
            maxWidth: '100%',
          }}
        >
          {/* Angled Oval Frame with layered border and shadow */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(270px, 85vw, 400px)',
            borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
            overflow: 'hidden',
            border: '3px solid #1D4ED8',
            boxShadow: '0 16px 40px rgba(29, 78, 216, 0.18)',
            transform: 'rotate(-4deg)',
            backgroundColor: '#1D4ED8',
          }}>
            <img
              src="./aboutme.jpg"
              alt="Somay Naik"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transform: 'scale(1.05) rotate(4deg)',
              }}
            />
          </div>

          {/* Floating Handwritten Speech Bubble 1 (Top Left) with gentle bob */}
          <motion.div
            initial={{ rotate: -12, opacity: 0, x: -10 }}
            whileInView={{ rotate: -6, opacity: 1, x: 0 }}
            animate={{ y: [0, -5, 0] }}
            viewport={{ once: true }}
            transition={{
              default: { delay: 0.3 },
              y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
            }}
            whileHover={{ scale: 1.05, rotate: -3 }}
            style={{
              position: 'absolute',
              top: '-10px',
              left: 'clamp(-8px, -2vw, 0px)',
              zIndex: 10,
              backgroundColor: '#F5F0E8',
              border: '2px solid #1D4ED8',
              borderRadius: '24px',
              padding: '6px 14px',
              fontSize: 'clamp(0.95rem, 2.8vw, 1.1rem)',
              fontWeight: 700,
              color: '#1D4ED8',
              fontFamily: "'Caveat', cursive",
              boxShadow: '0 6px 20px rgba(29, 78, 216, 0.14)',
              whiteSpace: 'nowrap',
              cursor: 'default',
              maxWidth: '90%',
            }}
          >
            loves cricket & quizzing 🏏
          </motion.div>

          {/* Floating Handwritten Speech Bubble 2 (Bottom Left) with gentle bob */}
          <motion.div
            initial={{ rotate: 8, opacity: 0, x: -10 }}
            whileInView={{ rotate: 3, opacity: 1, x: 0 }}
            animate={{ y: [0, 5, 0] }}
            viewport={{ once: true }}
            transition={{
              default: { delay: 0.4 },
              y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            style={{
              position: 'absolute',
              bottom: '-12px',
              right: 'clamp(-8px, -2vw, 0px)',
              zIndex: 10,
              backgroundColor: '#F5F0E8',
              border: '2px solid #1D4ED8',
              borderRadius: '24px',
              padding: '6px 14px',
              fontSize: 'clamp(0.88rem, 2.5vw, 1rem)',
              fontWeight: 700,
              color: '#1D4ED8',
              fontFamily: "'Caveat', cursive",
              boxShadow: '0 6px 20px rgba(29, 78, 216, 0.14)',
              maxWidth: '220px',
              lineHeight: 1.2,
              cursor: 'default',
            }}
          >
            and writing code at 2 AM (debugs in sleep)
          </motion.div>

          {/* Animated Sticker Motif */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              right: '-12px',
              zIndex: 10,
              backgroundColor: '#1D4ED8',
              color: '#F5F0E8',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            }}
          >
            ⚡
          </motion.div>
        </motion.div>

        {/* Bio text & Experience cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '1 1 280px', minWidth: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Main Bio Paragraph with high-craft callout */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: 'clamp(18px, 4vw, 24px)',
            border: '1.5px solid rgba(29, 78, 216, 0.18)',
            boxShadow: '0 4px 20px rgba(29,78,216,0.04)',
            boxSizing: 'border-box',
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)',
              color: '#222',
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 500,
            }}>
              AN IT PROFESSIONAL WITH A CREATIVE BRAIN. IF YOU WANT SOMEONE TO BUILD UNHINGED-BUT-BRILLIANT FULL-STACK EXPERIENCES AND HIGH-IMPACT APPS AT 1 AM, YOU'VE FOUND THEM.
            </p>
          </div>

          {/* Leadership & Experience Side-by-Side Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', width: '100%' }}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                flex: '1 1 220px',
                minWidth: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px 18px',
                border: '1.5px solid rgba(29, 78, 216, 0.15)',
                boxShadow: '0 2px 10px rgba(29,78,216,0.03)',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em', color: '#1D4ED8', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                LEADERSHIP &bull; EVENT MANAGER
              </span>
              <p style={{ fontSize: '0.96rem', fontWeight: 800, color: '#111', margin: '0 0 6px', textTransform: 'uppercase' }}>
                @GEC CODER CLUB
              </p>
              <p style={{ fontSize: '0.82rem', color: '#555', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                Did a bit of everything — branding, event strategy, web dev, and community outreach. Executed tech hackathons &amp; developer workshops.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                flex: '1 1 220px',
                minWidth: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px 18px',
                border: '1.5px solid rgba(29, 78, 216, 0.15)',
                boxShadow: '0 2px 10px rgba(29,78,216,0.03)',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.18em', color: '#1D4ED8', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                LEADERSHIP &bull; PR MANAGER
              </span>
              <p style={{ fontSize: '0.96rem', fontWeight: 800, color: '#111', margin: '0 0 6px', textTransform: 'uppercase' }}>
                @GEC QUIZ CLUB
              </p>
              <p style={{ fontSize: '0.82rem', color: '#555', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                Content strategy, communications, team coordination &amp; event execution across state-level college quiz competitions.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default About;

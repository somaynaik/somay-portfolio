import React from 'react';
import { motion } from 'framer-motion';

/* ── Cycling Graphic Items ── */
const ITEMS = [
  { emoji: '🏏', label: 'Cricket' },
  { emoji: '💻', label: 'Coding' },
  { emoji: '📝', label: 'Quiz' },
];

const CyclingGraphic: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % ITEMS.length);
        setVisible(true);
      }, 380);
    }, 2400);
    return () => clearInterval(cycle);
  }, []);

  const item = ITEMS[index];

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        top: '28%',
        left: 'clamp(2%, 6vw, 10%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: '#F5F0E8',
          borderRadius: '50%',
          width: 'clamp(64px, 8vw, 94px)',
          height: 'clamp(64px, 8vw, 94px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #1D4ED8',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255,255,255,0.8)',
          transform: visible ? 'scale(1) rotate(-8deg)' : 'scale(0.65) rotate(-8deg)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.7rem)', lineHeight: 1 }}>
          {item.emoji}
        </span>
      </div>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(0.58rem, 1vw, 0.75rem)',
          letterSpacing: '0.2em',
          color: '#F5F0E8',
          textTransform: 'uppercase',
          opacity: visible ? 0.9 : 0,
          transition: 'opacity 0.35s ease',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {item.label}
      </span>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      style={{
        backgroundColor: '#1D4ED8',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        paddingTop: '76px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        overflow: 'hidden',
      }}>

        {/* Layer 1: Giant PORTFOLIO Text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          width: '100%',
          overflow: 'hidden',
        }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', 'Syne', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(3.4rem, 18.5vw, 20rem)',
            lineHeight: 0.88,
            color: '#F5F0E8',
            letterSpacing: '0.03em',
            margin: 0,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            width: '100%',
            textAlign: 'center',
            opacity: 0.95,
          }}>
            PORTFOLIO
          </h1>
        </div>

        {/* Layer 2: Cycling animated graphic with gentle float */}
        <CyclingGraphic />

        {/* Layer 3: Subject Cutout Image + Download button stacked below */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: '100%',
          width: '100%',
          paddingBottom: 'clamp(28px, 5vh, 52px)',
        }}>
          <motion.img
            src="./profile-cutout.png"
            alt="Somay Naik"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxHeight: 'clamp(380px, 68vh, 660px)',
              maxWidth: '95vw',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.3))',
              pointerEvents: 'none',
              display: 'block',
            }}
          />

          {/* Emil Kowalski Tactile Download Button */}
          <motion.a
            href="./resume.pdf"
            download="Somay_Naik_Resume.pdf"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#F5F0E8',
              color: '#1D4ED8',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(0.72rem, 1.2vw, 0.86rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '12px clamp(20px, 4vw, 34px)',
              borderRadius: '9999px',
              border: '2px solid rgba(29, 78, 216, 0.15)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.9)',
              marginTop: '20px',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100vw - 32px)',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
          >
            <motion.svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </motion.svg>
            Download Resume
          </motion.a>
        </div>

        {/* Layer 4: Somay Naik cursive name — top-left corner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 'clamp(12px, 3vh, 28px)',
            left: 'clamp(16px, 3vw, 36px)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Alex Brush', 'Dancing Script', cursive",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            color: '#F5F0E8',
            letterSpacing: '0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.25)',
            lineHeight: 1,
          }}>
            Somay Naik
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

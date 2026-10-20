import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F5F0E8', minHeight: '100vh', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />

      {/* Background Audio */}
      <audio ref={audioRef} src="./music.mp3" loop />

      {/* Emil Kowalski Floating Interactive Audio Dock */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: 'clamp(14px, 2.5vh, 24px)',
          right: 'clamp(12px, 3vw, 24px)',
          zIndex: 100,
          maxWidth: 'calc(100vw - 24px)',
        }}
      >
        <motion.button
          onClick={togglePlayPause}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          style={{
            backgroundColor: '#1D4ED8',
            color: '#F5F0E8',
            border: '1.5px solid rgba(245, 240, 232, 0.3)',
            borderRadius: '9999px',
            padding: '10px 18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 30px rgba(29, 78, 216, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
          }}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {/* Animated sound wave bars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '18px' }}>
            {[0.4, 0.7, 0.5, 0.9].map((delay, idx) => (
              <motion.span
                key={idx}
                animate={
                  isPlaying
                    ? {
                        height: ['4px', '16px', '6px', '18px', '4px'],
                        transition: {
                          repeat: Infinity,
                          duration: 0.9 + delay * 0.3,
                          ease: 'easeInOut',
                          repeatType: 'mirror',
                        },
                      }
                    : { height: '4px' }
                }
                style={{
                  width: '3px',
                  backgroundColor: isPlaying ? '#F5F0E8' : 'rgba(245, 240, 232, 0.5)',
                  borderRadius: '2px',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: isPlaying ? '#93C5FD' : 'rgba(245, 240, 232, 0.65)',
              lineHeight: 1,
            }}>
              {isPlaying ? 'NOW PLAYING' : 'BACKGROUND SOUND'}
            </span>
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              marginTop: '3px',
            }}>
              {isPlaying ? 'Lo-Fi Chill Beats' : 'Tap to Play'}
            </span>
          </div>

          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: 'rgba(245, 240, 232, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px',
          }}>
            {isPlaying ? (
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default App;

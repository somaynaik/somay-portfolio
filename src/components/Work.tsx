import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ── Interactive Prototype: Bird Map (Project 1) ── */
const speciesList = [
  {
    name: 'Indian Peafowl',
    scientific: 'Pavo cristatus',
    location: 'Netravali, Goa',
    coords: '15.08° N, 74.21° E',
    sightings: 6,
    color: '#059669',
    pinX: '65%',
    pinY: '42%',
  },
  {
    name: 'Kingfisher',
    scientific: 'Halcyon smyrnensis',
    location: 'Mandovi, Goa',
    coords: '15.49° N, 73.82° E',
    sightings: 14,
    color: '#0284c7',
    pinX: '38%',
    pinY: '58%',
  },
  {
    name: 'Hornbill',
    scientific: 'Anthracoceros coronatus',
    location: 'Bhagwan Mahaveer',
    coords: '15.34° N, 74.28° E',
    sightings: 3,
    color: '#d97706',
    pinX: '78%',
    pinY: '70%',
  },
];

const BirdMapWidget: React.FC = () => {
  const [activeSpecies, setActiveSpecies] = useState(0);
  const current = speciesList[activeSpecies];

  return (
    <div style={{
      backgroundColor: '#FAF8F5',
      borderRadius: '16px',
      border: '1.5px solid rgba(29, 78, 216, 0.18)',
      padding: 'clamp(12px, 3vw, 16px)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
      marginBottom: '1.4rem',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* Mini App Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{
            fontSize: '0.66rem',
            fontWeight: 800,
            color: '#1D4ED8',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginLeft: '4px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Live Radar & Sighting Feed
          </span>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.62rem',
          fontWeight: 700,
          color: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          padding: '2px 7px',
          borderRadius: '9999px',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#059669' }} />
          REAL-TIME
        </span>
      </div>

      {/* Simulated Map Canvas */}
      <div style={{
        position: 'relative',
        height: '130px',
        borderRadius: '12px',
        backgroundColor: '#EEF2FF',
        border: '1.5px solid rgba(29, 78, 216, 0.14)',
        overflow: 'hidden',
        marginBottom: '10px',
        width: '100%',
        boxSizing: 'border-box',
        backgroundImage: 'radial-gradient(circle, rgba(29,78,216,0.12) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}>
        {/* Radar scan line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '180px',
            height: '180px',
            marginTop: '-90px',
            marginLeft: '-90px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(29,78,216,0.18) 0deg, transparent 60deg, transparent 360deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Contour lines simulation */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }} preserveAspectRatio="none">
          <path d="M0,50 Q80,20 160,50 T320,40" fill="none" stroke="#1D4ED8" strokeWidth="1.5" />
          <path d="M0,80 Q90,60 180,90 T360,75" fill="none" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        {/* Animated Active Pin */}
        <motion.div
          key={activeSpecies}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          style={{
            position: 'absolute',
            top: current.pinY,
            left: current.pinX,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#1D4ED8',
            border: '2px solid #fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            zIndex: 2,
          }} />
          <span style={{
            backgroundColor: 'rgba(29, 78, 216, 0.95)',
            color: '#fff',
            fontSize: '0.58rem',
            fontWeight: 700,
            padding: '2px 5px',
            borderRadius: '4px',
            marginTop: '2px',
            whiteSpace: 'nowrap',
          }}>
            {current.coords}
          </span>
        </motion.div>
      </div>

      {/* Species selector pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', width: '100%' }}>
        {speciesList.map((sp, idx) => {
          const isSelected = idx === activeSpecies;
          return (
            <motion.button
              key={sp.name}
              onClick={() => setActiveSpecies(idx)}
              whileTap={{ scale: 0.95 }}
              style={{
                background: isSelected ? '#1D4ED8' : 'rgba(29, 78, 216, 0.06)',
                color: isSelected ? '#F5F0E8' : '#1D4ED8',
                border: isSelected ? '1px solid #1D4ED8' : '1px solid rgba(29, 78, 216, 0.15)',
                borderRadius: '8px',
                padding: '5px 8px',
                fontSize: '0.66rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
              }}
            >
              <span>{idx === 0 ? '🦚' : idx === 1 ? '🐦' : '🦜'}</span>
              <span>{sp.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Active Species Live Info Bar */}
      <div style={{
        marginTop: '8px',
        padding: '8px 10px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: '1px solid rgba(29, 78, 216, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.68rem',
        flexWrap: 'wrap',
        gap: '4px',
      }}>
        <div>
          <strong style={{ color: '#111' }}>{current.location}</strong>
        </div>
        <span style={{
          fontWeight: 800,
          color: current.color,
          backgroundColor: `${current.color}15`,
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.62rem',
        }}>
          {current.sightings} Sightings Today
        </span>
      </div>
    </div>
  );
};

/* ── Interactive Prototype: Event Management Website (Project 2) ── */
const EventWidget: React.FC = () => {
  const [tab, setTab] = useState<'schedule' | 'pass'>('schedule');
  const [claimed, setClaimed] = useState(false);

  return (
    <div style={{
      backgroundColor: '#FAF8F5',
      borderRadius: '16px',
      border: '1.5px solid rgba(29, 78, 216, 0.18)',
      padding: 'clamp(12px, 3vw, 16px)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
      marginBottom: '1.4rem',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{
            fontSize: '0.66rem',
            fontWeight: 800,
            color: '#1D4ED8',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginLeft: '4px',
            fontFamily: 'Inter, sans-serif',
          }}>
            GEC Hackfest Portal
          </span>
        </div>

        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(29, 78, 216, 0.08)',
          padding: '2px',
          borderRadius: '8px',
          gap: '2px',
        }}>
          <button
            onClick={() => setTab('schedule')}
            style={{
              background: tab === 'schedule' ? '#1D4ED8' : 'none',
              color: tab === 'schedule' ? '#fff' : '#1D4ED8',
              border: 'none',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '0.62rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Agenda
          </button>
          <button
            onClick={() => setTab('pass')}
            style={{
              background: tab === 'pass' ? '#1D4ED8' : 'none',
              color: tab === 'pass' ? '#fff' : '#1D4ED8',
              border: 'none',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '0.62rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Pass
          </button>
        </div>
      </div>

      {tab === 'schedule' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          {[
            { time: '09:30 AM', title: 'Opening Keynote & Reveal', tag: 'Stage' },
            { time: '11:00 AM', title: '24H Hackathon Sprint Begins', tag: 'Arena' },
            { time: '04:00 PM', title: 'Interactive Web Workshop', tag: 'Lab 04' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '8px 10px',
                border: '1px solid rgba(29, 78, 216, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#1D4ED8', display: 'block' }}>{item.time}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{item.title}</span>
              </div>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                color: '#1D4ED8',
                backgroundColor: 'rgba(29, 78, 216, 0.08)',
                padding: '2px 6px',
                borderRadius: '6px',
                flexShrink: 0,
              }}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          backgroundColor: '#1D4ED8',
          borderRadius: '12px',
          padding: '12px',
          color: '#fff',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8 }}>OFFICIAL ENTRY PASS</span>
              <h4 style={{ margin: '2px 0 0', fontSize: '0.88rem', fontWeight: 800 }}>GEC HACKFEST 2024</h4>
            </div>
            <span style={{
              backgroundColor: '#F5F0E8',
              color: '#1D4ED8',
              fontSize: '0.58rem',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '9999px',
            }}>
              VIP
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
            <div>
              <span style={{ fontSize: '0.58rem', opacity: 0.7, display: 'block' }}>HOLDER</span>
              <span style={{ fontSize: '0.76rem', fontWeight: 700 }}>SOMAY NAIK</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setClaimed(!claimed)}
              style={{
                backgroundColor: claimed ? '#22c55e' : '#F5F0E8',
                color: claimed ? '#fff' : '#1D4ED8',
                border: 'none',
                borderRadius: '8px',
                padding: '5px 10px',
                fontSize: '0.64rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {claimed ? '✓ Verified' : 'Claim Pass →'}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Interactive Prototype: Tandav Scorer (Project 3) ── */
const TandavWidget: React.FC = () => {
  const [score, setScore] = useState(168);
  const [wickets, setWickets] = useState(4);
  const [balls, setBalls] = useState<Array<string | number>>([1, 4, 0, 6, 2, 'W']);
  const [lastAction, setLastAction] = useState<string>('Match Live');

  const addRun = (runs: number) => {
    setScore(prev => prev + runs);
    setBalls(prev => [...prev.slice(-5), runs]);
    setLastAction(runs === 6 ? 'SIX! Maximum! 🚀' : runs === 4 ? 'FOUR! Boundary! 🔥' : '+1 Run');
  };

  const addWicket = () => {
    if (wickets < 10) {
      setWickets(prev => prev + 1);
      setBalls(prev => [...prev.slice(-5), 'W']);
      setLastAction('WICKET! Out! 🎯');
    }
  };

  const resetMatch = () => {
    setScore(168);
    setWickets(4);
    setBalls([1, 4, 0, 6, 2, 'W']);
    setLastAction('Scoreboard reset');
  };

  return (
    <div style={{
      backgroundColor: '#FAF8F5',
      borderRadius: '16px',
      border: '1.5px solid rgba(29, 78, 216, 0.18)',
      padding: 'clamp(12px, 3vw, 16px)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
      marginBottom: '1.4rem',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{
            fontSize: '0.66rem',
            fontWeight: 800,
            color: '#1D4ED8',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginLeft: '4px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Tandav Live Engine
          </span>
        </div>
        <span style={{
          fontSize: '0.62rem',
          fontWeight: 700,
          color: '#1D4ED8',
          backgroundColor: 'rgba(29, 78, 216, 0.08)',
          padding: '2px 7px',
          borderRadius: '9999px',
        }}>
          FINALS
        </span>
      </div>

      {/* Main Scoreboard Display */}
      <div style={{
        backgroundColor: '#1D4ED8',
        borderRadius: '12px',
        padding: '10px 14px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        width: '100%',
        boxSizing: 'border-box',
        gap: '6px',
      }}>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', opacity: 0.85, textTransform: 'uppercase', display: 'block' }}>
            Goa Titans
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '1px', flexWrap: 'wrap' }}>
            <motion.span
              key={score}
              initial={{ scale: 1.15, color: '#FCD34D' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1.4rem, 4.5vw, 1.75rem)',
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              {score}
            </motion.span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, opacity: 0.75 }}>/ {wickets}</span>
            <span style={{ fontSize: '0.68rem', opacity: 0.8 }}>(18.4 Ov)</span>
          </div>
        </div>

        <span style={{
          fontSize: '0.62rem',
          fontWeight: 700,
          color: '#FCD34D',
          backgroundColor: 'rgba(0,0,0,0.25)',
          padding: '3px 6px',
          borderRadius: '6px',
          textAlign: 'right',
          flexShrink: 0,
        }}>
          {lastAction}
        </span>
      </div>

      {/* Ball by ball stream */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', gap: '4px' }}>
        <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>Over:</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {balls.map((b, i) => (
            <motion.span
              key={`${i}-${b}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: b === 'W' ? '#ef4444' : b === 6 ? '#8b5cf6' : b === 4 ? '#3b82f6' : '#fff',
                color: typeof b === 'number' && b < 4 ? '#111' : '#fff',
                border: '1px solid rgba(29, 78, 216, 0.15)',
                fontSize: '0.62rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {b}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Interactive Scoring Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', width: '100%' }}>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => addRun(1)}
          style={{
            backgroundColor: '#fff',
            color: '#1D4ED8',
            border: '1px solid rgba(29, 78, 216, 0.2)',
            borderRadius: '6px',
            padding: '6px 0',
            fontSize: '0.68rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          +1
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => addRun(4)}
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            color: '#1D4ED8',
            border: '1px solid rgba(29, 78, 216, 0.3)',
            borderRadius: '6px',
            padding: '6px 0',
            fontSize: '0.68rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          +4
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => addRun(6)}
          style={{
            backgroundColor: 'rgba(139, 92, 246, 0.12)',
            color: '#7c3aed',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: '6px',
            padding: '6px 0',
            fontSize: '0.68rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          +6
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={addWicket}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            padding: '6px 0',
            fontSize: '0.68rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          +W
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={resetMatch}
          title="Reset"
          style={{
            backgroundColor: '#fff',
            color: '#666',
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: '6px',
            padding: '6px 0',
            fontSize: '0.68rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ↺
        </motion.button>
      </div>
    </div>
  );
};

/* ── Projects Data ── */
const projects = [
  {
    number: '01',
    displayNumber: '1',
    title: 'BIRD MAP',
    role: 'FULL-STACK DEVELOPER',
    org: 'PERSONAL PROJECT',
    status: 'ACTIVE OPEN SOURCE',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Leaflet'],
    challenge: 'Breaking through the noise — building a real-time interactive map for bird watching enthusiasts.',
    solution: 'Built a responsive web dashboard with live map integrations, sighting filters, and real-time species observation feeds.',
    link: 'https://github.com/somaynaik/birdmap',
    icon: '🦜',
    widget: <BirdMapWidget />,
  },
  {
    number: '02',
    displayNumber: '2',
    title: 'EVENT MANAGEMENT WEBSITE',
    role: 'FRONTEND DEVELOPER',
    org: 'GEC CODER CLUB',
    status: 'CLUB PRODUCTION',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    challenge: 'An event organization needed a clean web presence to showcase tech hackathons and reach attendees.',
    solution: 'Designed and engineered a multi-page interactive web portal with event listings, registration forms, and schedule pages.',
    link: 'https://github.com/somaynaik/Eventmanagement',
    icon: '⚡',
    widget: <EventWidget />,
  },
  {
    number: '03',
    displayNumber: '3',
    title: 'TANDAV SCORER',
    role: 'FULL-STACK DEVELOPER',
    org: 'PERSONAL PROJECT',
    status: 'FEATURED WEB APP',
    techStack: ['React', 'Node.js', 'Express', 'JavaScript'],
    challenge: 'Local cricket tournaments had no real-time digital scoring — teams were stuck with paper scorecards.',
    solution: 'Built a live cricket scoring web application featuring ball-by-ball tracking, run rates, innings stats, and spectator web links.',
    link: 'https://github.com/somaynaik/TandavScorer',
    icon: '🏏',
    widget: <TandavWidget />,
  },
];

const Work: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2400);
  };

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#F5F0E8',
        padding: 'clamp(60px, 8vw, 100px) 0 clamp(70px, 8vw, 110px)',
        borderBottom: '1.5px solid rgba(29, 78, 216, 0.15)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Anchor for backward compatibility with #work */}
      <div id="work" style={{ position: 'absolute', top: 0, left: 0 }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', boxSizing: 'border-box' }}>

        {projects.map((p, i) => (
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            style={{ marginBottom: i < projects.length - 1 ? 'clamp(4rem, 8vw, 7.5rem)' : 0 }}
          >
            {/* Project Title Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(29, 78, 216, 0.07)',
                border: '1px solid rgba(29, 78, 216, 0.15)',
                marginBottom: '8px',
              }}>
                <span style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  color: '#1D4ED8',
                  textTransform: 'uppercase',
                }}>
                  Selected Work &bull; {p.number} of 0{projects.length}
                </span>
              </div>

              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: 'clamp(2.2rem, 6.5vw, 4.2rem)',
                color: '#1D4ED8',
                margin: 0,
                letterSpacing: '-0.015em',
                lineHeight: 1.05,
              }}>
                PROJECT {p.displayNumber}
              </h2>
            </div>

            {/* Subheader bar with top and bottom horizontal border lines */}
            <div style={{
              borderTop: '2px solid #1D4ED8',
              borderBottom: '2px solid #1D4ED8',
              padding: '12px clamp(12px, 3vw, 24px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '0.8rem',
              backgroundColor: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(8px)',
              width: '100%',
              boxSizing: 'border-box',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', minWidth: 0 }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(0.75rem, 2.8vw, 0.88rem)',
                  color: '#111',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  wordBreak: 'break-word',
                }}>
                  {p.role} — {p.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  color: '#059669',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(5, 150, 105, 0.2)',
                  letterSpacing: '0.06em',
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                  }} />
                  {p.status}
                </span>

                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  color: '#1D4ED8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {p.org}
                </span>
              </div>
            </div>

            {/* 2-Column Split Layout with Emil Kowalski Craft */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(1.5rem, 4vw, 2.5rem)', alignItems: 'stretch', width: '100%' }}>

              {/* Left Column: Interactive Prototype Widget + Handwritten Challenge Quote */}
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                style={{
                  flex: '1 1 280px',
                  minWidth: 0,
                  width: '100%',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(29, 78, 216, 0.22)',
                  borderRadius: '24px',
                  padding: 'clamp(16px, 4vw, 2.2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: '0 1px 3px rgba(29, 78, 216, 0.04), 0 16px 36px -12px rgba(29, 78, 216, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
                }}
              >
                <div>
                  {/* Top Header Row in Card */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem', gap: '8px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      minWidth: 0,
                    }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        backgroundColor: '#EEF2FF',
                        border: '1.5px solid #1D4ED8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        boxShadow: '0 4px 14px rgba(29,78,216,0.12)',
                        flexShrink: 0,
                      }}>
                        {p.icon}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <span style={{
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          color: '#1D4ED8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          display: 'block',
                        }}>
                          LIVE PROTOTYPE
                        </span>
                        <h4 style={{
                          margin: 0,
                          fontSize: '1rem',
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontWeight: 800,
                          color: '#111',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {p.title}
                        </h4>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      color: '#666',
                      backgroundColor: '#F5F0E8',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      flexShrink: 0,
                    }}>
                      Interactive
                    </span>
                  </div>

                  {/* Emil Kowalski Tangible Interactive Widget */}
                  {p.widget}

                  {/* Handwritten Speech Bubble for Challenge */}
                  <div
                    style={{
                      backgroundColor: '#F5F0E8',
                      border: '2px solid #1D4ED8',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(29,78,216,0.06)',
                      boxSizing: 'border-box',
                      width: '100%',
                    }}
                  >
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      color: '#1D4ED8',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '4px',
                    }}>
                      THE PROBLEM:
                    </span>
                    <p style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: 'clamp(1.15rem, 3.5vw, 1.32rem)',
                      fontWeight: 700,
                      color: '#1D4ED8',
                      lineHeight: 1.25,
                      margin: 0,
                    }}>
                      "{p.challenge}"
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(29, 78, 216, 0.1)' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    color: '#1D4ED8',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span>✦</span> ENGINEERED SOLUTION INCLUDED &rarr;
                  </span>
                </div>
              </motion.div>

              {/* Right Column: Solution Details, Tech Stack & Action Links */}
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                style={{
                  flex: '1 1 280px',
                  minWidth: 0,
                  width: '100%',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(29, 78, 216, 0.22)',
                  borderRadius: '24px',
                  padding: 'clamp(18px, 4vw, 2.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(29, 78, 216, 0.04), 0 16px 36px -12px rgba(29, 78, 216, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      color: '#1D4ED8',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}>
                      ENGINEERING BREAKDOWN
                    </span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'rgba(29,78,216,0.5)',
                    }}>
                      #{p.number}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                    color: '#111',
                    marginBottom: '1rem',
                    marginTop: 0,
                    letterSpacing: '-0.01em',
                    wordBreak: 'break-word',
                  }}>
                    {p.title}
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(29, 78, 216, 0.04)',
                    borderLeft: '3px solid #1D4ED8',
                    padding: '12px 14px',
                    borderRadius: '0 12px 12px 0',
                    marginBottom: '1.5rem',
                    boxSizing: 'border-box',
                  }}>
                    <span style={{
                      display: 'block',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      color: '#1D4ED8',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      SOLUTION OVERVIEW
                    </span>
                    <p style={{
                      fontSize: 'clamp(0.88rem, 2.5vw, 0.98rem)',
                      color: '#333',
                      lineHeight: 1.65,
                      margin: 0,
                      fontWeight: 500,
                    }}>
                      {p.solution}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Tech stack pills with Emil Kowalski spring hover */}
                  <div style={{ marginBottom: '1.8rem' }}>
                    <span style={{
                      display: 'block',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#666',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>
                      Technologies Used
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.techStack.map(t => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                          style={{
                            backgroundColor: 'rgba(29, 78, 216, 0.07)',
                            color: '#1D4ED8',
                            border: '1px solid rgba(29, 78, 216, 0.22)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '5px 12px',
                            borderRadius: '9999px',
                            letterSpacing: '0.02em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            cursor: 'default',
                          }}
                        >
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#1D4ED8' }} />
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  {p.link && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      flexWrap: 'wrap',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(29, 78, 216, 0.1)',
                      width: '100%',
                    }}>
                      <motion.a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#1D4ED8',
                          color: '#F5F0E8',
                          padding: '10px 18px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          textDecoration: 'none',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 14px rgba(29, 78, 216, 0.25)',
                        }}
                      >
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        View Code &rarr;
                      </motion.a>

                      <motion.button
                        onClick={() => handleCopyLink(p.link, i)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          backgroundColor: '#fff',
                          color: copiedIndex === i ? '#059669' : '#1D4ED8',
                          border: `1.5px solid ${copiedIndex === i ? '#059669' : 'rgba(29, 78, 216, 0.25)'}`,
                          padding: '9px 15px',
                          borderRadius: '9999px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {copiedIndex === i ? 'Copied! ✓' : 'Copy Link'}
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Work;

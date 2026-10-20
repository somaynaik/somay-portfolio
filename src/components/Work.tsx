import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ── Interactive Prototype: Bird Map (Project 1) ── */
const speciesList = [
  {
    name: 'Indian Peafowl',
    scientific: 'Pavo cristatus',
    location: 'Netravali Sanctuary, Goa',
    coords: '15.0832° N, 74.2115° E',
    sightings: 6,
    status: 'Verified Sighting',
    color: '#059669',
    pinX: '65%',
    pinY: '42%',
  },
  {
    name: 'White-throated Kingfisher',
    scientific: 'Halcyon smyrnensis',
    location: 'Mandovi Estuary, Goa',
    coords: '15.4989° N, 73.8278° E',
    sightings: 14,
    status: 'High Frequency',
    color: '#0284c7',
    pinX: '38%',
    pinY: '58%',
  },
  {
    name: 'Malabar Pied Hornbill',
    scientific: 'Anthracoceros coronatus',
    location: 'Bhagwan Mahaveer Sanctuary',
    coords: '15.3412° N, 74.2891° E',
    sightings: 3,
    status: 'Rare Sighting',
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
      borderRadius: '18px',
      border: '1.5px solid rgba(29, 78, 216, 0.18)',
      padding: '16px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
      marginBottom: '1.5rem',
    }}>
      {/* Mini App Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#1D4ED8',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginLeft: '6px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Live Radar & Sighting Feed
          </span>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          padding: '2px 8px',
          borderRadius: '9999px',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#059669' }} />
          REAL-TIME
        </span>
      </div>

      {/* Simulated Map Canvas */}
      <div style={{
        position: 'relative',
        height: '140px',
        borderRadius: '12px',
        backgroundColor: '#EEF2FF',
        border: '1.5px solid rgba(29, 78, 216, 0.14)',
        overflow: 'hidden',
        marginBottom: '12px',
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
            width: '200px',
            height: '200px',
            marginTop: '-100px',
            marginLeft: '-100px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(29,78,216,0.18) 0deg, transparent 60deg, transparent 360deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Contour lines simulation */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }} preserveAspectRatio="none">
          <path d="M0,60 Q80,20 160,50 T320,40" fill="none" stroke="#1D4ED8" strokeWidth="1.5" />
          <path d="M0,90 Q90,70 180,100 T360,85" fill="none" stroke="#1D4ED8" strokeWidth="1.5" strokeDasharray="4 4" />
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
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#1D4ED8',
            }}
          />
          {/* Pin head */}
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#1D4ED8',
            border: '2.5px solid #fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            zIndex: 2,
          }} />
          <span style={{
            backgroundColor: 'rgba(29, 78, 216, 0.95)',
            color: '#fff',
            fontSize: '0.6rem',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '4px',
            marginTop: '3px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}>
            {current.coords}
          </span>
        </motion.div>
      </div>

      {/* Species selector pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        {speciesList.map((sp, idx) => {
          const isSelected = idx === activeSpecies;
          return (
            <motion.button
              key={sp.name}
              onClick={() => setActiveSpecies(idx)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              style={{
                background: isSelected ? '#1D4ED8' : 'rgba(29, 78, 216, 0.06)',
                color: isSelected ? '#F5F0E8' : '#1D4ED8',
                border: isSelected ? '1px solid #1D4ED8' : '1px solid rgba(29, 78, 216, 0.15)',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
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
        marginTop: '10px',
        padding: '8px 12px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        border: '1px solid rgba(29, 78, 216, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.7rem',
      }}>
        <div>
          <strong style={{ color: '#111' }}>{current.location}</strong>
          <span style={{ color: '#666', marginLeft: '6px' }}>({current.scientific})</span>
        </div>
        <span style={{
          fontWeight: 800,
          color: current.color,
          backgroundColor: `${current.color}15`,
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '0.65rem',
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
      borderRadius: '18px',
      border: '1.5px solid rgba(29, 78, 216, 0.18)',
      padding: '16px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
      marginBottom: '1.5rem',
    }}>
      {/* App Bar & Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#1D4ED8',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginLeft: '6px',
            fontFamily: 'Inter, sans-serif',
          }}>
            GEC Hackfest Portal
          </span>
        </div>

        {/* Tab switch */}
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
              fontSize: '0.64rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
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
              fontSize: '0.64rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Pass
          </button>
        </div>
      </div>

      {tab === 'schedule' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {[
            { time: '09:30 AM', title: 'Opening Keynote & Team Reveal', tag: 'Main Stage' },
            { time: '11:00 AM', title: '24H Hackathon Sprint Commences', tag: 'Arena B' },
            { time: '04:00 PM', title: 'Design & Engineering Workshop', tag: 'Lab 04' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '9px 12px',
                border: '1px solid rgba(29, 78, 216, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#1D4ED8', display: 'block' }}>{item.time}</span>
                <span style={{ fontSize: '0.73rem', fontWeight: 600, color: '#111' }}>{item.title}</span>
              </div>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                color: '#1D4ED8',
                backgroundColor: 'rgba(29, 78, 216, 0.08)',
                padding: '3px 7px',
                borderRadius: '6px',
              }}>
                {item.tag}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            backgroundColor: '#1D4ED8',
            borderRadius: '12px',
            padding: '14px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8 }}>OFFICIAL ENTRY PASS</span>
              <h4 style={{ margin: '2px 0 0', fontSize: '0.92rem', fontWeight: 800 }}>GEC HACKFEST 2024</h4>
            </div>
            <span style={{
              backgroundColor: '#F5F0E8',
              color: '#1D4ED8',
              fontSize: '0.6rem',
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: '9999px',
            }}>
              VIP ATTENDEE
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
            <div>
              <span style={{ fontSize: '0.6rem', opacity: 0.7, display: 'block' }}>HOLDER</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>SOMAY NAIK</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setClaimed(!claimed)}
              style={{
                backgroundColor: claimed ? '#22c55e' : '#F5F0E8',
                color: claimed ? '#fff' : '#1D4ED8',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.68rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s ease',
              }}
            >
              {claimed ? '✓ Verified Pass' : 'Tap to Claim →'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ── Interactive Prototype: Tandav Scorer (Project 3) ── */
const TandavWidget: React.FC = () => {
  const [score, setScore] = useState(168);
  const [wickets, setWickets] = useState(4);
  const [balls, setBalls] = useState<Array<string | number>>([1, 4, 0, 6, 2, 'W']);
  const [lastAction, setLastAction] = useState<string>('Live Match in Progress');

  const addRun = (runs: number) => {
    setScore(prev => prev + runs);
    setBalls(prev => [...prev.slice(-5), runs]);
    setLastAction(runs === 6 ? 'SIX! Out of the park! 🚀' : runs === 4 ? 'FOUR! Pierces the cover gap! 🔥' : '+1 Run taken');
  };

  const addWicket = () => {
    if (wickets < 10) {
      setWickets(prev => prev + 1);
      setBalls(prev => [...prev.slice(-5), 'W']);
      setLastAction('WICKET! Clean bowled! 🎯');
    }
  };

  const resetMatch = () => {
    setScore(168);
    setWickets(4);
    setBalls([1, 4, 0, 6, 2, 'W']);
    setLastAction('Scoreboard reset to baseline');
  };

  return (
    <div style={{
      backgroundColor: '#FAF8F5',
      borderRadius: '18px',
      border: '1.5px solid rgba(29, 78, 216, 0.18)',
      padding: '16px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
      marginBottom: '1.5rem',
    }}>
      {/* App Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#1D4ED8',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginLeft: '6px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Tandav Live Engine
          </span>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#1D4ED8',
          backgroundColor: 'rgba(29, 78, 216, 0.08)',
          padding: '2px 8px',
          borderRadius: '9999px',
        }}>
          CRICKET FINALS
        </span>
      </div>

      {/* Main Scoreboard Display */}
      <div style={{
        backgroundColor: '#1D4ED8',
        borderRadius: '12px',
        padding: '12px 16px',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
      }}>
        <div>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', opacity: 0.85, textTransform: 'uppercase' }}>
            Goa Titans vs Warriors
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
            <motion.span
              key={score}
              initial={{ scale: 1.15, color: '#FCD34D' }}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.75rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {score}
            </motion.span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, opacity: 0.75 }}>/ {wickets}</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.8, marginLeft: '6px' }}>(18.4 Ov • CRR 9.16)</span>
          </div>
        </div>

        {/* Action message */}
        <span style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          color: '#FCD34D',
          backgroundColor: 'rgba(0,0,0,0.25)',
          padding: '4px 8px',
          borderRadius: '6px',
          maxWidth: '130px',
          textAlign: 'right',
        }}>
          {lastAction}
        </span>
      </div>

      {/* Ball by ball stream */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>This Over:</span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {balls.map((b, i) => (
            <motion.span
              key={`${i}-${b}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: b === 'W' ? '#ef4444' : b === 6 ? '#8b5cf6' : b === 4 ? '#3b82f6' : '#fff',
                color: typeof b === 'number' && b < 4 ? '#111' : '#fff',
                border: '1px solid rgba(29, 78, 216, 0.15)',
                fontSize: '0.68rem',
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => addRun(1)}
          style={{
            backgroundColor: '#fff',
            color: '#1D4ED8',
            border: '1.5px solid rgba(29, 78, 216, 0.2)',
            borderRadius: '8px',
            padding: '7px 0',
            fontSize: '0.72rem',
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
            border: '1.5px solid rgba(29, 78, 216, 0.3)',
            borderRadius: '8px',
            padding: '7px 0',
            fontSize: '0.72rem',
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
            border: '1.5px solid rgba(124, 58, 237, 0.3)',
            borderRadius: '8px',
            padding: '7px 0',
            fontSize: '0.72rem',
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
            border: '1.5px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '7px 0',
            fontSize: '0.72rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          +W
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={resetMatch}
          title="Reset Scoreboard"
          style={{
            backgroundColor: '#fff',
            color: '#666',
            border: '1.5px solid rgba(0,0,0,0.12)',
            borderRadius: '8px',
            padding: '7px 0',
            fontSize: '0.72rem',
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
        padding: '100px 0 110px',
        borderBottom: '1.5px solid rgba(29, 78, 216, 0.15)',
        position: 'relative',
      }}
    >
      {/* Anchor for backward compatibility with #work */}
      <div id="work" style={{ position: 'absolute', top: 0, left: 0 }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>

        {projects.map((p, i) => (
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            style={{ marginBottom: i < projects.length - 1 ? '7.5rem' : 0 }}
          >
            {/* Emil Kowalski Section Title: Clean editorial typographic treatment */}
            <div style={{ textAlign: 'center', marginBottom: '1.6rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(29, 78, 216, 0.07)',
                border: '1px solid rgba(29, 78, 216, 0.15)',
                marginBottom: '10px',
              }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
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
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
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
              padding: '14px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  color: '#111',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {p.role} — {p.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  color: '#059669',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(5, 150, 105, 0.2)',
                  letterSpacing: '0.08em',
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
                  fontSize: '0.84rem',
                  color: '#1D4ED8',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {p.org}
                </span>
              </div>
            </div>

            {/* 2-Column Split Layout with Emil Kowalski Craft */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'stretch' }}>

              {/* Left Column: Interactive Prototype Widget + Handwritten Challenge Quote */}
              <motion.div
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                style={{
                  flex: '1 1 360px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(29, 78, 216, 0.22)',
                  borderRadius: '24px',
                  padding: '2.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: '0 1px 3px rgba(29, 78, 216, 0.04), 0 16px 36px -12px rgba(29, 78, 216, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div>
                  {/* Top Header Row in Card */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}>
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        backgroundColor: '#EEF2FF',
                        border: '1.5px solid #1D4ED8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        boxShadow: '0 4px 14px rgba(29,78,216,0.12)',
                      }}>
                        {p.icon}
                      </div>
                      <div>
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          color: '#1D4ED8',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          display: 'block',
                        }}>
                          LIVE DEMO PREVIEW
                        </span>
                        <h4 style={{
                          margin: 0,
                          fontSize: '1.1rem',
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontWeight: 800,
                          color: '#111',
                        }}>
                          {p.title}
                        </h4>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#666',
                      backgroundColor: '#F5F0E8',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}>
                      Interactive
                    </span>
                  </div>

                  {/* Emil Kowalski Tangible Interactive Widget */}
                  {p.widget}

                  {/* Handwritten Speech Bubble for Challenge */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    style={{
                      backgroundColor: '#F5F0E8',
                      border: '2px solid #1D4ED8',
                      borderRadius: '18px',
                      padding: '14px 18px',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(29,78,216,0.06)',
                    }}
                  >
                    <span style={{
                      fontSize: '0.62rem',
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
                      fontSize: '1.32rem',
                      fontWeight: 700,
                      color: '#1D4ED8',
                      lineHeight: 1.25,
                      margin: 0,
                    }}>
                      "{p.challenge}"
                    </p>
                  </motion.div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(29, 78, 216, 0.1)' }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 800,
                    fontSize: '0.75rem',
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
                  flex: '1 1 380px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(29, 78, 216, 0.22)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(29, 78, 216, 0.04), 0 16px 36px -12px rgba(29, 78, 216, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      color: '#1D4ED8',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}>
                      ENGINEERING BREAKDOWN
                    </span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'rgba(29,78,216,0.5)',
                    }}>
                      #{p.number}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
                    color: '#111',
                    marginBottom: '1.2rem',
                    marginTop: 0,
                    letterSpacing: '-0.01em',
                  }}>
                    {p.title}
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(29, 78, 216, 0.04)',
                    borderLeft: '3px solid #1D4ED8',
                    padding: '12px 16px',
                    borderRadius: '0 12px 12px 0',
                    marginBottom: '1.8rem',
                  }}>
                    <span style={{
                      display: 'block',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#1D4ED8',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      SOLUTION OVERVIEW
                    </span>
                    <p style={{
                      fontSize: '0.98rem',
                      color: '#333',
                      lineHeight: 1.7,
                      margin: 0,
                      fontWeight: 500,
                    }}>
                      {p.solution}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Tech stack pills with Emil Kowalski spring hover */}
                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{
                      display: 'block',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#666',
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}>
                      Technologies Used
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {p.techStack.map(t => (
                        <motion.span
                          key={t}
                          whileHover={{ scale: 1.06, y: -2 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                          style={{
                            backgroundColor: 'rgba(29, 78, 216, 0.07)',
                            color: '#1D4ED8',
                            border: '1px solid rgba(29, 78, 216, 0.22)',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            letterSpacing: '0.03em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'default',
                            transition: 'background-color 0.2s ease, border-color 0.2s ease',
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
                      gap: '12px',
                      flexWrap: 'wrap',
                      paddingTop: '1.2rem',
                      borderTop: '1px solid rgba(29, 78, 216, 0.1)',
                    }}>
                      {/* Primary View Code button */}
                      <motion.a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          backgroundColor: '#1D4ED8',
                          color: '#F5F0E8',
                          padding: '12px 22px',
                          borderRadius: '9999px',
                          fontSize: '0.82rem',
                          fontWeight: 800,
                          textDecoration: 'none',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 14px rgba(29, 78, 216, 0.25)',
                        }}
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        View Project Code
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        >
                          →
                        </motion.span>
                      </motion.a>

                      {/* Secondary Copy Link Button with Tactile Feedback */}
                      <motion.button
                        onClick={() => handleCopyLink(p.link, i)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#fff',
                          color: copiedIndex === i ? '#059669' : '#1D4ED8',
                          border: `1.5px solid ${copiedIndex === i ? '#059669' : 'rgba(29, 78, 216, 0.25)'}`,
                          padding: '11px 18px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          letterSpacing: '0.06em',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {copiedIndex === i ? (
                          <>
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Copied Repo URL!
                          </>
                        ) : (
                          <>
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Link
                          </>
                        )}
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

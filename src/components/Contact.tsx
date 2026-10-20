import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  React.useEffect(() => {
    if (status === 'ok') {
      const t = setTimeout(() => { setStatus('idle'); setMsg(''); }, 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      for (const url of ['/api/contact', 'http://localhost:5000/api/contact']) {
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
          const ct = res.headers.get('content-type') || '';
          if (!ct.includes('application/json')) continue;
          const data = await res.json();
          if (res.ok && data?.success) {
            setStatus('ok');
            setMsg(data?.message || "Message sent! Your email was delivered directly to Somay's inbox.");
            setForm({ name: '', email: '', message: '' });
            return;
          }
        } catch {
          /* try next fallback url */
        }
      }
      throw new Error('Server unreachable');
    } catch (err: any) {
      setStatus('err');
      setMsg('Could not reach the local email server. You can click below to send via your email client directly.');
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Portfolio Message from ${form.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Somay,\n\n${form.message || ''}\n\nBest regards,\n${form.name || 'Visitor'}\n${form.email ? `Email: ${form.email}` : ''}`
    );
    return `mailto:dragonwarriorpo06@gmail.com?subject=${subject}&body=${body}`;
  };

  const getInputStyle = (fieldName: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 18px',
    borderRadius: '16px',
    border: `1.5px solid ${focusedField === fieldName ? '#1D4ED8' : 'rgba(29, 78, 216, 0.25)'}`,
    backgroundColor: '#FFFFFF',
    fontSize: '0.94rem',
    color: '#111',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
    fontWeight: 500,
    boxShadow: focusedField === fieldName
      ? '0 0 0 4px rgba(29, 78, 216, 0.16), 0 2px 8px rgba(0,0,0,0.04)'
      : '0 1px 3px rgba(0,0,0,0.02)',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 800,
    letterSpacing: '0.18em',
    color: '#1D4ED8',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#F5F0E8',
        padding: 'clamp(60px, 8vw, 95px) 0 clamp(70px, 8vw, 110px)',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 36px)', boxSizing: 'border-box' }}>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.22em',
            color: '#1D4ED8',
            backgroundColor: 'rgba(29, 78, 216, 0.08)',
            padding: '5px 14px',
            borderRadius: '9999px',
            border: '1px solid rgba(29, 78, 216, 0.2)',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            ✦ SAY HELLO
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            color: '#1D4ED8',
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          CONTACT
        </motion.h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'flex-start', width: '100%', boxSizing: 'border-box' }}>

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '1 1 280px', minWidth: 0, width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
          >
            <h3 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 900,
              fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
              color: '#111',
              lineHeight: 1.25,
              marginBottom: '1.2rem',
              textTransform: 'uppercase',
            }}>
              Let's build something great together.
            </h3>

            <p style={{ fontSize: '1rem', color: '#444', lineHeight: 1.75, marginBottom: '2rem', fontWeight: 500 }}>
              Whether it's a software project, tech hackathon collaboration, or just an unhinged 1 AM engineering idea — I'm always open.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1.5px solid rgba(29, 78, 216, 0.18)',
                marginBottom: '2rem',
                boxShadow: '0 4px 14px rgba(29,78,216,0.04)',
              }}
            >
              <p style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.42rem',
                fontWeight: 700,
                color: '#1D4ED8',
                margin: 0,
                lineHeight: 1.25,
              }}>
                "Drop a message and let's turn ideas into high-impact reality!"
              </p>
            </motion.div>

            {/* Tactile social & direct contact link cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  href: 'mailto:dragonwarriorpo06@gmail.com',
                  label: 'Email Somay Directly',
                  desc: 'dragonwarriorpo06@gmail.com',
                  icon: '✉️',
                },
                {
                  href: 'https://www.linkedin.com/in/somay-naik-27a4aa248',
                  label: 'LinkedIn Profile',
                  desc: 'Connect for career & collabs',
                  icon: '💼',
                },
                {
                  href: 'https://github.com/somaynaik',
                  label: 'GitHub Repositories',
                  desc: 'Explore source code & repos',
                  icon: '💻',
                },
              ].map(({ href, label: lbl, desc, icon }) => (
                <motion.a
                  key={lbl}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  whileHover={{ x: 6, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(29, 78, 216, 0.16)',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#EEF2FF',
                      border: '1.5px solid #1D4ED8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.15rem',
                      flexShrink: 0,
                    }}>
                      {icon}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ display: 'block', color: '#111', fontWeight: 800, fontSize: '0.92rem' }}>{lbl}</span>
                      <span style={{ display: 'block', color: '#666', fontSize: '0.75rem', fontWeight: 500, wordBreak: 'break-word' }}>{desc}</span>
                    </div>
                  </div>
                  <span style={{ color: '#1D4ED8', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>&rarr;</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: '1 1 280px',
              minWidth: 0,
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(18px, 4vw, 2.4rem)',
              border: '1.5px solid rgba(29, 78, 216, 0.2)',
              boxShadow: '0 16px 40px -10px rgba(29, 78, 216, 0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  style={{
                    marginBottom: '1.5rem',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    backgroundColor: status === 'ok' ? '#f0fdf4' : '#fef2f2',
                    color: status === 'ok' ? '#166534' : '#991b1b',
                    border: `1.5px solid ${status === 'ok' ? '#bbf7d0' : '#fecaca'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>{status === 'ok' ? '✓' : '⚠'}</span>
                    <span>{msg}</span>
                  </div>

                  {status === 'err' && (
                    <a
                      href={getMailtoLink()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#1D4ED8',
                        color: '#FFFFFF',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        width: 'fit-content',
                        marginTop: '4px',
                      }}
                    >
                      Open Email App to Send &rarr;
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  required
                  style={getInputStyle('name')}
                />
              </div>

              <div>
                <label style={labelStyle}>Your Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  required
                  style={getInputStyle('email')}
                />
              </div>

              <div>
                <label style={labelStyle}>Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project, idea, or questions..."
                  required
                  rows={5}
                  style={{ ...getInputStyle('message'), resize: 'none' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status === 'sending' ? {} : { scale: 1.02 }}
                whileTap={status === 'sending' ? {} : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                style={{
                  backgroundColor: '#1D4ED8',
                  color: '#F5F0E8',
                  padding: '16px',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.7 : 1,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  boxShadow: '0 6px 22px rgba(29, 78, 216, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '6px',
                }}
              >
                {status === 'sending' ? (
                  <>
                    <span style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    Transmitting...
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      &rarr;
                    </motion.span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;

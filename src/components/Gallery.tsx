import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type ImageItem = { filename: string; url: string; caption: string };

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/images', { mode: 'cors', credentials: 'omit' });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setImages(data?.images || []);
      } catch {
        setError('Backend not running — no images to show.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="gallery" style={{ backgroundColor: '#F5F0E8', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', color: '#bbb', textTransform: 'uppercase', marginBottom: '6px' }}>
          Photos
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem, 6vw, 4rem)', color: '#1D4ED8', letterSpacing: '-0.01em', marginBottom: '2.5rem' }}>
          GALLERY
        </motion.h2>

        {loading && <p style={{ color: '#999', textAlign: 'center' }}>Loading…</p>}
        {error && <p style={{ color: '#aaa', textAlign: 'center', fontStyle: 'italic' }}>{error}</p>}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {images.map((img, i) => (
              <motion.div key={img.filename}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(29,78,216,0.1)' }}>
                <img src={`http://localhost:5000${img.url}`} alt={img.caption || img.filename}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '12px 16px' }}>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: img.caption ? '#444' : '#bbb', fontStyle: img.caption ? 'normal' : 'italic' }}>
                    {img.caption || 'No caption'}
                  </p>
                </div>
              </motion.div>
            ))}
            {images.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#bbb', padding: '3rem 0', fontStyle: 'italic' }}>
                No images yet.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

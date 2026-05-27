import React from 'react';
import { ShieldCheck, Search, Menu } from 'lucide-react';

const Navbar = ({ onOpenReport }) => {
  return (
    <nav style={{ padding: '20px 0', position: 'fixed', width: '100%', top: 0, zIndex: 100, background: 'rgba(7, 11, 20, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={32} color="var(--accent-cyan)" />
          <span style={{ fontFamily: 'Outfit', fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            TrustScore <span className="text-gradient">Ethiopia</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="nav-links">
          <a href="#home" style={{ fontSize: '15px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent-cyan)'} onMouseOut={e => e.target.style.color = 'inherit'}>Home</a>
          <a href="#verify" style={{ fontSize: '15px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent-cyan)'} onMouseOut={e => e.target.style.color = 'inherit'}>Verify</a>
          <button onClick={onOpenReport} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer', padding: 0 }} onMouseOver={e => e.target.style.color = 'var(--accent-crimson)'} onMouseOut={e => e.target.style.color = 'inherit'}>Report Fraud</button>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }} onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>
            <Search size={16} /> Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

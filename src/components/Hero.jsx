import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const Hero = ({ onOpenReport }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);
    setReports(null);

    try {
      const response = await fetch(`/api/verify?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to verify');

      setResults(data.results);
      setReports(data.reports);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '120px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--accent-cyan)', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--accent-emerald)', filter: 'blur(180px)', opacity: 0.1, borderRadius: '50%', zIndex: -1 }}></div>

      <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '24px', fontSize: '14px', color: 'var(--accent-cyan)', fontWeight: 500 }}>
          <CheckCircle size={16} /> Empowering Trust in Ethiopia's Digital Economy
        </div>

        <h1 className="animate-fade-in delay-100" style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>
          Verify First. <br />
          <span className="text-gradient">Transact with Confidence.</span>
        </h1>

        <p className="animate-fade-in delay-200" style={{ fontSize: '20px', color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          Ethiopia's premier platform for business and identity verification. Protect yourself from fraud with real-time trust scores and community reports.
        </p>

        <div className="animate-fade-in delay-300 glass-panel" style={{ padding: '12px', display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto', borderRadius: '16px' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '16px' }} />
            <input
              type="text"
              placeholder="Enter business name, phone, or TIN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '16px', padding: '16px 16px 16px 48px', outline: 'none' }}
            />
          </div>
          <button className="btn-primary" onClick={handleVerify} disabled={loading} style={{ padding: '0 32px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
          <button onClick={onOpenReport} style={{ background: 'rgba(255, 42, 95, 0.1)', color: 'var(--accent-crimson)', border: '1px solid rgba(255, 42, 95, 0.3)', padding: '0 24px', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 42, 95, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 42, 95, 0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            Report Fraud
          </button>
        </div>

        {/* Results Section */}
        {(results || reports || error) && (
          <div className="animate-fade-in glass-panel" style={{ marginTop: '24px', padding: '24px', maxWidth: '600px', margin: '24px auto 0 auto', textAlign: 'left' }}>
            {error && <div style={{ color: 'var(--accent-crimson)', display: 'flex', alignItems: 'center', gap: '8px' }}><XCircle size={20} /> {error}</div>}

            {reports && reports.length > 0 && (
              <div style={{ background: 'rgba(255, 42, 95, 0.1)', border: '1px solid var(--accent-crimson)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <h4 style={{ color: 'var(--accent-crimson)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 8px 0' }}><ShieldAlert size={20} /> WARNING: Fraud Reports Found</h4>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-main)' }}>There are {reports.length} report(s) matching your search term.</p>
                <ul style={{ marginTop: '8px', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  {reports.map((r, i) => (
                    <li key={i}>{r.description} (Reported against: {r.business_identifier})</li>
                  ))}
                </ul>
              </div>
            )}

            {results && results.length === 0 && (!reports || reports.length === 0) && (
              <div style={{ color: 'var(--text-muted)' }}>No official business records or reports found for "{query}". Please exercise caution.</div>
            )}

            {results && results.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {results.map((biz) => (
                  <div key={biz.id} style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', margin: '0 0 4px 0' }}>{biz.name} {biz.verified && <CheckCircle size={16} color="var(--accent-cyan)" title="Verified Business" />}</h3>
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>ID/TIN: {biz.identifier}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: biz.trust_score > 80 ? 'var(--accent-emerald)' : biz.trust_score > 50 ? '#FFD166' : 'var(--accent-crimson)' }}>
                        {biz.trust_score}/100
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{biz.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="animate-fade-in delay-300" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px', fontSize: '14px', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={16} color="var(--accent-emerald)" /> 100K+ Verifications</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldAlert size={16} color="var(--accent-crimson)" /> Real-time Fraud Alerts</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

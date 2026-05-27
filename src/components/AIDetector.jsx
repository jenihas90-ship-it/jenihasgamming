import React, { useState } from 'react';
import { Bot, ShieldAlert, Cpu } from 'lucide-react';

const AIDetector = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="ai-detector" className="section" style={{ padding: '80px 0', background: 'rgba(0,0,0,0.2)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'var(--accent-cyan)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%', zIndex: -1 }}></div>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '16px', fontSize: '14px', color: 'var(--accent-cyan)', fontWeight: 500 }}>
                        <Cpu size={16} /> Advanced Pattern Analysis
                    </div>
                    <h2 style={{ fontSize: '40px', marginBottom: '16px' }}>AI <span className="text-gradient">Scam Detector</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Paste any suspicious message, email, or offer. Our smart engine will scan it for common fraud patterns in real-time.</p>
                </div>

                <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '32px', borderRadius: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <textarea
                            rows={6}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste the suspicious text here... e.g. 'Urgent! Send crypto deposit via Telegram to double your investment returns guarantee!'"
                            style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '16px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                        />

                        <button className="btn-primary" onClick={handleAnalyze} disabled={loading || !text.trim()} style={{ padding: '16px', fontSize: '16px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', opacity: (loading || !text.trim()) ? 0.7 : 1 }}>
                            <Bot size={20} /> {loading ? 'Scanning Text...' : 'Analyze Message'}
                        </button>
                    </div>

                    {error && <div style={{ marginTop: '24px', color: 'var(--accent-crimson)', textAlign: 'center' }}>{error}</div>}

                    {result && (
                        <div className="animate-fade-in" style={{ marginTop: '32px', padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: `1px solid ${result.color}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: result.color === 'var(--accent-emerald)' ? 'rgba(0, 255, 128, 0.2)' : result.color === '#FFD166' ? 'rgba(255, 209, 102, 0.2)' : 'rgba(255, 42, 95, 0.2)', color: result.color, border: `2px solid ${result.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                                        {result.score}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Risk Score (0=Safe, 100=Max Risk)</div>
                                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: result.color }}>{result.status}</div>
                                    </div>
                                </div>
                            </div>

                            {result.flags.length > 0 && (
                                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-crimson)', marginBottom: '12px' }}>
                                        <ShieldAlert size={16} /> <span style={{ fontWeight: 500 }}>Detected Risk Flags</span>
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '24px', color: 'var(--text-muted)' }}>
                                        {result.flags.map((flag, idx) => (
                                            <li key={idx} style={{ marginBottom: '8px' }}>{flag}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AIDetector;

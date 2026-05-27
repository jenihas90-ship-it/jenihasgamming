import React from 'react';
import { Map, AlertOctagon, TrendingUp, ShieldAlert } from 'lucide-react';

const FraudMap = () => {
    const hotspots = [
        { city: "Addis Ababa", reports: 245, risk: "High", trend: "+12%" },
        { city: "Hawassa", reports: 86, risk: "Medium", trend: "+5%" },
        { city: "Dire Dawa", reports: 54, risk: "Medium", trend: "-2%" },
        { city: "Adama", reports: 31, risk: "Low", trend: "-8%" }
    ];

    return (
        <section id="fraud-map" className="section" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '10%', top: '30%', width: '300px', height: '300px', background: 'var(--accent-crimson)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%', zIndex: -1 }}></div>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 42, 95, 0.1)', border: '1px solid rgba(255, 42, 95, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '16px', fontSize: '14px', color: 'var(--accent-crimson)', fontWeight: 500 }}>
                        <Map size={16} /> Live Fraud Heatmap
                    </div>
                    <h2 style={{ fontSize: '40px', marginBottom: '16px' }}>Regional <span className="text-gradient">Risk Analysis</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Monitor fraud trends across Ethiopia in real-time. Data is crowd-sourced from validated community reports.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {hotspots.map((spot, idx) => (
                        <div key={idx} className="glass-panel hover-card" style={{ padding: '24px', borderRadius: '20px', borderLeft: `4px solid ${spot.risk === 'High' ? 'var(--accent-crimson)' : spot.risk === 'Medium' ? '#FFD166' : 'var(--accent-emerald)'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '20px', margin: 0 }}>{spot.city}</h3>
                                <div style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', background: spot.risk === 'High' ? 'rgba(255, 42, 95, 0.1)' : spot.risk === 'Medium' ? 'rgba(255, 209, 102, 0.1)' : 'rgba(0, 255, 128, 0.1)', color: spot.risk === 'High' ? 'var(--accent-crimson)' : spot.risk === 'Medium' ? '#FFD166' : 'var(--accent-emerald)' }}>
                                    {spot.risk} Risk
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Reports</div>
                                    <div style={{ fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <AlertOctagon size={24} color="var(--accent-crimson)" opacity={0.8} /> {spot.reports}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Monthly Trend</div>
                                    <div style={{ fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: spot.trend.startsWith('+') ? 'var(--accent-crimson)' : 'var(--accent-emerald)' }}>
                                        <TrendingUp size={16} /> {spot.trend}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <ShieldAlert size={16} /> <span>Stay vigilant in high-risk zones. Always verify before sending money.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FraudMap;

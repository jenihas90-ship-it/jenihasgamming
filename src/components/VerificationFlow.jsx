import React, { useState } from 'react';
import { Smartphone, ShieldCheck, KeyRound, CheckCircle } from 'lucide-react';

const VerificationFlow = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (!phone) return;
        setLoading(true);
        // Simulate SMS send
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Focus next
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const verifyOtp = () => {
        const code = otp.join('');
        if (code.length !== 6) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1500);
    };

    return (
        <section id="verification" className="section" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20%', bottom: '10%', width: '400px', height: '400px', background: 'var(--accent-emerald)', filter: 'blur(200px)', opacity: 0.1, borderRadius: '50%', zIndex: -1 }}></div>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0, 255, 128, 0.1)', border: '1px solid rgba(0, 255, 128, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '16px', fontSize: '14px', color: 'var(--accent-emerald)', fontWeight: 500 }}>
                        <ShieldCheck size={16} /> Official Identity Verification
                    </div>
                    <h2 style={{ fontSize: '40px', marginBottom: '24px' }}>Claim Your <span className="text-gradient" style={{ background: 'linear-gradient(90deg, #00F0FF 0%, #00FF80 100%)', WebkitBackgroundClip: 'text' }}>Business Badge</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px', marginBottom: '32px' }}>
                        Boost customer confidence by claiming your business. Complete the SMS verification flow to unlock your official verified badge and gain priority placement in search results.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}><CheckCircle color="var(--accent-emerald)" size={20} /> Increased Trust Score</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}><CheckCircle color="var(--accent-emerald)" size={20} /> Respond to reviews</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}><CheckCircle color="var(--accent-emerald)" size={20} /> Advanced analytics dashboard</li>
                    </ul>
                </div>

                <div style={{ flex: 1, minWidth: '320px', maxWidth: '400px', margin: '0 auto' }}>
                    <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>

                        {step === 1 && (
                            <div className="animate-fade-in">
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
                                        <Smartphone size={32} color="var(--accent-cyan)" />
                                    </div>
                                    <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Phone Verification</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Enter your registered business number</p>
                                </div>
                                <form onSubmit={handlePhoneSubmit}>
                                    <div style={{ position: 'relative', marginBottom: '24px' }}>
                                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }}>+251</span>
                                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="911 234 567" style={{ width: '100%', padding: '16px 16px 16px 64px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '18px', outline: 'none', boxSizing: 'border-box' }} required />
                                    </div>
                                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}>
                                        {loading ? 'Sending SMS...' : 'Send OTP Code'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fade-in">
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
                                        <KeyRound size={32} color="var(--accent-cyan)" />
                                    </div>
                                    <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Enter OTP</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>We sent a 6-digit code to +251 {phone}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx} id={`otp-${idx}`} type="text" maxLength={1} value={digit}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            style={{ width: '40px', height: '48px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', fontSize: '24px', outline: 'none' }}
                                        />
                                    ))}
                                </div>
                                <button onClick={verifyOtp} disabled={loading || otp.join('').length !== 6} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}>
                                    {loading ? 'Verifying...' : 'Verify Code'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                    <button onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>Change number</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ display: 'inline-flex', background: 'rgba(0, 255, 128, 0.1)', padding: '24px', borderRadius: '50%', marginBottom: '24px' }}>
                                    <CheckCircle size={48} color="var(--accent-emerald)" />
                                </div>
                                <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', color: 'var(--accent-emerald)' }}>Phone Verified!</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Your business entity is now verified. Your trust score has been boosted.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerificationFlow;

import React, { useState } from 'react';
import { X, AlertTriangle, MessageSquare, MapPin, CheckCircle } from 'lucide-react';

const ReportModal = ({ onClose }) => {
    const [formData, setFormData] = useState({ identifier: '', description: '', city: 'Addis Ababa', type: 'Scam' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Failed to submit report');
            setSuccess(true);
            setTimeout(onClose, 2500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="glass-panel animate-fade-in" style={{ width: '90%', maxWidth: '500px', padding: '32px', borderRadius: '24px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', margin: '0 0 24px 0', color: formData.type === 'Review' ? 'var(--accent-emerald)' : 'var(--accent-crimson)' }}>
                    {formData.type === 'Scam' ? <AlertTriangle /> : <MessageSquare />}
                    {formData.type === 'Review' ? 'Leave a Review' : 'Submit a Report'}
                </h2>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>
                        <div style={{ display: 'inline-flex', background: 'rgba(0, 255, 128, 0.1)', padding: '16px', borderRadius: '50%', color: 'var(--accent-emerald)', marginBottom: '16px' }}>
                            <CheckCircle size={32} />
                        </div>
                        <h3 style={{ fontSize: '20px', color: 'var(--accent-emerald)' }}>Submitted!</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Thank you for keeping the community safe.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Report Type</label>
                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                                    <option value="Scam" style={{ background: '#111' }}>Scam / Fraud</option>
                                    <option value="Complaint" style={{ background: '#111' }}>Business Complaint</option>
                                    <option value="Review" style={{ background: '#111' }}>Trusted Review</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />City</label>
                                <select value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none' }}>
                                    <option value="Addis Ababa" style={{ background: '#111' }}>Addis Ababa</option>
                                    <option value="Hawassa" style={{ background: '#111' }}>Hawassa</option>
                                    <option value="Dire Dawa" style={{ background: '#111' }}>Dire Dawa</option>
                                    <option value="Bahar Dar" style={{ background: '#111' }}>Bahar Dar</option>
                                    <option value="Other" style={{ background: '#111' }}>Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Business Name / Phone / TIN</label>
                            <input required type="text" value={formData.identifier} onChange={e => setFormData({ ...formData, identifier: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} placeholder="e.g. 0911..." />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Description or Details</label>
                            <textarea required rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} placeholder="What happened?" />
                        </div>

                        {error && <div style={{ color: 'var(--accent-crimson)', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

                        <button type="submit" disabled={loading} style={{ background: formData.type === 'Review' ? 'var(--accent-emerald)' : 'var(--accent-crimson)', color: '#fff', padding: '14px', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.7 : 1, marginTop: '8px', width: '100%' }}>
                            {loading ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ReportModal;

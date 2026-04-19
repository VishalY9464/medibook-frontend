import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Clock, Star, ArrowRight, CheckCircle, Heart, Stethoscope, Brain, Eye, Bone, Baby, Smile, Activity } from 'lucide-react';
import { PublicNav } from '../components/Layout';

const SPECIALIZATIONS = [
  { icon: '❤️', name: 'Cardiologist' }, { icon: '🧠', name: 'Neurologist' },
  { icon: '👁️', name: 'Ophthalmologist' }, { icon: '🦷', name: 'Dentist' },
  { icon: '🦴', name: 'Orthopedist' }, { icon: '👶', name: 'Pediatrician' },
  { icon: '🩺', name: 'General Physician' }, { icon: '🧬', name: 'Dermatologist' },
];

const FEATURES = [
  { icon: '🔍', title: 'Find the Right Doctor', desc: 'Search by specialization, name, or location. Filter by rating, availability, and consultation mode.' },
  { icon: '📅', title: 'Easy Scheduling', desc: 'View real-time availability calendars and book appointments in under 2 minutes.' },
  { icon: '💊', title: 'Digital Medical Records', desc: 'Access your complete medical history, prescriptions, and follow-up reminders anytime.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'HIPAA-compliant platform with AES-256 encryption for all medical data.' },
  { icon: '📱', title: 'Teleconsultation', desc: 'Consult from the comfort of your home via high-quality video calls.' },
  { icon: '💳', title: 'Flexible Payments', desc: 'Pay via UPI, Card, Wallet, or at the clinic. Instant refunds on cancellation.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/find-doctors${search ? `?q=${search}` : ''}`);
  };

  return (
    <div>
      <PublicNav />

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag">
              <CheckCircle size={14} /> India's Trusted Healthcare Platform
            </div>
            <h1 className="hero-title">
              Your Health,<br /><span>Our Priority</span>
            </h1>
            <p className="hero-sub">
              Book appointments with verified doctors, consult online, and manage your complete health journey — all in one place.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hero-search">
              <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search doctors, specializations, symptoms..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {/* Stats */}
            <div className="hero-stats">
              {[
                { num: '500+', label: 'Verified Doctors' },
                { num: '50k+', label: 'Happy Patients' },
                { num: '20+', label: 'Specializations' },
                { num: '4.8★', label: 'Average Rating' },
              ].map(s => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Browse by Specialization</h2>
            <p className="section-sub">Find the right specialist for your needs</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px,1fr))', gap: 16 }}>
            {SPECIALIZATIONS.map(spec => (
              <div key={spec.name} className="spec-pill" onClick={() => navigate(`/find-doctors?spec=${spec.name}`)}>
                <span className="spec-pill-icon">{spec.icon}</span>
                <span className="spec-pill-name">{spec.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">How MediBook Works</h2>
            <p className="section-sub">Get care in 3 simple steps</p>
          </div>
          <div className="grid-3">
            {[
              { num: '01', title: 'Search & Find', desc: 'Browse verified doctors by specialization, location, or name. Read reviews and ratings.' },
              { num: '02', title: 'Book a Slot', desc: 'Choose your preferred date and time from real-time availability. Select in-person or video.' },
              { num: '03', title: 'Consult & Follow up', desc: 'Attend your appointment and receive digital prescriptions and follow-up reminders.' },
            ].map(step => (
              <div key={step.num} className="card" style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--primary)', opacity: 0.2, marginBottom: 12 }}>{step.num}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-sub">Comprehensive healthcare management at your fingertips</p>
          </div>
          <div className="grid-3">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg,#0c4a6e,#0ea5e9)', color: '#fff' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Ready to Take Control of Your Health?</h2>
          <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Join thousands of patients who trust MediBook for their healthcare needs.
          </p>
          <div className="flex justify-center gap-4" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-lg" style={{ background: '#fff', color: 'var(--primary)', fontWeight: 700 }}
              onClick={() => navigate('/register')}>
              Get Started Free <ArrowRight size={18} />
            </button>
            <button className="btn btn-lg btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
              onClick={() => navigate('/find-doctors')}>
              Find Doctors
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--text)', color: 'rgba(255,255,255,0.6)', padding: '32px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>🏥 Medi<span style={{ color: 'var(--primary)' }}>Book</span></div>
          <p style={{ fontSize: 13 }}>Book Smarter. Heal Faster. Care Better.</p>
          <p style={{ fontSize: 12, marginTop: 16, opacity: 0.4 }}>© 2026 MediBook Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

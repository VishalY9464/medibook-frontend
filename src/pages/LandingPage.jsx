import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle, Moon, Sun, Menu, X, Star, MapPin, Clock } from 'lucide-react';
import { PublicNav } from '../components/Layout';

const SPECIALIZATIONS = [
  { icon: '❤️', name: 'Cardiologist',      color: '#fee2e2', accent: '#ef4444' },
  { icon: '🧠', name: 'Neurologist',       color: '#ede9fe', accent: '#8b5cf6' },
  { icon: '👁️', name: 'Ophthalmologist',  color: '#dbeafe', accent: '#3b82f6' },
  { icon: '🦷', name: 'Dentist',           color: '#d1fae5', accent: '#10b981' },
  { icon: '🦴', name: 'Orthopedist',       color: '#fef3c7', accent: '#f59e0b' },
  { icon: '👶', name: 'Pediatrician',      color: '#fce7f3', accent: '#ec4899' },
  { icon: '🩺', name: 'General Physician', color: '#e0f2fe', accent: '#0ea5e9' },
  { icon: '🧬', name: 'Dermatologist',     color: '#f0fdf4', accent: '#22c55e' },
];

const FEATURES = [
  { icon: '🔍', title: 'Find the Right Doctor',   desc: 'Search by specialization, name, or location. Filter by rating, availability, and consultation mode.' },
  { icon: '📅', title: 'Easy Scheduling',         desc: 'View real-time availability calendars and book appointments in under 2 minutes.' },
  { icon: '💊', title: 'Digital Medical Records', desc: 'Access your complete medical history, prescriptions, and follow-up reminders anytime.' },
  { icon: '🔒', title: 'Secure & Private',        desc: 'HIPAA-compliant platform with AES-256 encryption for all medical data.' },
  { icon: '📱', title: 'Teleconsultation',        desc: 'Consult from the comfort of your home via high-quality video calls.' },
  { icon: '💳', title: 'Flexible Payments',       desc: 'Pay via UPI, Card, Wallet, or at the clinic. Instant refunds on cancellation.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma',  initials: 'PS', city: 'Mumbai',    rating: 5, text: 'MediBook made it so easy to find a cardiologist near me. Booked in 2 minutes and got instant confirmation!' },
  { name: 'Rahul Verma',   initials: 'RV', city: 'Delhi',     rating: 5, text: 'I used to spend hours on calls trying to get appointments. Now I just open MediBook and pick a slot. Life saver!' },
  { name: 'Anita Rao',     initials: 'AR', city: 'Bangalore', rating: 5, text: 'The video consultation feature is brilliant. Consulted a neurologist from home. Digital prescriptions are so handy.' },
  { name: 'Karan Mehta',   initials: 'KM', city: 'Pune',      rating: 4, text: 'Great platform. Doctors are verified and the reviews are genuine. Found an excellent pediatrician for my daughter.' },
  { name: 'Deepa Nair',    initials: 'DN', city: 'Chennai',   rating: 5, text: 'The medical records feature keeps everything in one place. No more carrying paper files to every appointment!' },
];

const TOP_DOCTORS = [
  { name: 'Dr. Aisha Kapoor', spec: 'Cardiologist',  exp: '14 yrs', rating: 4.9, reviews: 312, icon: '❤️' },
  { name: 'Dr. Rajan Pillai', spec: 'Neurologist',   exp: '11 yrs', rating: 4.8, reviews: 278, icon: '🧠' },
  { name: 'Dr. Sneha Gupta',  spec: 'Dermatologist', exp: '8 yrs',  rating: 4.9, reviews: 195, icon: '🧬' },
];

const STEPS = [
  { num: '01', icon: '🔍', title: 'Search & Find',       desc: 'Browse verified doctors by specialization, location, or name. Read genuine reviews.' },
  { num: '02', icon: '📅', title: 'Book a Slot',         desc: 'Pick your preferred date and time from real-time availability. In-person or video.' },
  { num: '03', icon: '✅', title: 'Consult & Follow up', desc: 'Attend your appointment and get digital prescriptions plus follow-up reminders.' },
];

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('lp-visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useTyping(words, speed = 90, pause = 1600) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pausingRef = useRef(false);

  useEffect(() => {
    if (pausingRef.current) return;
    const current = words[wordIdx];
    const delay = deleting ? Math.floor(speed / 2) : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIdx + 1);
        setDisplay(next);
        if (charIdx + 1 === current.length) {
          pausingRef.current = true;
          setTimeout(() => {
            pausingRef.current = false;
            setDeleting(true);
          }, pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        const next = current.slice(0, charIdx - 1);
        setDisplay(next);
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setWordIdx(i => (i + 1) % words.length);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#fbbf24' : '#e2e8f0', fontSize: 13 }}>★</span>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch]       = useState('');
  const [dark, setDark]           = useState(() => localStorage.getItem('medibook-theme') === 'dark');
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const typedText = useTyping(['Find Doctors', 'Book Instantly', 'Stay Healthy', 'Heal Faster']);

  const specRef   = useFadeUp();
  const stepsRef  = useFadeUp();
  const featRef   = useFadeUp();
  const docRef    = useFadeUp();
  const testimRef = useFadeUp();
  const ctaRef    = useFadeUp();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('medibook-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/find-doctors${search ? `?q=${search}` : ''}`);
  };

  return (
    <div>

      {/* ── Navbar ── */}
      <nav className={`lp-nav${scrolled ? ' lp-nav-scrolled' : ''}`}>
        <div className="container lp-nav-inner">
          <div className="topnav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            🏥 Medi<span>Book</span>
          </div>

          <div className={`lp-nav-links${mobileOpen ? ' lp-nav-open' : ''}`}>
            <span className="topnav-link" onClick={() => navigate('/find-doctors')} style={{ cursor: 'pointer' }}>
              Find Doctors
            </span>
            <button className="lp-theme-toggle" onClick={() => setDark(d => !d)} title="Toggle dark mode">
              {dark ? <Sun size={14} /> : <Moon size={14} />}
              {dark ? 'Light' : 'Dark'}
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>Sign Up</button>
          </div>

          <button className="lp-hamburger" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="lp-hero">
        <div className="lp-hero-bg-anim" />
        <div className="container lp-hero-inner">
          <div className="lp-hero-content">
            <div className="lp-hero-badge">
              <CheckCircle size={13} /> ⭐ Rated #1 Healthcare App in India
            </div>
            <h1 className="lp-hero-title">
              Your Health,<br />
              <span className="lp-hero-accent">{typedText}<span className="lp-cursor">|</span></span>
            </h1>
            <p className="lp-hero-sub">
              Book appointments with verified doctors, consult online, and manage your complete health journey — all in one place.
            </p>
            <form onSubmit={handleSearch} className="lp-search-bar">
              <Search size={17} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search doctors, specializations, symptoms..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <div className="lp-hero-stats">
              {[
                { num: '500+', label: 'Verified Doctors' },
                { num: '50k+', label: 'Happy Patients'   },
                { num: '20+',  label: 'Specializations'  },
                { num: '4.8★', label: 'Avg Rating'       },
              ].map(s => (
                <div key={s.label} className="lp-stat-item">
                  <div className="lp-stat-num">{s.num}</div>
                  <div className="lp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative floating blobs */}
          <div className="lp-hero-art" aria-hidden="true">
            <div className="lp-blob lp-blob-1">🏥</div>
            <div className="lp-blob lp-blob-2">🩺</div>
            <div className="lp-blob lp-blob-3">💊</div>
            <div className="lp-blob lp-blob-4">❤️</div>
            <div className="lp-ring lp-ring-1" />
            <div className="lp-ring lp-ring-2" />
          </div>
        </div>
      </section>

      {/* ── Specializations ── */}
      <section className="lp-section lp-bg-white" ref={specRef}>
        <div className="container lp-fade-up">
          <div className="lp-section-head">
            <h2 className="section-title">Browse by Specialization</h2>
            <p className="section-sub">Find the right specialist for your needs</p>
          </div>
          <div className="lp-spec-grid">
            {SPECIALIZATIONS.map(spec => (
              <div
                key={spec.name}
                className="lp-spec-card"
                style={{ '--spec-bg': spec.color, '--spec-accent': spec.accent }}
                onClick={() => navigate(`/find-doctors?spec=${spec.name}`)}
              >
                <div className="lp-spec-icon">{spec.icon}</div>
                <div className="lp-spec-name">{spec.name}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button className="btn btn-outline" onClick={() => navigate('/find-doctors')}>
              View All Specializations <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="lp-section" ref={stepsRef}>
        <div className="container lp-fade-up">
          <div className="lp-section-head">
            <h2 className="section-title">How MediBook Works</h2>
            <p className="section-sub">Get care in 3 simple steps</p>
          </div>
          <div className="lp-steps">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="lp-step-card">
                  <div className="lp-step-num">{step.num}</div>
                  <div className="lp-step-emoji">{step.icon}</div>
                  <h3 className="lp-step-title">{step.title}</h3>
                  <p className="lp-step-desc">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && <div className="lp-step-connector">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="lp-section lp-bg-white" ref={featRef}>
        <div className="container lp-fade-up">
          <div className="lp-section-head">
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

      {/* ── Top Doctors ── */}
      <section className="lp-section" ref={docRef}>
        <div className="container lp-fade-up">
          <div className="lp-section-head">
            <h2 className="section-title">Our Top Doctors</h2>
            <p className="section-sub">Trusted by thousands of patients across India</p>
          </div>
          <div className="grid-3">
            {TOP_DOCTORS.map(doc => (
              <div key={doc.name} className="lp-doctor-card">
                <div className="lp-doctor-avatar">{doc.icon}</div>
                <div className="lp-doctor-name">{doc.name}</div>
                <div className="lp-doctor-spec">{doc.spec}</div>
                <div className="lp-doctor-meta">
                  <span><Clock size={12} /> {doc.exp}</span>
                  <span><Star size={12} /> {doc.rating} ({doc.reviews})</span>
                </div>
                <StarRating rating={Math.round(doc.rating)} />
                <button
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}
                  onClick={() => navigate('/find-doctors')}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="lp-section lp-bg-white" ref={testimRef}>
        <div className="container lp-fade-up">
          <div className="lp-section-head">
            <h2 className="section-title">Why Patients Love MediBook</h2>
            <p className="section-sub">Real stories from real patients</p>
          </div>
          <div className="lp-testimonials">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="lp-testimonial-card">
                <StarRating rating={t.rating} />
                <p className="lp-testimonial-text">"{t.text}"</p>
                <div className="lp-testimonial-author">
                  <div className="lp-testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="lp-testimonial-name">{t.name}</div>
                    <div className="lp-testimonial-city"><MapPin size={11} /> {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta" ref={ctaRef}>
        <div className="container lp-fade-up" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="lp-cta-rings" aria-hidden="true">
            <div className="lp-pulse lp-pulse-1" />
            <div className="lp-pulse lp-pulse-2" />
            <div className="lp-pulse lp-pulse-3" />
          </div>
          <h2 className="lp-cta-title">Ready to Take Control of Your Health?</h2>
          <p className="lp-cta-sub">
            Join thousands of patients who trust MediBook for their healthcare needs.
          </p>
          <div className="lp-cta-btns">
            <button
              className="btn btn-lg"
              style={{ background: '#fff', color: 'var(--primary)', fontWeight: 700 }}
              onClick={() => navigate('/register')}
            >
              Get Started Free <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-lg btn-outline"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
              onClick={() => navigate('/find-doctors')}
            >
              Find Doctors
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="container lp-footer-inner">
          <div>
            <div className="lp-footer-logo">🏥 Medi<span>Book</span></div>
            <p className="lp-footer-tagline">Book Smarter. Heal Faster. Care Better.</p>
            <p className="lp-footer-copy">© 2026 MediBook Platform. All rights reserved.</p>
          </div>
          <div className="lp-footer-col">
            <div className="lp-footer-col-title">Quick Links</div>
            <span onClick={() => navigate('/find-doctors')} style={{ cursor: 'pointer' }}>Find Doctors</span>
            <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</span>
            <span onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Sign Up</span>
          </div>
          <div className="lp-footer-col">
            <div className="lp-footer-col-title">Contact</div>
            <span>📧 support@medibook.in</span>
            <span>📞 1800-123-4567</span>
            <span>📍 Bangalore, India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
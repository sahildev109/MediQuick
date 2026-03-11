import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import { FaArrowRight } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { useEffect, useRef } from "react";

export default function Landing() {
  const user = getUser();
  const navigate = useNavigate();

  if (user) {
    navigate("/customer-dashboard");
    return null;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#040f1c", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal-bright: #2dd4bf;
          --teal-mid: #14b8a6;
          --teal-deep: #0d9488;
          --navy-dark: #040f1c;
          --navy-mid: #0a1f35;
          --navy-light: #0f2d4a;
          --mint: #5eead4;
          --white: #f0fdfa;
        }

        /* ── ANIMATED BACKGROUND ── */
        .bg-canvas {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse 80% 60% at 20% 0%, rgba(13,148,136,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 100%, rgba(45,212,191,0.12) 0%, transparent 55%),
                      #040f1c;
        }

        /* Pill decorations inspired by logo border */
        .pill {
          position: absolute;
          border-radius: 100px;
          opacity: 0.07;
          animation: drift linear infinite;
        }

        @keyframes drift {
          0%   { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-20px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(4,15,28,0.7);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(45,212,191,0.08);
        }

        .nav-logo { height: 52px; width: auto; border-radius: 10px; }

        .nav-links { display: flex; gap: 12px; align-items: center; }

        .btn-ghost {
          padding: 10px 24px;
          color: var(--mint);
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 8px;
          border: 1px solid rgba(45,212,191,0.2);
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }
        .btn-ghost:hover {
          background: rgba(45,212,191,0.08);
          border-color: rgba(45,212,191,0.5);
          color: var(--teal-bright);
        }

        .btn-primary {
          padding: 10px 28px;
          background: linear-gradient(135deg, var(--teal-mid), var(--teal-deep));
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 0 20px rgba(20,184,166,0.3);
          letter-spacing: 0.02em;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(20,184,166,0.5);
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 100px;
          background: rgba(45,212,191,0.1);
          border: 1px solid rgba(45,212,191,0.25);
          color: var(--teal-bright);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }

        .badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--teal-bright);
          box-shadow: 0 0 8px var(--teal-bright);
          animation: pulse-dot 1.5s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 800;
          line-height: 1;
          color: var(--white);
          margin-bottom: 8px;
          animation: fadeUp 0.7s 0.1s ease forwards;
          opacity: 0;
          letter-spacing: -0.02em;
        }

        .hero-title .accent {
          background: linear-gradient(90deg, var(--teal-bright), var(--mint));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          color: rgba(240,253,250,0.25);
          margin-bottom: 28px;
          animation: fadeUp 0.7s 0.2s ease forwards;
          opacity: 0;
          letter-spacing: -0.02em;
        }

        .hero-desc {
          max-width: 540px;
          font-size: 1.1rem;
          color: rgba(240,253,250,0.6);
          line-height: 1.7;
          margin-bottom: 48px;
          animation: fadeUp 0.7s 0.3s ease forwards;
          opacity: 0;
          font-weight: 400;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.7s 0.4s ease forwards;
          opacity: 0;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: linear-gradient(135deg, var(--teal-bright), var(--teal-deep));
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 0 40px rgba(45,212,191,0.35), 0 4px 20px rgba(0,0,0,0.3);
          letter-spacing: 0.01em;
        }
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 60px rgba(45,212,191,0.55), 0 8px 30px rgba(0,0,0,0.4);
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: rgba(255,255,255,0.04);
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.12);
          text-decoration: none;
          transition: all 0.3s ease;
          letter-spacing: 0.01em;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(45,212,191,0.4);
          color: var(--teal-bright);
        }

        /* ── STATS STRIP ── */
        .stats-strip {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: center;
          gap: 0;
          padding: 0 24px 80px;
          animation: fadeUp 0.7s 0.5s ease forwards;
          opacity: 0;
        }

        .stat-item {
          padding: 24px 48px;
          border-right: 1px solid rgba(45,212,191,0.12);
          text-align: center;
        }
        .stat-item:last-child { border-right: none; }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: var(--teal-bright);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.8rem;
          color: rgba(240,253,250,0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 6px;
          font-weight: 500;
        }

        /* ── FEATURES ── */
        .features {
          position: relative;
          z-index: 10;
          padding: 80px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-label {
          text-align: center;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--teal-mid);
          margin-bottom: 16px;
        }

        .section-title {
          text-align: center;
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--white);
          margin-bottom: 64px;
          letter-spacing: -0.02em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(45,212,191,0.1);
          border-radius: 20px;
          padding: 36px 32px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--teal-mid), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .feature-card:hover {
          border-color: rgba(45,212,191,0.3);
          background: rgba(45,212,191,0.05);
          transform: translateY(-4px);
        }
        .feature-card:hover::before { opacity: 1; }

        .feature-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: rgba(45,212,191,0.12);
          border: 1px solid rgba(45,212,191,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .feature-desc {
          font-size: 0.92rem;
          color: rgba(240,253,250,0.5);
          line-height: 1.65;
        }

        /* ── FOOTER ── */
        .footer {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 32px;
          border-top: 1px solid rgba(45,212,191,0.08);
          color: rgba(240,253,250,0.25);
          font-size: 0.85rem;
          letter-spacing: 0.02em;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .nav { padding: 14px 20px; }
          .stat-item { padding: 20px 24px; }
          .stats-strip { flex-wrap: wrap; }
        }
      `}</style>

      {/* Animated pill background elements matching logo border */}
      <div className="bg-canvas">
        {[
          { w:90, h:34, top:'8%', left:'5%', bg:'#14b8a6', dur:'8s', delay:'0s' },
          { w:70, h:26, top:'15%', left:'88%', bg:'#2dd4bf', dur:'10s', delay:'2s' },
          { w:110, h:38, top:'70%', left:'3%', bg:'#0d9488', dur:'12s', delay:'1s' },
          { w:65, h:24, top:'80%', left:'90%', bg:'#5eead4', dur:'9s', delay:'3s' },
          { w:85, h:30, top:'45%', left:'95%', bg:'#14b8a6', dur:'11s', delay:'0.5s' },
          { w:55, h:20, top:'30%', left:'-2%', bg:'#2dd4bf', dur:'7s', delay:'4s' },
          { w:100, h:36, top:'92%', left:'45%', bg:'#0d9488', dur:'13s', delay:'2.5s' },
          { w:75, h:28, top:'5%', left:'45%', bg:'#5eead4', dur:'9.5s', delay:'1.5s' },
        ].map((p, i) => (
          <div key={i} className="pill" style={{
            width: p.w, height: p.h,
            top: p.top, left: p.left,
            background: p.bg,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }} />
        ))}
      </div>

      {/* NAV */}
      <nav className="nav">
        <img src={Logo} alt="MediQuick" className="nav-logo" />
        <div className="nav-links">
          <Link to="/login" className="btn-ghost">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          Now delivering in your area
        </div>

        <h1 className="hero-title">
          Your Health,<br />
          <span className="accent">Delivered Fast</span>
        </h1>
        <p className="hero-sub">Anytime. Anywhere.</p>

        <p className="hero-desc">
          MediQuick is your trusted online pharmacy — bringing verified medicines straight to your doorstep with speed, safety, and care.
        </p>

        <div className="hero-cta">
          <Link to="/signup" className="cta-primary">
            Get Started <FaArrowRight />
          </Link>
          <Link to="/login" className="cta-secondary">
            Login to Account
          </Link>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        {[
          { number: "50K+", label: "Happy Customers" },
          { number: "10K+", label: "Medicines Listed" },
          { number: "2 hrs", label: "Avg. Delivery Time" },
          { number: "99.8%", label: "Order Accuracy" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="features">
        <p className="section-label">Why Choose Us</p>
        <h2 className="section-title">Built for your wellbeing</h2>

        <div className="features-grid">
          {[
            {
              icon: "⚡",
              title: "Lightning Fast Delivery",
              desc: "From checkout to your door in under 2 hours. We know every minute counts when it comes to your health.",
            },
            {
              icon: "💊",
              title: "Verified Medications",
              desc: "Every product is sourced from licensed suppliers. Authenticity guaranteed — no compromises.",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Bank-grade encryption for your data and payments. Your health information stays yours.",
            },
            {
              icon: "🏠",
              title: "Doorstep Convenience",
              desc: "No queues, no waiting. Order from your couch and receive at home. Healthcare made effortless.",
            },
            {
              icon: "📦",
              title: "Massive Selection",
              desc: "Browse 10,000+ medicines, supplements, and wellness products — all in one place.",
            },
            {
              icon: "🩺",
              title: "Pharmacist Support",
              desc: "Chat with qualified pharmacists anytime. Get guidance before you order, 7 days a week.",
            },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 MediQuick Pharmacy Delivery. All rights reserved. &nbsp;|&nbsp; Your health, our commitment.
      </footer>
    </div>
  );
}
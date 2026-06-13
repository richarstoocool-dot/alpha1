import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './styles.css';

// ============================================================
// DATOS CONSTANTES
// ============================================================
const NICHES = [
  { icon: '💇', name: 'Peluquería', desc: 'Cortes, coloración, tratamientos y más' },
  { icon: '💅', name: 'Salón de Belleza', desc: 'Manicure, pedicure, depilación y estética' },
  { icon: '🦷', name: 'Dentista', desc: 'Limpiezas, ortodoncia y tratamientos dentales' },
  { icon: '🏥', name: 'Médico', desc: 'Consultas generales y especialistas' },
  { icon: '⚖️', name: 'Abogado', desc: 'Asesoría legal y consultas jurídicas' },
  { icon: '🐾', name: 'Veterinaria', desc: 'Salud, grooming y cuidados de mascotas' },
  { icon: '💪', name: 'Fitness / Gym', desc: 'Clases grupales, entrenadores personales' },
  { icon: '🧘', name: 'Spa & Wellness', desc: 'Masajes, meditación y relajación' },
  { icon: '🏠', name: 'Servicios del Hogar', desc: 'Plomería, electricidad, limpieza' },
  { icon: '📚', name: 'Tutorías', desc: 'Clases particulares y educación personalizada' },
];

const FEATURES = [
  { icon: '📅', title: 'Calendario Inteligente', desc: 'Gestión de turnos en tiempo real con sincronización automática.' },
  { icon: '📱', title: 'Recordatorios Automáticos', desc: 'Notificaciones por WhatsApp, email y SMS para reducir ausencias.' },
  { icon: '⭐', title: 'Score de Credibilidad', desc: 'Sistema de puntuación para clientes frecuentes. Exclusivo Alpha 1.' },
  { icon: '⏳', title: 'Lista de Espera Inteligente', desc: 'Rellena cancelaciones automáticamente con clientes en espera.' },
  { icon: '📝', title: 'Notas de Preferencias', desc: 'Guarda las preferencias de cada cliente para un servicio personalizado.' },
  { icon: '💳', title: 'Depósito Anticipado', desc: 'Solicita pago parcial a clientes con score bajo vía Stripe.' },
];

const PRICING = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mes',
    desc: 'Perfecto para empezar',
    features: ['1 usuario', 'Hasta 50 citas/mes', 'Calendario básico', 'Soporte por email'],
    cta: 'Empezar gratis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mes',
    desc: 'Para negocios en crecimiento',
    features: ['5 usuarios', 'Citas ilimitadas', 'Score de Credibilidad', 'Lista de Espera Inteligente', 'Notas de Preferencias', 'WhatsApp + Email'],
    cta: 'Probar 14 días gratis',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$79',
    period: '/mes',
    desc: 'Para equipos y franquicias',
    features: ['Usuarios ilimitados', 'Multi-sucursal', 'IA y Analytics avanzados', 'API access', 'Soporte prioritario 24/7', 'Depósito Stripe'],
    cta: 'Contactar ventas',
    highlighted: false,
  },
];

// ============================================================
// PÁGINAS
// ============================================================

// --- LANDING PAGE ---
function LandingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('ES');

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">⚡</span>
            <span className="brand-name">Alpha<span className="brand-number">1</span></span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Funciones</a>
            <a href="#niches" className="nav-link">Industrias</a>
            <a href="#pricing" className="nav-link">Precios</a>
            <button className="btn-lang" onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}>{lang}</button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>Iniciar sesión</button>
            <button className="btn-primary" onClick={() => navigate('/register')}>Empezar gratis</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="container text-center">
          <div className="hero-badge">🚀 La plataforma de reservas #1 para negocios</div>
          <h1 className="hero-title">
            Gestiona tus reservas<br />
            <span className="gradient-text">sin esfuerzo</span>
          </h1>
          <p className="hero-sub">
            Alpha 1 automatiza tu agenda, reduce ausencias y fideliza clientes.<br />
            10 industrias. Un solo sistema.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary btn-large" onClick={() => navigate('/register')}>
              Empezar gratis →
            </button>
            <button className="btn-outline btn-large" onClick={() => navigate('/demo')}>
              Ver demo
            </button>
          </div>
          <p className="hero-note">Sin tarjeta de crédito • Configuración en 5 minutos</p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{background: 'var(--bg-secondary)'}}>
        <div className="container text-center">
          <div className="section-label">Todo lo que necesitas</div>
          <h2 className="section-title">Herramientas que <span className="gradient-text">trabajan mientras descansas</span></h2>
          <div className="divider"></div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NICHES */}
      <section id="niches" className="niches-section">
        <div className="container text-center">
          <div className="section-label">10 industrias</div>
          <h2 className="section-title">¿En qué rubro <span className="gradient-text">trabajas?</span></h2>
          <div className="divider"></div>
          <p className="section-sub">Alpha 1 se adapta a tu negocio con funcionalidades específicas para cada industria.</p>
          <div className="niches-grid">
            {NICHES.map((n, i) => (
              <div key={i} className="niche-card" onClick={() => navigate('/register')}>
                <div className="niche-icon">{n.icon}</div>
                <h3>{n.name}</h3>
                <p>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{background: 'var(--bg-secondary)'}}>
        <div className="container text-center">
          <div className="section-label">Planes</div>
          <h2 className="section-title">Precios <span className="gradient-text">transparentes</span></h2>
          <div className="divider"></div>
          <div className="pricing-grid">
            {PRICING.map((p, i) => (
              <div key={i} className={`pricing-card ${p.highlighted ? 'pricing-highlighted' : ''}`}>
                {p.highlighted && <div className="pricing-badge">⭐ Más popular</div>}
                <h3>{p.name}</h3>
                <div className="pricing-price">{p.price}<span>{p.period}</span></div>
                <p>{p.desc}</p>
                <ul className="pricing-features">
                  {p.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                </ul>
                <button
                  className={`${p.highlighted ? 'btn-primary' : 'btn-outline'} btn-full`}
                  onClick={() => navigate('/register')}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container text-center">
          <div className="nav-brand" style={{justifyContent:'center', marginBottom:'1rem'}}>
            <span className="brand-icon">⚡</span>
            <span className="brand-name">Alpha<span className="brand-number">1</span></span>
          </div>
          <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>© 2025 Alpha 1. Todos los derechos reservados.</p>
          <div style={{marginTop:'1rem', display:'flex', gap:'1.5rem', justifyContent:'center', fontSize:'0.85rem'}}>
            <a href="#" style={{color:'var(--text-muted)'}}>Privacidad</a>
            <a href="#" style={{color:'var(--text-muted)'}}>Términos</a>
            <a href="#" style={{color:'var(--text-muted)'}}>Soporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- LOGIN PAGE ---
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="nav-brand" style={{justifyContent:'center', marginBottom:'0.5rem'}}>
            <span className="brand-icon">⚡</span>
            <span className="brand-name">Alpha<span className="brand-number">1</span></span>
          </div>
          <h2>Bienvenido de vuelta</h2>
          <p>Ingresa a tu cuenta</p>
        </div>
        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="auth-footer">
          <p>¿No tienes cuenta? <button className="btn-link" onClick={() => navigate('/register')}>Regístrate gratis</button></p>
          <button className="btn-link" onClick={() => navigate('/')}>← Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

// --- REGISTER PAGE ---
function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', niche: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.REACT_APP_SUPABASE_URL,
        process.env.REACT_APP_SUPABASE_ANON_KEY
      );
      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name, niche: form.niche } }
      });
      if (authError) throw authError;
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="auth-page">
      <div className="auth-card text-center">
        <div style={{fontSize:'3rem', marginBottom:'1rem'}}>📧</div>
        <h2>¡Revisa tu email!</h2>
        <p style={{color:'var(--text-muted)', margin:'1rem 0'}}>Te enviamos un link de confirmación a <strong>{form.email}</strong></p>
        <button className="btn-primary" onClick={() => navigate('/login')}>Ir al login</button>
      </div>
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="nav-brand" style={{justifyContent:'center', marginBottom:'0.5rem'}}>
            <span className="brand-icon">⚡</span>
            <span className="brand-name">Alpha<span className="brand-number">1</span></span>
          </div>
          <h2>Crear cuenta gratis</h2>
          <p>Configura tu negocio en 5 minutos</p>
        </div>
        <form onSubmit={handleRegister} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label>Nombre del negocio</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ej: Peluquería José" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" required minLength={6} />
          </div>
          <div className="form-group">
            <label>Industria</label>
            <select name="niche" value={form.niche} onChange={handleChange} required>
              <option value="">Selecciona tu rubro...</option>
              {NICHES.map((n, i) => <option key={i} value={n.name}>{n.icon} {n.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta gratis →'}
          </button>
        </form>
        <div className="auth-footer">
          <p>¿Ya tienes cuenta? <button className="btn-link" onClick={() => navigate('/login')}>Iniciar sesión</button></p>
          <button className="btn-link" onClick={() => navigate('/')}>← Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

// --- DEMO PAGE ---
function DemoPage() {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card text-center" style={{maxWidth:'600px'}}>
        <div style={{fontSize:'3rem', marginBottom:'1rem'}}>🎬</div>
        <h2>Demo interactivo</h2>
        <p style={{color:'var(--text-muted)', margin:'1rem 0'}}>
          Explora el dashboard de Alpha 1 sin crear cuenta.
        </p>
        <div style={{background:'var(--bg-secondary)', borderRadius:'12px', padding:'1.5rem', margin:'1.5rem 0', textAlign:'left'}}>
          <p style={{fontWeight:'600', marginBottom:'0.75rem'}}>En el demo podrás ver:</p>
          <ul style={{listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            <li>✅ Calendario de citas en tiempo real</li>
            <li>✅ Dashboard del negocio</li>
            <li>✅ Score de Credibilidad de clientes</li>
            <li>✅ Lista de Espera Inteligente</li>
            <li>✅ Sistema de notificaciones</li>
          </ul>
        </div>
        <button className="btn-primary btn-full" onClick={() => navigate('/register')}>
          Crear cuenta gratis (mejor que el demo) →
        </button>
        <br/><br/>
        <button className="btn-link" onClick={() => navigate('/')}>← Volver al inicio</button>
      </div>
    </div>
  );
}

// --- DASHBOARD PAGE (placeholder) ---
function DashboardPage() {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card text-center">
        <div style={{fontSize:'3rem', marginBottom:'1rem'}}>🚧</div>
        <h2>Dashboard</h2>
        <p style={{color:'var(--text-muted)', margin:'1rem 0'}}>El dashboard completo estará disponible en la Fase 5.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

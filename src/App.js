import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './styles.css';

// ============================================================
// SUPABASE CLIENT
// ============================================================
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// ============================================================
// AUTH CONTEXT
// ============================================================
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    // Listener de cambios
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, supabase, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// ============================================================
// PRIVATE ROUTE
// ============================================================
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
  return user ? children : <Navigate to="/login" replace />;
}

// ============================================================
// DATOS
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
    name: 'Starter', price: '$0', period: '/mes', desc: 'Perfecto para empezar',
    features: ['1 usuario', 'Hasta 50 citas/mes', 'Calendario básico', 'Soporte por email'],
    cta: 'Empezar gratis', highlighted: false,
  },
  {
    name: 'Pro', price: '$29', period: '/mes', desc: 'Para negocios en crecimiento',
    features: ['5 usuarios', 'Citas ilimitadas', 'Score de Credibilidad', 'Lista de Espera Inteligente', 'Notas de Preferencias', 'WhatsApp + Email'],
    cta: 'Probar 14 días gratis', highlighted: true,
  },
  {
    name: 'Business', price: '$79', period: '/mes', desc: 'Para equipos y franquicias',
    features: ['Usuarios ilimitados', 'Multi-sucursal', 'IA y Analytics avanzados', 'API access', 'Soporte prioritario 24/7', 'Depósito Stripe'],
    cta: 'Contactar ventas', highlighted: false,
  },
];

// ============================================================
// NAVBAR COMPONENT
// ============================================================
function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState('ES');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => navigate('/')} style={{cursor:'pointer'}}>
          <span className="brand-icon">⚡</span>
          <span className="brand-name">Alpha<span className="brand-number">1</span></span>
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Funciones</a>
          <a href="#niches" className="nav-link">Industrias</a>
          <a href="#pricing" className="nav-link">Precios</a>
          <button className="btn-lang" onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}>{lang}</button>
          {user ? (
            <>
              <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Dashboard</button>
              <button className="btn-outline" onClick={signOut}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => navigate('/login')}>Iniciar sesión</button>
              <button className="btn-primary" onClick={() => navigate('/register')}>Empezar gratis</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// LANDING PAGE
// ============================================================
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <Navbar />
      <section className="hero-section">
        <div className="container text-center">
          <div className="hero-badge">🚀 La plataforma de reservas #1 para negocios</div>
          <h1 className="hero-title">Gestiona tus reservas<br /><span className="gradient-text">sin esfuerzo</span></h1>
          <p className="hero-sub">Alpha 1 automatiza tu agenda, reduce ausencias y fideliza clientes.<br />10 industrias. Un solo sistema.</p>
          <div className="hero-buttons">
            <button className="btn-primary btn-large" onClick={() => navigate('/register')}>Empezar gratis →</button>
            <button className="btn-outline btn-large" onClick={() => navigate('/demo')}>Ver demo</button>
          </div>
          <p className="hero-note">Sin tarjeta de crédito • Configuración en 5 minutos</p>
        </div>
      </section>

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
                <ul className="pricing-features">{p.features.map((f,j) => <li key={j}>✓ {f}</li>)}</ul>
                <button className={`${p.highlighted ? 'btn-primary' : 'btn-outline'} btn-full`} onClick={() => navigate('/register')}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

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

// ============================================================
// LOGIN PAGE
// ============================================================
function LoginPage() {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); }
    else navigate('/dashboard', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="nav-brand" style={{justifyContent:'center', marginBottom:'0.5rem', cursor:'pointer'}} onClick={() => navigate('/')}>
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

// ============================================================
// REGISTER PAGE
// ============================================================
function RegisterPage() {
  const navigate = useNavigate();
  const { user, supabase } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', niche: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, niche: form.niche } }
    });
    if (err) { setError(err.message); setLoading(false); }
    else navigate('/dashboard', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="nav-brand" style={{justifyContent:'center', marginBottom:'0.5rem', cursor:'pointer'}} onClick={() => navigate('/')}>
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

// ============================================================
// DEMO PAGE
// ============================================================
function DemoPage() {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card text-center" style={{maxWidth:'600px'}}>
        <div style={{fontSize:'3rem', marginBottom:'1rem'}}>🎬</div>
        <h2>Demo interactivo</h2>
        <p style={{color:'var(--text-muted)', margin:'1rem 0'}}>Explora las funciones de Alpha 1 sin crear cuenta.</p>
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
        <button className="btn-primary btn-full" onClick={() => navigate('/register')}>Crear cuenta gratis (mejor que el demo) →</button>
        <br/><br/>
        <button className="btn-link" onClick={() => navigate('/')}>← Volver al inicio</button>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuario';
  const userNiche = user?.user_metadata?.niche || 'tu negocio';

  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">Alpha<span className="brand-number">1</span></span>
        </div>
        <nav className="dash-nav">
          <button className="dash-nav-item active">📊 Dashboard</button>
          <button className="dash-nav-item">📅 Citas</button>
          <button className="dash-nav-item">👥 Clientes</button>
          <button className="dash-nav-item">🔧 Servicios</button>
          <button className="dash-nav-item">⏰ Horarios</button>
          <button className="dash-nav-item">⚙️ Configuración</button>
        </nav>
        <button className="dash-signout" onClick={signOut}>Cerrar sesión</button>
      </aside>
      <main className="dash-main">
        <header className="dash-header">
          <div>
            <h1>Bienvenido, {userName} 👋</h1>
            <p style={{color:'var(--text-muted)'}}>Rubro: {userNiche}</p>
          </div>
          <div className="dash-user-badge">{userName[0].toUpperCase()}</div>
        </header>
        <div className="dash-stats">
          <div className="stat-card"><div className="stat-icon">📅</div><div><p className="stat-label">Citas hoy</p><h2 className="stat-value">0</h2></div></div>
          <div className="stat-card"><div className="stat-icon">👥</div><div><p className="stat-label">Clientes</p><h2 className="stat-value">0</h2></div></div>
          <div className="stat-card"><div className="stat-icon">⭐</div><div><p className="stat-label">Score promedio</p><h2 className="stat-value">—</h2></div></div>
          <div className="stat-card"><div className="stat-icon">💰</div><div><p className="stat-label">Ingresos mes</p><h2 className="stat-value">$0</h2></div></div>
        </div>
        <div className="dash-empty">
          <div style={{fontSize:'3rem', marginBottom:'1rem'}}>🚀</div>
          <h3>Tu negocio está listo</h3>
          <p>Comienza configurando tus servicios y horarios para empezar a recibir reservas.</p>
          <button className="btn-primary" style={{marginTop:'1.5rem'}}>Configurar servicios →</button>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

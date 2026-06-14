import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './styles.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);
  const signOut = async () => { await supabase.auth.signOut(); };
  return <AuthContext.Provider value={{ user, loading, supabase, signOut }}>{children}</AuthContext.Provider>;
}
function useAuth() { return useContext(AuthContext); }
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
  return user ? children : <Navigate to="/login" replace />;
}

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
  { name: 'Starter', price: '$0', period: '/mes', desc: 'Perfecto para empezar', features: ['1 usuario', 'Hasta 50 citas/mes', 'Calendario básico', 'Soporte por email'], cta: 'Empezar gratis', highlighted: false },
  { name: 'Pro', price: '$29', period: '/mes', desc: 'Para negocios en crecimiento', features: ['5 usuarios', 'Citas ilimitadas', 'Score de Credibilidad', 'Lista de Espera Inteligente', 'Notas de Preferencias', 'WhatsApp + Email'], cta: 'Probar 14 días gratis', highlighted: true },
  { name: 'Business', price: '$79', period: '/mes', desc: 'Para equipos y franquicias', features: ['Usuarios ilimitados', 'Multi-sucursal', 'IA y Analytics avanzados', 'API access', 'Soporte prioritario 24/7', 'Depósito Stripe'], cta: 'Contactar ventas', highlighted: false },
];
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
            <><button className="btn-secondary" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="btn-outline" onClick={signOut}>Cerrar sesión</button></>
          ) : (
            <><button className="btn-secondary" onClick={() => navigate('/login')}>Iniciar sesión</button>
            <button className="btn-primary" onClick={() => navigate('/register')}>Empezar gratis</button></>
          )}
        </div>
      </div>
    </nav>
  );
}

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
      <section id="features" style={{background:'var(--bg-secondary)'}}>
        <div className="container text-center">
          <div className="section-label">Todo lo que necesitas</div>
          <h2 className="section-title">Herramientas que <span className="gradient-text">trabajan mientras descansas</span></h2>
          <div className="divider"></div>
          <div className="features-grid">{FEATURES.map((f,i) => <div key={i} className="feature-card"><div className="feature-icon">{f.icon}</div><h3>{f.title}</h3><p>{f.desc}</p></div>)}</div>
        </div>
      </section>
      <section id="niches" className="niches-section">
        <div className="container text-center">
          <div className="section-label">10 industrias</div>
          <h2 className="section-title">¿En qué rubro <span className="gradient-text">trabajas?</span></h2>
          <div className="divider"></div>
          <p className="section-sub">Alpha 1 se adapta a tu negocio con funcionalidades específicas para cada industria.</p>
          <div className="niches-grid">{NICHES.map((n,i) => <div key={i} className="niche-card" onClick={() => navigate('/register')}><div className="niche-icon">{n.icon}</div><h3>{n.name}</h3><p>{n.desc}</p></div>)}</div>
        </div>
      </section>
      <section id="pricing" style={{background:'var(--bg-secondary)'}}>
        <div className="container text-center">
          <div className="section-label">Planes</div>
          <h2 className="section-title">Precios <span className="gradient-text">transparentes</span></h2>
          <div className="divider"></div>
          <div className="pricing-grid">{PRICING.map((p,i) => <div key={i} className={`pricing-card ${p.highlighted?'pricing-highlighted':''}`}>{p.highlighted&&<div className="pricing-badge">⭐ Más popular</div>}<h3>{p.name}</h3><div className="pricing-price">{p.price}<span>{p.period}</span></div><p>{p.desc}</p><ul className="pricing-features">{p.features.map((f,j)=><li key={j}>✓ {f}</li>)}</ul><button className={`${p.highlighted?'btn-primary':'btn-outline'} btn-full`} onClick={() => navigate('/register')}>{p.cta}</button></div>)}</div>
        </div>
      </section>
      <footer className="footer"><div className="container text-center"><div className="nav-brand" style={{justifyContent:'center',marginBottom:'1rem'}}><span className="brand-icon">⚡</span><span className="brand-name">Alpha<span className="brand-number">1</span></span></div><p style={{color:'var(--text-muted)',fontSize:'0.9rem'}}>© 2025 Alpha 1. Todos los derechos reservados.</p><div style={{marginTop:'1rem',display:'flex',gap:'1.5rem',justifyContent:'center',fontSize:'0.85rem'}}><a href="#" style={{color:'var(--text-muted)'}}>Privacidad</a><a href="#" style={{color:'var(--text-muted)'}}>Términos</a><a href="#" style={{color:'var(--text-muted)'}}>Soporte</a></div></div></footer>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate(); const { user, supabase } = useAuth();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  useEffect(() => { if (user) navigate('/dashboard', { replace: true }); }, [user, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); } else navigate('/dashboard', { replace: true });
  };
  return (<div className="auth-page"><div className="auth-card"><div className="auth-header"><div className="nav-brand" style={{justifyContent:'center',marginBottom:'0.5rem',cursor:'pointer'}} onClick={() => navigate('/')}><span className="brand-icon">⚡</span><span className="brand-name">Alpha<span className="brand-number">1</span></span></div><h2>Bienvenido de vuelta</h2><p>Ingresa a tu cuenta</p></div><form onSubmit={handleLogin} className="auth-form">{error&&<div className="auth-error">{error}</div>}<div className="form-group"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" required /></div><div className="form-group"><label>Contraseña</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required /></div><button type="submit" className="btn-primary btn-full" disabled={loading}>{loading?'Ingresando...':'Iniciar sesión'}</button></form><div className="auth-footer"><p>¿No tienes cuenta? <button className="btn-link" onClick={() => navigate('/register')}>Regístrate gratis</button></p><button className="btn-link" onClick={() => navigate('/')}>← Volver al inicio</button></div></div></div>);
}

function RegisterPage() {
  const navigate = useNavigate(); const { user, supabase } = useAuth();
  const [form, setForm] = useState({ name:'', email:'', password:'', niche:'' });
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  useEffect(() => { if (user) navigate('/dashboard', { replace: true }); }, [user, navigate]);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleRegister = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    const { error: err } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { name: form.name, niche: form.niche } } });
    if (err) { setError(err.message); setLoading(false); } else navigate('/dashboard', { replace: true });
  };
  return (<div className="auth-page"><div className="auth-card"><div className="auth-header"><div className="nav-brand" style={{justifyContent:'center',marginBottom:'0.5rem',cursor:'pointer'}} onClick={() => navigate('/')}><span className="brand-icon">⚡</span><span className="brand-name">Alpha<span className="brand-number">1</span></span></div><h2>Crear cuenta gratis</h2><p>Configura tu negocio en 5 minutos</p></div><form onSubmit={handleRegister} className="auth-form">{error&&<div className="auth-error">{error}</div>}<div className="form-group"><label>Nombre del negocio</label><input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ej: Peluquería José" required /></div><div className="form-group"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" required /></div><div className="form-group"><label>Contraseña</label><input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" required minLength={6} /></div><div className="form-group"><label>Industria</label><select name="niche" value={form.niche} onChange={handleChange} required><option value="">Selecciona tu rubro...</option>{NICHES.map((n,i)=><option key={i} value={n.name}>{n.icon} {n.name}</option>)}</select></div><button type="submit" className="btn-primary btn-full" disabled={loading}>{loading?'Creando cuenta...':'Crear cuenta gratis →'}</button></form><div className="auth-footer"><p>¿Ya tienes cuenta? <button className="btn-link" onClick={() => navigate('/login')}>Iniciar sesión</button></p><button className="btn-link" onClick={() => navigate('/')}>← Volver al inicio</button></div></div></div>);
}

function DemoPage() {
  const navigate = useNavigate();
  return (<div className="auth-page"><div className="auth-card text-center" style={{maxWidth:'600px'}}><div style={{fontSize:'3rem',marginBottom:'1rem'}}>🎬</div><h2>Demo interactivo</h2><p style={{color:'var(--text-muted)',margin:'1rem 0'}}>Explora las funciones de Alpha 1 sin crear cuenta.</p><div style={{background:'var(--bg-secondary)',borderRadius:'12px',padding:'1.5rem',margin:'1.5rem 0',textAlign:'left'}}><p style={{fontWeight:'600',marginBottom:'0.75rem'}}>En el demo podrás ver:</p><ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'0.5rem'}}><li>✅ Calendario de citas en tiempo real</li><li>✅ Dashboard del negocio</li><li>✅ Score de Credibilidad de clientes</li><li>✅ Lista de Espera Inteligente</li><li>✅ Sistema de notificaciones</li></ul></div><button className="btn-primary btn-full" onClick={() => navigate('/register')}>Crear cuenta gratis (mejor que el demo) →</button><br/><br/><button className="btn-link" onClick={() => navigate('/')}>← Volver al inicio</button></div></div>);
}
// ============================================================
// DASHBOARD SECTIONS
// ============================================================

function ServiciosSection({ negocioId, supabase }) {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nombre:'', duracion_min:30, precio:'' });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const load = useCallback(async () => {
    if (!negocioId) return;
    setLoading(true);
    const { data } = await supabase.from('servicios').select('*').eq('negocio_id', negocioId).order('nombre');
    setServicios(data || []);
    setLoading(false);
  }, [negocioId, supabase]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const payload = { negocio_id: negocioId, nombre: form.nombre, duracion_min: Number(form.duracion_min), precio: Number(form.precio) };
    if (editId) {
      await supabase.from('servicios').update(payload).eq('id', editId);
    } else {
      await supabase.from('servicios').insert(payload);
    }
    setForm({ nombre:'', duracion_min:30, precio:'' }); setShowForm(false); setEditId(null); setSaving(false); load();
  };

  const handleEdit = (s) => { setForm({ nombre:s.nombre, duracion_min:s.duracion_min, precio:s.precio }); setEditId(s.id); setShowForm(true); };
  const handleDelete = async (id) => { if (window.confirm('¿Eliminar este servicio?')) { await supabase.from('servicios').delete().eq('id', id); load(); } };

  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <div><h2>🔧 Servicios</h2><p>Los servicios que ofreces a tus clientes</p></div>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ nombre:'', duracion_min:30, precio:'' }); }}>+ Agregar servicio</button>
      </div>
      {showForm && (
        <form className="dash-form" onSubmit={handleSave}>
          <h3>{editId ? 'Editar servicio' : 'Nuevo servicio'}</h3>
          <div className="form-row">
            <div className="form-group"><label>Nombre</label><input type="text" value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} placeholder="Ej: Corte de pelo" required /></div>
            <div className="form-group"><label>Duración (min)</label><input type="number" value={form.duracion_min} onChange={e => setForm({...form, duracion_min:e.target.value})} min="5" step="5" required /></div>
            <div className="form-group"><label>Precio ($)</label><input type="number" value={form.precio} onChange={e => setForm({...form, precio:e.target.value})} min="0" step="0.01" required /></div>
          </div>
          <div style={{display:'flex',gap:'0.75rem'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving?'Guardando...':'Guardar'}</button>
            <button type="button" className="btn-outline" onClick={() => { setShowForm(false); setEditId(null); }}>Cancelar</button>
          </div>
        </form>
      )}
      {loading ? <div className="dash-loading">Cargando...</div> : servicios.length === 0 ? (
        <div className="dash-empty-sm">No hay servicios. ¡Agrega el primero!</div>
      ) : (
        <div className="servicios-grid">
          {servicios.map(s => (
            <div key={s.id} className="servicio-card">
              <div className="servicio-info">
                <h4>{s.nombre}</h4>
                <span className="badge-duracion">⏱ {s.duracion_min} min</span>
              </div>
              <div className="servicio-actions">
                <span className="servicio-precio">${Number(s.precio).toFixed(2)}</span>
                <button className="btn-icon" onClick={() => handleEdit(s)}>✏️</button>
                <button className="btn-icon btn-icon-danger" onClick={() => handleDelete(s.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClientesSection({ negocioId, supabase }) {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nombre:'', email:'', telefono:'', score:100 });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!negocioId) return;
    setLoading(true);
    const { data } = await supabase.from('clientes').select('*').eq('negocio_id', negocioId).order('nombre');
    setClientes(data || []);
    setLoading(false);
  }, [negocioId, supabase]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    await supabase.from('clientes').insert({ negocio_id: negocioId, nombre: form.nombre, email: form.email, telefono: form.telefono, score: Number(form.score) });
    setForm({ nombre:'', email:'', telefono:'', score:100 }); setShowForm(false); setSaving(false); load();
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#43e97b';
    if (score >= 50) return '#f7b731';
    return '#ff6464';
  };
  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excelente';
    if (score >= 50) return 'Regular';
    return 'Bajo';
  };

  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <div><h2>👥 Clientes</h2><p>Gestión de clientes con Score de Credibilidad</p></div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ Agregar cliente</button>
      </div>
      {showForm && (
        <form className="dash-form" onSubmit={handleSave}>
          <h3>Nuevo cliente</h3>
          <div className="form-row">
            <div className="form-group"><label>Nombre</label><input type="text" value={form.nombre} onChange={e => setForm({...form, nombre:e.target.value})} placeholder="Nombre completo" required /></div>
            <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="email@ejemplo.com" /></div>
            <div className="form-group"><label>Teléfono</label><input type="tel" value={form.telefono} onChange={e => setForm({...form, telefono:e.target.value})} placeholder="+54 9 11..." /></div>
          </div>
          <div style={{display:'flex',gap:'0.75rem'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving?'Guardando...':'Guardar'}</button>
            <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
      {loading ? <div className="dash-loading">Cargando...</div> : clientes.length === 0 ? (
        <div className="dash-empty-sm">No hay clientes registrados aún.</div>
      ) : (
        <div className="table-wrapper">
          <table className="dash-table">
            <thead><tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Score ⭐</th></tr></thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.nombre}</strong></td>
                  <td>{c.email || '—'}</td>
                  <td>{c.telefono || '—'}</td>
                  <td>
                    <div className="score-badge" style={{color: getScoreColor(c.score || 100)}}>
                      <span className="score-value">{c.score || 100}</span>
                      <span className="score-label">{getScoreLabel(c.score || 100)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CitasSection({ negocioId, supabase }) {
  const [citas, setCitas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cliente_id:'', servicio_id:'', fecha_hora:'', estado:'pendiente' });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!negocioId) return;
    setLoading(true);
    const [citasRes, serviciosRes, clientesRes] = await Promise.all([
      supabase.from('citas').select('*, clientes(nombre), servicios(nombre,duracion_min)').eq('negocio_id', negocioId).order('fecha_hora', { ascending: false }).limit(20),
      supabase.from('servicios').select('id, nombre').eq('negocio_id', negocioId),
      supabase.from('clientes').select('id, nombre').eq('negocio_id', negocioId),
    ]);
    setCitas(citasRes.data || []);
    setServicios(serviciosRes.data || []);
    setClientes(clientesRes.data || []);
    setLoading(false);
  }, [negocioId, supabase]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    await supabase.from('citas').insert({ negocio_id: negocioId, cliente_id: form.cliente_id || null, servicio_id: form.servicio_id || null, fecha_hora: form.fecha_hora, estado: form.estado });
    setForm({ cliente_id:'', servicio_id:'', fecha_hora:'', estado:'pendiente' }); setShowForm(false); setSaving(false); load();
  };

  const updateEstado = async (id, estado) => {
    await supabase.from('citas').update({ estado }).eq('id', id); load();
  };

  const estadoColors = { confirmada:'#43e97b', pendiente:'#f7b731', cancelada:'#ff6464' };

  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <div><h2>📅 Citas</h2><p>Registro de todas tus citas y reservas</p></div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ Nueva cita</button>
      </div>
      {showForm && (
        <form className="dash-form" onSubmit={handleSave}>
          <h3>Nueva cita</h3>
          <div className="form-row">
            <div className="form-group"><label>Cliente</label>
              <select value={form.cliente_id} onChange={e => setForm({...form, cliente_id:e.target.value})}>
                <option value="">Sin cliente asignado</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Servicio</label>
              <select value={form.servicio_id} onChange={e => setForm({...form, servicio_id:e.target.value})}>
                <option value="">Sin servicio asignado</option>
                {servicios.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Fecha y hora</label>
              <input type="datetime-local" value={form.fecha_hora} onChange={e => setForm({...form, fecha_hora:e.target.value})} required />
            </div>
            <div className="form-group"><label>Estado</label>
              <select value={form.estado} onChange={e => setForm({...form, estado:e.target.value})}>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
          <div style={{display:'flex',gap:'0.75rem'}}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving?'Guardando...':'Guardar'}</button>
            <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
      {loading ? <div className="dash-loading">Cargando...</div> : citas.length === 0 ? (
        <div className="dash-empty-sm">No hay citas registradas aún. ¡Agrega la primera!</div>
      ) : (
        <div className="table-wrapper">
          <table className="dash-table">
            <thead><tr><th>Fecha / Hora</th><th>Cliente</th><th>Servicio</th><th>Estado</th></tr></thead>
            <tbody>
              {citas.map(c => (
                <tr key={c.id}>
                  <td>{c.fecha_hora ? new Date(c.fecha_hora).toLocaleString('es-AR', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) : '—'}</td>
                  <td>{c.clientes?.nombre || '—'}</td>
                  <td>{c.servicios?.nombre || '—'}</td>
                  <td>
                    <select className="estado-select" value={c.estado} onChange={e => updateEstado(c.id, e.target.value)} style={{color: estadoColors[c.estado]}}>
                      <option value="pendiente">⏳ Pendiente</option>
                      <option value="confirmada">✅ Confirmada</option>
                      <option value="cancelada">❌ Cancelada</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function HorariosSection({ negocioId, supabase }) {
  const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  const [horarios, setHorarios] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!negocioId) return;
    setLoading(true);
    const { data } = await supabase.from('horarios').select('*').eq('negocio_id', negocioId);
    const map = {};
    (data || []).forEach(h => { map[h.dia_semana] = h; });
    const initial = {};
    dias.forEach(d => { initial[d] = map[d] || { dia_semana:d, hora_inicio:'09:00', hora_fin:'18:00', activo: !!map[d] }; });
    setHorarios(initial);
    setLoading(false);
  }, [negocioId, supabase]);

  useEffect(() => { load(); }, [load]);

  const toggleDia = (dia) => setHorarios(prev => ({ ...prev, [dia]: { ...prev[dia], activo: !prev[dia].activo } }));
  const updateHora = (dia, field, val) => setHorarios(prev => ({ ...prev, [dia]: { ...prev[dia], [field]: val } }));

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('horarios').delete().eq('negocio_id', negocioId);
    const toInsert = Object.values(horarios).filter(h => h.activo).map(h => ({ negocio_id: negocioId, dia_semana: h.dia_semana, hora_inicio: h.hora_inicio, hora_fin: h.hora_fin }));
    if (toInsert.length > 0) await supabase.from('horarios').insert(toInsert);
    setSaving(false); load();
  };

  return (
    <div className="dash-section">
      <div className="dash-section-header">
        <div><h2>⏰ Horarios</h2><p>Configura los días y horas de atención</p></div>
        <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving?'Guardando...':'Guardar cambios'}</button>
      </div>
      {loading ? <div className="dash-loading">Cargando...</div> : (
        <div className="horarios-grid">
          {dias.map(dia => (
            <div key={dia} className={`horario-row ${horarios[dia]?.activo ? 'horario-active' : 'horario-inactive'}`}>
              <div className="horario-dia">
                <input type="checkbox" id={`dia-${dia}`} checked={!!horarios[dia]?.activo} onChange={() => toggleDia(dia)} />
                <label htmlFor={`dia-${dia}`}>{dia}</label>
              </div>
              {horarios[dia]?.activo ? (
                <div className="horario-horas">
                  <input type="time" value={horarios[dia]?.hora_inicio || '09:00'} onChange={e => updateHora(dia, 'hora_inicio', e.target.value)} />
                  <span>a</span>
                  <input type="time" value={horarios[dia]?.hora_fin || '18:00'} onChange={e => updateHora(dia, 'hora_fin', e.target.value)} />
                </div>
              ) : (
                <span className="horario-cerrado">Cerrado</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ============================================================
// DASHBOARD PAGE (layout + sidebar + secciones)
// ============================================================
function DashboardPage() {
  const { user, signOut, supabase } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [negocioId, setNegocioId] = useState(null);
  const [stats, setStats] = useState({ citas:0, clientes:0, score:0, ingresos:0 });

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuario';
  const userNiche = user?.user_metadata?.niche || 'tu negocio';
  const userInitial = userName[0].toUpperCase();

  // Obtener o crear registro del negocio en la tabla 'negocios'
  useEffect(() => {
    if (!user) return;
    const fetchOrCreate = async () => {
      let { data } = await supabase.from('negocios').select('id').eq('email', user.email).single();
      if (!data) {
        const { data: created } = await supabase.from('negocios').insert({ nombre: userName, email: user.email, nicho: userNiche, plan: 'starter' }).select('id').single();
        data = created;
      }
      if (data) setNegocioId(data.id);
    };
    fetchOrCreate();
  }, [user, supabase, userName, userNiche]);

  // Cargar estadísticas
  useEffect(() => {
    if (!negocioId) return;
    const loadStats = async () => {
      const today = new Date().toISOString().split('T')[0];
      const [citasHoy, clientes, citasMes] = await Promise.all([
        supabase.from('citas').select('id', {count:'exact'}).eq('negocio_id', negocioId).gte('fecha_hora', today),
        supabase.from('clientes').select('id, score', {count:'exact'}).eq('negocio_id', negocioId),
        supabase.from('citas').select('servicios(precio)').eq('negocio_id', negocioId).eq('estado','confirmada').gte('fecha_hora', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
      ]);
      const avgScore = clientes.data?.length ? Math.round(clientes.data.reduce((a,c) => a + (c.score||100), 0) / clientes.data.length) : 0;
      const ingresos = citasMes.data?.reduce((a,c) => a + (c.servicios?.precio || 0), 0) || 0;
      setStats({ citas: citasHoy.count || 0, clientes: clientes.count || 0, score: avgScore, ingresos });
    };
    loadStats();
  }, [negocioId, supabase, activeSection]);

  const navItems = [
    { id:'dashboard', icon:'📊', label:'Dashboard' },
    { id:'citas', icon:'📅', label:'Citas' },
    { id:'clientes', icon:'👥', label:'Clientes' },
    { id:'servicios', icon:'🔧', label:'Servicios' },
    { id:'horarios', icon:'⏰', label:'Horarios' },
    { id:'config', icon:'⚙️', label:'Configuración' },
  ];

  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">Alpha<span className="brand-number">1</span></span>
        </div>
        <nav className="dash-nav">
          {navItems.map(item => (
            <button key={item.id} className={`dash-nav-item ${activeSection === item.id ? 'active' : ''}`} onClick={() => setActiveSection(item.id)}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button className="dash-signout" onClick={signOut}>🚪 Cerrar sesión</button>
      </aside>
      <main className="dash-main">
        <header className="dash-header">
          <div>
            <h1>Bienvenido, {userName} 👋</h1>
            <p style={{color:'var(--text-muted)'}}>Rubro: {userNiche}</p>
          </div>
          <div className="dash-user-badge">{userInitial}</div>
        </header>

        {activeSection === 'dashboard' && (
          <>
            <div className="dash-stats">
              <div className="stat-card"><div className="stat-icon">📅</div><div><p className="stat-label">Citas hoy</p><h2 className="stat-value">{stats.citas}</h2></div></div>
              <div className="stat-card"><div className="stat-icon">👥</div><div><p className="stat-label">Clientes</p><h2 className="stat-value">{stats.clientes}</h2></div></div>
              <div className="stat-card"><div className="stat-icon">⭐</div><div><p className="stat-label">Score promedio</p><h2 className="stat-value">{stats.score || '—'}</h2></div></div>
              <div className="stat-card"><div className="stat-icon">💰</div><div><p className="stat-label">Ingresos mes</p><h2 className="stat-value">${stats.ingresos.toFixed(0)}</h2></div></div>
            </div>
            <div className="dash-quicklinks">
              <h3 style={{marginBottom:'1rem',color:'var(--text-secondary)'}}>Accesos rápidos</h3>
              <div className="quicklinks-grid">
                <div className="quicklink-card" onClick={() => setActiveSection('citas')}><span>📅</span><p>Nueva cita</p></div>
                <div className="quicklink-card" onClick={() => setActiveSection('clientes')}><span>👤</span><p>Agregar cliente</p></div>
                <div className="quicklink-card" onClick={() => setActiveSection('servicios')}><span>🔧</span><p>Mis servicios</p></div>
                <div className="quicklink-card" onClick={() => setActiveSection('horarios')}><span>⏰</span><p>Mis horarios</p></div>
              </div>
            </div>
          </>
        )}
        {activeSection === 'citas' && <CitasSection negocioId={negocioId} supabase={supabase} />}
        {activeSection === 'clientes' && <ClientesSection negocioId={negocioId} supabase={supabase} />}
        {activeSection === 'servicios' && <ServiciosSection negocioId={negocioId} supabase={supabase} />}
        {activeSection === 'horarios' && <HorariosSection negocioId={negocioId} supabase={supabase} />}
        {activeSection === 'config' && (
          <div className="dash-section">
            <div className="dash-section-header"><div><h2>⚙️ Configuración</h2><p>Datos de tu negocio</p></div></div>
            <div className="dash-form">
              <div className="form-row">
                <div className="form-group"><label>Nombre del negocio</label><input type="text" value={userName} readOnly /></div>
                <div className="form-group"><label>Email</label><input type="text" value={user?.email || ''} readOnly /></div>
                <div className="form-group"><label>Industria</label><input type="text" value={userNiche} readOnly /></div>
              </div>
              <p style={{color:'var(--text-muted)',fontSize:'0.85rem',marginTop:'0.5rem'}}>Para modificar estos datos contacta a soporte.</p>
            </div>
          </div>
        )}
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

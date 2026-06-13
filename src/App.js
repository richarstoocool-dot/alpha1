import React, { useState } from 'react';
import './styles.css';

const NICHES = [
  { icon: '🦷', name: 'Dentista', desc: 'Odontología general y especialidades' },
  { icon: '🏥', name: 'Médico', desc: 'Consultas y especialidades médicas' },
  { icon: '⚖️', name: 'Abogado', desc: 'Consultoría legal y asesoría' },
  { icon: '✂️', name: 'Barbería', desc: 'Cortes y estilo masculino' },
  { icon: '💇', name: 'Peluquería', desc: 'Cortes, color y tratamientos' },
  { icon: '🐾', name: 'Pet Grooming', desc: 'Baño, corte y cuidado de mascotas' },
  { icon: '💅', name: 'Uñas', desc: 'Manicura, pedicura y nail art' },
  { icon: '🚗', name: 'Mecánico', desc: 'Mantenimiento y reparación vehicular' },
  { icon: '🏠', name: 'Limpieza', desc: 'Limpieza del hogar y oficinas' },
  { icon: '🎂', name: 'Repostería', desc: 'Pedidos y tortas personalizadas' },
];

const FEATURES_BASE = [
  { icon: '📅', title: 'Reservas 24/7', desc: 'Tu página pública nunca cierra. Los clientes eligen día, hora y servicio en cualquier momento.' },
  { icon: '🤖', title: 'Asistente IA', desc: 'Consultor inteligente 24/7. Consejos de precios, marketing y mensajes profesionales.' },
  { icon: '🔔', title: 'Notificaciones automáticas', desc: 'Confirmación, recordatorio 24h, aviso de cancelación. Todo automático.' },
  { icon: '📊', title: 'Reportes y analytics', desc: 'Ingresos, servicios populares, clientes frecuentes. Exportá a CSV.' },
  { icon: '🎨', title: 'Tu marca, tu estilo', desc: 'Colores, logo y tema visual adaptado a tu nicho. Tu página se ve como TU negocio.' },
  { icon: '⭐', title: 'Reseñas de clientes', desc: 'Tu cliente recibe un email para dejar una reseña después de cada servicio.' },
  { icon: '💬', title: 'WhatsApp integrado', desc: 'Botón directo en tu página, en cada cita y en cada cliente.' },
  { icon: '🗂️', title: 'Tarjetas por nicho', desc: 'Ficha dental, historial médico, expediente legal, ficha de mascota, datos vehiculares.' },
];

const FEATURES_NEW = [
  { icon: '⏳', title: 'Lista de Espera Inteligente', desc: 'Si un cliente cancela o no aparece, el sistema avisa automáticamente a los clientes en espera. Nadie pierde su turno ni su dinero.' },
  { icon: '🏆', title: 'Score de Credibilidad', desc: 'Cada cliente tiene un historial de puntualidad. Los clientes con mal historial deben pagar un depósito para confirmar. Adiós a los no-shows.' },
  { icon: '📝', title: 'Notas de Preferencias', desc: 'Guardá los gustos y detalles de cada cliente. Se muestran automáticamente antes de cada cita. Servicio ultra-personalizado.' },
];

export default function App() {
  const [lang, setLang] = useState('ES');
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="logo-icon">⚡</div>
          Alpha 1
        </div>
        <div className="navbar-actions">
          <div className="lang-toggle">
            <button className={`lang-btn ${lang==='ES'?'active':''}`} onClick={()=>setLang('ES')}>ES</button>
            <button className={`lang-btn ${lang==='EN'?'active':''}`} onClick={()=>setLang('EN')}>EN</button>
          </div>
          <button className="btn-ghost">Iniciar sesión</button>
          <button className="btn-primary">Empezar gratis</button>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-badge">⚡ 100% gratis · 10 nichos · Web + Android · Bilingüe</div>
        <h1>Reservas inteligentes.<br/><span className="gradient-text">El próximo nivel.</span></h1>
        <p>Tus clientes reservan solos. Vos te enfocás en tu trabajo. Con IA, lista de espera y score de clientes.</p>
        <div className="hero-actions">
          <button className="btn-primary btn-large">Empezar gratis →</button>
          <button className="btn-ghost btn-large">Ver demo</button>
        </div>
        <div className="hero-meta">
          <span>✓ Sin tarjeta de crédito</span>
          <span>✓ Sin contratos</span>
          <span>✓ Listo en minutos</span>
          <span>⭐⭐⭐⭐⭐ 5.0</span>
        </div>
      </section>
      <section style={{background:'var(--bg-secondary)'}}>
        <div className="container text-center">
          <div className="section-label">Solo en Alpha 1</div>
          <h2 className="section-title">3 funcionalidades que <span className="gradient-text">nadie más tiene</span></h2>
          <div className="divider"></div>
          <p className="section-sub">Diseñadas para que el comerciante nunca pierda tiempo ni dinero.</p>
          <div className="features-grid">
            {FEATURES_NEW.map((f,i)=>(
              <div key={i} className="feature-card highlight">
                <div className="badge-new">EXCLUSIVO</div>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container text-center">
          <div className="section-label">Todo lo que necesitás</div>
          <h2 className="section-title">Herramientas que <span className="gradient-text">trabajan mientras descansás</span></h2>
          <div className="divider"></div>
          <div className="features-grid">
            {FEATURES_BASE.map((f,i)=>(
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="niches-section">
        <div className="container text-center">
          <div className="section-label">10 industrias</div>
          <h2 className="section-title">¿En qué rubro <span className="gradient-text">trabajás?</span></h2>
          <div className="divider"></div>
          <p className="section-sub">Alpha 1 se adapta a tu negocio con funcionalidades específicas para cada industria.</p>
          <div className="niches-grid">
            {NICHES.map((n,i)=>(
              <div key={i} className="niche-card">
                <div className="niche-icon">{n.icon}</div>
                <h3>{n.name}</h3>
                <p>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{background:'var(--bg-secondary)'}}>
        <div className="container text-center">
          <div className="section-label">Simple y rápido</div>
          <h2 className="section-title">Listo en <span className="gradient-text">3 pasos</span></h2>
          <div className="divider"></div>
          <div className="steps-grid">
            {[{n:'1',t:'Creá tu cuenta',d:'Elegí tu nicho, poné el nombre de tu negocio, configurá tus servicios. Menos de 2 minutos.'},{n:'2',t:'Compartí tu link',d:'Obtené tu link único para poner en Instagram, Google Maps o tu tarjeta de presentación.'},{n:'3',t:'Recibí reservas',d:'Tus clientes reservan solos. Recibís la notificación, confirmás con un toque y listo.'}].map((s,i)=>(
              <div key={i} className="step-card">
                <div className="step-number">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container text-center">
          <div className="section-label">Precios transparentes</div>
          <h2 className="section-title">Empezá gratis. <span className="gradient-text">Crecé cuando estés listo.</span></h2>
          <div className="divider"></div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-name">Free</div>
              <div className="pricing-desc">Todo lo esencial para empezar</div>
              <div><span className="price-amount">$0</span><span className="price-period"> /mes</span></div>
              <ul className="pricing-features">
                {['Hasta 30 citas por mes','Hasta 30 clientes','Hasta 3 servicios','Link personalizado','Página pública 24/7','WhatsApp integrado','Calendario interactivo','Emails de confirmación','Sistema de reseñas','Branding personalizado','Tarjeta de cliente por nicho','Bilingüe ES / EN'].map((f,i)=><li key={i}><span className="check">✓</span>{f}</li>)}
              </ul>
              <button className="btn-ghost" style={{width:'100%',padding:'0.8rem'}}>Empezar gratis</button>
            </div>
            <div className="pricing-card popular">
              <div className="popular-badge">MÁS POPULAR</div>
              <div className="pricing-name">Pro</div>
              <div className="pricing-desc">Para negocios listos para crecer</div>
              <div><span className="price-amount">$19.99</span><span className="price-period"> /mes</span></div>
              <ul className="pricing-features">
                {['Todo lo del plan Free','Citas, clientes y servicios ilimitados','⏳ Lista de espera inteligente','🏆 Score de credibilidad del cliente','📝 Notas de preferencias','IA bilingüe ilimitada','Recordatorio 24h y 2h','Reportes Pro + exportar CSV','Resumen diario al dueño','Depósitos automáticos (Stripe)','Soporte prioritario (12h)','Acceso anticipado a nuevas funciones'].map((f,i)=><li key={i}><span className="check">✓</span>{f}</li>)}
              </ul>
              <button className="btn-primary" style={{width:'100%',padding:'0.8rem'}}>Probar Pro 14 días gratis</button>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title">Tu próximo cliente está buscando reservar <span className="gradient-text">ahora mismo</span></h2>
          <p style={{color:'var(--text-secondary)',fontSize:'1.1rem',margin:'1rem 0 2rem'}}>No lo hagas esperar. Creá tu página en 2 minutos.</p>
          <button className="btn-primary btn-large">Empezar gratis →</button>
          <p style={{color:'var(--text-muted)',fontSize:'0.85rem',marginTop:'1rem'}}>Sin tarjeta de crédito · Sin contratos · Cancelá cuando quieras</p>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-logo">⚡ Alpha 1</div>
        <p>© 2026 Alpha 1. Todos los derechos reservados.</p>
        <p style={{marginTop:'0.5rem'}}>Manage, Schedule, Grow.</p>
      </footer>
    </div>
  );
}
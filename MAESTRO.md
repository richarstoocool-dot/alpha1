# MAESTRO — App Alpha 1

Archivo de contexto del proyecto. Usar como prompt al inicio de cada sesión.

## PROYECTO
App: Alpha 1 — Plataforma SaaS multi-nicho de reservas y citas  
Modelo: Ercivo (ercivo.com) mejorado  
Estado: Fase 3 completada

## URLS Y RECURSOS
- GitHub: github.com/richarstoocool-dot/alpha1 (publico, rama main)
- Vercel produccion: https://alpha1-nu.vercel.app
- Supabase proyecto ref: cylegjgexupdugmsuaoc
- Vercel account: richarstoocool@gmail.com

## CREDENCIALES (guardar fuera del repo)
- GitHub PAT: Ver variable de entorno GITHUB_PAT
- Supabase URL: https://cylegjgexupdugmsuaoc.supabase.co
- Supabase Anon Key: Ver Vercel env vars (REACT_APP_SUPABASE_ANON_KEY)

## ARCHIVOS DEL PROYECTO
- src/App.js — Router + LandingPage + LoginPage + RegisterPage + DemoPage + DashboardPage
- src/styles.css — Estilos dark mode completos
- src/supabaseClient.js — Cliente Supabase
- src/index.js — Entry point
- public/index.html — HTML base
- package.json — v1.1.0

## BASE DE DATOS (Supabase: alpha1-db)
Tablas: negocios, servicios, clientes, citas, horarios

## FASES COMPLETADAS
- FASE 1: Base tecnica — GitHub + Vercel deploy
- FASE 2: Infraestructura — Supabase + 5 tablas + env vars
- FASE 3: Landing final — react-router-dom + rutas /login /register /demo + pricing

## FASES PENDIENTES
- FASE 4: Auth real (Supabase Auth + PrivateRoute)
- FASE 5: Dashboard del negocio
- FASE 6: Pagina publica de reservas /book/[slug]
- FASE 7: Features exclusivos (Score, Lista Espera, Notas)
- FASE 8: Notificaciones (WhatsApp + Email)
- FASE 9: IA y Analytics
- FASE 10: Stripe pagos
- FASE 11: Lanzamiento

## ALPHA 1 vs ERCIVO
Alpha 1 tiene 10 nichos (Ercivo tiene 6)
Exclusivos Alpha 1: Score de Credibilidad, Lista de Espera Inteligente, Notas de Preferencias
Nichos nuevos vs Ercivo: Dentista, Medico, Abogado, Peluqueria

## REGLAS
1. Claude es el ejecutor, no guia
2. Espanol neutro (no argentinismos)
3. No pedir contrasenas al usuario
4. Actualizar este MAESTRO al completar cada fase
5. Email verificacion usado: 98357765

## NOTA TECNICA — VERCEL CACHE
El proyecto usa CRA (react-scripts). Vercel cachea agresivamente.
Para forzar rebuild completo: agregar archivo .env con REACT_APP_BUILD_TIME=timestamp

Ultima actualizacion: Fase 3 completada

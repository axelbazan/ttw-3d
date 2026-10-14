export const event = {
  name: 'Tandil Tech Week',
  year: 2026,
  dates: '14&15 OCT.',
  tagline: 'Un encuentro para construir lo que viene.',
} as const;

export const days = [
  {
    id: 'hacking' as const,
    date: '14 OCTUBRE',
    place: 'UNICEN · CAMPUS',
    track: 'TRACK 01 · CIBERSEGURIDAD',
    title: 'Hacking Day',
    body: 'Jornada de hacking en equipos. Juntá a tus amigos y vení a divertirte aprendiendo de ciberseguridad.',
    venue: 'Campus Universitario UNICEN',
    color: '#1000FF',
    href: 'https://www.tandiltechweek.com/hacking-day',
    tagColor: '#1000FF',
    tagText: 'HACKING DAY',
  },
  {
    id: 'startup' as const,
    date: '15 OCTUBRE',
    place: 'DISTRITO AVELLANEDA',
    track: 'TRACK 02 · STARTUPS',
    title: 'Startup Day',
    body: 'Vení a conocer a los que hacen. Charlas dinámicas y networking entre fundadores, venture capital y estudiantes.',
    venue: 'Distrito Avellaneda · Tandil',
    color: '#22AA22',
    href: 'https://www.tandiltechweek.com/startup-day',
    tagColor: '#22AA22',
    tagText: 'STARTUP DAY',
  },
] as const;

export const agendaIntro =
  'Dos jornadas para construir y conectar. Dos jornadas muy distintas entre sí: una competencia técnica y un día para conectar. Los horarios detallados, desafíos y charlas se anunciarán próximamente.';

export const tagsMarquee = [
  'UNICEN CAMPUS',
  'DISTRITO AVELLANEDA',
  'HACKING DAY',
  'CIBERSEGURIDAD',
  'STARTUP DAY',
  'AGRITECH & BIO',
  'SOFTWARE & AI',
  'VENTURE CAPITAL',
  'POLO CIENTÍFICO',
  'FOUNDERS & BUILDERS',
] as const;

export const socialLinks = {
  instagram: 'https://instagram.com/tandiltechweek',
  x: 'https://x.com/tandiltechweek',
  handle: '@tandiltechweek',
} as const;

export const speakers = {
  eyebrow: 'Convocatoria y voces',
  title: 'Próximamente nuevas voces',
  body: 'Estamos curando una agenda de referentes que van a compartir aprendizajes reales de producto, ciencia y capital.',
  // Slots vacíos para speakers futuros
  slots: 6,
} as const;

export const organizers = {
  eyebrow: 'Impulsores del evento',
  title: 'Organizan',
  body: 'Equipos y fondos que construyen infraestructura, capital, producto y comunidad para el ecosistema tecnológico regional.',
  items: [
    {
      label: 'VC FUND',
      name: 'Picante',
      url: 'https://picante.fund',
      description: 'Acompañan desde el principio a la nueva generación de founders latinoamericanos: AI Natives construyendo productos globales. Confían cuando nadie más confía.',
      footer: 'Venture Capital',
      logoUrl: '/assets/logos/picante.svg', // TODO: obtener del sitio oficial
    },
    {
      label: 'VENTURE LEGAL',
      name: 'relaw',
      url: 'https://relaw.io',
      description: 'El partner legal de startups y empresas de tecnología. Expertise legal y visión de negocio, con acompañamiento 360° para crecer en múltiples mercados.',
      footer: 'Legal Tech',
      logoUrl: '/assets/logos/relaw.svg', // TODO: obtener del sitio oficial
    },
    {
      label: 'PRODUCT STUDIO',
      name: 'PAISANOS',
      url: 'https://paisanos.io',
      description: 'Estudio global de diseño y desarrollo de productos digitales, acompañando a startups y corporates a crear soluciones que escalan.',
      footer: 'Product & Tech',
      logoUrl: '/assets/logos/paisanos.svg', // TODO: obtener del sitio oficial
    },
    {
      label: 'COMMUNITY',
      name: 'HackTandil',
      url: 'https://hacktandil.org',
      description: 'Comunidad tecnológica de Tandil que conecta desarrolladores, estudiantes, emprendedores y entusiastas a través de meetups, hackathons y eventos.',
      footer: 'Builder Community',
      logoUrl: '/assets/logos/hacktandil.svg', // TODO: obtener del sitio oficial
    },
    {
      label: 'TECH PARTNER',
      name: 'Geonosis',
      url: 'https://geonosisgroup.com',
      description: 'El brazo tecnológico de startups y empresas, que las acompaña desde la idea hasta el scale-up. Combinando liderazgo técnico, pensamiento de producto y visión de negocio para construir soluciones digitales reales, alineadas con los objetivos de cada etapa.',
      footer: 'Idea to Scale',
      logoUrl: '/assets/logos/geonosis.svg', // TODO: obtener del sitio oficial
    },
    {
      label: 'BRAND INTELLIGENCE',
      name: 'fardo',
      url: 'https://heyfardo.com',
      description: 'La primera plataforma de brand intelligence de Latam. Miden cómo aparece tu marca en ChatGPT, Gemini, Perplexity y Claude, y arman el plan para que la IA te cite y te recomiende.',
      footer: 'AI Visibility',
      logoUrl: '/assets/logos/fardo.svg', // TODO: obtener del sitio oficial
    },
  ],
} as const;

export const sponsors = {
  eyebrow: 'Quienes apoyan el evento',
  title: 'Acompañan',
  body: 'Sponsors que hacen posible Tandil Tech Week.',
  items: [
    {
      label: 'GRUPO ROTONDA',
      name: 'Rotonda',
      url: 'https://gruporotonda.com.ar',
      logoUrl: '/assets/logos/rotonda.svg', // TODO: obtener del sitio oficial
    },
    {
      label: 'THE RED GUILD',
      name: 'The Red Guild',
      url: 'https://theredguild.org',
      logoUrl: '/assets/logos/red-guild.svg', // TODO: obtener del sitio oficial
    },
    {
      label: 'PAYONEER',
      name: 'Payoneer',
      url: 'https://www.payoneer.com',
      logoUrl: '/assets/logos/payoneer.svg', // TODO: obtener del sitio oficial
    },
  ],
} as const;

export const registration = {
  eyebrow: 'Inscripciones 2026',
  title: 'Construyamos juntos lo que viene.',
  body: 'El 17 de septiembre a las 19:00 abren las inscripciones al Hacking Day y al Startup Day. Podés sumarte a una jornada o a las dos.',
  note: 'Las inscripciones abren el 17 de septiembre de 2026 a las 19:00 (GMT-3).',
  opensAt: '2026-09-17T19:00:00-03:00',
  // Estado actual: "Las inscripciones ya están abiertas"
  isOpen: true, // Cambiar según fecha real
  buttons: [
    {
      label: 'HACKING DAY →',
      href: 'https://www.tandiltechweek.com/hacking-day',
      variant: 'bone' as const, // fondo hueso, texto azul
    },
    {
      label: 'STARTUP DAY →',
      href: 'https://www.tandiltechweek.com/startup-day',
      variant: 'green' as const, // fondo verde
    },
  ],
  social: {
    label: 'MIENTRAS TANTO, SEGUINOS',
    instagram: 'https://instagram.com/tandiltechweek',
    x: 'https://x.com/tandiltechweek',
  },
  footer: '14 & 15 OCT. 2026 · Tandil, Argentina',
} as const;

export const seo = {
  title: 'Tandil Tech Week · 14 & 15 octubre 2026',
  description: '14 y 15 de octubre de 2026 en Tandil. Dos días para conectar el ecosistema startup y conocer a los que hacen.',
  ogImage: 'https://tandiltechweek.com/social-card.png',
  twitterHandle: '@tandiltechweek',
  themeColor: '#1000FF',
} as const;

export const colors = {
  bone: '#F4F2EE',
  ink: '#2A2A2A',
  inkSecondary: '#555',
  blue: '#1000FF',
  green: '#22AA22',
  chipBg: '#E6E4DF',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const scrollSections = [
  { id: 'home', range: [0, 0.1], label: 'Home' },
  { id: 'presentation', range: [0.1, 0.25], label: 'Presentación' },
  { id: 'agenda', range: [0.25, 0.45], label: 'Agenda' },
  { id: 'speakers', range: [0.45, 0.65], label: 'Speakers' },
  { id: 'collaborators', range: [0.65, 0.82], label: 'Colaboradores' },
  { id: 'registration', range: [0.82, 0.95], label: 'Inscripción' },
  { id: 'finale', range: [0.95, 1.0], label: 'Final' },
] as const;

export type ScrollSectionId = (typeof scrollSections)[number]['id'];
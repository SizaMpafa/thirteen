export const theme = {
  background: '#1a1a2e', // kept for any other reference, unused for the wrapper now
  nebulaBackground: {
    backgroundColor: '#050512',
    backgroundImage: `
      radial-gradient(1.5px 1.5px at 8% 15%, #ffffff, transparent),
      radial-gradient(1px 1px at 22% 62%, #ffffff, transparent),
      radial-gradient(1.5px 1.5px at 38% 8%, #ffffff, transparent),
      radial-gradient(1px 1px at 55% 45%, #ffffff, transparent),
      radial-gradient(1.5px 1.5px at 70% 78%, #ffffff, transparent),
      radial-gradient(1px 1px at 85% 25%, #ffffff, transparent),
      radial-gradient(1.5px 1.5px at 92% 60%, #ffffff, transparent),
      radial-gradient(1px 1px at 12% 88%, #ffffff, transparent),
      radial-gradient(circle at 28% 35%, rgba(63,208,255,0.45), transparent 55%),
      radial-gradient(circle at 74% 66%, rgba(232,69,31,0.45), transparent 55%),
      radial-gradient(circle at 50% 50%, rgba(199,123,209,0.22), transparent 70%)
    `,
    backgroundRepeat:
      'repeat, repeat, repeat, repeat, repeat, repeat, repeat, repeat, no-repeat, no-repeat, no-repeat',
    backgroundSize:
      '220px 220px, 220px 220px, 220px 220px, 220px 220px, 220px 220px, 220px 220px, 220px 220px, 220px 220px, 100% 100%, 100% 100%, 100% 100%',
    backgroundAttachment: 'fixed, fixed, fixed, fixed, fixed, fixed, fixed, fixed, fixed, fixed, fixed',
  },
  backgroundElement: 'rgba(255,255,255,0.05)',
  backgroundSelected: 'rgba(243,156,18,0.2)',
  gold: '#f39c12',
  text: '#ffffff',
  textSecondary: '#888888',
  muted: '#555555',
  past: 'rgba(100,100,100,0.3)',
  present: 'rgba(243,156,18,0.3)',
  future: 'rgba(255,255,255,0.1)',
  error: '#e74c3c',
  borderPast: '#666666',
  borderPresent: '#f39c12',
  borderFuture: '#444444',
  pastText: '#C68E17',
  pastBorder: '#708090',
  pastBg: '#3D2B1F',
  futureText: '#E0E8F0',
  futureBorder: '#00D4FF',
  futureBg: 'rgba(0, 212, 255, 0.08)'
};
// src/components/WhyView.tsx
import { theme } from '../constants/theme';

export function WhyView() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Why August, Not January?</h1>
      <div style={styles.content}>
        <p>
          The Gregorian calendar was imposed during colonization, erasing African cosmic
          alignment. In the African Indigenous Spiritual Calendar, the year begins in
          <strong> August</strong> because it aligns with the Sun’s energy (Leo, Fire) —
          the ignition of creation.
        </p>
        <p>
          The Crown Chakra (Sun) leads the cycle, followed by the Moon (Water) and the
          other planetary gods. The 13-month cycle includes the 5th Element — Spirit
          (Ophiuchus) — representing transcendence.
        </p>
        <p>
          Ancient Egypt, Mesopotamia, and Southern African civilizations observed the
          heliacal rise of Sirius in August, marking rebirth and renewal. Nature itself
          awakens in August (spring in the Southern Hemisphere).
        </p>
        <p style={styles.signature}>P + P = F — Past + Present = Future</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    color: theme.text,
  },
  title: {
    color: theme.gold,
    fontSize: '2.5rem',
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  content: {
    fontSize: '1.2rem',
    lineHeight: 1.8,
  },
  signature: {
    marginTop: '30px',
    textAlign: 'center' as const,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.gold,
  },
};
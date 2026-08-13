import { useCalendar } from './hooks/useCalendar';
import { ConstellationLayout } from './components/ConstellationLayout';
import { LoadingSpinner } from './components/LoadingSpinner';
import { theme } from './constants/theme';

export default function App() {
  const { past, present, future, today, loading, error } = useCalendar();

  if (loading) {
    return (
      <>
        <div className="nebula-layer" />
        <div style={styles.center}>
          <LoadingSpinner />
          <p style={{ color: theme.textSecondary }}>Loading calendar data...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="nebula-layer" />
        <div style={styles.center}>
          <p style={{ color: theme.error }}>Error: {error}</p>
          <p style={{ color: theme.textSecondary }}>Please refresh or try again later.</p>
        </div>
      </>
    );
  }

  if (!past || !present || !future || !today) {
    return (
      <>
        <div className="nebula-layer" />
        <div style={styles.center}>
          <p style={{ color: theme.textSecondary }}>No calendar data available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="nebula-layer" />
      <div style={styles.container}>
        <ConstellationLayout
          past={past}
          present={present}
          future={future}
          today={today}
        />
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  center: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
};
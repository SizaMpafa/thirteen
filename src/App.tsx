// src/App.tsx
import { useState } from 'react';
import { useCalendar } from './hooks/useCalendar';
import { ConstellationLayout } from './components/ConstellationLayout';
import { YearView } from './components/YearView';
import { WhyView } from './components/WhyView';
import { Navigation } from './components/Navigation';
import { LoadingSpinner } from './components/LoadingSpinner';
import { theme } from './constants/theme';
import { useMediaQuery } from './hooks/useMediaQuery';

export default function App() {
  const { past, present, future, today, loading, error } = useCalendar();
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'why' | 'year'>('dashboard');
  const isMobile = useMediaQuery('(max-width: 768px)');

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

  let content;
  switch (currentTab) {
    case 'dashboard':
      content = (
        <ConstellationLayout
          past={past}
          present={present}
          future={future}
          today={today}
        />
      );
      break;
    case 'why':
      content = <WhyView />;
      break;
    case 'year':
      content = <YearView initialYear={today.year} />;
      break;
    default:
      content = null;
  }

  return (
    <>
      <div className="nebula-layer" />
      <div style={{
        ...styles.container,
        paddingTop: isMobile ? '0px' : '80px', // desktop top padding for fixed nav
        paddingBottom: isMobile ? '80px' : '0px',
      }}>
        {content}
        <Navigation currentTab={currentTab} setTab={setCurrentTab} />
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: 'transparent',
    position: 'relative' as const,
    zIndex: 1,
  },
  center: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '20px',
    position: 'relative' as const,
    zIndex: 1,
  },
};
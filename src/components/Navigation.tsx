// src/components/Navigation.tsx
import { theme } from '../constants/theme';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Props {
  currentTab: 'dashboard' | 'why' | 'year';
  setTab: (tab: 'dashboard' | 'why' | 'year') => void;
}

export function Navigation({ currentTab, setTab }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const tabs = [
    { id: 'dashboard' as const, label: 'Home', icon: '🌌' },
    { id: 'why' as const, label: 'Why August', icon: '📖' },
    { id: 'year' as const, label: 'Year', icon: '📅' },
  ];

  return (
    <nav style={isMobile ? styles.mobileNav : styles.desktopNav}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            style={{
              ...(isMobile ? styles.mobileButton : styles.desktopButton),
              backgroundColor: isActive ? theme.gold : 'transparent',
              color: isActive ? '#1a1a2e' : theme.text,
            }}
          >
            {isMobile ? (
              <>
                <span style={styles.icon}>{tab.icon}</span>
                <span style={styles.mobileLabel}>{tab.label}</span>
              </>
            ) : (
              <span style={styles.desktopLabel}>{tab.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

const styles = {
  // --- DESKTOP (fixed top, full width, larger text) ---
  desktopNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    padding: '14px 20px',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(12px)',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    zIndex: 1000,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  desktopButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 28px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'transparent',
    color: '#888',
    fontSize: '1.1rem',
    fontWeight: '500',
    fontFamily: 'inherit',
  },
  desktopLabel: {
    fontSize: '1.1rem',
    fontWeight: '500',
    letterSpacing: '0.3px',
  },

  // --- MOBILE (fixed bottom, icons + small text) ---
  mobileNav: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '6px 0',
    paddingBottom: '10px',
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(12px)',
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  mobileButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    padding: '4px 12px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'transparent',
    color: '#888',
    fontSize: '0.7rem',
    fontFamily: 'inherit',
    minWidth: '60px',
  },
  icon: {
    fontSize: '1.5rem',
    lineHeight: 1,
  },
  mobileLabel: {
    fontSize: '0.6rem',
    fontWeight: '500',
    textAlign: 'center' as const,
  },
};
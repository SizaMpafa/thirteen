// src/components/Navigation.tsx
import { theme } from '../constants/theme';

interface Props {
  currentTab: 'dashboard' | 'why' | 'year';
  setTab: (tab: 'dashboard' | 'why' | 'year') => void;
}

export function Navigation({ currentTab, setTab }: Props) {
  const tabs = [
    { id: 'dashboard' as const, label: 'Home', icon: '🌌' },
    { id: 'why' as const, label: 'Why August', icon: '📖' },
    { id: 'year' as const, label: 'Year', icon: '📅' },
  ];

  return (
    <nav style={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setTab(tab.id)}
          style={{
            ...styles.button,
            backgroundColor: currentTab === tab.id ? theme.gold : 'transparent',
            color: currentTab === tab.id ? '#1a1a2e' : theme.text,
          }}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span style={styles.label}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
    flexWrap: 'wrap' as const,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    background: 'transparent',
    color: '#888',
    fontSize: '0.9rem',
  },
  icon: {
    fontSize: '1.2rem',
  },
  label: {
    fontWeight: '500',
  },
};
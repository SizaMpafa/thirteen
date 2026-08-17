// src/components/Navigation.tsx
import { theme } from '../constants/theme';

interface Props {
  currentTab: 'dashboard' | 'why' | 'year';
  setTab: (tab: 'dashboard' | 'why' | 'year') => void;
}

export function Navigation({ currentTab, setTab }: Props) {
  const tabs = [
    { id: 'dashboard' as const, label: '🌌', tooltip: 'Constellation' },
    { id: 'why' as const, label: '📖', tooltip: 'Why August' },
    { id: 'year' as const, label: '📅', tooltip: 'Year View' },
  ];

  return (
    <div style={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setTab(tab.id)}
          style={{
            ...styles.button,
            backgroundColor: currentTab === tab.id ? theme.gold : 'transparent',
            color: currentTab === tab.id ? '#1a1a2e' : theme.text,
          }}
          title={tab.tooltip}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '16px 0',
    background: 'rgba(0,0,0,0.3)',
    position: 'sticky' as const,
    bottom: 0,
    width: '100%',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
  },
  button: {
    fontSize: '1.8rem',
    padding: '8px 20px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    background: 'transparent',
    color: '#888',
  },
};
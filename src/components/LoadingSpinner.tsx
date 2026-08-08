// import React from 'react';
import { theme } from '../constants/theme';

export function LoadingSpinner() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: `4px solid ${theme.backgroundElement}`,
    borderTop: `4px solid ${theme.gold}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

// Add keyframes for the spin animation (you can put this in a global CSS file, but we'll inject it here via a style tag)
// Since React doesn't support keyframes in inline styles, we'll use a simple style tag in the component.
// A better approach is to put this in a global CSS file, but for simplicity:
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
// import React from 'react';
import { theme } from '../constants/theme';

export function CenterSymbols() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(243,156,18,0.1)',
        borderRadius: '50%',
        border: `2px solid ${theme.gold}`,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: '2rem', lineHeight: 1.2 }}>☥</div>
      <div style={{ fontSize: '1.6rem', lineHeight: 1.2 }}>⌛</div>
    </div>
  );
}
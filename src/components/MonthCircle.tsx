import React from 'react';
import { theme } from '../constants/theme';
import { getMonthName } from '../constants/months';

interface Props {
  month: number;
  year: number;
  position: 'past' | 'present' | 'future';
  number: number; // 1..13
}

export function MonthCircle({ month, year, position, number }: Props) {
  const monthName = getMonthName(month);

  const getStyles = () => {
    switch (position) {
      case 'past':
        return { backgroundColor: theme.past, borderColor: theme.borderPast, textColor: theme.textSecondary };
      case 'present':
        return { backgroundColor: theme.present, borderColor: theme.borderPresent, textColor: theme.text, borderWidth: 3 };
      default:
        return { backgroundColor: theme.future, borderColor: theme.borderFuture, textColor: theme.textSecondary };
    }
  };

  const { backgroundColor, borderColor, textColor, borderWidth = 2 } = getStyles();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px',
        boxSizing: 'border-box',
        color: textColor,
        fontSize: '0.7rem',
        textAlign: 'center',
        lineHeight: 1.2,
        boxShadow: position === 'present' ? `0 0 15px ${theme.gold}` : 'none',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{monthName}</div>
      <div>{number}/13</div>
      <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>{year}</div>
    </div>
  );
}
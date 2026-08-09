// import React from 'react';
import { theme } from '../constants/theme';
import { getMonthName } from '../constants/months';

interface Props {
  month: number;
  year: number;
  position: 'past' | 'present' | 'future';
  number: number;
}

export function MonthCircle({ month, year, position, number }: Props) {
  const monthName = getMonthName(month);

  // Past: Sepia, Slate Gray, Faded Ochre
  // Present: Gold (unchanged)
  // Future: Electric Blue, Vibrant Teal, Iridescent Silver
  const getStyles = () => {
    switch (position) {
      case 'past':
        return {
            backgroundColor: theme.pastBg,
            borderColor: theme.pastBorder,
            textColor: theme.pastText,
            borderWidth: 2,
            boxShadow: 'none',
            filter: 'sepia(0.6) saturate(0.8) brightness(0.9)',
        };

      case 'present':
        return {
          backgroundColor: theme.present,
          borderColor: theme.borderPresent,
          textColor: theme.text,
          borderWidth: 3,
          boxShadow: `0 0 20px ${theme.gold}`,
          filter: 'none',
        };
      case 'future':
        return {
            backgroundColor: theme.futureBg,
            borderColor: theme.futureBorder,
            textColor: theme.futureText,
            borderWidth: 2,
            boxShadow: `0 0 15px ${theme.futureBorder}`,
            filter: 'none',
            animation: 'futurePulse 2s ease-in-out infinite',
        };
      default:
        return {
          backgroundColor: theme.future,
          borderColor: theme.borderFuture,
          textColor: theme.textSecondary,
          borderWidth: 2,
          boxShadow: 'none',
          filter: 'none',
        };
    }
  };

  const {
    backgroundColor,
    borderColor,
    textColor,
    borderWidth,
    boxShadow,
    filter,
    animation,
  } = getStyles();

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
        boxShadow,
        filter,
        animation,
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{monthName}</div>
      <div>{number}/13</div>
      <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>{year}</div>
    </div>
  );
}
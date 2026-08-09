// src/components/MonthCircle.tsx
// import React from 'react';
import { theme } from '../constants/theme';
import { getMonthName } from '../constants/months';

interface Props {
  month: number;
  year: number;
  position: 'past' | 'present' | 'future';
  number: number;
  days: number[];
  firstDayOfWeek: number;  // 0 = Sunday
  totalDays: number;
}

// Weekday abbreviations (Sun, Mon, ...)
const WEEKDAY_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function MonthCircle({ 
  month, year, position, number, days, firstDayOfWeek, totalDays 
}: Props) {
  const monthName = getMonthName(month);

  // Build a 2D array of weeks (each week has 7 slots, with null for empty days)
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];
  // Fill initial empty slots before the first day
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }
  for (let day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  // Fill remaining slots in the last week with null
  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Styles for past, present, future
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
        padding: '6px',
        boxSizing: 'border-box',
        color: textColor,
        fontSize: '0.6rem',
        textAlign: 'center',
        lineHeight: 1.2,
        boxShadow,
        filter,
        animation,
        transition: 'all 0.3s ease',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Month name and year */}
      <div style={{ fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '2px' }}>
        {monthName} {year}
      </div>

      {/* Mini calendar grid */}
      <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
        {/* Weekday headers */}
        {WEEKDAY_SHORT.map((wd) => (
          <div key={wd} style={{ fontSize: '0.45rem', opacity: 0.6, fontWeight: 'bold' }}>
            {wd}
          </div>
        ))}
        {/* Day numbers */}
        {weeks.flat().map((day, idx) => (
          <div
            key={idx}
            style={{
              fontSize: '0.45rem',
              opacity: day ? 1 : 0,
              padding: '1px 0',
              lineHeight: 1,
            }}
          >
            {day || ''}
          </div>
        ))}
      </div>

      {/* Position indicator (small) */}
      {/* <div style={{ fontSize: '0.45rem', opacity: 0.5, marginTop: '2px' }}>
        {number}/13
      </div> */}
    </div>
  );
}
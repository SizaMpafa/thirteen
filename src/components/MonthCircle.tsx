// src/components/MonthCircle.tsx
import { theme } from '../constants/theme';
import { getMonthName } from '../constants/months';

interface Props {
  month: number;
  year: number;
  position: 'past' | 'present' | 'future';
  number: number;
  days: number[];
  firstDayOfWeek: number;
  totalDays: number;
}

const WEEKDAY_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function MonthCircle({
  month,
  year,
  position,
//   number,
  days,
  firstDayOfWeek
//   totalDays,
}: Props) {
  const monthName = getMonthName(month);

  // Build weeks grid
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }
  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

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
          boxShadow: `0 0 40px ${theme.gold}`,
          filter: 'none',
        };
      case 'future':
        return {
          backgroundColor: theme.futureBg,
          borderColor: theme.futureBorder,
          textColor: theme.futureText,
          borderWidth: 2,
          boxShadow: `0 0 25px ${theme.futureBorder}`,
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
        padding: '12px',
        boxSizing: 'border-box',
        color: textColor,
        fontSize: '0.75rem',
        textAlign: 'center',
        lineHeight: 1.4,
        boxShadow,
        filter,
        animation,
        transition: 'all 0.3s ease',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '4px' }}>
        {monthName} {year}
      </div>

      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          fontSize: '0.45rem',
        }}
      >
        {WEEKDAY_SHORT.map((wd) => (
          <div key={wd} style={{ opacity: 0.7, fontWeight: 'bold' }}>
            {wd}
          </div>
        ))}
        {weeks.flat().map((day, idx) => (
          <div
            key={idx}
            style={{
              opacity: day ? 1 : 0,
              padding: '2px 0',
              lineHeight: 1,
            }}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}
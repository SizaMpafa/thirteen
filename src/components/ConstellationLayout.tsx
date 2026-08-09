// src/components/ConstellationLayout.tsx
// import React from 'react';
import { MonthCircle } from './MonthCircle';
import { CenterSymbols } from './CenterSymbols';
import { theme } from '../constants/theme';
import type { MonthWithDays } from '../hooks/useCalendar';

interface Props {
  past: MonthWithDays;
  present: MonthWithDays;
  future: MonthWithDays[];
}

export function ConstellationLayout({ past, present, future }: Props) {
  // Build the 13-month array: present (top), future (right side), past (bottom-left)
  const allMonths = [
    { ...present, position: 'present' as const, number: 2 },
    ...future.map((m, i) => ({
      ...m,
      position: 'future' as const,
      number: i + 3,
    })),
    { ...past, position: 'past' as const, number: 1 },
  ];

  const radius = 200;
  const centerX = 350;
  const centerY = 350;
  const total = allMonths.length;

  return (
    <div style={styles.wrapper}>
      <svg viewBox="0 0 700 700" width="100%" height="100%" style={styles.svg}>
        <circle cx={centerX} cy={centerY} r={radius + 20} fill="none" stroke={theme.borderFuture} strokeWidth="1" strokeDasharray="4 4" />

        {allMonths.map((month, index) => {
          const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <foreignObject
              key={index}
              x={x - 60}  // increased size to fit mini calendar
              y={y - 60}
              width={120}
              height={120}
            >
              <MonthCircle
                month={month.month}
                year={month.year}
                position={month.position}
                number={month.number}
                days={month.days}
                firstDayOfWeek={month.firstDayOfWeek}
                totalDays={month.totalDays}
              />
            </foreignObject>
          );
        })}

        <foreignObject x={centerX - 40} y={centerY - 40} width={80} height={80}>
          <CenterSymbols />
        </foreignObject>
      </svg>

      <div style={styles.footer}>
        <p style={styles.tagline}>
          <span style={{ color: theme.pastText }}>Past</span>
          <span style={{ color: theme.textSecondary }}> + </span>
          <span style={{ color: theme.gold }}>Present</span>
          <span style={{ color: theme.textSecondary }}> = </span>
          <span style={{ color: theme.futureBorder }}>Future</span>
        </p>
        <p style={styles.credit}>Spirituality Must Lead</p>
      </div>
    </div>
  );
}

// styles object (unchanged, but note the foreignObject size increased)

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  svg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    aspectRatio: '1/1',
    maxWidth: '700px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center' as const,
  },
  tagline: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: theme.gold,
    marginBottom: '4px',
  },
  credit: {
    fontSize: '0.9rem',
    color: theme.textSecondary,
  },
};
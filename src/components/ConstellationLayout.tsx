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
  const allMonths = [
    { ...present, position: 'present' as const, number: 2 },
    ...future.map((m, i) => ({
      ...m,
      position: 'future' as const,
      number: i + 3,
    })),
    { ...past, position: 'past' as const, number: 1 },
  ];

  const radius = 300;                 // increased from 260
  const centerX = 450;                // adjusted for larger viewBox
  const centerY = 450;
  const circleSize = 130;             // increased from 100
  const total = allMonths.length;

  return (
    <div style={styles.wrapper}>
      <svg viewBox="0 0 900 900" width="100%" height="100%" style={styles.svg}>
        <circle cx={centerX} cy={centerY} r={radius + 20} fill="none" stroke={theme.borderFuture} strokeWidth="1" strokeDasharray="4 4" />

        {allMonths.map((month, index) => {
          const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <foreignObject
              key={index}
              x={x - circleSize / 2}
              y={y - circleSize / 2}
              width={circleSize}
              height={circleSize}
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

        <foreignObject x={centerX - 50} y={centerY - 50} width={100} height={100}>
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

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  },
  svg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    aspectRatio: '1/1',
    maxWidth: '850px',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center' as const,
  },
  tagline: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: theme.gold,
    marginBottom: '4px',
  },
  credit: {
    fontSize: '1rem',
    color: theme.textSecondary,
  },
};
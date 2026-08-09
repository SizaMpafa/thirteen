// src/components/ConstellationLayout.tsx
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

const radius = 400;
const centerX = 525;
const centerY = 525;
const circleSize = 180;           // bigger circles
  const total = allMonths.length;

  return (
    <div style={styles.wrapper}>
      <svg viewBox="0 0 1050 1050" width="100%" height="100%" style={styles.svg}>
        <circle cx={centerX} cy={centerY} r={radius + 25} fill="none" stroke={theme.borderFuture} strokeWidth="1.5" strokeDasharray="6 6" />

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

        <foreignObject x={centerX - 55} y={centerY - 55} width={110} height={110}>
          <CenterSymbols />
        </foreignObject>
      </svg>

      <div style={styles.footer}>
        <p style={styles.tagline}>
          <span style={{ color: theme.pastText }}>P</span>
          <span style={{ color: theme.textSecondary }}> + </span>
          <span style={{ color: theme.gold }}>P</span>
          <span style={{ color: theme.textSecondary }}> = </span>
          <span style={{ color: theme.futureBorder }}>F</span>
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
    maxWidth: '1000px',
    margin: '0 auto',
  },
  svg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    aspectRatio: '1/1',
    maxWidth: '950px',
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
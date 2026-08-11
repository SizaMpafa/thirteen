import { useState, useEffect } from 'react';
import { getMonthName } from '../constants/months';

interface Props {
  year: number;
  month: number;
  day: number;
  weekday: string;
}

export function CenterDisplay({ year, month, day, weekday }: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const monthName = getMonthName(month);
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return (
    <div style={styles.container}>
      <div style={styles.symbol}>☥</div>
      <div style={styles.date}>
        {weekday}, {day} {monthName} {year}
      </div>
      <div style={styles.time}>
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(243,156,18,0.08)',
    borderRadius: '50%',
    border: '2px solid #f39c12',
    boxSizing: 'border-box' as const,
    padding: '8px',
    textAlign: 'center' as const,
    color: '#ffffff',
    textShadow: '0 0 10px rgba(243,156,18,0.3)',
  },
  symbol: {
    fontSize: '2.2rem',
    lineHeight: 1,
    marginBottom: '2px',
  },
  date: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '2px',
  },
  time: {
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    opacity: 0.9,
  },
};
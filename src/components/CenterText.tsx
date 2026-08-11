// src/components/CenterText.tsx
import { useState, useEffect } from 'react';
import { getMonthName } from '../constants/months';
import { theme } from '../constants/theme';

interface Props {
  year: number;
  month: number;
  day: number;
  weekday: string;
}

export function CenterText({ year, month, day, weekday }: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const monthName = getMonthName(month);
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return (
    <div style={{
      color: theme.gold,              // now gold
      textAlign: 'center',
      fontSize: '1.2rem',
      lineHeight: 1.4,
      textShadow: `0 0 20px ${theme.gold}40`, // subtle glow
    }}>
      <div>{weekday}, {day} {monthName} {year}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.6rem', letterSpacing: '2px' }}>
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}
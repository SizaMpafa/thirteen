// src/components/CenterText.tsx
import { useState, useEffect } from 'react';
import { getMonthName } from '../constants/months';
import { theme } from '../constants/theme';

// Mapping: month number (1 = August) -> planet and zodiac
const MONTH_DATA: Record<number, { planet: string; zodiac: string }> = {
  1: { planet: 'Sun', zodiac: 'Leo' },
  2: { planet: 'Mercury', zodiac: 'Virgo' },
  3: { planet: 'Venus', zodiac: 'Libra' },
  4: { planet: 'Mars', zodiac: 'Scorpio' },
  5: { planet: 'Jupiter', zodiac: 'Sagittarius' },
  6: { planet: 'Saturn', zodiac: 'Capricorn' },
  7: { planet: 'Saturn', zodiac: 'Aquarius' },
  8: { planet: 'Jupiter', zodiac: 'Pisces' },
  9: { planet: 'Mars', zodiac: 'Aries' },
  10: { planet: 'Venus', zodiac: 'Taurus' },
  11: { planet: 'Mercury', zodiac: 'Gemini' },
  12: { planet: 'Moon', zodiac: 'Cancer' },
};

interface Props {
  year: number;
  month: number;
  day: number;
  weekday: string;
}

export function CenterText({ year, month, day, weekday }: Props) {
  const [time, setTime] = useState(new Date());
  const [formatIndex, setFormatIndex] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => setTime(new Date()), 1000);
    const formatInterval = setInterval(() => {
      setFormatIndex((prev) => (prev + 1) % 3);
    }, 5000); // cycle every 5 seconds
    return () => {
      clearInterval(timeInterval);
      clearInterval(formatInterval);
    };
  }, []);

  const monthName = getMonthName(month);
  const monthData = MONTH_DATA[month];
  const planet = monthData?.planet || '';
  const zodiac = monthData?.zodiac || '';

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  // Format options
  const formats = [
    `${weekday}, ${day} ${monthName} ${year}`,           // full date
    `${weekday}, ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`, // DD/MM/YYYY
    `${weekday}, ${day} ${planet}(${zodiac}) ${year}`,   // with planet and zodiac
  ];

  const displayDate = formats[formatIndex];

  return (
    <div style={{
      color: theme.gold,
      textAlign: 'center',
      fontSize: '1.2rem',
      lineHeight: 1.4,
      textShadow: `0 0 20px ${theme.gold}40`,
    }}>
      <div>{displayDate}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '1.6rem', letterSpacing: '2px' }}>
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}
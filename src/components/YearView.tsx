// src/components/YearView.tsx
import { useState, useEffect } from 'react';
import { theme } from '../constants/theme';
import { getMonthName } from '../constants/months';
import { useCalendar } from '../hooks/useCalendar';

interface YearViewProps {
  initialYear?: number;
}

const WEEKDAY_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function YearView({ initialYear }: YearViewProps) {
  const { getYearMonths, isInitialized, today } = useCalendar();
  const [year, setYear] = useState(initialYear || 2027);
  const [months, setMonths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Set the year to the African current year once `today` is available
  useEffect(() => {
    if (today && !initialYear) {
      setYear(today.year);
    }
  }, [today, initialYear]);

  // Compute months when year changes and WASM is ready
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (!isInitialized) {
        setLoading(true);
        return;
      }
      try {
        const data = getYearMonths(year);
        if (isMounted) {
          setMonths(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading year months:', err);
        setTimeout(() => {
          if (isMounted) {
            try {
              const retryData = getYearMonths(year);
              setMonths(retryData);
              setLoading(false);
            } catch (_) {
              setLoading(false);
            }
          }
        }, 200);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [year, isInitialized, getYearMonths]);

  const handlePrevYear = () => setYear(y => y - 1);
  const handleNextYear = () => setYear(y => y + 1);
  const handleToday = () => {
    if (today) {
      setYear(today.year);
    }
  };

  // Helper to check if a given day is today
  const isToday = (month: number, day: number, y: number) => {
    if (!today) return false;
    return today.year === y && today.month === month && today.day === day;
  };

  if (loading || !isInitialized) {
    return (
      <div style={{ color: theme.text, padding: '40px', textAlign: 'center' }}>
        Loading year data...
      </div>
    );
  }

  if (months.length === 0) {
    return (
      <div style={{ color: theme.text, padding: '40px', textAlign: 'center' }}>
        No data available for this year.
      </div>
    );
  }

  const renderMonthGrid = (monthData: any) => {
    const { month, year: y, days, firstDayOfWeek } = monthData;
    const monthName = getMonthName(month);

    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) currentWeek.push(null);
    for (const day of days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    while (currentWeek.length < 7) currentWeek.push(null);
    if (currentWeek.length > 0) weeks.push(currentWeek);

    return (
      <div key={month} style={styles.monthCard}>
        <div style={styles.monthTitle}>{monthName} {y}</div>
        <div style={styles.grid}>
          {WEEKDAY_SHORT.map(wd => (
            <div key={wd} style={styles.weekdayHeader}>{wd}</div>
          ))}
          {weeks.flat().map((day, idx) => {
            const isTodayDate = day !== null && isToday(month, day, y);
            return (
              <div
                key={idx}
                style={{
                  ...styles.dayCell,
                  opacity: day ? 1 : 0,
                  ...(isTodayDate ? styles.todayCell : {}),
                }}
              >
                {day || ''}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handlePrevYear} style={styles.navButton}>‹</button>
        <span style={styles.yearLabel}>{year}</span>
        <button onClick={handleNextYear} style={styles.navButton}>›</button>
        <button onClick={handleToday} style={styles.todayButton}>Today</button>
      </div>
      <div style={styles.gridContainer}>
        {months.map(renderMonthGrid)}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    color: theme.text,
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  yearLabel: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.gold,
    minWidth: '120px',
    textAlign: 'center' as const,
  },
  navButton: {
    background: 'transparent',
    border: `1px solid ${theme.borderFuture}`,
    color: theme.text,
    fontSize: '1.5rem',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  todayButton: {
    background: theme.gold,
    border: 'none',
    color: '#1a1a2e',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  monthCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '12px',
    border: `1px solid ${theme.borderFuture}`,
  },
  monthTitle: {
    textAlign: 'center' as const,
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: theme.gold,
    marginBottom: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    fontSize: '0.8rem',
  },
  weekdayHeader: {
    textAlign: 'center' as const,
    fontWeight: 'bold',
    opacity: 0.6,
    fontSize: '0.7rem',
  },
  dayCell: {
    textAlign: 'center' as const,
    padding: '2px 0',
    borderRadius: '2px',
  },
  todayCell: {
    backgroundColor: theme.gold,
    color: '#1a1a2e',
    fontWeight: 'bold',
    borderRadius: '50%',
    padding: '2px 0',
  },
};
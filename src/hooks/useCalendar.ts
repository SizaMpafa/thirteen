// src/hooks/useCalendar.ts
import { useEffect, useState } from 'react';
import init, { WasmAfricanDate as AfricanDate } from '@siza_m_official/afri-spirit-calendar-js';
import type { MonthData } from '../types';

export interface MonthWithDays extends MonthData {
  days: number[];
  firstDayOfWeek: number;  // 0 = Sunday
  totalDays: number;
}

interface CalendarData {
  past: MonthWithDays;
  present: MonthWithDays;
  future: MonthWithDays[];
}

// Helper to convert weekday string to index (0 = Sunday)
const weekdayToIndex = (wd: string): number => {
  const map: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  return map[wd] ?? 0;
};

export function useCalendar() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [today, setToday] = useState<{ year: number; month: number; day: number; weekday: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        await init();
        const todayDate = AfricanDate.today();
        const currentMonth = todayDate.month;
        const currentYear = todayDate.year;

        // Helper: build a month object with calendar grid
        const buildMonth = (month: number, year: number): MonthWithDays => {
          const firstDate = new AfricanDate(year, month, 1);
          const totalDays = firstDate.days_in_month();
          const weekdayStr = firstDate.weekday();
          const firstDayOfWeek = weekdayToIndex(weekdayStr);
          const days = Array.from({ length: totalDays }, (_, i) => i + 1);
          return { month, year, days, firstDayOfWeek, totalDays };
        };

        // Today info (for the center display)
        const todayInfo = {
          year: todayDate.year,
          month: todayDate.month,
          day: todayDate.day,
          weekday: todayDate.weekday(),
        };

        // Past (one month before current)
        let pastMonth = currentMonth - 1;
        let pastYear = currentYear;
        if (pastMonth < 1) {
          pastMonth = 12;
          pastYear -= 1;
        }
        const past = buildMonth(pastMonth, pastYear);

        // Present
        const present = buildMonth(currentMonth, currentYear);

        // Future (11 months)
        const future: MonthWithDays[] = [];
        for (let i = 1; i <= 11; i++) {
          let m = currentMonth + i;
          let y = currentYear;
          if (m > 12) {
            m -= 12;
            y += 1;
          }
          future.push(buildMonth(m, y));
        }

        if (isMounted) {
          setData({ past, present, future });
          setToday(todayInfo);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { ...data, today, loading, error };
}
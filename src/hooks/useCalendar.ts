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

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        await init();
        const today = AfricanDate.today();
        const currentMonth = today.month;
        const currentYear = today.year;

        // Helper: build a month object with calendar grid
        const buildMonth = (month: number, year: number): MonthWithDays => {
          // Create an AfricanDate for the 1st of this month
          const firstDate = new AfricanDate(year, month, 1);
          const totalDays = firstDate.days_in_month();          // returns number
          const weekdayStr = firstDate.weekday();              // returns "Sunday", etc.
          const firstDayOfWeek = weekdayToIndex(weekdayStr);   // 0 = Sunday

          // Build array of day numbers (1..totalDays)
          const days = Array.from({ length: totalDays }, (_, i) => i + 1);

          return { month, year, days, firstDayOfWeek, totalDays };
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

  return { ...data, loading, error };
}
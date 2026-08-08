import { useEffect, useState } from 'react';
import init, { WasmAfricanDate as AfricanDate } from '@siza_m_official/afri-spirit-calendar-js';
import type { MonthData } from '../types';

interface CalendarData {
  past: MonthData;
  present: MonthData;
  future: MonthData[];
}

export function useCalendar() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        // Initialize the WASM module
        await init();
        const today = AfricanDate.today();
        const currentMonth = today.month;
        const currentYear = today.year;

        // Past: one month before current
        let pastMonth = currentMonth - 1;
        let pastYear = currentYear;
        if (pastMonth < 1) {
          pastMonth = 12;
          pastYear -= 1;
        }

        // Present: current month
        const presentMonth = currentMonth;
        const presentYear = currentYear;

        // Future: 11 months after present
        const futureMonths: MonthData[] = [];
        for (let i = 1; i <= 11; i++) {
          let m = currentMonth + i;
          let y = currentYear;
          if (m > 12) {
            m -= 12;
            y += 1;
          }
          futureMonths.push({ month: m, year: y });
        }

        if (isMounted) {
          setData({
            past: { month: pastMonth, year: pastYear },
            present: { month: presentMonth, year: presentYear },
            future: futureMonths,
          });
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
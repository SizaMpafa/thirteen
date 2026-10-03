// src/components/EkuphumleniView.tsx
import { useMemo } from 'react';
import { theme } from '../constants/theme';
import { useLocation } from '../hooks/useLocation';

// Coordinates of Ekuphumleni
const EKUPHUMLENI_LAT = -29.075472; // 29°04'31.7"S
const EKUPHUMLENI_LON = 27.624528;  // 27°37'28.3"E

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
  const x =
    Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
    Math.sin(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.cos(dLon);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function bearingToDirection(bearing: number): string {
  const dirs = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.round((((bearing % 360) + 360) % 360) / 45) % 8;
  return dirs[index];
}

export function EkuphumleniView() {
  const { latitude, longitude, heading, error, loading } = useLocation();

  const distance = useMemo(() => {
    if (latitude === null || longitude === null) return null;
    return getDistance(latitude, longitude, EKUPHUMLENI_LAT, EKUPHUMLENI_LON);
  }, [latitude, longitude]);

  const bearing = useMemo(() => {
    if (latitude === null || longitude === null) return null;
    return getBearing(latitude, longitude, EKUPHUMLENI_LAT, EKUPHUMLENI_LON);
  }, [latitude, longitude]);

  const alignmentOffset = useMemo(() => {
    if (heading === null || bearing === null) return null;
    return ((bearing - heading + 540) % 360) - 180;
  }, [heading, bearing]);

  if (loading) {
    return <div style={styles.container}>Detecting your location...</div>;
  }

  if (error) {
    return <div style={styles.container}>Location error: {error}</div>;
  }

  if (distance === null || bearing === null) {
    return <div style={styles.container}>Awaiting location data...</div>;
  }

  const directionName = bearingToDirection(bearing);
  const isAligned = alignmentOffset !== null && Math.abs(alignmentOffset) < 15;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ekuphumleni Alignment</h1>
      <p style={styles.subtitle}>Intaba Ephendulayo — The Responding Mountain</p>

      <div style={styles.card}>
        <p style={styles.label}>Direction to Ekuphumleni:</p>
        <p style={styles.direction}>{directionName} ({Math.round(bearing)}°)</p>

        <p style={styles.label}>Distance:</p>
        <p style={styles.value}>{distance.toFixed(2)} km</p>

        {alignmentOffset !== null && (
          <>
            <p style={styles.label}>Your alignment:</p>
            {isAligned ? (
              <p style={styles.aligned}>You are aligned with Ekuphumleni ✓</p>
            ) : (
              <p style={styles.offset}>
                {alignmentOffset > 0
                  ? `Turn ${Math.abs(Math.round(alignmentOffset))}° to your right`
                  : `Turn ${Math.abs(Math.round(alignmentOffset))}° to your left`}
              </p>
            )}
          </>
        )}

        <p style={styles.coords}>
          Ekuphumleni: 29°04'31.7"S 27°37'28.3"E
        </p>
      </div>

      <p style={styles.footer}>P + P = F — Past + Present = Future</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto',
    color: theme.text,
    textAlign: 'center' as const,
  },
  title: {
    color: theme.gold,
    fontSize: '2rem',
    marginBottom: '8px',
  },
  subtitle: {
    color: theme.textSecondary,
    fontSize: '1rem',
    marginBottom: '30px',
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '30px',
    border: `1px solid ${theme.borderFuture}`,
    marginBottom: '30px',
  },
  label: {
    color: theme.textSecondary,
    fontSize: '0.9rem',
    marginTop: '16px',
    marginBottom: '4px',
  },
  direction: {
    color: theme.gold,
    fontSize: '2rem',
    fontWeight: 'bold' as const,
  },
  value: {
    color: theme.text,
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
  },
  aligned: {
    color: '#4CAF50',
    fontSize: '1.3rem',
    fontWeight: 'bold' as const,
  },
  offset: {
    color: '#FFC107',
    fontSize: '1.3rem',
    fontWeight: 'bold' as const,
  },
  coords: {
    color: theme.textSecondary,
    fontSize: '0.8rem',
    marginTop: '30px',
  },
  footer: {
    color: theme.textSecondary,
    fontSize: '1rem',
    fontStyle: 'italic' as const,
  },
};
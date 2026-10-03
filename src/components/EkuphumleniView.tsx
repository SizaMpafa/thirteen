// src/components/EkuphumleniView.tsx
import { useMemo, useState } from 'react';
import { theme } from '../constants/theme';
import { useLocation } from '../hooks/useLocation';

const EKUPHUMLENI_LAT = -29.075472;
const EKUPHUMLENI_LON = 27.624528;

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
  const dirs = [
    'North',
    'North-East',
    'East',
    'South-East',
    'South',
    'South-West',
    'West',
    'North-West',
  ];
  const index = Math.round((((bearing % 360) + 360) % 360) / 45) % 8;
  return dirs[index];
}

// ---------- Compass (display only) ----------
function Compass({
  bearing,
  heading,
  manualHeading,
  manualMode,
}: {
  bearing: number;
  heading: number | null;
  manualHeading: number;
  manualMode: boolean;
}) {
  const size = 260;
  const center = size / 2;
  const radius = 110;
  const bearingRad = (bearing - 90) * (Math.PI / 180);
  const displayHeading = manualMode ? manualHeading : heading;
  const headingRad =
    displayHeading !== null ? (displayHeading - 90) * (Math.PI / 180) : null;
  const aligned =
    displayHeading !== null &&
    Math.abs(((bearing - displayHeading + 540) % 360) - 180) < 15;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      style={{
        maxWidth: '260px',
        margin: '0 auto',
        display: 'block',
        touchAction: 'none',
      }}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="rgba(255,255,255,0.02)"
        stroke={theme.borderFuture}
        strokeWidth="1.5"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg - 90) * (Math.PI / 180);
        return (
          <line
            key={deg}
            x1={center + Math.cos(rad) * (radius - 4)}
            y1={center + Math.sin(rad) * (radius - 4)}
            x2={center + Math.cos(rad) * radius}
            y2={center + Math.sin(rad) * radius}
            stroke={theme.textSecondary}
            strokeWidth="1"
          />
        );
      })}
      <text x={center} y={22} fill={theme.gold} fontSize="14" textAnchor="middle" fontWeight="bold">
        N
      </text>
      <text x={size - 12} y={center + 5} fill={theme.text} fontSize="12" textAnchor="middle">
        E
      </text>
      <text x={center} y={size - 6} fill={theme.text} fontSize="12" textAnchor="middle">
        S
      </text>
      <text x={12} y={center + 5} fill={theme.text} fontSize="12" textAnchor="middle">
        W
      </text>
      <circle cx={center} cy={center} r="6" fill={theme.gold} />
      {/* Ekuphumleni bearing (fixed) */}
      <line
        x1={center}
        y1={center}
        x2={center + Math.cos(bearingRad) * (radius - 15)}
        y2={center + Math.sin(bearingRad) * (radius - 15)}
        stroke="#FF6B6B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* User heading (auto or manual) */}
      {headingRad !== null && (
        <line
          x1={center}
          y1={center}
          x2={center + Math.cos(headingRad) * (radius - 25)}
          y2={center + Math.sin(headingRad) * (radius - 25)}
          stroke={theme.gold}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      )}
      {aligned && (
        <circle
          cx={center}
          cy={center}
          r={radius - 10}
          fill="none"
          stroke="#4CAF50"
          strokeWidth="2"
          opacity="0.8"
        />
      )}
    </svg>
  );
}

// ---------- Main View ----------
export function EkuphumleniView() {
  const {
    latitude,
    longitude,
    heading,
    error,
    loading,
    compassAvailable,
    orientationEventFired,
    headingSource,
    absoluteMode,
  } = useLocation();

  const [manualHeading, setManualHeading] = useState(0);
  const [manualMode, setManualMode] = useState(false);

  const distance = useMemo(() => {
    if (latitude === null || longitude === null) return null;
    return getDistance(latitude, longitude, EKUPHUMLENI_LAT, EKUPHUMLENI_LON);
  }, [latitude, longitude]);

  const bearing = useMemo(() => {
    if (latitude === null || longitude === null) return null;
    return getBearing(latitude, longitude, EKUPHUMLENI_LAT, EKUPHUMLENI_LON);
  }, [latitude, longitude]);

  if (loading)
    return <div style={styles.container}>Detecting your location...</div>;
  if (error)
    return <div style={styles.container}>Location error: {error}</div>;
  if (distance === null || bearing === null)
    return <div style={styles.container}>Awaiting location data...</div>;

  const directionName = bearingToDirection(bearing);
  const displayHeading = manualMode ? manualHeading : heading;
  const alignmentOffset =
    displayHeading !== null
      ? ((bearing - displayHeading + 540) % 360) - 180
      : null;
  const isAligned = alignmentOffset !== null && Math.abs(alignmentOffset) < 15;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ekuphumleni Alignment</h1>
      <p style={styles.subtitle}>
        Intaba Ephendulayo — The Responding Mountain
      </p>

      <div style={styles.card}>
        <Compass
          bearing={bearing}
          heading={heading}
          manualHeading={manualHeading}
          manualMode={manualMode}
        />

        {/* Mode toggle */}
        <div style={styles.modeToggle}>
          <button
            onClick={() => setManualMode(false)}
            style={{
              ...styles.modeButton,
              background: !manualMode ? theme.gold : 'transparent',
              color: !manualMode ? '#1a1a2e' : theme.text,
            }}
          >
            Auto Compass
          </button>
          <button
            onClick={() => setManualMode(true)}
            style={{
              ...styles.modeButton,
              background: manualMode ? theme.gold : 'transparent',
              color: manualMode ? '#1a1a2e' : theme.text,
            }}
          >
            Manual Dial
          </button>
        </div>

        {/* Manual dial slider */}
        {manualMode && (
          <div style={styles.sliderWrap}>
            <p style={styles.hint}>Drag to set the direction you are facing</p>
            <input
              type="range"
              min={0}
              max={359}
              value={manualHeading}
              onChange={(e) => setManualHeading(parseInt(e.target.value, 10))}
              style={styles.slider}
            />
            <p style={styles.hint}>
              You are facing: {manualHeading}° ({bearingToDirection(manualHeading)})
            </p>
          </div>
        )}

        {/* Diagnostics */}
        <div style={styles.statusPanel}>
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Orientation events:</span>
            <span
              style={orientationEventFired ? styles.statusOk : styles.statusBad}
            >
              {orientationEventFired ? 'Receiving' : 'No events'}
            </span>
          </div>
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Auto compass:</span>
            <span style={heading !== null ? styles.statusOk : styles.statusBad}>
              {heading !== null ? `${Math.round(heading)}°` : 'Not available'}
            </span>
          </div>
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Sensor source:</span>
            <span
              style={headingSource ? styles.statusOk : styles.statusBad}
            >
              {headingSource ?? 'None'}
            </span>
          </div>
          <div style={styles.statusRow}>
            <span style={styles.statusLabel}>Absolute mode:</span>
            <span style={absoluteMode ? styles.statusOk : styles.statusBad}>
              {absoluteMode ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {!compassAvailable && !manualMode && (
          <p style={styles.hint}>
            Your browser is not exposing the compass. Switch to{' '}
            <strong>Manual Dial</strong> above to align.
          </p>
        )}

        <p style={styles.label}>Direction to Ekuphumleni:</p>
        <p style={styles.direction}>
          {directionName} ({Math.round(bearing)}°)
        </p>

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

      {/* Footer — consistent with other views */}
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
  container: {
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto',
    color: theme.text,
    textAlign: 'center' as const,
  },
  title: { color: theme.gold, fontSize: '2rem', marginBottom: '8px' },
  subtitle: { color: theme.textSecondary, fontSize: '1rem', marginBottom: '30px' },
  card: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${theme.borderFuture}`,
    marginBottom: '30px',
  },
  label: {
    color: theme.textSecondary,
    fontSize: '0.9rem',
    marginTop: '16px',
    marginBottom: '4px',
  },
  direction: { color: theme.gold, fontSize: '2rem', fontWeight: 'bold' as const },
  value: { color: theme.text, fontSize: '1.5rem', fontWeight: 'bold' as const },
  aligned: { color: '#4CAF50', fontSize: '1.3rem', fontWeight: 'bold' as const },
  offset: { color: '#FFC107', fontSize: '1.3rem', fontWeight: 'bold' as const },
  coords: { color: theme.textSecondary, fontSize: '0.8rem', marginTop: '30px' },
  footer: { color: theme.textSecondary, fontSize: '1rem', fontStyle: 'italic' as const },
  tagline: { fontSize: '1.4rem', fontWeight: 'bold' as const, color: theme.gold, marginBottom: '4px' },
  credit: { fontSize: '1rem', color: theme.textSecondary },
  statusPanel: {
    marginTop: '20px',
    padding: '12px',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: '10px',
    textAlign: 'left' as const,
    fontSize: '0.8rem',
  },
  statusRow: { display: 'flex', justifyContent: 'space-between', padding: '2px 0' },
  statusLabel: { color: theme.textSecondary },
  statusOk: { color: '#4CAF50', fontWeight: 'bold' as const },
  statusBad: { color: '#FF6B6B', fontWeight: 'bold' as const },
  hint: {
    color: '#FFC107',
    fontSize: '0.85rem',
    marginTop: '12px',
    marginBottom: '8px',
    lineHeight: 1.4,
  },
  modeToggle: { display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'center' },
  modeButton: {
    padding: '8px 16px',
    border: `1px solid ${theme.borderFuture}`,
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    fontSize: '0.85rem',
  },
  sliderWrap: { marginTop: '16px' },
  slider: { width: '100%', marginTop: '8px' },
};
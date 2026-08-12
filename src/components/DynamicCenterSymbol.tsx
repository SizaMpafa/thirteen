// src/components/DynamicCenterSymbol.tsx
import { useState, useEffect } from 'react';

const DROPLET_COUNT = 12;

export function DynamicCenterSymbol() {
  const [time, setTime] = useState(new Date());
  const [droplets, setDroplets] = useState<{ id: number; x: number; size: number; speed: number; phase: number }[]>([]);

  useEffect(() => {
    // Initialize droplets with random properties
    const initDroplets = Array.from({ length: DROPLET_COUNT }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 20,
      size: 1.5 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.3,
      phase: Math.random() * 2 * Math.PI,
    }));
    setDroplets(initDroplets);

    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
  const progress = seconds / 86400;

  const size = 170;
  const centerX = size / 2;
  const hourglassWidth = 60;
  const hourglassTopY = 30;
  const hourglassBottomY = 140;
  const neckY = 85;

  // Top water level: decreases from full to empty
  const topWaterY = hourglassTopY + (1 - progress) * (neckY - hourglassTopY);
  // Bottom water level: increases from empty to full
  const bottomWaterY = hourglassBottomY - progress * (hourglassBottomY - neckY);

  // Wave offset
  const waveOffset = (time.getSeconds() / 60) * 2 * Math.PI;

  // Droplet position function – uses Date.now() to animate continuously
  const getDropletY = (phase: number, speed: number) => {
    const progressInCycle = ((Date.now() / 1000) * speed + phase) % 1;
    return neckY + progressInCycle * (hourglassBottomY - neckY);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src="/center-symbol.png"
        alt="Ankh and Hourglass"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <clipPath id="hourglassTopClip">
            <polygon
              points={`
                ${centerX - hourglassWidth/2 + 4},${hourglassTopY}
                ${centerX + hourglassWidth/2 - 4},${hourglassTopY}
                ${centerX},${neckY}
              `}
            />
          </clipPath>
          <clipPath id="hourglassBottomClip">
            <polygon
              points={`
                ${centerX - hourglassWidth/2 + 4},${hourglassBottomY}
                ${centerX + hourglassWidth/2 - 4},${hourglassBottomY}
                ${centerX},${neckY}
              `}
            />
          </clipPath>
          <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Top water */}
        <g clipPath="url(#hourglassTopClip)">
          <rect
            x={centerX - hourglassWidth / 2}
            y={topWaterY}
            width={hourglassWidth}
            height={neckY - topWaterY}
            fill="url(#waterGradient)"
          />
          <path
            d={`
              M ${centerX - hourglassWidth/2} ${topWaterY}
              C ${centerX - hourglassWidth/3} ${topWaterY - 3 + 2*Math.sin(waveOffset)},
                ${centerX - hourglassWidth/6} ${topWaterY + 3 + 2*Math.cos(waveOffset)},
                ${centerX} ${topWaterY}
              C ${centerX + hourglassWidth/6} ${topWaterY - 3 + 2*Math.sin(waveOffset + 1)},
                ${centerX + hourglassWidth/3} ${topWaterY + 3 + 2*Math.cos(waveOffset + 1)},
                ${centerX + hourglassWidth/2} ${topWaterY}
              L ${centerX + hourglassWidth/2} ${neckY}
              L ${centerX - hourglassWidth/2} ${neckY} Z
            `}
            fill="rgba(255,255,255,0.15)"
          />
        </g>

        {/* Bottom water */}
        <g clipPath="url(#hourglassBottomClip)">
          <rect
            x={centerX - hourglassWidth / 2}
            y={bottomWaterY}
            width={hourglassWidth}
            height={hourglassBottomY - bottomWaterY}
            fill="url(#waterGradient)"
          />
          <path
            d={`
              M ${centerX - hourglassWidth/2} ${bottomWaterY}
              C ${centerX - hourglassWidth/3} ${bottomWaterY - 3 + 2*Math.sin(waveOffset + 2)},
                ${centerX - hourglassWidth/6} ${bottomWaterY + 3 + 2*Math.cos(waveOffset + 2)},
                ${centerX} ${bottomWaterY}
              C ${centerX + hourglassWidth/6} ${bottomWaterY - 3 + 2*Math.sin(waveOffset + 3)},
                ${centerX + hourglassWidth/3} ${bottomWaterY + 3 + 2*Math.cos(waveOffset + 3)},
                ${centerX + hourglassWidth/2} ${bottomWaterY}
              L ${centerX + hourglassWidth/2} ${hourglassBottomY}
              L ${centerX - hourglassWidth/2} ${hourglassBottomY} Z
            `}
            fill="rgba(255,255,255,0.15)"
          />
        </g>

        {/* Droplets */}
        {droplets.map((d) => {
          const yPos = getDropletY(d.phase, d.speed);
          return (
            <circle
              key={d.id}
              cx={centerX + d.x}
              cy={yPos}
              r={d.size}
              fill="#4FC3F7"
              opacity="0.7"
              clipPath="url(#hourglassBottomClip)"
            />
          );
        })}
      </svg>
    </div>
  );
}
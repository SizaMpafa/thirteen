// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  heading: number | null;
  error: string | null;
  loading: boolean;
}

interface DeviceOrientationEventWithCompass extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    heading: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      // Schedule state update asynchronously to avoid synchronous setState in effect
      const timeout = setTimeout(() => {
        setState(s => ({ ...s, error: 'Geolocation not supported', loading: false }));
      }, 0);
      return () => clearTimeout(timeout);
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setState(s => ({
          ...s,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          error: null,
          loading: false,
        }));
      },
      (err) => {
        setState(s => ({ ...s, error: err.message, loading: false }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    const handleOrientation = (event: DeviceOrientationEventWithCompass) => {
      let heading: number | null = null;
      if (event.webkitCompassHeading !== undefined) {
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        heading = 360 - event.alpha;
      }
      if (heading !== null) {
        setState(s => ({ ...s, heading }));
      }
    };

    window.addEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
    window.addEventListener('deviceorientation', handleOrientation as EventListener, true);

    return () => {
      navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('deviceorientationabsolute', handleOrientation as EventListener);
      window.removeEventListener('deviceorientation', handleOrientation as EventListener);
    };
  }, []);

  return state;
}
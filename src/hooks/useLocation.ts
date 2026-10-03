// src/hooks/useLocation.ts
import { useState, useEffect, useCallback } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  heading: number | null;
  error: string | null;
  loading: boolean;
  orientationEventFired: boolean;
  headingSource: 'webkit' | 'absolute' | 'alpha' | null;
  compassAvailable: boolean;
  absoluteSupported: boolean;
}

// Extend DeviceOrientationEvent with iOS-only webkitCompassHeading,
// while keeping `absolute` compatible.
interface DeviceOrientationEventWithCompass
  extends Omit<DeviceOrientationEvent, 'absolute'> {
  webkitCompassHeading?: number;
  absolute?: boolean;
}

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    heading: null,
    error: null,
    loading: true,
    orientationEventFired: false,
    headingSource: null,
    compassAvailable: false,
    absoluteSupported: false,
  });

  const handleOrientation = useCallback((event: DeviceOrientationEventWithCompass) => {
    let heading: number | null = null;
    let source: 'webkit' | 'absolute' | 'alpha' | null = null;

    // 1. iOS: webkitCompassHeading
    if (typeof event.webkitCompassHeading === 'number') {
      heading = event.webkitCompassHeading;
      source = 'webkit';
    }
    // 2. Android: alpha + absolute === true
    else if (typeof event.alpha === 'number' && event.absolute === true) {
      heading = 360 - event.alpha;
      source = 'absolute';
    }
    // 3. Fallback: alpha without absolute
    else if (typeof event.alpha === 'number') {
      heading = 360 - event.alpha;
      source = 'alpha';
    }

    setState(s => ({
      ...s,
      orientationEventFired: true,
      absoluteSupported: s.absoluteSupported || event.absolute === true,
      heading: heading !== null ? heading : s.heading,
      headingSource: source ?? s.headingSource,
      compassAvailable: heading !== null ? true : s.compassAvailable,
    }));
  }, []);

  const requestCompassPermission = useCallback(async () => {
    try {
      const DOE = DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;
      if (typeof DOE.requestPermission === 'function') {
        const permission = await DOE.requestPermission();
        if (permission !== 'granted') {
          setState(s => ({ ...s, error: 'Compass permission denied' }));
          return;
        }
      }
      window.addEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
      window.addEventListener('deviceorientation', handleOrientation as EventListener, true);
    } catch (err) {
      console.error('Compass permission error:', err);
    }
  }, [handleOrientation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      const t = setTimeout(() => {
        setState(s => ({ ...s, error: 'Geolocation not supported', loading: false }));
      }, 0);
      return () => clearTimeout(t);
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

    window.addEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
    window.addEventListener('deviceorientation', handleOrientation as EventListener, true);

    return () => {
      navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('deviceorientationabsolute', handleOrientation as EventListener);
      window.removeEventListener('deviceorientation', handleOrientation as EventListener);
    };
  }, [handleOrientation]);

  return {
    ...state,
    requestCompassPermission,
  };
}
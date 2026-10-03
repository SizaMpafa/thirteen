// src/hooks/useLocation.ts
import { useState, useEffect, useCallback } from 'react';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  heading: number | null;
  error: string | null;
  loading: boolean;
  orientationEventFired: boolean;
  absoluteMode: boolean;
  headingSource: 'webkit' | 'alpha' | 'relative' | null;
  compassAvailable: boolean;
}

interface DeviceOrientationEventWithCompass extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

let manualNorthAnchor: number | null = null; // used if we have to calibrate manually

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    heading: null,
    error: null,
    loading: true,
    orientationEventFired: false,
    absoluteMode: false,
    headingSource: null,
    compassAvailable: false,
  });

  const [manualMode, setManualMode] = useState(false);

  const handleOrientation = useCallback((event: DeviceOrientationEventWithCompass) => {
    let heading: number | null = null;
    let source: 'webkit' | 'alpha' | 'relative' | null = null;

    // iOS
    if (typeof event.webkitCompassHeading === 'number') {
      heading = event.webkitCompassHeading;
      source = 'webkit';
    }
    // Android absolute
    else if (typeof event.alpha === 'number' && event.absolute === true) {
      heading = 360 - event.alpha;
      source = 'alpha';
    }
    // Android relative (fallback)
    else if (typeof event.alpha === 'number') {
      heading = 360 - event.alpha;
      source = 'relative';
    }

    setState(s => ({
      ...s,
      orientationEventFired: true,
      absoluteMode: event.absolute === true,
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
      // Re-attach listeners
      window.addEventListener('deviceorientationabsolute', handleOrientation as EventListener, true);
      window.addEventListener('deviceorientation', handleOrientation as EventListener, true);
    } catch (err) {
      console.error('Compass permission error:', err);
    }
  }, [handleOrientation]);

  const calibrateNorth = useCallback(() => {
    // User is currently facing true North. Snapshot that relative alpha.
    const handler = (event: DeviceOrientationEventWithCompass) => {
      if (typeof event.alpha === 'number') {
        manualNorthAnchor = event.alpha;
        setManualMode(true);
        window.removeEventListener('deviceorientation', handler, true);
      }
    };
    window.addEventListener('deviceorientation', handler as EventListener, true);
  }, []);

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

    const orientationHandler = handleOrientation as EventListener;
    window.addEventListener('deviceorientationabsolute', orientationHandler, true);
    window.addEventListener('deviceorientation', orientationHandler, true);

    return () => {
      navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('deviceorientationabsolute', orientationHandler);
      window.removeEventListener('deviceorientation', orientationHandler);
    };
  }, [handleOrientation]);

  // If in manual mode, compute heading from the anchor
  const computedHeading = (() => {
    if (state.headingSource !== 'relative') return state.heading;
    if (manualNorthAnchor === null || state.heading === null) return state.heading;
    // manual offset: alpha_anchor should map to 0° (true north)
    return ((state.heading - manualNorthAnchor + 360) % 360);
  })();

  return {
    ...state,
    heading: computedHeading,
    manualMode,
    requestCompassPermission,
    calibrateNorth,
  };
}
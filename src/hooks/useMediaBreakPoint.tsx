import { useEffect, useState } from 'react';
import MediaBreakpoints, { Breakpoint } from '../types/MediaBreakpoints';

const getMediaBreakpoint = (): Breakpoint => {
  const { innerWidth } = window;

  if (innerWidth < MediaBreakpoints.xs.width) {
    return MediaBreakpoints.xs;
  }
  if (innerWidth < MediaBreakpoints.sm.width) {
    return MediaBreakpoints.sm;
  }
  if (innerWidth < MediaBreakpoints.md.width) {
    return MediaBreakpoints.md;
  }
  if (innerWidth < MediaBreakpoints.lg.width) {
    return MediaBreakpoints.lg;
  }
  if (innerWidth < MediaBreakpoints.xl.width) {
    return MediaBreakpoints.xl;
  }
  return MediaBreakpoints.xxl;
};

export const useMediaBreakPoint = (): Breakpoint => {
  const [width, setWidth] = useState(getMediaBreakpoint());

  const handleResize = () => {
    setWidth(getMediaBreakpoint());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

import React from 'react';
import { useMediaBreakPoint } from '../../../hooks/useMediaBreakPoint';
import { Breakpoint } from '../../../types/MediaBreakpoints';

export interface WithMediaBreakPointProps {
  mediaBreakpoint: Breakpoint;
}

export const withMediaBreakPoint = <P extends WithMediaBreakPointProps>(
  Component: React.ComponentType<P>,
) => (props: Omit<P, keyof WithMediaBreakPointProps>) => {
  const breakpoint = useMediaBreakPoint();

  // eslint-disable-next-line
  return <Component {...(props as P)} mediaBreakpoint={breakpoint} />;
};

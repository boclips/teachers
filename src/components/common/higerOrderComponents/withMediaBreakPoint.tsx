import React from 'react';
import MediaBreakpoints, { Breakpoint } from '../../../types/MediaBreakpoints';

export interface WithMediaBreakPointProps {
  mediaBreakpoint: Breakpoint;
}

interface State {
  width: Breakpoint;
}

export const withMediaBreakPoint = <P extends WithMediaBreakPointProps>(
  Component: React.ComponentType<P>,
) =>
  class WithMediaBreakPoint extends React.Component<
    Partial<Pick<P, Exclude<keyof P, keyof WithMediaBreakPointProps>>>,
    State
  > {
    public constructor(
      props: Pick<P, Exclude<keyof P, keyof WithMediaBreakPointProps>>,
    ) {
      super(props);

      this.state = {
        width: this.getMediaBreakpoint(),
      };
    }

    private getMediaBreakpoint(): Breakpoint {
      const innerWidth = window.innerWidth;

      if (innerWidth < MediaBreakpoints.xs.width) {
        return MediaBreakpoints.xs;
      } else if (innerWidth < MediaBreakpoints.sm.width) {
        return MediaBreakpoints.sm;
      } else if (innerWidth < MediaBreakpoints.md.width) {
        return MediaBreakpoints.md;
      } else if (innerWidth < MediaBreakpoints.lg.width) {
        return MediaBreakpoints.lg;
      } else if (innerWidth < MediaBreakpoints.xl.width) {
        return MediaBreakpoints.xl;
      } else {
        return MediaBreakpoints.xxl;
      }
    }

    private updateMediaBreakpoint = () => {
      this.setState(() => ({
        width: this.getMediaBreakpoint(),
      }));
    };

    public componentDidMount() {
      window.addEventListener('resize', this.updateMediaBreakpoint);
    }

    public componentWillUnmount() {
      window.removeEventListener('resize', this.updateMediaBreakpoint);
    }

    public render() {
      return (
        <Component {...(this.props as P)} mediaBreakpoint={this.state.width} />
      );
    }
  };

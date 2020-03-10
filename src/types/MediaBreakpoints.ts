import { Breakpoint as AntBreakpoint } from 'antd/lib/_util/responsiveObserve';

export interface Breakpoint {
  width: number;
  label: AntBreakpoint;
}
type Breakpoints = { [name in AntBreakpoint]: Breakpoint };

const MediaBreakpoints: Breakpoints = {
  xs: { width: 480, label: 'xs' },
  sm: { width: 576, label: 'sm' },
  md: { width: 768, label: 'md' },
  lg: { width: 992, label: 'lg' },
  xl: { width: 1200, label: 'xl' },
  xxl: { width: 1600, label: 'xxl' },
};

export default MediaBreakpoints;

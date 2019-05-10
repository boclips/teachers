import { Breakpoint as NamedBreakpoint } from 'antd/lib/grid/row';
export interface Breakpoint {
  width: number;
  label: NamedBreakpoint;
}
type Breakpoints = { [name in NamedBreakpoint]: Breakpoint };

const MediaBreakpoints: Breakpoints = {
  xs: { width: 480, label: 'xs' },
  sm: { width: 576, label: 'sm' },
  md: { width: 768, label: 'md' },
  lg: { width: 992, label: 'lg' },
  xl: { width: 1200, label: 'xl' },
  xxl: { width: 1600, label: 'xxl' },
};

export default MediaBreakpoints;

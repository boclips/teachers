declare module '*.png' {
  // @ts-ignore
  export default '' as string;
}

declare module '*.react.svg' {
  import { HTMLAttributes } from 'react';
  const value: React.ComponentType<HTMLAttributes<SVGElement>>;
  export default value;
}

declare module '*.svg' {
  // @ts-ignore
  export default '' as string;
}

interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

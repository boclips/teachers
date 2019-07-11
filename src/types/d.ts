declare module '*.png' {
  // @ts-ignore
  export default '' as string;
}

declare module '*.svg' {
  const value: React.ComponentType<any>;
  export default value;
}

interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

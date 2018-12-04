declare module '*.png' {
  // @ts-ignore
  export default '' as string;
}

interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

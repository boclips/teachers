declare module '*.png' {
  // @ts-ignore
  export default '' as string;
}

declare module '*.svg' {
  // @ts-ignore
  export default '' as string;
}

declare module '*.svg?react' {
  // @ts-ignore
  const content: any;
  export default content;
}

interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

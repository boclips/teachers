export function formatCount(count: number): string {
  if (count >= 500) {
    return `${count}+`;
  }
  return `${count}`;
}

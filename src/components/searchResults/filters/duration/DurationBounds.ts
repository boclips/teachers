class DurationBounds {
  public readonly MAX_DURATION = 10;

  public resolveMax = (max?: number): any =>
    Math.min(this.MAX_DURATION, max || this.MAX_DURATION);

  public resolveMin = (min?: number): any => Math.max(0, min || 0);
}
export default DurationBounds;

import { Range } from 'src/types/Range';

export class DurationRange {
  private readonly range: Range;

  public constructor(range: Range) {
    this.range = range;
  }

  public get min() {
    return this.range.min;
  }
  public get max() {
    return this.range.max;
  }

  public static fromString = (serialised: string): DurationRange => {
    const [min, max] = serialised.split('-');

    return new DurationRange({
      min: parseInt(min, 10),
      max: max && parseInt(max, 10),
    });
  };

  public static fromStrings = (
    serialised: string | string[],
  ): DurationRange[] => {
    if (!serialised) {
      return null;
    }

    if (!Array.isArray(serialised)) {
      serialised = [serialised];
    }

    return serialised.map(rangeString => DurationRange.fromString(rangeString));
  };

  public getLabel = () => {
    const formatter = seconds => `${seconds / 60}m`;

    if (this.range.max) {
      return `${formatter(this.range.min)} - ${formatter(this.range.max)}`;
    }

    return `${formatter(this.range.min)} +`;
  };

  public serialise = (): string => {
    if (this.range.max) {
      return `${this.range.min}-${this.range.max}`;
    }
    return this.range.min.toString();
  };
}

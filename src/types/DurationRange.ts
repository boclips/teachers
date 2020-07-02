import DurationConverter from 'src/components/searchResults/filters/duration/DurationConverter';

interface Range {
  min: number;
  max: number;
}

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

  public getLabel = () => {
    const formatter = (seconds) => `${seconds / 60}m`;

    if (this.range.max !== 86400) {
      return `${formatter(this.range.min)} - ${formatter(this.range.max)}`;
    }

    return `${formatter(this.range.min)} +`;
  };

  public toString() {
    return `${this.range.min}-${this.range.max}`;
  }

  public toIso() {
    const durationConverter = new DurationConverter();
    return (
      durationConverter.secondsToIso(this.min) +
      '-' +
      durationConverter.secondsToIso(this.max)
    );
  }

  public static newFromStrings = (
    serialised: string | string[],
  ): DurationRange[] => {
    const fromString = (str: string): DurationRange => {
      const [min, max] = str.split('-');

      return new DurationRange({
        min: parseInt(min, 10),
        max: max && parseInt(max, 10),
      });
    };

    if (!serialised) {
      return null;
    }

    if (!Array.isArray(serialised)) {
      serialised = [serialised];
    }

    return serialised.map((rangeString) => fromString(rangeString));
  };
}

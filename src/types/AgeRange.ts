export class AgeRange {
  private readonly min: number;
  private readonly max?: number;

  private static AGE_RANGE_MIN = 3;
  private static AGE_RANGE_MAX = 19;

  constructor(min: number = null, max: number = null) {
    this.min = min;
    this.max = max;
  }

  public static allRanges() {
    return [
      new AgeRange(3, 5),
      new AgeRange(5, 7),
      new AgeRange(7, 9),
      new AgeRange(9, 11),
      new AgeRange(11, 14),
      new AgeRange(14, 16),
      new AgeRange(16, 18),
      new AgeRange(19),
    ];
  }

  public getLabel() {
    if (this.max) {
      return `${this.resolveMin()}-${this.max}`;
    } else {
      return `${this.resolveMin()}+`;
    }
  }

  public generateRangeArray() {
    if (!this.max) {
      return [this.min];
    }
    const arr = [];

    for (let i = this.min; i <= this.max; i++) {
      arr.push(i);
    }

    return arr;
  }

  public static generateAgeRanges(numberArray: number[]): AgeRange[] {
    const foundRanges = [];
    this.allRanges().forEach(range => {
      const containedAges = range.generateRangeArray();
      if (containedAges.every(it => numberArray.includes(it))) {
        foundRanges.push(range);
      }
    });

    return foundRanges;
  }

  public resolveMin() {
    if (this.min && this.min > 2) {
      return this.min;
    } else {
      return AgeRange.AGE_RANGE_MIN;
    }
  }

  public resolveMax() {
    if (this.max) {
      return this.max;
    } else {
      return AgeRange.AGE_RANGE_MAX;
    }
  }

  public isBounded() {
    return this.min !== null;
  }

  public encodeJSON(): string {
    return JSON.stringify(
      this.resolveMin() === AgeRange.AGE_RANGE_MAX
        ? {
            min: this.resolveMin(),
          }
        : {
            min: this.resolveMin(),
            max: this.resolveMax(),
          },
    );
  }

  public static decodeJSON(json: string): AgeRange {
    const decoded = JSON.parse(json);
    return new AgeRange(decoded.min, decoded.max);
  }

  public static removeDuplicates(ageRanges: AgeRange[]): AgeRange[] {
    const deduplicated = [];
    ageRanges.forEach(it => {
      if (!deduplicated.find(range => isEqualTo(it, range))) {
        deduplicated.push(it);
      }
    });
    return deduplicated;
  }

  public static extractContainedAges(ages: AgeRange[]): number[] {
    const rangeArrays = ages.map(it => it.generateRangeArray());
    const flattenedAgeRanges: number[] = [].concat.apply([], rangeArrays);
    return Array.from(new Set(flattenedAgeRanges));
  }
}

export const isEqualTo = (a: AgeRange, b: AgeRange) => {
  if (a == null || b == null) {
    return false;
  }

  return a.resolveMin() === b.resolveMin() && a.resolveMax() === b.resolveMax();
};

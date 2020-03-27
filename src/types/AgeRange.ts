export class AgeRange {
  private readonly min: number;
  private readonly max?: number;

  private static AGE_RANGE_MIN = 3;
  private static AGE_RANGE_MAX = 19;

  public constructor(min: number = null, max: number = null) {
    this.min = min;
    this.max = max;
  }

  public static allRanges(): AgeRange[] {
    return [
      new AgeRange(3, 5),
      new AgeRange(5, 9),
      new AgeRange(9, 11),
      new AgeRange(11, 14),
      new AgeRange(14, 16),
      new AgeRange(16),
    ];
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

  public static fromStrings(ageRangeStrings: string | string[]): AgeRange[] {
    if (!ageRangeStrings) {
      return [];
    }

    const ageRangeArray = !Array.isArray(ageRangeStrings)
      ? [ageRangeStrings]
      : ageRangeStrings;

    return ageRangeArray.map(ageRange => {
      const minAndMax = ageRange.split('-');
      return new AgeRange(
        parseInt(minAndMax[0], 10),
        minAndMax[1] ? parseInt(minAndMax[1], 10) : undefined,
      );
    });
  }

  public static extractContainedAges(ages: AgeRange[]): number[] {
    const rangeArrays = ages.map(it => it.generateRangeArray());
    const flattenedAgeRanges: number[] = [].concat.apply([], rangeArrays);
    return Array.from(new Set(flattenedAgeRanges));
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

  public getId() {
    const max = this.max == null ? 99 : this.max;
    return `${this.resolveMin()}-${max}`;
  }

  public getLabel() {
    const max = this.max == null ? 99 : this.max;

    if (max === 99) {
      return `${this.resolveMin()}+`;
    } else {
      return `${this.resolveMin()} - ${this.max}`;
    }
  }

  public getShortLabel() {
    const max = this.max == null ? 99 : this.max;

    if (max === 99) {
      return `${this.resolveMin()}+`;
    } else {
      return `${this.resolveMin()}-${this.max}`;
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
}

export const isEqualTo = (a: AgeRange, b: AgeRange) => {
  if (a == null || b == null) {
    return false;
  }

  return a.resolveMin() === b.resolveMin() && a.resolveMax() === b.resolveMax();
};

export class AgeRange {
  private readonly min: number;
  private readonly max?: number;

  private static AGE_RANGE_MIN = 3;
  private static AGE_RANGE_MAX = 19;

  public constructor(min: number = null, max: number = null) {
    this.min = min;
    this.max = max;
  }

  public static fromJson(json: string): AgeRange {
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

  public getId() {
    const max = this.max == null ? 99 : this.max;
    return `${this.resolveMin()}-${max}`;
  }

  public getLabel() {
    const max = this.max == null ? 19 : this.max;

    if (max === 19) {
      return `${this.resolveMin()}+`;
    } else {
      return `${this.resolveMin()} - ${this.max}`;
    }
  }

  public getShortLabel() {
    const max = this.max == null ? 19 : this.max;

    if (max === 19) {
      return `${this.resolveMin()}+`;
    } else {
      return `${this.resolveMin()}-${this.max}`;
    }
  }

  public getNumbers(): number[] {
    const max = !this.max ? AgeRange.AGE_RANGE_MAX : this.max;

    const arr = [];
    for (let i = this.min; i <= max; i++) {
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

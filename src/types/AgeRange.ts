export class AgeRange {
  private readonly min: number;
  private readonly max?: number;

  private static AGE_RANGE_MIN = 3;
  private static AGE_RANGE_MAX = 19;

  constructor(min: number = null, max: number = null) {
    this.min = min;
    this.max = max;
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
      return [];
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
}

export const isEqualTo = (a: AgeRange, b: AgeRange) => {
  if (a == null || b == null) {
    return false;
  }

  return a.resolveMin() === b.resolveMin() && a.resolveMax() === b.resolveMax();
};

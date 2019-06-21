export interface AgeRangeData {
  label?: string;
  min?: number;
  max?: number;
}

export class AgeRange {
  private ageRange;
  private readonly AGE_RANGE_MIN = 3;
  private readonly AGE_RANGE_MAX = 19;

  constructor(ageRange: AgeRangeData) {
    this.ageRange = ageRange;
  }

  public getLabel() {
    if (this.ageRange.max) {
      return `${this.ageRange.min || this.AGE_RANGE_MIN} - ${
        this.ageRange.max
      }`;
    } else {
      return `${this.ageRange.min} +`;
    }
  }

  public getData() {
    return this.ageRange;
  }

  public generateRangeArray() {
    if (!this.ageRange.max) {
      return [];
    }
    const arr = [];

    for (let i = this.ageRange.min; i <= this.ageRange.max; i++) {
      arr.push(i);
    }

    return arr;
  }
  public resolveMin() {
    if (this.ageRange.min && this.ageRange.min > 2) {
      return this.ageRange.min;
    } else {
      return this.AGE_RANGE_MIN;
    }
  }
  public resolveMax() {
    if (this.ageRange.max) {
      return this.ageRange.max;
    } else {
      return this.AGE_RANGE_MAX;
    }
  }
}

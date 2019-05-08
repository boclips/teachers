export interface AgeRangeData {
  label?: string;
  min: number;
  max?: number;
}

export class AgeRange {
  private ageRange;

  constructor(ageRange: AgeRangeData) {
    this.ageRange = ageRange;
  }

  public getLabel() {
    if (this.ageRange.max) {
      return `${this.ageRange.min}-${this.ageRange.max}`;
    } else {
      return `${this.ageRange.min}+`;
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
}

export interface Range {
  min: number;
  max?: number;
}

// TODO - something about rendering a + for an unbounded range
export const rangeToString = (
  range: Range,
  formatter: (number) => string = x => x,
  seperator: string = '-',
): string => {
  if (range.max) {
    return `${formatter(range.min)}${seperator}${formatter(range.max)}`;
  }

  return `${formatter(range.min)}`;
};

export const parseRanges = (rangeStrings: string | string[]): Range[] => {
  if (!rangeStrings) {
    return null;
  }
  if (!Array.isArray(rangeStrings)) {
    rangeStrings = [rangeStrings];
  }

  return rangeStrings.map(rangeString => {
    const [min, max] = rangeString.split('-');

    if (!min) {
      return null;
    }

    return { min: parseInt(min, 10), max: max && parseInt(max, 10) };
  });
};

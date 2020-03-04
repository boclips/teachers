import { parseRanges, rangeToString } from './Range';

describe('rangeToString', () => {
  it('parse upper and lower bound range to value', () => {
    expect(rangeToString({ min: 1, max: 5 })).toEqual('1-5');
  });
  it('parse lower bound range to value', () => {
    expect(rangeToString({ min: 1 })).toEqual('1');
  });
  it('parse upper and lower bound range to value with formatting', () => {
    expect(rangeToString({ min: 1, max: 5 }, number => `#${number}#`)).toEqual(
      '#1#-#5#',
    );
  });
  it('parse lower bound range to value with formatting', () => {
    expect(rangeToString({ min: 1 }, number => `#${number}#`)).toEqual('#1#');
  });
});

describe('parseRanges', () => {
  it('converts a duration ranges', () => {
    expect(parseRanges(['15', '1-11'])).toEqual([
      {
        min: 15,
      },
      {
        min: 1,
        max: 11,
      },
    ]);
  });

  it('converts a duration range', () => {
    expect(parseRanges('1-11')).toEqual([
      {
        min: 1,
        max: 11,
      },
    ]);
  });

  it('converts a lowerbound duration range', () => {
    expect(parseRanges('4')).toEqual([
      {
        min: 4,
        max: undefined,
      },
    ]);
  });
});

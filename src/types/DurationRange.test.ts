import { DurationRange } from './DurationRange';

describe('DurationRange', () => {
  describe('Deserialisation', () => {
    it('converts a duration ranges', () => {
      const ranges = DurationRange.newFromStrings(['15-16', '1-11']);

      expect(ranges[0].toString()).toEqual('15-16');
      expect(ranges[1].toString()).toEqual('1-11');
    });
  });

  describe('can print label', () => {
    it('with upper and lower bounds', () => {
      const range = new DurationRange({ min: 4 * 60, max: 9 * 60 });

      expect(range.getLabel()).toEqual('4m - 9m');
    });
  });

  describe('can serialise the range', () => {
    it('with upper and lower bounds', () => {
      const range = new DurationRange({ min: 4, max: 9 });

      expect(range.toString()).toEqual('4-9');
    });
  });
});

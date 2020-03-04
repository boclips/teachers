import { DurationRange } from './DurationRange';

describe('DurationRange', () => {
  describe('Deserialisation', () => {
    it('can be created with an unserialised lower and upper bound string', () => {
      const serialisedString = '60-120';

      const range = DurationRange.fromString(serialisedString);

      expect(range.serialise()).toEqual(serialisedString);
    });
    it('can be created with an unserialised lower bound string', () => {
      const serialisedString = '60';

      const range = DurationRange.fromString(serialisedString);

      expect(range.serialise()).toEqual(serialisedString);
    });

    it('converts a duration ranges', () => {
      const ranges = DurationRange.fromStrings(['15', '1-11']);

      expect(ranges[0].serialise()).toEqual('15');
      expect(ranges[1].serialise()).toEqual('1-11');
    });
  });

  describe('can print label', () => {
    it('with upper and lower bounds', () => {
      const range = new DurationRange({ min: 4 * 60, max: 9 * 60 });

      expect(range.getLabel()).toEqual('4m - 9m');
    });

    it('with just lower bound', () => {
      const range = new DurationRange({ min: 4 * 60, max: undefined });

      expect(range.getLabel()).toEqual('4m +');
    });
  });

  describe('can serialise the range', () => {
    it('with upper and lower bounds', () => {
      const range = new DurationRange({ min: 4, max: 9 });

      expect(range.serialise()).toEqual('4-9');
    });

    it('with just lower bound', () => {
      const range = new DurationRange({ min: 4, max: undefined });

      expect(range.serialise()).toEqual('4');
    });
  });
});

import DurationConverter from './DurationConverter';

it('converts from seconds to ISO time string', () => {
  const converter = new DurationConverter();
  expect(converter.secondsToIso(100)).toEqual('PT1M40S');
});

it('does not try to convert a null value', () => {
  const converter = new DurationConverter();
  expect(converter.secondsToIso(0)).toEqual('PT0S');
});

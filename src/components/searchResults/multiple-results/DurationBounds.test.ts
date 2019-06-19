import DurationBounds from './DurationBounds';

it('resolves min to 0 if out of bounds', () => {
  const durationBounds = new DurationBounds();

  expect(durationBounds.resolveMin(-1)).toEqual(0);
});

it('resloves min to 0 if null', () => {
  const durationBounds = new DurationBounds();

  expect(durationBounds.resolveMin(null)).toEqual(0);
});

it('resloves min to 0 if NaN', () => {
  const durationBounds = new DurationBounds();

  expect(durationBounds.resolveMin(NaN)).toEqual(0);
});

it('resolves max to 10 if out of bounds', () => {
  const durationBounds = new DurationBounds();
  expect(durationBounds.resolveMax(11)).toEqual(10);
});

it('resolves max to 10 if null', () => {
  const durationBounds = new DurationBounds();
  expect(durationBounds.resolveMax(null)).toEqual(10);
});
it('resolves max to 10 if NaN', () => {
  const durationBounds = new DurationBounds();
  expect(durationBounds.resolveMax(NaN)).toEqual(10);
});

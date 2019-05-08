import { AgeRange } from './../../../../types/AgeRange';
import { ageRangeReducer } from './ageReducer';
it('creates initial state', () => {
  expect(ageRangeReducer(undefined, { type: '@@INIT' })).toEqual([
    new AgeRange({
      min: 3,
      max: 5,
    }),
    new AgeRange({
      min: 5,
      max: 7,
    }),
    new AgeRange({
      min: 7,
      max: 9,
    }),
    new AgeRange({
      min: 9,
      max: 11,
    }),
    new AgeRange({
      min: 11,
      max: 14,
    }),
    new AgeRange({
      min: 14,
      max: 16,
    }),
    new AgeRange({
      min: 16,
      max: 18,
    }),
    new AgeRange({
      min: 19,
      max: null,
    }),
  ]);
});

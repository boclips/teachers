import { AgeRange } from './../../../../types/AgeRange';
import { ageRangeReducer } from './ageReducer';
it('creates initial state', () => {
  expect(ageRangeReducer(undefined, { type: '@@INIT' })).toEqual([
    new AgeRange({
      label: '3 - 5',
      min: 3,
      max: 5,
    }),
    new AgeRange({
      label: '5 - 7',
      min: 5,
      max: 7,
    }),
    new AgeRange({
      label: '7 - 9',
      min: 7,
      max: 9,
    }),
    new AgeRange({
      label: '9 - 11',
      min: 9,
      max: 11,
    }),
    new AgeRange({
      label: '11 - 14',
      min: 11,
      max: 14,
    }),
    new AgeRange({
      label: '14 - 16',
      min: 14,
      max: 16,
    }),
    new AgeRange({
      label: '16 - 18',
      min: 16,
      max: 18,
    }),
    new AgeRange({
      label: '19 +',
      min: 19,
      max: null,
    }),
  ]);
});

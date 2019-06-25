import { AgeRange } from './../../../../types/AgeRange';
import { ageRangeReducer } from './ageReducer';
it('creates initial state', () => {
  expect(ageRangeReducer(undefined, { type: '@@INIT' })).toEqual([
    new AgeRange(3, 5),
    new AgeRange(5, 7),
    new AgeRange(7, 9),
    new AgeRange(9, 11),
    new AgeRange(11, 14),
    new AgeRange(14, 16),
    new AgeRange(16, 18),
    new AgeRange(19),
  ]);
});

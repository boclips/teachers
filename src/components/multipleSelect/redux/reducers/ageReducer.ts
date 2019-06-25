import { Reducer } from 'redux';
import createReducer from '../../../../app/redux/createReducer';
import { AgeRange } from './../../../../types/AgeRange';

export const ageRangeReducer: Reducer<AgeRange[]> = createReducer([
  new AgeRange(3, 5),
  new AgeRange(5, 7),
  new AgeRange(7, 9),
  new AgeRange(9, 11),
  new AgeRange(11, 14),
  new AgeRange(14, 16),
  new AgeRange(16, 18),
  new AgeRange(19),
]);

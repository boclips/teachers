import { Reducer } from 'redux';
import { AgeRange } from 'src/types/AgeRange';
import createReducerWithInitialState from 'src/app/redux/createReducer';

export const ageRangeReducer: Reducer<AgeRange[]> = createReducerWithInitialState<
  AgeRange[]
>([
  new AgeRange(3, 5),
  new AgeRange(5, 9),
  new AgeRange(9, 11),
  new AgeRange(11, 14),
  new AgeRange(14, 16),
  new AgeRange(16),
]);

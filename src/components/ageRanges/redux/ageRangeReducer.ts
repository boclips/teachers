import { Reducer } from 'redux';
import { AgeRange } from 'src/types/AgeRange';
import createReducerWithInitialState from 'src/app/redux/createReducer';

export const ageRangeReducer: Reducer<AgeRange[]> = createReducerWithInitialState<
  AgeRange[]
>(AgeRange.allRanges());

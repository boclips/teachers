import { Reducer } from 'redux';
import createReducerWithInitialState from 'src/app/redux/createReducer';
import { DurationRange } from 'src/types/DurationRange';

export const defaultDurations = [
  new DurationRange({ min: 0, max: 120 }),
  new DurationRange({ min: 120, max: 300 }),
  new DurationRange({ min: 300, max: 600 }),
  new DurationRange({ min: 600, max: 1200 }),
  new DurationRange({ min: 1200, max: 86400 }),
];

export const durationsReducer: Reducer<
  DurationRange[]
> = createReducerWithInitialState<DurationRange[]>(defaultDurations);

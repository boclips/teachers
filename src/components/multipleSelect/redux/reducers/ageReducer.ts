import { Reducer } from 'redux';
import createReducer from '../../../../app/redux/createReducer';

export const ageRangeReducer: Reducer<AgeRange[]> = createReducer([
  {
    label: '3 - 5',
    min: 3,
    max: 5,
  },
  {
    label: '5 - 7',
    min: 5,
    max: 7,
  },
  {
    label: '7 - 9',
    min: 7,
    max: 9,
  },
  {
    label: '9 - 11',
    min: 9,
    max: 11,
  },
  {
    label: '11 - 14',
    min: 11,
    max: 14,
  },
  {
    label: '14 - 16',
    min: 14,
    max: 16,
  },
  {
    label: '16 - 18',
    min: 16,
    max: 18,
  },
  {
    label: '19 +',
    min: 19,
    max: null,
  },
]);

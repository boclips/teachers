import { ageRangeReducer } from './ageReducer';
it('creates initial state', () => {
  expect(ageRangeReducer(undefined, { type: '@@INIT' })).toEqual([
    {
      label: '3 - 5',
      value: [3, 4, 5],
    },
    {
      label: '5 - 7',
      value: [5, 6, 7],
    },
    {
      label: '7 - 9',
      value: [7, 8, 9],
    },
    {
      label: '9 - 11',
      value: [9, 10, 11],
    },
    {
      label: '11 - 14',
      value: [11, 12, 13, 14],
    },
    {
      label: '14 - 16',
      value: [14, 15, 16],
    },
    {
      label: '16 - 18',
      value: [16, 17, 18],
    },
    {
      label: '18 +',
      value: [18, 19],
    },
  ]);
});

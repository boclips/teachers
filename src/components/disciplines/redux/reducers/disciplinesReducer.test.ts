import { fetchedDisciplinesAction } from '../actions/fetchedDisciplinesAction';
import { disciplinesReducer } from './disciplinesReducer';

test('reduces disciplines', () => {
  const action = fetchedDisciplinesAction([
    {
      id: '1',
      code: 'french',
      name: 'French',
      subjects: [],
    },
  ]);

  const stateAfter = disciplinesReducer([], action);

  expect(stateAfter).toHaveLength(1);
  expect(stateAfter[0].id).toBe('1');
  expect(stateAfter[0].name).toBe('French');
  expect(stateAfter[0].code).toBe('french');
  expect(stateAfter[0].subjects).toEqual([]);
});

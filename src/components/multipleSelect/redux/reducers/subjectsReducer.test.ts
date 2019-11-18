import { SubjectFactory } from 'boclips-api-client/dist/test-support';
import { fetchedSubjectsAction } from '../actions/fetchedSubjectsAction';
import { subjectsReducer } from './subjectsReducer';

test('reduces subjects', () => {
  const action = fetchedSubjectsAction([
    SubjectFactory.sample({ id: '1', name: 'French' }),
  ]);

  const stateAfter = subjectsReducer([], action);

  expect(stateAfter).toHaveLength(1);
  expect(stateAfter[0].id).toBe('1');
  expect(stateAfter[0].name).toBe('French');
});

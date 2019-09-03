import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';
import { countriesReducer } from './countriesReducer';

test('reduces subjects', () => {
  const action = fetchedCountriesAction([{ id: '1', name: 'French' }]);

  const stateAfter = countriesReducer([], action);

  expect(stateAfter).toHaveLength(1);
  expect(stateAfter[0].id).toBe('1');
  expect(stateAfter[0].name).toBe('French');
});

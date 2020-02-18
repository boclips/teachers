import { CountryFactory } from 'test-support/factories';
import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';
import { countriesReducer } from './countriesReducer';

test('reduces countries', () => {
  const action = fetchedCountriesAction([
    CountryFactory.sample({ id: '1', name: 'French' }),
  ]);

  const stateAfter = countriesReducer([], action);

  expect(stateAfter).toHaveLength(1);
  expect(stateAfter[0].id).toBe('1');
  expect(stateAfter[0].name).toBe('French');
});

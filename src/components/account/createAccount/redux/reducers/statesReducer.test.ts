import { CountryFactory } from '../../../../../../test-support/factories';
import { fetchedStatesAction } from '../actions/fetchedStatesAction';
import { statesReducer } from './statesReducer';

test('reduces states', () => {
  const action = fetchedStatesAction([
    CountryFactory.sample({ id: '1', name: 'illinois' }),
  ]);

  const stateAfter = statesReducer([], action);

  expect(stateAfter).toHaveLength(1);
  expect(stateAfter[0].id).toBe('1');
  expect(stateAfter[0].name).toBe('illinois');
});

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { statesResponse } from '../../../test-support/api-responses';
import { CountryFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { fetchStates } from './fetchStates';

const country = CountryFactory.sample({
  links: {
    schools: null,
    states: new Link({ href: '/v1/country/USA/states' }),
  },
});

test('fetch all states', async () => {
  new MockAdapter(axios)
    .onGet('/v1/country/USA/states')
    .replyOnce(200, JSON.stringify(statesResponse()), {});

  const states = await fetchStates(country);

  expect(states).toHaveLength(2);
  expect(states[0].id).toEqual('S1');
  expect(states[0].name).toEqual('One state');
});

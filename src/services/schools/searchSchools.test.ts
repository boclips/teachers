import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { schoolsResponse } from '../../../test-support/api-responses';
import { CountryFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { searchSchools } from './searchSchools';

const country = CountryFactory.sample({
  links: {
    schools: new Link({ href: '/v1/schools?country=ESP{&query,state}' }),
  },
});

test('fetch all schools', async () => {
  new MockAdapter(axios)
    .onGet('/v1/schools?country=ESP&query=test')
    .replyOnce(200, JSON.stringify(schoolsResponse()), {});

  const schools = await searchSchools('test', country);

  expect(schools).toHaveLength(2);
  expect(schools[0].id).toEqual('S1');
  expect(schools[0].name).toEqual('One school');
});

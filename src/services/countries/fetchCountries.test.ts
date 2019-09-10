import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { countriesResponse } from '../../../test-support/api-responses';
import { LinksFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { fetchCountries } from './fetchCountries';

const links = LinksFactory.sample({
  countries: new Link({
    href: '/v1/countries',
  }),
});

test('fetch all countries', async () => {
  new MockAdapter(axios)
    .onGet('/v1/countries')
    .replyOnce(200, JSON.stringify(countriesResponse()), {});

  const countries = await fetchCountries(links);

  expect(countries).toHaveLength(4);
  expect(countries[0].id).toEqual('ES');
  expect(countries[0].name).toEqual('Spain');
  expect(countries[0].links.schools.getOriginalLink()).toEqual(
    'https://api.example.com/v1/schools?countryCode=ES{&query,state}',
  );
  expect(countries[3].id).toEqual('USA');
  expect(countries[3].states).toHaveLength(2);
  expect(countries[3].states[0].id).toEqual('state-1');
  expect(countries[3].states[0].name).toEqual('state 1');
});

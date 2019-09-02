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

  expect(countries).toHaveLength(3);
  expect(countries[0].id).toEqual('1');
  expect(countries[0].name).toEqual('Spain');
});

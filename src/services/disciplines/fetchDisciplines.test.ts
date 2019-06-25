import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LinksFactory } from '../../../test-support/factories';
import { disciplinesResponse } from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import { fetchDisciplines } from './fetchDisciplines';

const links = LinksFactory.sample({
  disciplines: new Link({
    href: '/v1/disciplines',
  }),
});

test('fetch all disciplines', async () => {
  new MockAdapter(axios)
    .onGet('/v1/disciplines')
    .replyOnce(200, JSON.stringify(disciplinesResponse()), {});

  const disciplines = await fetchDisciplines(links);

  expect(disciplines).toHaveLength(2);
  expect(disciplines[0].id).toEqual('arts');
  expect(disciplines[0].name).toEqual('Arts');
  expect(disciplines[0].code).toEqual('arts');
  expect(disciplines[0].subjects.length).toEqual(2);
  expect(disciplines[0].subjects[0].id).toEqual('arts-subject-1');
  expect(disciplines[0].subjects[0].name).toEqual('Performing Arts');
});
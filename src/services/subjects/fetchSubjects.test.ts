import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { subjectsResponse } from '../../../test-support/api-responses';
import { LinksFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { fetchSubjects } from './fetchSubjects';

const links = LinksFactory.sample({
  subjects: new Link({
    href: '/v1/subjects',
  }),
});

test('fetch all subjects', async () => {
  new MockAdapter(axios)
    .onGet('/v1/subjects')
    .replyOnce(200, JSON.stringify(subjectsResponse()), {});

  const subjects = await fetchSubjects(links);

  expect(subjects).toHaveLength(3);
  expect(subjects[0].id).toEqual('1');
  expect(subjects[0].name).toEqual('Maths');
});

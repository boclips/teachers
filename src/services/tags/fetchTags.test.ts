import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { tagsResponse } from '../../../test-support/api-responses';
import { LinksFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { fetchTags } from './fetchTags';

const links = LinksFactory.sample({
  tags: new Link({
    href: '/v1/tags',
  }),
});

test('fetch all tags', async () => {
  new MockAdapter(axios)
    .onGet('/v1/tags')
    .replyOnce(200, JSON.stringify(tagsResponse()), {});

  const tags = await fetchTags(links);

  expect(tags).toHaveLength(2);
  expect(tags[0].id).toEqual('1');
  expect(tags[0].label).toEqual('Explainer');
  expect(tags[0].links.self.getOriginalLink()).toEqual(
    'http://localhost/v1/tags/1',
  );
});

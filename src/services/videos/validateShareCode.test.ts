import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LinksFactory } from '../../../test-support/factories';
import { Link } from '../../types/Link';
import validateShareCode from './validateShareCode';
let links;
beforeEach(() => {
  links = LinksFactory.sample({
    validateShareCode: new Link({
      href: '={shareCode}',
      templated: true,
    }),
  });

  const axiosMock = new MockAdapter(axios);
  axiosMock
    .onGet(links.validateShareCode.getTemplatedLink({ shareCode: 'abc', id: 'user-id' }))
    .reply(200);
  axiosMock.onGet().reply(403);
});

test('returns true when the share code is correct', async () => {
  const validationResult = await validateShareCode(
    links.validateShareCode,
    'user-id',
    'abc',
  );
  expect(validationResult).toEqual(true);
});

test('returns false when the share code is incorrect', async () => {
  const validationResult = await validateShareCode(
    links.validateShareCode,
    'user-id',
    'cba',
  );
  expect(validationResult).toEqual(false);
});

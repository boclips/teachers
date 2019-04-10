import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';
import { LinksFactory } from './../../../test-support/factories';
import { createAccount } from './createAccount';

let links: Links;
beforeEach(async () => {
  links = LinksFactory.sample({
    createAccount: new Link({
      href: '/v1/users',
    }),
  });
});

test('create account', async () => {
  MockFetchVerify.post(
    '/v1/users',
    {
      firstName: 'jane',
      lastName: 'doe',
      subjects: 'some subjects',
      email: 'jane@doe.com',
      password: 'Champagn3',
      analyticsId: 'mixpanel-123',
      referralCode: 'SCAM-123',
      hasOptedIntoMarketing: false,
    },
    201,
  );

  const success = await createAccount(links, {
    firstName: 'jane',
    lastName: 'doe',
    subjects: 'some subjects',
    email: 'jane@doe.com',
    password: 'Champagn3',
    analyticsId: 'mixpanel-123',
    referralCode: 'SCAM-123',
    hasOptedIntoMarketing: false,
  });

  expect(success).toEqual(true);
});

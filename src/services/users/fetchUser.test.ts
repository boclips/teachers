import ApiStub from '../../../test-support/ApiStub';
import { userResponse } from '../../../test-support/video-service-responses';
import { Link } from '../../types/Link';
import { LinksFactory } from './../../../test-support/factories';
import { fetchUser } from './fetchUser';

describe('fetch user ', () => {
  it('can fetch and convert user response', async () => {
    new ApiStub().fetchUser(userResponse('123'));

    const userProfile = await fetchUser(
      LinksFactory.sample({
        profile: new Link({
          href: 'https://api.example.com/v1/users/{id}',
          templated: true,
        }),
      }),
      '123',
    );

    expect(userProfile.id).toBeDefined();
    expect(userProfile.analyticsId).toBeDefined();
    expect(userProfile.firstName).toBeDefined();
    expect(userProfile.lastName).toBeDefined();
    expect(userProfile.email).toBeDefined();
  });
});

import { userResponse } from 'test-support/api-responses';
import ApiStub from 'test-support/ApiStub';
import { Link } from 'src/types/Link';
import { LinksFactory } from 'test-support/factories';
import { fetchUser } from './fetchUser';

describe('fetch user ', () => {
  it('can fetch and convert user response', async () => {
    new ApiStub().fetchUser(userResponse());

    const userProfile = await fetchUser(
      LinksFactory.sample({
        profile: new Link({
          href: 'https://api.example.com/v1/users/my-user-id',
          templated: false,
        }),
      }),
    );

    expect(userProfile.id).toBeDefined();
    expect(userProfile.analyticsId).toBeDefined();
    expect(userProfile.firstName).toBeDefined();
    expect(userProfile.lastName).toBeDefined();
    expect(userProfile.subjects).toBeDefined();
    expect(userProfile.ages).toBeDefined();
    expect(userProfile.email).toBeDefined();
    expect(userProfile.country).toBeDefined();
    expect(userProfile.state).toBeDefined();
    expect(userProfile.school).toBeDefined();
    expect(userProfile.shareCode).toBeDefined();
  });
});

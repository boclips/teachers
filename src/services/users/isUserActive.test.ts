import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeUsersClient } from 'boclips-api-client/dist/sub-clients/users/client/FakeUsersClient';
import { isUserActive } from 'src/services/users/isUserActive';

const getFakeBoclipsClient: () => Promise<FakeBoclipsClient> = async () => {
  const client = await ApiClientWrapper.get();

  return client as FakeBoclipsClient;
};
describe('isUserActive', () => {
  test('check active user', async () => {
    const usersClient: FakeUsersClient = (await getFakeBoclipsClient()).users;
    usersClient.insertActiveUserId('user-123');
    await expect(isUserActive('user-123')).resolves.toBeTruthy();
  });

  test('check inactive user', async () => {
    await expect(isUserActive('abc')).resolves.toBeFalsy();
  });
});

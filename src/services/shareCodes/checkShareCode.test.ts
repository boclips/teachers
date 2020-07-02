import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeShareCodesClient } from 'boclips-api-client/dist/sub-clients/shareCodes/client/FakeShareCodesClient';
import { checkShareCode } from 'src/services/shareCodes/checkShareCode';

const getFakeBoclipsClient: () => Promise<FakeBoclipsClient> = async () => {
  const client = await ApiClientWrapper.get();

  return client as FakeBoclipsClient;
};
describe('checkShareCode', () => {
  test('check valid share code', async () => {
    const shareCodeClient: FakeShareCodesClient = (await getFakeBoclipsClient())
      .shareCodes;
    shareCodeClient.insertValidShareCode('user-123', 'Valid');
    await expect(checkShareCode('user-123', 'Valid')).resolves.toBeTruthy();
  });

  test('check invalid share code', async () => {
    await expect(checkShareCode('abc', '123')).resolves.toBeFalsy();
  });
});

import { ApiClientWrapper } from 'src/services/apiClient';

export async function checkShareCode(
  userId: string,
  shareCode: string,
): Promise<boolean> {
  const client = await ApiClientWrapper.get();
  return client.shareCodes.validate(userId, shareCode);
}

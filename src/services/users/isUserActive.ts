import { ApiClientWrapper } from 'src/services/apiClient';

export async function isUserActive(userId: string): Promise<boolean> {
  const client = await ApiClientWrapper.get();
  return client.users.isUserActive(userId);
}

import { ApiClientWrapper } from 'src/services/apiClient';
import { Subject } from '../../types/Subject';

export async function fetchSubjects(): Promise<Subject[]> {
  const client = await ApiClientWrapper.get();

  return await client.subjects.getAll();
}

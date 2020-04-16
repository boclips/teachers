import { Subject } from '../../types/Subject';
import { getBoclipsClient } from '../apiClient';

export async function fetchSubjects(): Promise<Subject[]> {
  const client = await getBoclipsClient();

  return await client.subjects.getAll();
}

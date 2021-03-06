import { FakeSubjectsClient } from 'boclips-api-client/dist/sub-clients/subjects/client/FakeSubjectsClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { ApiClientWrapper } from 'src/services/apiClient';
import { fetchSubjects } from './fetchSubjects';

const getFakeBoclipsClient: () => Promise<FakeBoclipsClient> = async () => {
  const client = await ApiClientWrapper.get();

  return client as FakeBoclipsClient;
};

test('fetch all subjects', async () => {
  const subjectClient: FakeSubjectsClient = (await getFakeBoclipsClient())
    .subjects;

  subjectClient.insertSubject({ id: '1', name: 'Maths' });
  subjectClient.insertSubject({ id: '2', name: 'German' });

  const subjects = await fetchSubjects();

  expect(subjects).toHaveLength(2);
  expect(subjects[0].id).toEqual('1');
  expect(subjects[0].name).toEqual('Maths');
  expect(subjects[1].id).toEqual('2');
  expect(subjects[1].name).toEqual('German');
});

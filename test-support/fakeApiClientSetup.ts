import { FakeSubjectsClient } from 'boclips-api-client/dist/sub-clients/subjects/client/FakeSubjectsClient';
import {
  FakeBoclipsClient,
  SubjectFactory,
} from 'boclips-api-client/dist/test-support';
import { getBoclipsClient } from '../src/services/apiClient';

export const fakeSubjectsSetup = async () => {
  const subjectsClient: FakeSubjectsClient = ((await getBoclipsClient()) as FakeBoclipsClient)
    .subjectsClient;

  subjectsClient.insertSubject(
    SubjectFactory.sample({
      id: '1',
      name: 'Maths',
    }),
  );

  subjectsClient.insertSubject(
    SubjectFactory.sample({
      id: '2',
      name: 'French',
    }),
  );

  subjectsClient.insertSubject(
    SubjectFactory.sample({
      id: '3',
      name: 'German',
    }),
  );
};

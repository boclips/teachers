import { FakeSubjectsClient } from 'boclips-api-client/dist/sub-clients/subjects/client/FakeSubjectsClient';
import {
  FakeBoclipsClient,
  SubjectFactory,
} from 'boclips-api-client/dist/test-support';
import { VideoResource } from 'test-support/factories';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { VideosConverter } from 'boclips-api-client/dist/sub-clients/videos/model/VideosConverter';
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

export const fakeVideoSetup = async (videoResource: VideoResource) => {
  const videosClient: FakeVideosClient = ((await getBoclipsClient()) as FakeBoclipsClient)
    .videosClient;

  videosClient.insertVideo(VideosConverter.convert(videoResource));
};

export const fakeVideosSetup = (videoResources: VideoResource[]) =>
  videoResources.forEach(fakeVideoSetup);

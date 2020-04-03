import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { getBoclipsClient } from 'src/services/apiClient';
import { fetchVideo } from './fetchVideo';

test('resolves with a video object when successfuly fetched', async () => {
  const client = (await getBoclipsClient()) as FakeBoclipsClient;

  client.videosClient.insertVideo(
    VideoFactory.sample({
      id: '177',
      title: 'KS3/4 Science: Demonstrating Chemistry',
    }),
  );

  const video = await fetchVideo('177');

  expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
});

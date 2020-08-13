import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { ApiClientWrapper } from 'src/services/apiClient';
import { AttachmentFactory } from 'boclips-api-client/dist/test-support/AttachmentsFactory';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import { Link as ApiClientLink } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import { fetchVideo } from './fetchVideo';

describe('fetchVideo', () => {
  const videoWithLinksAndAttachments = VideoFactory.sample({
    id: '177',
    title: 'KS3/4 Science: Demonstrating Chemistry',
    attachments: [AttachmentFactory.sample({ id: 'attachement-id' })],
    playback: PlaybackFactory.sample({
      id: 'playback-id',
      links: {
        createPlayerInteractedWithEvent: null,
        download: new ApiClientLink({
          href: "'http://cdn.kaltura.com/download'",
        }),
        createPlaybackEvent: new ApiClientLink({
          href: "'http://cdn.kaltura.com/thumbnail.jpg'",
        }),
        thumbnail: new ApiClientLink({
          href: "'http://cdn.kaltura.com/thumbnail.jpg'",
        }),
        hlsStream: null,
      },
    }),
  });

  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.videos.clear();
  });

  it('resolves with a video object when successfuly fetched', async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    client.videos.insertVideo(
      VideoFactory.sample({
        id: '177',
        title: 'KS3/4 Science: Demonstrating Chemistry',
      }),
    );

    const video = await fetchVideo({ id: '177' });

    expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
  });

  it('returns video with protected data when valid shareCode', async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    client.videos.addValidShareCode('referer', 'valid-share-code');

    client.videos.insertVideo(videoWithLinksAndAttachments);

    const video = await fetchVideo({
      id: '177',
      referer: 'referer',
      shareCode: 'invalid',
    });

    expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
    expect(video.attachments).toHaveLength(0);
    expect(video.playback.links).toEqual({
      createPlayerInteractedWithEvent: null,
      thumbnail: new ApiClientLink({
        href: "'http://cdn.kaltura.com/thumbnail.jpg'",
      }),
    });
  });

  it('returns video without protected data when shareCode invalid', async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    client.videos.addValidShareCode('referer', 'valid-share-code');

    client.videos.insertVideo(videoWithLinksAndAttachments);

    const video = await fetchVideo({
      id: '177',
      referer: 'referer',
      shareCode: 'valid-share-code',
    });

    expect(video.title).toEqual('KS3/4 Science: Demonstrating Chemistry');
    expect(video.attachments).toEqual(videoWithLinksAndAttachments.attachments);
    expect(video.playback).toEqual(videoWithLinksAndAttachments.playback);
  });
});

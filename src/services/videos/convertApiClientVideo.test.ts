import { Video as ClientVideo } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { Link } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import moment from 'moment';
import { convertApiClientVideo } from 'src/services/videos/convertApiClientVideo';
import { Video } from 'src/types/Video';
import { AgeRange } from '@bit/boclips.types.age-range';
import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';

describe('ApiClientVideo', () => {
  it('can convert to a Teachers Video', () => {
    const date = new Date();
    const duration = moment.duration();

    const apiClientVideo: ClientVideo = {
      id: 'video444',
      description: 'This is a very interesting video',
      title: 'Fantastic video',
      ageRange: { min: 3, max: 6 },
      badges: ['youtube'],
      bestFor: [{ label: 'Conversation starter' }, { label: 'Lunch' }],
      createdBy: 'Someone',
      language: { displayName: 'Spanish', code: 'ES' },
      legalRestrictions: 'None at all',
      links: {
        logInteraction: new Link({ href: 'https://log' }),
        self: new Link({ href: 'https://self' }),
      },
      playback: {
        id: 'playback',
        duration,
        type: 'STREAM',
        links: {
          createPlayerInteractedWithEvent: new Link({ href: 'https://events' }),
          thumbnail: new Link({ href: 'https://thumbnail' }),
        },
      },
      attachments: [
        {
          id: '',
          links: undefined,
          linkToResource: 'www.boclips.com',
          description: 'My attachment description',
          type: AttachmentType.ACTIVITY,
        },
      ],
      promoted: false,
      rating: 4.66,
      releasedOn: date,
      subjects: [{ id: 'sub2', name: 'Maths' }],
      yourRating: 4,
    };

    const video: Video = convertApiClientVideo(apiClientVideo);

    expect(video.id).toEqual('video444');
    expect(video.title).toEqual('Fantastic video');
    expect(video.description).toEqual('This is a very interesting video');
    expect(video.subjects).toEqual([{ id: 'sub2', name: 'Maths' }]);
    expect(video.ageRange).toEqual(new AgeRange(3, 6));
    expect(video.badges).toEqual(['youtube']);
    expect(video.bestFor).toEqual('Conversation starter');
    expect(video.createdBy).toEqual('Someone');
    expect(video.thumbnailUrl).toEqual('https://thumbnail');
    expect(video.playback).toEqual({
      id: 'playback',
      duration,
      type: 'STREAM',
      links: {
        createPlayerInteractedWithEvent: new Link({ href: 'https://events' }),
        thumbnail: new Link({ href: 'https://thumbnail' }),
      },
    });
    expect(video.promoted).toEqual(false);
    expect(video.rating).toEqual(4.66);
    expect(video.yourRating).toEqual(4);
    expect(video.releasedOn).toEqual(date);
    expect(video.attachments.length).toEqual(1);
    expect(video.attachments[0].description).toEqual(
      'My attachment description',
    );
    expect(video.attachments[0].type).toEqual(AttachmentType.ACTIVITY);
    expect(video.attachments[0].linkToResource).toEqual('www.boclips.com');
    expect(video.duration).toEqual(duration);
    expect(video.links.self.getOriginalLink()).toEqual('https://self');
    expect(video.links.logInteraction.getOriginalLink()).toEqual('https://log');
  });
});

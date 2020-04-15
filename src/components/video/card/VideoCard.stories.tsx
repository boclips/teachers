import { storiesOf } from '@storybook/react';
import { VideoCard } from 'src/components/video/card/VideoCard';
import { AgeRange } from 'src/types/AgeRange';
import { MockStoreFactory, VideoFactory } from 'test-support/factories';
import React from 'react';
import { number, withKnobs } from '@storybook/addon-knobs';
import {
  storyWithAuthentication,
  storyWithProvider,
  storyWithRouter,
} from 'src/utils/index.stories';
import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';

storiesOf('VideoCard', module)
  .addDecorator(storyWithAuthentication())
  .addDecorator(storyWithRouter())
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .addDecorator(withKnobs)
  .add('Video with Age Range', () => {
    const video = VideoFactory.sample({
      ageRange: new AgeRange(
        number('Age Min', 0, { min: 0, max: 19 }),
        number('Age Max', 5, { min: 0, max: 19 }),
      ),
    });

    return <VideoCard video={video} />;
  })
  .add('Video with activity', () => {
    const video = VideoFactory.sample({
      attachments: [
        {
          type: AttachmentType.ACTIVITY,
          linkToResource: 'http://www.activity.com',
          description: 'My Activity',
        },
      ],
    });

    return <VideoCard video={video} />;
  })
  .add('youtube video', () => {
    const video = VideoFactory.sample({
      playback: PlaybackFactory.sample({ type: 'YOUTUBE' }),
      attachments: [
        {
          type: AttachmentType.ACTIVITY,
          linkToResource: 'http://www.activity.com',
          description: 'My Activity',
        },
      ],
    });

    return <VideoCard video={video} />;
  });

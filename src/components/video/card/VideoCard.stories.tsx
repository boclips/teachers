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
  });

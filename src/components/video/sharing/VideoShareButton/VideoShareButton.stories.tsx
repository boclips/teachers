import { storiesOf } from '@storybook/react';
import React from 'react';
import { MockStoreFactory, VideoFactory } from 'test-support/factories';
import { storyWithProvider } from 'src/utils/index.stories';
import dayjs from 'src/types/dayjs';
import { VideoShareButton } from './VideoShareButton';

storiesOf('VideoShareButton', module)
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('Sharing a Video', () => (
    <VideoShareButton
      video={VideoFactory.sample({ duration: dayjs.duration('PT2M44S') })}
    />
  ));

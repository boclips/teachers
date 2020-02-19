import { storiesOf } from '@storybook/react';
import * as moment from 'moment';
import React from 'react';
import { MockStoreFactory, VideoFactory } from 'test-support/factories';
import { storyWithProvider } from 'src/utils/index.stories';
import { VideoShareButton } from './VideoShareButton';

storiesOf('VideoShareButton', module)
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('Sharing a Video', () => (
    <VideoShareButton
      video={VideoFactory.sample({ duration: moment.duration('PT2M44S') })}
    />
  ));

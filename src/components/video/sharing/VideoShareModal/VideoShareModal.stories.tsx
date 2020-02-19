import { storiesOf } from '@storybook/react';
import * as moment from 'moment';
import React from 'react';
import { MockStoreFactory, VideoFactory } from 'test-support/factories';
import { noOp } from '../../../../utils';
import { storyWithProvider } from '../../../../utils/index.stories';
import { VideoShareModal } from './VideoShareModal';

storiesOf('VideoShareModal', module)
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('In mobile view', () => (
    <VideoShareModal
      visible={true}
      handleClose={noOp}
      video={VideoFactory.sample({ duration: moment.duration('PT2M44S') })}
    />
  ))
  .add('In desktop view', () => (
    <VideoShareModal
      visible={true}
      handleClose={noOp}
      video={VideoFactory.sample({ duration: moment.duration('PT2M44S') })}
    />
  ));

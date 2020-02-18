import { storiesOf } from '@storybook/react';
import * as moment from 'moment';
import React from 'react';
import { MockStoreFactory, VideoFactory } from 'test-support/factories';
import { noOp } from 'src/utils';
import { storyWithProvider } from 'src/utils/index.stories';
import { ShareModal } from './ShareModal';

storiesOf('ShareModal', module)
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('In mobile view', () => (
    <ShareModal
      visible={true}
      mobileView={true}
      handleClose={noOp}
      video={VideoFactory.sample({ duration: moment.duration('PT2M44S') })}
    />
  ))
  .add('In desktop view', () => (
    <ShareModal
      visible={true}
      mobileView={false}
      handleClose={noOp}
      video={VideoFactory.sample({ duration: moment.duration('PT2M44S') })}
    />
  ));

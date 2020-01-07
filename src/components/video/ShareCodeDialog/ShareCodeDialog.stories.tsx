import { storiesOf } from '@storybook/react';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { VideoFactory } from '../../../../test-support/factories';
import { ShareCodeDialog } from './ShareCodeDialog';

const video = VideoFactory.sample();
const axiosMock = new MockAdapter(axios);

axiosMock
  .onGet(video.links.validateShareCode.getTemplatedLink({ shareCode: 'abc' }))
  .reply(200);

storiesOf('ShareCodeDialog', module).add('Default', () => (
  <ShareCodeDialog video={video} />
));

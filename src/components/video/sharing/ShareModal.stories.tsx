import { storiesOf } from '@storybook/react';
import * as moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import {
  MockStoreFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import '../../../index.less';
import State from '../../../types/State';
import { ShareModal } from './ShareModal';

const noop = () => {};

const withProvider = (store: Store<State>) => story => (
  <Provider store={store}>{story()}</Provider>
);

storiesOf('ShareModal', module)
  .addDecorator(withProvider(MockStoreFactory.sample()))
  .add(
    'In mobile view',
    () => (
      <ShareModal
        visible={true}
        mobileView={true}
        handleClose={noop}
        video={VideoFactory.sample({ duration: moment.duration('PT2M44S') })}
      />
    ),
    {
      viewport: { defaultViewport: 'iphone6' },
    },
  )
  .add('In desktop view', () => (
    <ShareModal
      visible={true}
      mobileView={false}
      handleClose={noop}
      video={VideoFactory.sample({ duration: moment.duration('PT2M44S') })}
    />
  ));

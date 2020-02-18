import { storiesOf } from '@storybook/react';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MockStoreFactory } from 'test-support/factories';
import { storyWithProvider } from 'src/utils/index.stories';
import { Links } from 'src/types/Links';
import { ShareCodeDialog } from './ShareCodeDialog';

const store = MockStoreFactory.sample();

const axiosMock = new MockAdapter(axios);
const links: Links = store.getState().links.entries;

axiosMock
  .onGet(
    links.validateShareCode.getTemplatedLink({
      id: 'test-id',
      shareCode: 'abc',
    }),
  )
  .reply(200);

storiesOf('ShareCodeDialog', module)
  .addDecorator(storyWithProvider(store))
  .add('Default', () => <ShareCodeDialog userId="test-id" />);

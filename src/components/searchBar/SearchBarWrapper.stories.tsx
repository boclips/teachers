import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { storyWithProvider } from 'src/utils/index.stories';
import { SearchBar } from 'src/components/searchBar/SearchBarWrapper';
import { MockStoreFactory } from 'test-support/factories';

storiesOf('Search Bar Wrapper', module)
  .addDecorator(storyWithProvider(MockStoreFactory.sample()))
  .add('a search bar', () => (
    <div>
      <br />
      <br />
      <SearchBar />
    </div>
  ));

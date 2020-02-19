import { storiesOf } from '@storybook/react';
import React from 'react';
import { storyWithProvider } from '../../../../utils/index.stories';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../../test-support/factories';
import AppliedFiltersProvider from '../../filters/AppliedFiltersProvider';
import { FilterPanel } from './FilterPanel';

storiesOf('FilterPanel', module)
  .add('Desktop', () =>
    storyWithProvider(MockStoreFactory.sample())(() => <FilterPanel />),
  )
  .add('Desktop with filters applied', () =>
    storyWithProvider(
      MockStoreFactory.sample({
        router: RouterFactory.sample({
          location: {
            pathname: '',
            search: `?q=hi&subject=subject-one-id`,
            hash: '',
            state: {},
          },
        }),
      }),
    )(() => (
      <AppliedFiltersProvider>
        <FilterPanel />
      </AppliedFiltersProvider>
    )),
  );

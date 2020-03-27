import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStoreFactory } from '../../../../test-support/factories';
import { fetchPageableCollectionsAction } from '../redux/actions/fetchPageableCollectionsAction';
import { PromotedCollectionsGrid } from './PromotedCollectionsGrid';

describe('promoted collections', () => {
  test('dispatches fetch promoted collection if none when mounted', () => {
    const store = MockStoreFactory.sample({
      collections: {} as any,
    });

    mount(
      <Provider store={store}>
        <PromotedCollectionsGrid maxNumberOfCollections={1} />
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      fetchPageableCollectionsAction({ key: 'promotedCollections' }),
    );
  });
});

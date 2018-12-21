import Mock = jest.Mock;

import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import eventually from '../../../test-support/eventually';
import { LinksFactory } from '../../../test-support/factories';
import { LinksState } from '../../redux/State';
import fetchLinks from '../../services/api/fetchLinks';
import { fetchLinksAction } from '../../services/links/redux/actions/fetchLinksAction';
import ConfigLoader from './ConfigLoader';
jest.mock('../../services/api/fetchLinks');

const loading = () => <span id="loading" />;
const mockStore = configureStore<LinksState>();
const mountConfigLoader = (store: Store) =>
  mount(
    <Provider store={store}>
      <ConfigLoader loadingComponent={loading}>
        <div id="child" />
      </ConfigLoader>
    </Provider>,
  );
const fetchLinksMock = fetchLinks as Mock;

describe('when component mounts', () => {
  describe('when links fetched', () => {
    test('dispatches FETCH_LINKS action', async () => {
      fetchLinksMock.mockReturnValue(Promise.resolve(LinksFactory.sample()));
      const store = mockStore({ links: null });

      mountConfigLoader(store);

      await eventually(() =>
        expect(store.getActions()).toContainEqual(fetchLinksAction()),
      );
    });
  });
});

describe('when links are present', () => {
  test('renders child component', () => {
    const wrapper = mountConfigLoader(
      mockStore({ links: LinksFactory.sample() }),
    );

    expect(wrapper.find('#child')).toExist();
    expect(wrapper.find('#loading')).not.toExist();
  });
});

describe('when links are not present', () => {
  test('renders loading component', () => {
    const wrapper = mountConfigLoader(mockStore({ links: null }));
    expect(wrapper.find('#loading')).toExist();
    expect(wrapper.find('#child')).not.toExist();
  });
});

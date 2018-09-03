import Mock = jest.Mock;
jest.mock('../links/fetchLinks');

import {mount} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import configureStore from 'redux-mock-store';
import fetchLinks from '../links/fetchLinks';
import {Link} from '../links/Link';
import {LinksState} from '../State';
import eventually from '../test-support/eventually';
import ConfigLoader, {storeLinksAction} from './ConfigLoader';

const loading = () => <span id="loading"/>;
const mockStore = configureStore<LinksState>();
const mountConfigLoader = (store: Store) => mount(
  <Provider store={store}>
    <ConfigLoader loadingComponent={loading}>
      <div id="child"/>
    </ConfigLoader>
  </Provider>,
);
const fetchLinksMock = fetchLinks as Mock;

describe('when component mounts', () => {
  describe('when links fetched', () => {
    test('dispatches STORE_LINKS action', async () => {
      fetchLinksMock.mockReturnValue(Promise.resolve({videos: new Link({href: '/videos'})}));
      const store = mockStore({links: null});

      mountConfigLoader(store);

      await eventually(() =>
        expect(store.getActions()).toContainEqual(storeLinksAction({videos: new Link({href: '/videos'})})));
    });
  });
});

describe('when links are present', () => {
  test('renders child component', () => {
    const wrapper = mountConfigLoader(mockStore({links: {videos: new Link({href: '/videos'})}}));

    expect(wrapper.find('#child')).toExist();
    expect(wrapper.find('#loading')).not.toExist();
  });
});

describe('when links are not present', () => {
  test('renders loading component', () => {
    const wrapper = mountConfigLoader(mockStore({links: null}));
    expect(wrapper.find('#loading')).toExist();
    expect(wrapper.find('#child')).not.toExist();
  });
});

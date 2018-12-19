import { mount } from 'enzyme';
import React from 'react';
import KeycloakInstanceFake from '../../test-support/KeycloakInstanceFake';
import Analytics from '../analytics/Analytics';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import App from '../App';
import { dispatchSearchVideoAction } from '../videos/search-videos/dispatchSearchVideoAction';
import { storeLogin } from './PrivateRoute';
jest.mock('../videos/search-videos/dispatchSearchVideoAction');
jest.mock('../analytics/AnalyticsFactory');

const analyticsFactoryMock = AnalyticsFactory;

const analytics: Analytics = { publish: jest.fn(), setUserId: jest.fn() };
analyticsFactoryMock.getInstance = jest.fn(() => analytics);
const appWrapper = mount(<App />);
const app = appWrapper.instance() as App;

describe('on store login', () => {
  beforeEach(() => {
    app.getStore().dispatch(storeLogin(new KeycloakInstanceFake('my user id')));
  });

  it('sets user identity for web analytics', () => {
    expect(analytics.setUserId).toHaveBeenCalledWith('my user id');
  });

  it("tries to search once we've log in", () => {
    expect(dispatchSearchVideoAction).toHaveBeenCalled();
  });
});

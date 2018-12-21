import { mount } from 'enzyme';
import React from 'react';
import KeycloakInstanceFake from '../../../../../test-support/KeycloakInstanceFake';
import App from '../../../../app/App';
import Analytics from '../../../../services/analytics/Analytics';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { dispatchSearchVideoAction } from '../../../searchBar/redux/dispatchSearchVideoAction';
import { storeLogin } from '../actions/storeLoginAction';
jest.mock('../../../searchBar/redux/dispatchSearchVideoAction');
jest.mock('../../../../services/analytics/AnalyticsFactory');

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

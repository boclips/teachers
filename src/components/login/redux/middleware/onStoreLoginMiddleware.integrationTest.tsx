import { mount } from 'enzyme';
import React from 'react';
import { analyticsMock } from '../../../../../test-support/getAnalyticsMock';
import KeycloakInstanceFake from '../../../../../test-support/KeycloakInstanceFake';
import App from '../../../../app/App';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { dispatchSearchVideoAction } from '../../../searchBar/redux/dispatchSearchVideoAction';
import { storeLogin } from '../actions/storeLoginAction';
jest.mock('../../../searchBar/redux/dispatchSearchVideoAction');
jest.mock('../../../../services/analytics/AnalyticsFactory');

const analyticsFactoryMock = AnalyticsFactory;

analyticsFactoryMock.getInstance = jest.fn(() => analyticsMock);
const appWrapper = mount(<App />);
const app = appWrapper.instance() as App;

describe('on store login', () => {
  beforeEach(() => {
    app.getStore().dispatch(
      storeLogin(
        new KeycloakInstanceFake({
          userId: 'my user id',
          mixpanelDistinctId: '123',
        }),
      ),
    );
  });

  it('sets user identity for web analytics', () => {
    expect(analyticsMock.setUserId).toHaveBeenCalledWith('123');
  });

  it("tries to search once we've log in", () => {
    expect(dispatchSearchVideoAction).toHaveBeenCalled();
  });
});

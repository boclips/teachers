import configureStore from 'redux-mock-store';
import ApiStub from '../../../../../test-support/ApiStub';
import eventually from '../../../../../test-support/eventually';
import KeycloakInstanceFake from '../../../../../test-support/KeycloakInstanceFake';
import { userResponse } from '../../../../../test-support/video-service-responses';
import { registerAnalytics } from '../actions/registerAnalytics';
import { storeLogin } from '../actions/storeLoginAction';
import onRegisterAnalyticsMiddleware from './onRegisterAnalyticsMiddleware';
import onStoreLoginMiddleware from './onStoreLoginMiddleware';

jest.mock('../../../searchBar/redux/dispatchSearchVideoAction');
jest.mock('../../../../services/analytics/AnalyticsFactory');

const mockStore = configureStore<{}>([
  onStoreLoginMiddleware,
  onRegisterAnalyticsMiddleware,
]);
const store = mockStore({});

describe('on store login', () => {
  beforeEach(() => {
    new ApiStub().fetchUser(userResponse());

    store.dispatch(
      storeLogin(
        new KeycloakInstanceFake({
          userId: 'user-id',
        }),
      ),
    );
  });

  it('sets user identity for web analytics', async () => {
    await eventually(() => {
      expect(store.getActions()).toContainEqual(registerAnalytics('123'));
    });
  });
});

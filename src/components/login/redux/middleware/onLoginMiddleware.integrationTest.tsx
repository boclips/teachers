import { push } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import { links, userResponse } from '../../../../../test-support/api-responses';
import ApiStub from '../../../../../test-support/ApiStub';
import eventually from '../../../../../test-support/eventually';
import convertUserResource from '../../../../services/users/convertUserResource';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';
import { fetchTagsAction } from '../../../common/tags/redux/actions/fetchTagsAction';
import { fetchDisciplinesAction } from '../../../disciplines/redux/actions/fetchDisciplinesAction';
import { registerUserForAnalytics } from '../actions/registerUserForAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';
import onStoreLoginMiddleware from './onLoginMiddleware';
import onRegisterUserMiddleware from './onRegisterUserForAnalytics';
import onRegisterUserForAnalytics from './onRegisterUserForAnalytics';

jest.mock('../../../searchBar/redux/dispatchSearchActions');
jest.mock('../../../../services/analytics/AnalyticsFactory');
jest.mock('../../../../services/users/updateUser');

const mockStore = configureStore<{}>([
  onStoreLoginMiddleware,
  onRegisterUserForAnalytics,
  onRegisterUserMiddleware,
]);
const store = mockStore({
  apiPrefix: 'https://api.example.com',
});

beforeEach(() => {
  store.clearActions();
});

describe('on store login', () => {
  describe('when account has access expired', () => {
    beforeEach(() => {
      new ApiStub({
        _links: {
          ...links._links,
          reportAccessExpired: { href: 'https://api.example.com/v1/events/expired-access' },
        },
      }).fetchUser(userResponse());

      store.dispatch(userLoggedIn());
    });

    it('redirects to the trial-expired page', async () => {
      await eventually(() => {
        expect(store.getActions()).toContainEqual(push('/trial-expired'));
      });
    });
  });

  describe('when account needs to be activated', () => {
    const user = convertUserResource(userResponse());

    beforeEach(() => {
      new ApiStub({
        _links: {
          ...links._links,
          activate: { href: 'https://api.example.com/v1/activate' },
        },
      })
        .fetchUser(userResponse())
        .fetchCollections();

      store.dispatch(userLoggedIn());
    });

    it('fetches my collections', async () => {
      await eventually(() => {
        expect(store.getActions().map(action => action.type)).toContain(
          storeCollectionsAction({
            collections: undefined,
            key: 'myCollections',
          }).type,
        );
      });
    });

    it('fetches disciplines', async () => {
      await eventually(() => {
        expect(store.getActions().map(action => action.type)).toContain(
          fetchDisciplinesAction().type,
        );
      });
    });

    it('fetches tags', async () => {
      await eventually(() => {
        expect(store.getActions().map(action => action.type)).toContain(
          fetchTagsAction().type,
        );
      });
    });

    it('sets up appcues', async () => {
      await eventually(() => {
        expect(store.getActions()).toContainEqual(
          registerUserForAnalytics(user),
        );
      });
    });

    it('sets up user', async () => {
      await eventually(() => {
        expect(store.getActions()).toContainEqual(userDetailsFetched(user));
      });
    });

    it('redirects to the onboarding page', async () => {
      await eventually(() => {
        expect(store.getActions()).toContainEqual(push('/onboarding'));
      });
    });
  });

  describe('when account already activated', () => {
    const user = convertUserResource(userResponse());
    beforeEach(() => {
      new ApiStub({
        _links: {
          ...links._links,
          activate: undefined,
        },
      })
        .fetchUser(userResponse())
        .fetchCollections();

      store.dispatch(userLoggedIn());
    });

    it('does not redirect to the onboarding page', async () => {
      await eventually(() => {
        expect(store.getActions()).toContainEqual(
          registerUserForAnalytics(user),
        ); // Necessary to avoid false positives
        expect(store.getActions()).not.toContainEqual(push('/onboarding'));
      });
    });
  });
});

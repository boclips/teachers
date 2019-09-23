import eventually from '../../../test-support/eventually';
import {
  LinksFactory,
  UserProfileFactory,
} from '../../../test-support/factories';
import { analyticsMock } from '../../../test-support/getAnalyticsMock';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import updateUser from './updateUser';

jest.mock('../analytics/AnalyticsFactory');

const links = LinksFactory.sample({
  profile: new Link({ href: '/activate' }),
});

const userProfile = UserProfileFactory.sample({
  email: 'joe@boclips.com',
  firstName: 'joe',
  lastName: 'boclips',
});

AnalyticsFactory.externalAnalytics = jest.fn(() => analyticsMock);

describe('when activate link present', () => {
  describe('when user activated successfully', () => {
    beforeEach(() => {
      MockFetchVerify.put('/activate', undefined, 201);
    });

    it('registers activation complete event', async () => {
      updateUser(links, userProfile);
      await eventually(() => {
        expect(analyticsMock.trackOnboardingCompleted).toHaveBeenCalled();
      });
    });

    it('creates user profile in analytics', async () => {
      updateUser(links, userProfile);
      await eventually(() => {
        expect(analyticsMock.createUserProfile).toHaveBeenCalledWith(
          userProfile,
        );
      });
    });
  });
});

describe('when user cannot be activated', () => {
  beforeEach(() => {
    MockFetchVerify.put('/activate', null, 403);
  });

  it('does not publish event to web analytics', () => {
    updateUser(links, userProfile);
    expect(analyticsMock.trackOnboardingCompleted).not.toHaveBeenCalled();
  });
});

describe('when no activate link', () => {
  it('does not throw', () => {
    expect(() => updateUser(LinksFactory.sample(), userProfile)).not.toThrow();
  });
});

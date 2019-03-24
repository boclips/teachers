import eventually from '../../../test-support/eventually';
import {
  LinksFactory,
  UserProfileFactory,
} from '../../../test-support/factories';
import { analyticsMock } from '../../../test-support/getAnalyticsMock';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import activateUser from './activateUser';

jest.mock('../analytics/AnalyticsFactory');

const analyticsFactoryMock = AnalyticsFactory;

const links = LinksFactory.sample({
  activate: new Link({ href: '/activate' }),
});

const userProfile = UserProfileFactory.sample({
  email: 'joe@boclips.com',
  firstName: 'joe',
  lastName: 'boclips',
});

analyticsFactoryMock.getInstance = jest.fn(() => analyticsMock);

describe('when activate link present', () => {
  describe('when user activated successfully', () => {
    beforeEach(() => {
      MockFetchVerify.post('/activate', undefined, 201);
    });

    it('registers activation complete event', async () => {
      activateUser(links, userProfile);
      await eventually(() => {
        expect(analyticsMock.trackAccountActivation).toHaveBeenCalled();
      });
    });

    it('creates user profile in analytics', async () => {
      activateUser(links, userProfile);
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
    MockFetchVerify.post('/activate', null, 403);
  });

  it('does not publish event to web analytics', () => {
    activateUser(links, userProfile);
    expect(analyticsMock.trackAccountActivation).not.toHaveBeenCalled();
  });
});

describe('when no activate link', () => {
  it('does not throw', () => {
    expect(() =>
      activateUser(LinksFactory.sample(), userProfile),
    ).not.toThrow();
  });
});

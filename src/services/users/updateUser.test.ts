import eventually from '../../../test-support/eventually';
import { LinksFactory } from '../../../test-support/factories';
import { analyticsMock } from '../../../test-support/getAnalyticsMock';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { Link } from '../../types/Link';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { onboardUser, UpdateUserRequest } from './updateUser';

jest.mock('../analytics/AnalyticsFactory');

const links = LinksFactory.sample({
  profile: new Link({ href: '/profile' }),
  activate: new Link({ href: '/activate' }),
});

const request: UpdateUserRequest = {
  firstName: 'joe',
  lastName: 'boclips',
};

AnalyticsFactory.externalAnalytics = jest.fn(() => analyticsMock);

describe('when activate link present', () => {
  describe('when user activated successfully', () => {
    beforeEach(() => {
      MockFetchVerify.put('/profile', undefined, 201);
    });

    it('registers activation complete event', async () => {
      onboardUser(links, request);
      await eventually(() => {
        expect(analyticsMock.trackOnboardingCompleted).toHaveBeenCalled();
      });
    });
  });
});

describe('when user cannot be activated', () => {
  beforeEach(() => {
    MockFetchVerify.put('/profile', null, 403);
  });

  it('does not publish event to web analytics', () => {
    onboardUser(links, request);
    expect(analyticsMock.trackOnboardingCompleted).not.toHaveBeenCalled();
  });
});

describe('when no activate link', () => {
  it('does not throw', () => {
    expect(onboardUser(LinksFactory.sample(), request)).rejects.toBeUndefined();
  });
});

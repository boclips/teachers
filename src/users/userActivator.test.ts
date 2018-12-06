import eventually from '../../test-support/eventually';
import { LinksFactory } from '../../test-support/factories';
import MockFetchVerify from '../../test-support/MockFetchVerify';
import Analytics, { EventTypes } from '../analytics/Analytics';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { Link } from '../links/Link';
import activateUser from './userActivator';

jest.mock('../analytics/AnalyticsFactory');

const analyticsFactoryMock = AnalyticsFactory;

const links = LinksFactory.sample({
  activate: new Link({ href: '/activate' }),
});

const analytics: Analytics = { publish: jest.fn(), setUserId: jest.fn() };
analyticsFactoryMock.getInstance = jest.fn(() => analytics);

describe('when activate link present', () => {
  describe('when user activated successfully', () => {
    beforeEach(() => {
      MockFetchVerify.post('/activate', undefined, 201);
    });

    it('registers event in mixpanel', async () => {
      activateUser(links);
      await eventually(() => {
        expect(analytics.publish).toHaveBeenCalledWith(
          EventTypes.ACTIVATION_COMPLETE,
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
    activateUser(links);
    expect(analytics.publish).not.toHaveBeenCalled();
  });
});

describe('when no activate link', () => {
  it('does not throw', () => {
    expect(() => activateUser(LinksFactory.sample())).not.toThrow();
  });
});

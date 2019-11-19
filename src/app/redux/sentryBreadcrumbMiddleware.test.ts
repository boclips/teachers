import * as Sentry from '@sentry/browser';
import { LocationChangeAction } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import { mocked } from 'ts-jest/utils';
import { sentryBreadcrumbMiddleware } from './sentryBreadcrumbMiddleware';

jest.mock('@sentry/browser');

const originalNodeEnv = process.env.NODE_ENV;

beforeAll(() => {
  process.env.NODE_ENV = 'production';
});

afterAll(() => {
  process.env.NODE_ENV = originalNodeEnv;
});

it('should add a breadcrumb when a navigation event happens', () => {
  const SentrySpy = mocked(Sentry);
  const mockStore = configureStore<{}>();
  const store = mockStore({});

  const action: LocationChangeAction = {
    type: '@@router/LOCATION_CHANGE',
    payload: {
      action: 'PUSH',
      location: {
        pathname: '/pathname',
        hash: 'hash',
        search: 'search=search',
      } as any,
    } as any,
  };

  sentryBreadcrumbMiddleware(store)(jest.fn())(action);

  expect(SentrySpy.addBreadcrumb).toHaveBeenCalledWith({
    category: 'router',
    level: Sentry.Severity.Info,
    message:
      'Location changed: {"pathname":"/pathname","hash":"hash","search":"search=search"}',
  });
});

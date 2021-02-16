import { LinksFactory } from '../../../test-support/factories';
import { onboardUser, UpdateUserRequest } from './updateUser';

jest.mock('../analytics/AnalyticsFactory');

const request: UpdateUserRequest = {
  firstName: 'joe',
  lastName: 'boclips',
  role: 'TEACHER',
};

describe('when no activate link', () => {
  it('does not throw', () => {
    expect(onboardUser(LinksFactory.sample(), request)).rejects.toBeUndefined();
  });
});

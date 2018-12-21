import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import eventually from '../../../../../test-support/eventually';
import { LinksResponseFactory } from '../../../../../test-support/factories';
import MockFetchVerify from '../../../../../test-support/MockFetchVerify';
import App from '../../../../app/App';
import activateUser from '../../../users/userActivator';
import Mock = jest.Mock;
import { Links } from '../../Links';

jest.mock('../../../users/userActivator');

const linksWithActivate = LinksResponseFactory.sample({
  activate: { href: '/v1/activate' },
});

const activateUserMock = activateUser as Mock;
describe('when activate link present', () => {
  beforeEach(() => {
    MockFetchVerify.get('/v1/', JSON.stringify(linksWithActivate));
  });

  describe('and app mounted', () => {
    beforeEach(() => {
      mount(<App history={createMemoryHistory({ initialEntries: [`/`] })} />);
    });

    it('activates account', async () => {
      await eventually(() => {
        expect(activateUserMock).toBeCalled();
        expect(
          (activateUserMock.mock
            .calls[0][0] as Links).activate.getOriginalLink(),
        ).toBe('/v1/activate');
      });
    });
  });
});

import React from 'react';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { ApiClientWrapper } from 'src/services/apiClient';
import { renderWithStore } from '../../../test-support/renderWithStore';
import { Link } from '../../types/Link';
import {
  LinksFactory,
  LinksStateValueFactory,
} from '../../../test-support/factories';
import TrialExpiredView from './TrialExpiredView';

describe('TrialExpiryView', () => {
  it('tells the user their trial is over', () => {
    const { getByText } = renderWithStore(<TrialExpiredView />, {
      initialState: {
        links: {
          loadingState: 'success',
          entries: {
            ...LinksFactory.sample(),
            reportAccessExpired: new Link({ href: '/report-access-expired' }),
          },
        },
      },
    });

    expect(
      getByText('We’re sorry but your trial period is over!'),
    ).toBeInTheDocument();
  });

  it('emits a UserExpired event', async () => {
    renderWithStore(<TrialExpiredView />, {
      initialState: {
        links: {
          loadingState: 'success',
          entries: {
            ...LinksFactory.sample(),
            reportAccessExpired: new Link({ href: '/report-access-expired' }),
          },
        },
      },
    });

    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    expect(client.events.getEvents()[0].type).toEqual('USER_EXPIRED');
  });

  it('does not tell the user the trial is over, when it is not over', async () => {
    const { queryByText } = renderWithStore(<TrialExpiredView />, {
      initialState: {
        links: LinksStateValueFactory.sample(),
      },
    });

    expect(
      queryByText('We’re sorry but your trial period is over!'),
    ).not.toBeInTheDocument();
  });
});

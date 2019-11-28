import React from 'react';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { renderWithStore } from '../../../test-support/renderWithStore';
import { Link } from '../../types/Link';
import { getBoclipsClient } from '../../services/apiClient';
import {LinksFactory} from "../../../test-support/factories";
import { TrialExpiredView } from './TrialExpiredView';

describe('TrialExpiryView', () => {
  it('tells the user their trial is over', () => {
    const { getByText } = renderWithStore(<TrialExpiredView />, {
      initialState: {
        links: {
          reportAccessExpired: new Link({ href: '/report-access-expired' }),
        } as any,
      },
    });

    expect(
      getByText('We’re sorry but your trial period is over!'),
    ).toBeInTheDocument();
  });

  it('emits a UserExpired event', async () => {
    const {} = renderWithStore(<TrialExpiredView />, {
      initialState: {
        links: {
          reportAccessExpired: new Link({ href: '/report-access-expired' }),
        } as any,
      },
    });

    const client = (await getBoclipsClient()) as FakeBoclipsClient;

    expect(client.eventsClient.getEvents()).toContain('USER_EXPIRED');
  });

  it('does not tell the user the trial is over, when it is not over', async () => {
    const { queryByText } = renderWithStore(<TrialExpiredView />, {
      initialState: {
        links: LinksFactory.sample()
      },
    });

    expect(
      queryByText('We’re sorry but your trial period is over!'),
    ).not.toBeInTheDocument();
  });
});

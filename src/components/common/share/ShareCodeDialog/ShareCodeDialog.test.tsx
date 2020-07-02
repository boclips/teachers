import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import { fireEvent, waitFor } from '@testing-library/dom';
import React from 'react';
import { RouterFactory, UserProfileFactory } from 'test-support/factories';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { createMemoryHistory } from 'history';
import eventually from 'test-support/eventually';

describe('Share code dialog', () => {
  let wrapper;
  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.shareCodes.clear();
    client.shareCodes.insertValidShareCode('user-123', 'valid');
    client.events.clear();

    wrapper = renderWithBoclipsStore(
      <ShareCodeDialog title="Test" cta="Click Me" />,
      {
        router: RouterFactory.sample({
          location: {
            pathname: '',
            search: '?referer=user-123',
            hash: '',
            state: null,
          },
        }),
        user: UserProfileFactory.sample({ id: 'user-123' }),
      },
      createMemoryHistory({
        initialEntries: ['/collections?referer=user-123'],
      }),
    );
  });

  it('disappears when referer id and referer share code entered are correct', async () => {
    const submitButton = wrapper.getByText('Click Me').closest('button');

    await fireEvent.change(wrapper.getByTestId('share-code-input'), {
      target: { value: 'valid' },
    });

    await fireEvent.click(submitButton);

    await waitFor(() =>
      expect(wrapper.queryByText('Test')).not.toBeInTheDocument(),
    );
  });

  it('when code is incorrect displays invalid code', async () => {
    const submitButton = wrapper.getByText('Click Me').closest('button');

    await fireEvent.change(wrapper.getByTestId('share-code-input'), {
      target: { value: 'invalid' },
    });

    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(wrapper.getByText('Invalid code')).toBeVisible();
    });
  });

  it('will send PLATFORM_INTERACTED events accordingly to actions', async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    expect(client.events.getEvents()).toEqual([
      {
        anonymous: true,
        subtype: 'SHARE_CODE_MODAL_IMPRESSION',
        type: 'PLATFORM_INTERACTED_WITH',
      },
    ]);

    client.events.clear();
    const submitButton = wrapper.getByText('Click Me').closest('button');
    await fireEvent.change(wrapper.getByTestId('share-code-input'), {
      target: { value: 'invalid' },
    });
    await fireEvent.click(submitButton);

    await eventually(() => {
      expect(client.events.getEvents()).toEqual([
        {
          anonymous: true,
          subtype: 'SHARE_CODE_MODAL_INVALID',
          type: 'PLATFORM_INTERACTED_WITH',
        },
      ]);
    });
    client.events.clear();

    await fireEvent.change(wrapper.getByTestId('share-code-input'), {
      target: { value: 'valid' },
    });
    await fireEvent.click(submitButton);

    await eventually(() => {
      expect(client.events.getEvents()).toEqual([
        {
          anonymous: true,
          subtype: 'SHARE_CODE_MODAL_VALID',
          type: 'PLATFORM_INTERACTED_WITH',
        },
      ]);
    });
  });
});

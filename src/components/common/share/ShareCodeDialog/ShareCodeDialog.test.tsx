import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import {fireEvent, waitFor} from '@testing-library/dom';
import React from 'react';
import {RouterFactory, UserProfileFactory} from 'test-support/factories';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import {createMemoryHistory} from "history";
import {waitForElementToBeRemoved} from "@testing-library/react";

describe(`Share code dialog`, () => {
  let wrapper;
  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    const noop = () => {};
    client.shareCodes.clear();
    client.shareCodes.insertValidShareCode('user-123', 'valid');

    wrapper = renderWithBoclipsStore(
      <ShareCodeDialog
        title={'Test'}
        cta={'Click Me'}
        onSubmit={noop}
        visible={true}
        codeInvalid={false}
      />,
      {
        router: RouterFactory.sample({
          location: {
            pathname: '',
            search: `?referer=user-123`,
            hash: '',
            state: null,
          },
        }),
        user : UserProfileFactory.sample({id: "user-123"})
      },
      createMemoryHistory({
        initialEntries: ['/collections?referer=user-123'],
      })
    );
  })

  it(`disappears when referer id and referer share code entered are correct`, async () => {

    const submitButton = wrapper.getByText('Click Me').closest('button');

    await fireEvent.change(wrapper.getByTestId('share-code-input'), {
      target: { value: 'valid' },
    });

    await fireEvent.click(submitButton);

    await expect(
      waitForElementToBeRemoved(() => wrapper.getByText('Test')),
    ).resolves.toEqual(true);
  });

  it(`when code is incorrect displays invalid code`, async () => {
    const submitButton = wrapper.getByText('Click Me').closest('button');

    await fireEvent.change(wrapper.getByTestId('share-code-input'), {
      target: { value: 'invalid' },
    });

    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(wrapper.getByText('Invalid code')).toBeVisible();
    });

  });
});

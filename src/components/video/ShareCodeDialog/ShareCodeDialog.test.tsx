import axios from 'axios';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import {
  LinksFactory,
  MockStoreFactory,
  RouterFactory,
} from 'test-support/factories';
import { ShareCodeDialog } from './ShareCodeDialog';

describe('ShareCodeDialog', () => {
  const links = LinksFactory.sample();
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: `?referer=test-id`,
        hash: '',
        state: null,
      },
    }),
  });

  it(`disables the watch video button while no shareCode is provided`, async () => {
    const wrapper = render(
      <Provider store={store}>
        <ShareCodeDialog userId="test-id" />
      </Provider>,
    );

    const button = wrapper.getByText('Watch video').closest('button');

    expect(button).toBeInTheDocument();

    expect(button.disabled).toEqual(true);
  });

  it(`enables the watch video button when a shareCode is provided`, async () => {
    const wrapper = render(
      <Provider store={store}>
        <ShareCodeDialog userId="test-id" />
      </Provider>,
    );

    const shareField = wrapper.getByPlaceholderText('Enter code');
    await fireEvent.change(shareField, { target: { value: 'SHARECODE' } });

    const button = wrapper.getByText('Watch video').closest('button');

    expect(button.disabled).toEqual(false);
  });

  describe('share code validation', () => {
    beforeEach(() => {
      const axiosMock = new MockAdapter(axios);
      axiosMock
        .onGet(
          links.validateShareCode.getTemplatedLink({
            id: 'test-id',
            shareCode: 'abc',
          }),
        )
        .reply(200);
      axiosMock.onGet().reply(401);
    });

    const testData = [
      {
        message: 'closes the share modal when share code is valid',
        shareCode: 'abc',
        expectToClose: true,
      },
      {
        message: 'does not close the share modal when share code is invalid',
        shareCode: 'foo',
        expectToClose: false,
      },
    ];

    testData.forEach(({ message, shareCode, expectToClose }) => {
      it(message, async () => {
        const wrapper = render(
          <Provider store={store}>
            <ShareCodeDialog userId="test-id" />
          </Provider>,
        );
        const button = wrapper.getByText('Watch video').closest('button');
        const shareField = wrapper.getByPlaceholderText('Enter code');
        expect(button).toBeInTheDocument();
        expect(shareField).toBeInTheDocument();

        await fireEvent.change(shareField, { target: { value: shareCode } });
        await fireEvent.click(button);

        if (expectToClose) {
          await expect(
            waitForElementToBeRemoved(() => wrapper.getByText('Watch video')),
          ).resolves.toEqual(true);
          expect(wrapper.queryByText('Invalid code')).toBeNull();
        } else {
          await expect(
            waitForElementToBeRemoved(() => wrapper.getByText('Watch video')),
          ).rejects.toThrow();
          expect(wrapper.getByText('Invalid code')).toBeVisible();
        }
      });
    });
  });
});

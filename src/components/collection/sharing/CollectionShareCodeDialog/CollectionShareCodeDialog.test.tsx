import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { MockStoreFactory } from '../../../../../test-support/factories';
import MockFetchVerify from '../../../../../test-support/MockFetchVerify';
import {
  collectionResponse,
  video177,
} from '../../../../../test-support/api-responses';
import { createBoclipsStore } from '../../../../app/redux/store';
import { renderWithCreatedStore } from '../../../../../test-support/renderWithStore';
import { CollectionShareCodeDialog } from './CollectionShareCodeDialog';

describe('CollectionShareCodeDialog', () => {
  let store;
  let history;

  beforeEach(() => {
    history = createMemoryHistory({
      initialEntries: ['/collections/123?referer=test-id'],
    });

    store = createBoclipsStore(MockStoreFactory.sampleState(), history);
  });

  describe('collection ShareCodeDialog', () => {
    it(`disables the View collection button while no shareCode is provided`, async () => {
      const wrapper = renderWithCreatedStore(
        <CollectionShareCodeDialog collectionId={'123'} />,
        store,
        history,
      );

      const button = wrapper.getByText('View collection').closest('button');

      expect(button).toBeInTheDocument();

      expect(button.disabled).toEqual(true);
    });

    it(`enables the view collection button when a shareCode is provided`, async () => {
      const wrapper = renderWithCreatedStore(
        <CollectionShareCodeDialog collectionId={'123'} />,
        store,
        history,
      );

      const shareField = wrapper.getByPlaceholderText('Enter code');
      await fireEvent.change(shareField, { target: { value: 'SHARECODE' } });

      const button = wrapper.getByText('View collection').closest('button');

      expect(button.disabled).toEqual(false);
    });
  });

  describe(`collection ShareCodeDialog`, () => {
    it(`displays view collection`, () => {
      const wrapper = renderWithCreatedStore(
        <CollectionShareCodeDialog collectionId={'123'} />,
        store,
        history,
      );
      expect(wrapper.getByText('Enter code to view collection')).toBeVisible();
      expect(
        wrapper.getByText('View collection').closest('button'),
      ).toBeVisible();
    });
  });

  describe('share code validation', () => {
    beforeEach(() => {
      MockFetchVerify.get(
        `/collections/123?referer=test-id&shareCode=test`,
        JSON.stringify(collectionResponse([video177], '123')),
      );
    });

    const testData = [
      {
        message:
          'closes the share modal when share code is valid and the collection has loaded',
        shareCode: 'test',
        expectToClose: true,
      },
      {
        message: 'does not close the share modal when share code is invalid',
        shareCode: 'invalid',
        expectToClose: false,
      },
    ];

    testData.forEach(({ message, shareCode, expectToClose }) => {
      it(message, async () => {
        const wrapper = renderWithCreatedStore(
          <CollectionShareCodeDialog collectionId={'123'} />,
          store,
          history,
        );
        const button = wrapper.getByText('View collection').closest('button');
        const shareField = wrapper.getByPlaceholderText('Enter code');
        expect(button).toBeInTheDocument();
        expect(shareField).toBeInTheDocument();

        expect(wrapper.getByText('Invalid code')).not.toBeVisible();

        await fireEvent.change(shareField, { target: { value: shareCode } });
        await fireEvent.click(button);

        if (expectToClose) {
          await expect(
            waitForElementToBeRemoved(() =>
              wrapper.getByText('View collection'),
            ),
          ).resolves.toEqual(true);
        } else {
          await expect(
            waitForElementToBeRemoved(() =>
              wrapper.getByText('View collection'),
            ),
          ).rejects.not.toBeNull();
          expect(wrapper.getByText('Invalid code')).toBeVisible();
        }
      });
    });
  });
});

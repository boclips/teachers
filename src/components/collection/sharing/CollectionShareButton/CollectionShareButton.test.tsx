import React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  UserProfileFactory,
  VideoCollectionFactory,
} from 'test-support/factories';
import { fireEvent } from '@testing-library/react';
import { CollectionShareButton } from './CollectionShareButton';

describe('CollectionShareButton', () => {
  it('displays the teacher share code', () => {
    const collection = VideoCollectionFactory.sample();
    const { getByText } = renderWithStore(
      <CollectionShareButton collection={collection} />,
      {
        initialState: {
          user: UserProfileFactory.sample({
            shareCode: 'BOB1',
          }),
        },
      },
    );

    const shareButton = getByText('Share');
    expect(shareButton).toBeVisible();
    fireEvent.click(shareButton);

    expect(
      getByText('Share this code with the link for access:'),
    ).toBeVisible();
    expect(getByText('BOB1')).toBeVisible();
  });

  it('has a copy link and google classroom button', () => {
    const collection = VideoCollectionFactory.sample();
    const { getByText } = renderWithStore(
      <CollectionShareButton collection={collection} />,
      {
        initialState: {
          user: UserProfileFactory.sample({
            shareCode: 'BOB1',
          }),
        },
      },
    );

    const shareButton = getByText('Share');
    expect(shareButton).toBeVisible();
    fireEvent.click(shareButton);

    expect(getByText('Copy link')).toBeVisible();
    expect(getByText('Send to Google Classroom')).toBeVisible();
  });
});

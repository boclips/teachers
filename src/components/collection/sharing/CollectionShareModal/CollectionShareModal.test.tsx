import React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  UserProfileFactory,
  VideoCollectionFactory,
} from 'test-support/factories';
import { CollectionShareModal } from 'src/components/collection/sharing/CollectionShareModal/CollectionShareModal';

describe('Collection Share modal', () => {
  it('displays the teacher share code', () => {
    const collection = VideoCollectionFactory.sample();
    const { getByText } = renderWithStore(
      <CollectionShareModal
        collection={collection}
        handleClose={() => {}}
        visible={true}
      />,
      {
        initialState: {
          user: UserProfileFactory.sample({
            shareCode: 'BOB1',
          }),
        },
      },
    );

    expect(
      getByText('Share this code with the link for access:'),
    ).toBeVisible();
    expect(getByText('BOB1')).toBeVisible();
  });

  it('has a copy link and google classroom button', () => {
    const collection = VideoCollectionFactory.sample();
    const { getByText } = renderWithStore(
      <CollectionShareModal
        collection={collection}
        handleClose={() => {}}
        visible={true}
      />,
      {
        initialState: {
          user: UserProfileFactory.sample({
            shareCode: 'BOB1',
          }),
        },
      },
    );

    expect(getByText('Copy link')).toBeVisible();
    expect(getByText('Send to Google Classroom')).toBeVisible();
  });
});

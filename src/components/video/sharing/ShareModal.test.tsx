import React from 'react';
import { renderWithStore } from '../../../../test-support/renderWithStore';
import {
  UserProfileFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { ShareModal } from './ShareModal';

describe('Share modal', () => {
  it('displays the teacher share code', () => {
    const video = VideoFactory.sample();
    const { getByText } = renderWithStore(
      <ShareModal
        video={video}
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
    const video = VideoFactory.sample();
    const { getByText } = renderWithStore(
      <ShareModal
        video={video}
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

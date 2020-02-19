import React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import { UserProfileFactory, VideoFactory } from 'test-support/factories';
import { fireEvent } from '@testing-library/react';
import FakeBoclipsAnalytics from 'src/services/analytics/boclips/FakeBoclipsAnalytics';
import { VideoShareButton } from './VideoShareButton';

describe('VideoShareButton', () => {
  it('displays the teacher share code', () => {
    const video = VideoFactory.sample();
    const { getByText } = renderWithStore(<VideoShareButton video={video} />, {
      initialState: {
        user: UserProfileFactory.sample({
          shareCode: 'BOB1',
        }),
      },
    });

    const shareButton = getByText('Share');
    expect(shareButton).toBeVisible();
    fireEvent.click(shareButton);

    expect(
      getByText('Share this code with the link for access:'),
    ).toBeVisible();
    expect(getByText('BOB1')).toBeVisible();
  });

  it('has a copy link and google classroom button', () => {
    const video = VideoFactory.sample();
    const { getByText } = renderWithStore(<VideoShareButton video={video} />, {
      initialState: {
        user: UserProfileFactory.sample({
          shareCode: 'BOB1',
        }),
      },
    });

    const shareButton = getByText('Share');
    expect(shareButton).toBeVisible();
    fireEvent.click(shareButton);

    expect(getByText('Copy link')).toBeVisible();
    expect(getByText('Send to Google Classroom')).toBeVisible();
  });

  it('logs a boclips event when copied', () => {
    const video = VideoFactory.sample();
    const { getByText } = renderWithStore(<VideoShareButton video={video} />, {
      initialState: {
        user: UserProfileFactory.sample({
          shareCode: 'BOB1',
        }),
      },
    });

    const shareButton = getByText('Share');
    expect(shareButton).toBeVisible();
    fireEvent.click(shareButton);

    const copyLink = getByText('Copy link');
    expect(copyLink).toBeVisible();
    fireEvent.click(copyLink);

    expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
      video,
      interactionType: 'VIDEO_LINK_COPIED',
    });
  });

  it('calls onClick when clicked on', () => {
    const video = VideoFactory.sample();
    const { getByText } = renderWithStore(<VideoShareButton video={video} />, {
      initialState: {
        user: UserProfileFactory.sample({
          shareCode: 'BOB1',
        }),
      },
    });

    const shareButton = getByText('Share');
    expect(shareButton).toBeVisible();
    fireEvent.click(shareButton);

    const copyLink = getByText('Send to Google Classroom');
    expect(copyLink).toBeVisible();
    fireEvent.click(copyLink);

    expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
      video,
      interactionType: 'VIDEO_SHARED_TO_GOOGLE_CLASSROOM',
    });
  });
});

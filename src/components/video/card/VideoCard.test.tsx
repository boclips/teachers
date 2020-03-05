import React from 'react';
import { Link } from 'src/types/Link';
import { renderWithCreatedStore } from 'test-support/renderWithStore';
import { createBoclipsStore } from 'src/app/redux/store';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AgeRange } from 'src/types/AgeRange';
import FakeBoclipsAnalytics from 'src/services/analytics/boclips/FakeBoclipsAnalytics';
import { MockStoreFactory, VideoFactory } from 'test-support/factories';
import { VideoCard } from './VideoCard';

describe('when outside video collection', () => {
  let history;
  let store;
  let component;
  let video;

  beforeEach(() => {
    video = VideoFactory.sample({
      ageRange: new AgeRange(3, 9),
      links: {
        self: new Link({ href: `/v1/videos/123` }),
        transcript: new Link({ href: `/v1/videos/123` }),
      },
    });
    history = createMemoryHistory();
    store = createBoclipsStore(MockStoreFactory.sampleState(), history);
    component = renderWithCreatedStore(
      <VideoCard video={video} />,
      store,
      history,
    );
  });

  it('renders video buttons', () => {
    expect(component.getByText('Transcript')).toBeInTheDocument();
  });

  it('renders age range tag', () => {
    expect(component.getByText('3-9')).toBeInTheDocument();
  });

  it('Renders a ClickableCard, with the video details href', async () => {
    const card = component.getByTestId('video-card');
    expect(card).toBeInTheDocument();

    await fireEvent.click(card);

    expect(history.location.pathname).toEqual('/videos/123');
  });

  it('logs a navigation event in BoclipsAnalytics on mousedown', async () => {
    const card = component.getByTestId('video-card');
    expect(card).toBeInTheDocument();

    await fireEvent.mouseDown(card);

    expect(FakeBoclipsAnalytics.videoInteractedWithEvents).toContainEqual({
      video,
      interactionType: 'NAVIGATE_TO_VIDEO_DETAILS',
    });
  });
});

describe(`when unauthenticated`, () => {
  const history = createMemoryHistory();
  const store = createBoclipsStore(
    MockStoreFactory.sampleState({
      authentication: { status: 'anonymous' },
      user: undefined,
      links: {
        loadingState: 'success',
        entries: {
          myCollections: null,
          video: new Link({ href: `/videos/{id}`, templated: true }),
          createNoSearchResultsEvent: new Link({
            href: `/videos/{id}`,
            templated: true,
          }),
        },
      },
    }),
    history,
  );

  it(`does not render the video card buttons when there are no appropriate links`, () => {
    const videoWithNoLinks = VideoFactory.sample({
      links: { self: new Link({ href: `/v1/videos/123` }) },
    });
    const component = renderWithCreatedStore(
      <VideoCard video={videoWithNoLinks} />,
      store,
      history,
    );

    expect(
      component.queryByTestId('video-buttons-container'),
    ).not.toBeInTheDocument();
    expect(component.queryByText('Transcript')).not.toBeInTheDocument();
    expect(component.queryByText('Share')).not.toBeInTheDocument();
    expect(component.queryByText('Save')).not.toBeInTheDocument();
  });

  it(`renders the transcript button when available`, () => {
    const videoWithTranscriptLink = VideoFactory.sample({
      links: {
        self: new Link({ href: `/v1/videos/123` }),
        transcript: new Link({ href: `/v1/videos/123` }),
      },
    });
    const component = renderWithCreatedStore(
      <VideoCard video={videoWithTranscriptLink} />,
      store,
      history,
    );

    expect(component.queryByText('Transcript')).toBeInTheDocument();
    expect(component.queryByText('Share')).not.toBeInTheDocument();
    expect(component.queryByText('Save')).not.toBeInTheDocument();
  });
});

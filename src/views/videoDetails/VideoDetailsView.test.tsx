import { createMemoryHistory } from 'history';
import { waitForElement } from '@testing-library/react';
import React from 'react';
import { fakeVideoSetup } from 'test-support/fakeApiClientSetup';
import { renderWithCreatedStore } from '../../../test-support/renderWithStore';
import {
  LinksStateValueFactory,
  MockStoreFactory,
  UserProfileFactory,
  VideoResourceFactory,
} from '../../../test-support/factories';
import { VideoDetailsPage } from '../../../test-support/page-objects/VideoDetailsPage';
import ApiStub from '../../../test-support/ApiStub';
import State from '../../types/State';
import { createBoclipsStore } from '../../app/redux/store';
import eventually from '../../../test-support/eventually';
import { VideoDetailsView } from './VideoDetailsView';

describe('VideoDetailsView', () => {
  const video = VideoResourceFactory.sample({
    title: 'Video Title To Show',
    id: '177',
  });

  const createViewWrapper = (initialHistory, initialState) => {
    const history = createMemoryHistory({
      initialEntries: initialHistory,
    });

    const store = createBoclipsStore(
      {
        ...MockStoreFactory.sampleState({
          links: LinksStateValueFactory.sample(
            {},
            'https://api.example.com/v1',
          ),
        }),
        ...initialState,
      },
      history,
    );

    return renderWithCreatedStore(
      <VideoDetailsView videoId={video.id} />,
      store,
      history,
    );
  };

  beforeEach(async () => {
    new ApiStub().defaultUser().fetchCollections();

    await fakeVideoSetup(video);
  });

  it('fetches video details from the API & renders the result', async () => {
    const videoDetailsPage = await VideoDetailsPage.load();

    expect(videoDetailsPage.getVideoDetails()).toEqual({
      title: video.title,
      description: video.description,
      createdBy: video.createdBy,
      duration: ' 1m 2s',
      releasedOn: 'Feb 11, 2018',
      subjects: ['Maths', 'Physics'],
      playerVideoId: video.id,
    });
  });

  describe('When unauthenticated', () => {
    const unauthenticatedState: Partial<State> = {
      authentication: {
        status: 'anonymous',
      },
      user: null,
    };

    it('asks for a code when "share" and "referer" params are present', () => {
      const { getByText, getByRole } = createViewWrapper(
        ['/videos/123?referer=user-123&share=true'],
        unauthenticatedState,
      );

      const button = getByText('Watch video');

      expect(getByRole('dialog')).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(getByText('Enter code to watch video')).toBeInTheDocument();
    });

    it('does not ask for a code when the "referer" param is missing', () => {
      const { queryByRole, queryByText } = createViewWrapper(
        ['/videos/123'],
        unauthenticatedState,
      );

      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(queryByText('Enter code to watch video')).not.toBeInTheDocument();
    });

    it('does not ask for a code when the "share" param is missing', () => {
      const { queryByText, queryByRole } = createViewWrapper(
        ['/videos/123?referer=user-123'],
        unauthenticatedState,
      );

      expect(queryByRole('dialog')).not.toBeInTheDocument();
      expect(queryByText('Enter code to watch video')).not.toBeInTheDocument();
    });

    it('does not render a share button', () => {
      const { queryByText } = createViewWrapper(
        ['/videos/123'],
        unauthenticatedState,
      );

      expect(queryByText('Share')).not.toBeInTheDocument();
    });
  });

  describe('When authenticated', () => {
    const authenticatedState = {
      authenticated: { status: 'authenticated' },
      user: UserProfileFactory.sample({ id: 'user-test-id' }),
    };
    it('does not ask for a code', async () => {
      const { findByText, getByText } = createViewWrapper(
        ['/videos/123?referer=user-123&share=true'],
        authenticatedState,
      );

      expect(await findByText(video.title)).toBeInTheDocument();

      await expect(
        waitForElement(
          () => {
            getByText('Watch video');
          },
          {
            timeout: (2 * 60) / 1000,
          },
        ),
      ).rejects.toBeTruthy();
    });

    it('sets the "referer" query param', async () => {
      const { findByText, history } = createViewWrapper(
        ['/videos/123'],
        authenticatedState,
      );

      await findByText(video.title);

      await eventually(() => {
        expect(history.location.search).toContain(
          `referer=${authenticatedState.user.id}`,
        );
      });
    });
  });
});

import { createMemoryHistory } from 'history';
import { fireEvent, waitForElement } from '@testing-library/react';
import React from 'react';
import { fakeVideoSetup } from 'test-support/fakeApiClientSetup';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { fetchVideo } from 'src/services/videos/fetchVideo';
import {
  renderWithBoclipsStore,
  renderWithCreatedStore,
} from '../../../test-support/renderWithStore';
import {
  EntitiesFactory,
  LinksStateValueFactory,
  MockStoreFactory,
  UserProfileFactory,
  VideoResourceFactory,
} from '../../../test-support/factories';
import VideoDetailsPage from '../../../test-support/page-objects/VideoDetailsPage';
import ApiStub from '../../../test-support/ApiStub';
import State from '../../types/State';
import { createBoclipsStore } from '../../app/redux/store';
import eventually from '../../../test-support/eventually';
import VideoDetailsView from './VideoDetailsView';

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
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.events.clear();
    client.users.clear();
    client.users.insertActiveUserId('active-referer');
    client.videos.clear();
    await fakeVideoSetup(video);
  });

  it('fetches video details from the API & renders the result', async () => {
    const videoDetailsPage = await VideoDetailsPage.load();
    expect(videoDetailsPage.getVideoDetails()).toEqual({
      title: video.title,
      description: video.description,
      additionalDescription: video.additionalDescription,
      createdBy: video.createdBy,
      duration: ' 1m 2s',
      releasedOn: 'Feb 11, 2018',
      subjects: ['Maths', 'Physics'],
      playerVideoId: video.id,
    });
  });

  it('displays video not found page when trying to reach non existing videoId', async () => {
    const {
      queryByRole,
      queryByText,
      queryByPlaceholderText,
    } = renderWithBoclipsStore(
      <VideoDetailsView videoId="invalidId" />,
      MockStoreFactory.sampleState(),
    );

    await eventually(() => {
      expect(
        queryByText('The video you tried to access is not available.'),
      ).toBeInTheDocument();
      expect(
        queryByPlaceholderText('Enter your search term'),
      ).toBeInTheDocument();
      expect(queryByRole('dialog')).toBeNull();
      expect(queryByText('Watch video')).toBeNull();
      expect(queryByText('Enter code to watch video')).toBeNull();
    });
  });

  it("when the fetched Video's id is different then the requested, load the new video", async () => {
    const activeVideo = await fetchVideo({ id: video.id });

    const view = renderWithBoclipsStore(
      <VideoDetailsView videoId="deactivated-id" />,
      MockStoreFactory.sampleState({
        entities: EntitiesFactory.sample({
          videos: {
            byId: {
              'deactivated-id': activeVideo,
              [activeVideo.id]: activeVideo,
            },
          },
        }),
      }),
    );

    expect(await view.findByText(activeVideo.title)).toBeVisible();
  });

  describe('When unauthenticated', () => {
    const unauthenticatedState: Partial<State> = {
      authentication: {
        status: 'anonymous',
      },
      user: null,
    };

    it('displays user inactive popup when referer is not active', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      const { findByText, getByRole } = createViewWrapper(
        ['/videos/123?referer=not-active'],
        unauthenticatedState,
      );

      const popup = await findByText(
        'This video needs an up to date code ' +
          'to be watched, please get in touch with your teacher.',
      );
      expect(popup).toBeInTheDocument();
      expect(getByRole('dialog')).toBeInTheDocument();
      await eventually(() => {
        expect(client.events.getEvents()).toEqual([
          {
            anonymous: true,
            subtype: 'REFERER_INACTIVE',
            type: 'PLATFORM_INTERACTED_WITH',
          },
        ]);
      });
    });

    it('displays no user inactive popup when referer is active', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      const { findByText, queryByText } = createViewWrapper(
        ['/videos/177?referer=active-referer'],
        unauthenticatedState,
      );

      const videoTitle = await findByText('Video Title To Show');
      expect(videoTitle).toBeInTheDocument();
      expect(
        queryByText(
          'This video needs an up to date code ' +
            'to be watched, please get in touch with your teacher.',
        ),
      ).not.toBeInTheDocument();
      await eventually(() => {
        expect(client.events.getEvents()).not.toContain({
          anonymous: true,
          subtype: 'REFERER_INACTIVE',
          type: 'PLATFORM_INTERACTED_WITH',
        });
      });
    });

    it('asks for a code', async () => {
      const { getByText, getByRole, findByText } = createViewWrapper(
        ['/videos/123?referer=active-referer'],
        unauthenticatedState,
      );

      const button = await findByText('Watch video');

      expect(getByRole('dialog')).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(getByText('Enter code to watch video')).toBeInTheDocument();
    });

    it('does not ask for code if it was provided previously', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.videos.addValidShareCode('active-referer', 'valid')

      const { queryByText, findByText } = createViewWrapper(
        ['/videos/177?referer=active-referer'],
        {
          authentication: {
            status: 'anonymous',
            shareCode: 'valid',
            refererId: 'active-referer',
          },
          user: null,
        },
      );

      expect(await findByText('Video Title To Show')).toBeInTheDocument();
      expect(queryByText('Enter code to watch video')).not.toBeInTheDocument();
    });

    it('sends PLATFORM_INTERACTED_WITH SHARE_CODE_MODAL_IMPRESSION events', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

      createViewWrapper(
        ['/videos/123?referer=active-referer'],
        unauthenticatedState,
      );

      await eventually(() => {
        expect(client.events.getEvents()).toEqual([
          {
            anonymous: true,
            subtype: 'SHARE_CODE_MODAL_IMPRESSION',
            type: 'PLATFORM_INTERACTED_WITH',
          },
        ]);
      });
    });

    it('sends PLATFORM_INTERACTED_WITH SHARE_CODE_MODAL_VALID events', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.shareCodes.clear();
      client.shareCodes.insertValidShareCode('active-referer', 'valid');

      const wrapper = createViewWrapper(
        ['/videos/123?referer=active-referer'],
        unauthenticatedState,
      );

      expect(await wrapper.findByText('Watch video')).toBeInTheDocument();
      client.events.clear();
      const button = wrapper.getByText('Watch video').closest('button');
      const shareField = wrapper.getByPlaceholderText('Enter code');

      await fireEvent.change(shareField, { target: { value: 'valid' } });
      await fireEvent.click(button);

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

    it('sends PLATFORM_INTERACTED_WITH SHARE_CODE_MODAL_INVALID events', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.shareCodes.clear();
      client.shareCodes.insertValidShareCode('active-referer', 'valid');

      const wrapper = createViewWrapper(
        ['/videos/123?referer=active-referer'],
        unauthenticatedState,
      );

      expect(await wrapper.findByText('Watch video')).toBeInTheDocument();
      client.events.clear();
      const button = wrapper.getByText('Watch video').closest('button');
      const shareField = wrapper.getByPlaceholderText('Enter code');

      await fireEvent.change(shareField, { target: { value: 'code-invalid' } });
      await fireEvent.click(button);

      await eventually(() => {
        expect(client.events.getEvents()).toEqual([
          {
            anonymous: true,
            subtype: 'SHARE_CODE_MODAL_INVALID',
            type: 'PLATFORM_INTERACTED_WITH',
          },
        ]);
      });
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
      user: UserProfileFactory.sample({ id: 'active-referer' }),
    };

    it('does not ask for a code', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

      const { findByText, getByText } = createViewWrapper(
        ['/videos/123?referer=active-referer'],
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

      expect(client.events.getEvents()).not.toContainEqual({
        anonymous: true,
        subtype: 'SHARE_CODE_MODAL_IMPRESSION',
        type: 'PLATFORM_INTERACTED_WITH',
      });
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

    it('does not check whether referer is active or not', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

      const { findByText, queryByText } = createViewWrapper(
        ['/videos/177'],
        authenticatedState,
      );
      const videoTitle = await findByText('Video Title To Show');
      expect(videoTitle).toBeInTheDocument();
      expect(
        queryByText(
          'This video needs an up to date code ' +
            'to be watched, please get in touch with your teacher.',
        ),
      ).not.toBeInTheDocument();

      await eventually(() => {
        expect(client.events.getEvents()).not.toContain({
          anonymous: true,
          subtype: 'REFERER_INACTIVE',
          type: 'PLATFORM_INTERACTED_WITH',
        });
      });
    });
  });
});

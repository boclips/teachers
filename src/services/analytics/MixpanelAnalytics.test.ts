import SegmentWatchedEvent from 'boclips-react-player/dist/src/SegmentWatchedEvent';
import { Mixpanel } from 'mixpanel-browser';
import { VideoFactory } from '../../../test-support/factories';
import { SearchRequest } from '../../types/SearchRequest';
import { SearchResults } from '../../types/State';
import MixpanelAnalytics from './MixpanelAnalytics';
import { UserProfile } from './UserProfile';

let mixpanelAnalytics: MixpanelAnalytics;
let mock: Mixpanel;

beforeEach(() => {
  mock = {
    init: () => jest.fn(),
    track: jest.fn(),
    people: {
      set: jest.fn(),
    },
    reset: jest.fn(),
    identify: jest.fn(),
  } as Mixpanel;

  mixpanelAnalytics = new MixpanelAnalytics(mock as Mixpanel);
});

describe('MixpanelAnalytics', () => {
  it('tracks account activation', () => {
    mixpanelAnalytics.trackAccountActivation();

    expect(mock.track).toHaveBeenCalledWith('ACTIVATION_COMPLETE');
  });

  it('tracks default collection visited', () => {
    mixpanelAnalytics.trackDefaultCollectionVisited();

    expect(mock.track).toHaveBeenCalledWith('COLLECTION_VISITED', {
      video_collection_id: 'DEFAULT',
    });
  });

  it('tracks search', () => {
    mixpanelAnalytics.trackSearch(
      {
        query: 'test',
        page: 1,
        filters: { excludeTags: ['news'] },
      } as SearchRequest,
      {
        videos: [VideoFactory.sample()],
        paging: {
          number: 1,
        },
      } as SearchResults,
    );

    expect(mock.track).toHaveBeenCalledWith('VIDEO_SEARCH', {
      video_search_number_of_results: 1,
      video_search_page_number: 1,
      video_search_query: undefined,
      video_search_type: 'INSTRUCTIONAL',
    });
  });

  it('creates a user profile', () => {
    mixpanelAnalytics.createUserProfile({} as UserProfile);

    expect(mock.people.set).toHaveBeenCalled();
  });

  it('resets mixpanel', () => {
    mixpanelAnalytics.reset();

    expect(mock.reset).toHaveBeenCalled();
  });

  it('sets a user id', () => {
    mixpanelAnalytics.setUserId('user-id');

    expect(mock.identify).toHaveBeenCalledWith('user-id');
  });

  it('tracks video added to collection', () => {
    mixpanelAnalytics.trackVideoAddedToDefaultCollection();

    expect(mock.track).toHaveBeenCalledWith('COLLECTION_VIDEO_ADDED', {
      video_collection_id: 'DEFAULT',
    });
  });

  it('tracks video removed from collection', () => {
    mixpanelAnalytics.trackVideoRemovedFromDefaultCollection();

    expect(mock.track).toHaveBeenCalledWith('COLLECTION_VIDEO_REMOVED', {
      video_collection_id: 'DEFAULT',
    });
  });

  it('tracks video link copied', () => {
    mixpanelAnalytics.trackVideoLinkCopied(VideoFactory.sample());

    expect(mock.track).toHaveBeenCalledWith('VIDEO_LINK_COPIED', {
      video_badges: 'ad-free',
      video_contentPartner: 'Bodevs Productions',
      video_description: 'my video description',
      video_duration: 'PT2M',
      video_id: '123',
      video_playback: { streamUrl: 'http://cdn.kaltura.com/stream.mdp' },
      video_releasedOn: '2018-06-20T09:12:33.000Z',
      video_subjects: 'Maths',
      video_title: 'my video title',
    });
  });

  it('tracks video removed from collection', () => {
    mixpanelAnalytics.trackVideoPlayback(
      VideoFactory.sample(),
      {} as SegmentWatchedEvent,
    );

    expect(mock.track).toHaveBeenCalledWith('VIDEO_PLAYBACK', {
      playback_segment_end_seconds: undefined,
      playback_segment_start_seconds: undefined,
      playback_video_duration_seconds: undefined,
      video_badges: 'ad-free',
      video_contentPartner: 'Bodevs Productions',
      video_description: 'my video description',
      video_duration: 'PT2M',
      video_id: '123',
      video_playback: { streamUrl: 'http://cdn.kaltura.com/stream.mdp' },
      video_releasedOn: '2018-06-20T09:12:33.000Z',
      video_subjects: 'Maths',
      video_title: 'my video title',
    });
  });
});

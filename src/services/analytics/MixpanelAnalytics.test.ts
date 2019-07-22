import { PlaybackEvent } from 'boclips-player/esm/Events/AnalyticsEvents';
import { Mixpanel } from 'mixpanel-browser';
import * as moment from 'moment';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../test-support/factories';
import { VideoSearchResults } from '../../types/State';
import { StreamPlayback } from '../../types/Video';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';
import { UserProfile } from '../users/UserProfile';
import MixpanelAnalytics from './MixpanelAnalytics';

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
    const collection = VideoCollectionFactory.sample({
      title: 'style',
      id: 'doggy',
      isPublic: true,
      isMine: true,
    });

    mixpanelAnalytics.trackCollectionVisited(collection);

    expect(mock.track).toHaveBeenCalledWith('COLLECTION_VISITED', {
      video_collection_id: 'doggy',
      video_collection_title: 'style',
      video_collection_is_owner: true,
      video_collection_is_public: true,
    });
  });

  it('tracks search', () => {
    mixpanelAnalytics.trackVideoSearch(
      {
        query: 'test',
        page: 1,
        filters: { excludeTags: ['news'] },
      } as VideoSearchRequest,
      {
        videos: [VideoFactory.sample()],
        paging: {
          number: 1,
        },
      } as VideoSearchResults,
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
    const video = VideoFactory.sample({ title: 'gangnam style' });
    const collection = VideoCollectionFactory.sample({
      title: 'style',
      id: 'doggy',
    });
    mixpanelAnalytics.trackVideoAddedToCollection(video, collection);

    expect(mock.track).toHaveBeenCalledWith('COLLECTION_VIDEO_ADDED', {
      video_collection_id: 'doggy',
      video_collection_title: 'style',
      video_title: 'gangnam style',
    });
  });

  it('tracks video removed from collection', () => {
    const video = VideoFactory.sample({ title: 'gangnam style' });
    const collection = VideoCollectionFactory.sample({
      title: 'style',
      id: 'doggy',
    });
    mixpanelAnalytics.trackVideoRemovedFromCollection(video, collection);

    expect(mock.track).toHaveBeenCalledWith('COLLECTION_VIDEO_REMOVED', {
      video_collection_id: 'doggy',
      video_collection_title: 'style',
      video_title: 'gangnam style',
    });
  });

  it('tracks video link copied', () => {
    const video = VideoFactory.sample({
      badges: ['ad-free'],
      createdBy: 'Bodevs Productions',
      description: 'my video description',
      duration: moment.duration(2, 'minutes'),
      id: '123',
      playback: new StreamPlayback('http://cdn.kaltura.com/stream.mdp'),
      releasedOn: new Date('2018-06-20T10:12:33Z'),
      subjects: ['Maths'],
      title: 'my video title',
    });

    const segment = {
      start: 0,
      end: 33,
    };

    mixpanelAnalytics.trackVideoLinkCopied(video, segment);

    expect(mock.track).toHaveBeenCalledWith('VIDEO_LINK_COPIED', {
      video_badges: 'ad-free',
      video_contentPartner: 'Bodevs Productions',
      video_description: 'my video description',
      video_duration: 'PT2M',
      video_id: '123',
      video_playback: { streamUrl: 'http://cdn.kaltura.com/stream.mdp' },
      video_releasedOn: '2018-06-20T10:12:33.000Z',
      video_subjects: 'Maths',
      video_title: 'my video title',
      share_segment_start: 0,
      share_segment_end: 33,
    });
  });

  it('tracks playback of videos', () => {
    const video = VideoFactory.sample({
      badges: ['ad-free'],
      createdBy: 'Bodevs Productions',
      description: 'my video description',
      duration: moment.duration(2, 'minutes'),
      id: '123',
      playback: new StreamPlayback('http://cdn.kaltura.com/stream.mdp'),
      releasedOn: new Date('2018-06-20T10:12:33Z'),
      subjects: ['Maths'],
      title: 'my video title',
    });

    mixpanelAnalytics.trackVideoPlayback(video, {} as PlaybackEvent);

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
      video_releasedOn: '2018-06-20T10:12:33.000Z',
      video_subjects: 'Maths',
      video_title: 'my video title',
    });
  });

  it('track failed account creation', () => {
    const data = { some: 'data' };
    mixpanelAnalytics.trackFailedAccountCreation(data);

    expect(mock.track).toHaveBeenCalledWith(
      'REGISTRATION_ATTEMPT_FAILED',
      data,
    );
  });

  it('track when account already exists', () => {
    const data = { some: 'data' };
    mixpanelAnalytics.trackAccountAlreadyExists(data);

    expect(mock.track).toHaveBeenCalledWith(
      'REGISTRATION_ACCOUNT_EXISTS',
      data,
    );
  });

  it('track when refer a friend modal opened', () => {
    mixpanelAnalytics.trackReferAFriendModalOpened();

    expect(mock.track).toHaveBeenCalledWith('REFER_A_FRIEND_MODAL_OPENED');
  });

  it('track when refer a friend modal closed', () => {
    mixpanelAnalytics.trackReferAFriendModalClosed();

    expect(mock.track).toHaveBeenCalledWith('REFER_A_FRIEND_MODAL_CLOSED');
  });

  it('track user explores more collections on homepage', () => {
    mixpanelAnalytics.trackHomepageExploreCollections();

    expect(mock.track).toHaveBeenCalledWith('HOMEPAGE_EXPLORE_COLLECTIONS');
  });

  it('track when user applies search filters', () => {
    const data = { some: 'data' };
    mixpanelAnalytics.trackSearchFiltersApplied(data);

    expect(mock.track).toHaveBeenCalledWith('SEARCH_FILTERS_APPLIED', data);
  });

  it('tracks subject tags clicked', () => {
    mixpanelAnalytics.trackSubjectTagClicked('1234');

    expect(mock.track).toHaveBeenCalledWith('SUBJECT_TAG_CLICKED', {
      subject_id: '1234',
    });
  });

  it('tracks my collections icon clicked', () => {
    mixpanelAnalytics.trackMyCollectionsNavbarButtonClicked();

    expect(mock.track).toHaveBeenCalledWith(
      'MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED',
    );
  });

  it('tracks collections icon clicked', () => {
    mixpanelAnalytics.trackCollectionsNavbarButtonClicked();

    expect(mock.track).toHaveBeenCalledWith(
      'COLLECTIONS_NAVBAR_BUTTON_CLICKED',
    );
  });
});

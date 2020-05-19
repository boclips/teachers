import { SubjectFactory } from 'boclips-api-client/dist/test-support';
import * as moment from 'moment';
import { Link } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import {
  AttachmentFactory,
  UserProfileFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../test-support/factories';
import { Constants } from '../../app/AppConstants';
import { VideoSearchResult } from '../../types/SearchResults';
import AnalyticsService from './AnalyticsService';

let analyticsService: AnalyticsService;

describe('AnalyticsService', () => {
  let mockAppcues: Appcues;

  beforeEach(() => {
    mockAppcues = {
      track: jest.fn(),
      page: jest.fn(),
      identify: jest.fn(),
    };
    analyticsService = new AnalyticsService(mockAppcues);
  });

  describe('Appcues', () => {
    it('sets a user id', () => {
      const userProfile = UserProfileFactory.sample({
        id: 'testId',
        firstName: 'test first name',
        email: 'test@test.com',
      });
      analyticsService.identify(userProfile);
      expect(mockAppcues.identify).toHaveBeenCalledWith('testId', {
        name: 'test first name',
        email: 'test@test.com',
        planType: Constants.APPCUES_PLAN_TYPE,
      });
    });

    it('tracks account activation', () => {
      analyticsService.trackOnboardingCompleted();

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'ACTIVATION_COMPLETE',
        undefined,
      );
    });

    it('tracks default collection visited', () => {
      const collection = VideoCollectionFactory.sample({
        title: 'style',
        id: 'cat',
        isMine: true,
      });

      analyticsService.trackCollectionVisited(collection);

      const expectedPayload = {
        video_collection_id: 'cat',
        video_collection_title: 'style',
        video_collection_is_owner: true,
        video_collection_is_discoverable: false,
      };

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'COLLECTION_VISITED',
        expectedPayload,
      );
    });

    it('tracks search', () => {
      analyticsService.trackVideoSearch({
        videos: [VideoFactory.sample()],
        paging: {
          number: 1,
        },
      } as VideoSearchResult);

      const expectedPayload = {
        video_search_number_of_results: 1,
        video_search_page_number: 1,
        video_search_query: undefined,
        video_search_type: 'INSTRUCTIONAL',
      };

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'VIDEO_SEARCH',
        expectedPayload,
      );
    });

    it('tracks video added to collection', () => {
      const video = VideoFactory.sample({ title: 'gangnam style' });
      const collection = VideoCollectionFactory.sample({
        title: 'style',
        id: 'cat',
      });
      analyticsService.trackVideoAddedToCollection(video, collection);

      const expectedPayload = {
        video_collection_id: 'cat',
        video_collection_title: 'style',
        video_title: 'gangnam style',
      };

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'COLLECTION_VIDEO_ADDED',
        expectedPayload,
      );
    });

    it('tracks video removed from collection', () => {
      const video = VideoFactory.sample({ title: 'gangnam style' });
      const collection = VideoCollectionFactory.sample({
        title: 'style',
        id: 'cat',
      });
      analyticsService.trackVideoRemovedFromCollection(video, collection);

      const expectedPayload = {
        video_collection_id: 'cat',
        video_collection_title: 'style',
        video_title: 'gangnam style',
      };

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'COLLECTION_VIDEO_REMOVED',
        expectedPayload,
      );
    });

    it('tracks video link copied', () => {
      const video = VideoFactory.sample({
        badges: ['ad-free'],
        createdBy: 'Bodevs Productions',
        description: 'my video description',
        duration: moment.duration(2, 'minutes'),
        playback: PlaybackFactory.sample({ id: 'playbackid' }),
        id: '123',
        releasedOn: new Date('2018-06-20T10:12:33Z'),
        subjects: [
          SubjectFactory.sample({
            id: 'maths-subject-id',
            name: 'Maths',
          }),
        ],
        title: 'my video title',
      });

      video.playback.links = {
        ...video.playback.links,
        hlsStream: new Link({ href: 'http://cdn.kaltura.com/stream.mdp' }),
      };

      const segment = {
        start: 0,
        end: 33,
      };

      analyticsService.trackVideoLinkCopied(video, segment);

      const expectedPayload = {
        video_badges: 'ad-free',
        video_contentPartner: 'Bodevs Productions',
        video_description: 'my video description',
        video_duration: 'PT2M',
        video_id: '123',
        video_playback: {
          id: 'playbackid',
          streamUrl: 'http://cdn.kaltura.com/stream.mdp',
        },
        video_releasedOn: '2018-06-20T10:12:33.000Z',
        video_subjects: [
          {
            id: 'maths-subject-id',
            name: 'Maths',
            links: {},
          },
        ],
        video_title: 'my video title',
        share_segment_start: 0,
        share_segment_end: 33,
      };

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'VIDEO_LINK_COPIED',
        expectedPayload,
      );
    });

    it('tracks playback of videos', () => {
      const video = VideoFactory.sample({
        badges: ['ad-free'],
        createdBy: 'Bodevs Productions',
        description: 'my video description',
        duration: moment.duration(2, 'minutes'),
        playback: PlaybackFactory.sample({ id: 'playbackid' }),
        id: '123',
        releasedOn: new Date('2018-06-20T10:12:33Z'),
        subjects: [
          SubjectFactory.sample({ id: 'maths-subject-id', name: 'Maths' }),
        ],
        title: 'my video title',
      });

      video.playback.links = {
        ...video.playback.links,
        hlsStream: new Link({ href: 'http://cdn.kaltura.com/stream.mdp' }),
      };

      analyticsService.trackVideoPlayback(video, 50, 60);

      const expectedPayload = {
        playback_segment_end_seconds: 60,
        playback_segment_start_seconds: 50,
        playback_video_duration_seconds: 120,
        video_badges: 'ad-free',
        video_contentPartner: 'Bodevs Productions',
        video_description: 'my video description',
        video_duration: 'PT2M',
        video_id: '123',
        video_playback: {
          id: 'playbackid',
          streamUrl: 'http://cdn.kaltura.com/stream.mdp',
        },
        video_releasedOn: '2018-06-20T10:12:33.000Z',
        video_subjects: [
          {
            id: 'maths-subject-id',
            name: 'Maths',
            links: {},
          },
        ],
        video_title: 'my video title',
      };

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'VIDEO_PLAYBACK',
        expectedPayload,
      );
    });

    it('track when user applies search filters', () => {
      const data = { some: 'data' };
      analyticsService.trackSearchFiltersApplied(data);

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'SEARCH_FILTERS_APPLIED',
        data,
      );
    });

    it('tracks my collections icon clicked', () => {
      analyticsService.trackMyCollectionsNavbarButtonClicked();

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED',
        undefined,
      );
    });

    it('tracks collections icon clicked', () => {
      analyticsService.trackCollectionsNavbarButtonClicked();

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'COLLECTIONS_NAVBAR_BUTTON_CLICKED',
        undefined,
      );
    });

    it('tracks collection attachment link visited', () => {
      const collectionId = 'collection-id';
      const attachment = AttachmentFactory.sample({
        id: 'attachment-id',
        type: 'ATTACHMENT_TYPE' as any,
      });

      analyticsService.trackCollectionAttachmentLinkVisited(
        collectionId,
        attachment,
      );

      const expectedPayload = {
        video_collection_id: 'collection-id',
        attachment_id: 'attachment-id',
        attachment_type: 'ATTACHMENT_TYPE',
      };

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'COLLECTION_ATTACHMENT_VISITED',
        expectedPayload,
      );
    });

    it('tracks onboarding being started', () => {
      analyticsService.trackOnboardingStarted();

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'ONBOARDING_STARTED',
        undefined,
      );
    });

    it('tracks onboarding being finished', () => {
      analyticsService.trackOnboardingCompleted();

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'ONBOARDING_COMPLETED',
        undefined,
      );
      expect(mockAppcues.track).toHaveBeenCalledWith(
        'ACTIVATION_COMPLETE',
        undefined,
      );
    });

    it('tracks onboarding page changing', () => {
      const pageIndex = 3;
      analyticsService.trackOnboardingPageChanged(pageIndex);

      expect(mockAppcues.track).toHaveBeenCalledWith(
        'ONBOARDING_PAGE_CHANGED',
        {
          page_index: pageIndex,
        },
      );
    });

    it('triggers Appcues page change', () => {
      analyticsService.pageChange();

      expect(mockAppcues.page).toHaveBeenCalled();
    });
  });
});

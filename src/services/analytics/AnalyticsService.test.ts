import { Mixpanel } from 'mixpanel-browser';
import * as moment from 'moment';
import {
  AttachmentFactory,
  UserProfileFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../test-support/factories';
import { Constants } from '../../app/AppConstants';
import { VideoSearchResults } from '../../types/State';
import { StreamPlayback } from '../../types/Video';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';
import { UpdateUserRequest } from '../users/updateUser';
import AnalyticsService from './AnalyticsService';

let analyticsService: AnalyticsService;
let mockMixpanel: Mixpanel;

describe('AnalyticsService', () => {
  beforeEach(() => {
    mockMixpanel = {
      init: () => jest.fn(),
      track: jest.fn(),
      people: {
        set: jest.fn(),
      },
      reset: jest.fn(),
      identify: jest.fn(),
    } as Mixpanel;
  });

  describe('cannot instantiate analytics without mixpanel and appcues instances', () => {
    it('will fail without a mixpanel instance', () => {
      expect(() => {
        const appcues = {
          track: jest.fn(),
          page: jest.fn(),
          identify: jest.fn(),
        };
        // tslint:disable-next-line:no-unused-expression
        new AnalyticsService(undefined, appcues);
      }).toThrow();
    });

    it('will not fail without a appcues instance', () => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new AnalyticsService(mockMixpanel, undefined);
      }).not.toThrow();
    });
  });

  describe.each([[true], [false]])(
    'AnalyticsService with Appcues initialised = %s',
    appcuesInitialised => {
      let mockAppcues: Appcues;

      beforeEach(() => {
        if (appcuesInitialised) {
          mockAppcues = {
            track: jest.fn(),
            page: jest.fn(),
            identify: jest.fn(),
          };
        }

        analyticsService = new AnalyticsService(mockMixpanel, mockAppcues);
      });

      describe('MixpanelAnalytics', () => {
        it('creates a user profile', () => {
          analyticsService.createUserProfile(
            {} as UpdateUserRequest,
            'test@test.com',
          );

          expect(mockMixpanel.people.set).toHaveBeenCalled();
        });

        it('resets mixpanel', () => {
          analyticsService.reset();

          expect(mockMixpanel.reset).toHaveBeenCalled();
        });

        it('sets a user id', () => {
          const userProfile = UserProfileFactory.sample({
            id: 'testId',
            analyticsId: 'my-user-id',
            firstName: 'test first name',
            email: 'test@test.com',
          });
          analyticsService.identify(userProfile);
          if (appcuesInitialised) {
            expect(mockAppcues.identify).toHaveBeenCalledWith('testId', {
              name: 'test first name',
              email: 'test@test.com',
              planType: Constants.ENVIRONMENT,
            });
          }

          expect(mockMixpanel.identify).toHaveBeenCalledWith('my-user-id');
        });

        it('tracks account activation', () => {
          analyticsService.trackOnboardingCompleted();

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'ACTIVATION_COMPLETE',
          );
          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'ACTIVATION_COMPLETE',
              undefined,
            );
          }
        });

        it('tracks default collection visited', () => {
          const collection = VideoCollectionFactory.sample({
            title: 'style',
            id: 'cat',
            isPublic: true,
            isMine: true,
          });

          analyticsService.trackCollectionVisited(collection);

          const expectedPayload = {
            video_collection_id: 'cat',
            video_collection_title: 'style',
            video_collection_is_owner: true,
            video_collection_is_public: true,
          };

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'COLLECTION_VISITED',
            expectedPayload,
          );
          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'COLLECTION_VISITED',
              expectedPayload,
            );
          }
        });

        it('tracks search', () => {
          analyticsService.trackVideoSearch(
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

          const expectedPayload = {
            video_search_number_of_results: 1,
            video_search_page_number: 1,
            video_search_query: undefined,
            video_search_type: 'INSTRUCTIONAL',
          };

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'VIDEO_SEARCH',
            expectedPayload,
          );
          if (appcuesInitialised) {
            if (appcuesInitialised) {
              expect(mockAppcues.track).toHaveBeenCalledWith(
                'VIDEO_SEARCH',
                expectedPayload,
              );
            }
          }
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

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'COLLECTION_VIDEO_ADDED',
            expectedPayload,
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'COLLECTION_VIDEO_ADDED',
              expectedPayload,
            );
          }
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

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'COLLECTION_VIDEO_REMOVED',
            expectedPayload,
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'COLLECTION_VIDEO_REMOVED',
              expectedPayload,
            );
          }
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
            subjects: [{ id: 'maths-subject-id', name: 'Maths' }],
            title: 'my video title',
          });

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
            video_playback: { streamUrl: 'http://cdn.kaltura.com/stream.mdp' },
            video_releasedOn: '2018-06-20T10:12:33.000Z',
            video_subjects: [{ id: 'maths-subject-id', name: 'Maths' }],
            video_title: 'my video title',
            share_segment_start: 0,
            share_segment_end: 33,
          };

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'VIDEO_LINK_COPIED',
            expectedPayload,
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'VIDEO_LINK_COPIED',
              expectedPayload,
            );
          }
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
            subjects: [{ id: 'maths-subject-id', name: 'Maths' }],
            title: 'my video title',
          });

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
            video_playback: { streamUrl: 'http://cdn.kaltura.com/stream.mdp' },
            video_releasedOn: '2018-06-20T10:12:33.000Z',
            video_subjects: [{ id: 'maths-subject-id', name: 'Maths' }],
            video_title: 'my video title',
          };

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'VIDEO_PLAYBACK',
            expectedPayload,
          );
          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'VIDEO_PLAYBACK',
              expectedPayload,
            );
          }
        });

        it('track failed account creation', () => {
          const data = { some: 'data' };
          analyticsService.trackFailedAccountCreation(data);

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'REGISTRATION_ATTEMPT_FAILED',
            data,
          );
        });

        it('track when account already exists', () => {
          const data = { some: 'data' };
          analyticsService.trackAccountAlreadyExists(data);

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'REGISTRATION_ACCOUNT_EXISTS',
            data,
          );
        });

        it('track when refer a friend modal opened', () => {
          analyticsService.trackReferAFriendModalOpened();

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'REFER_A_FRIEND_MODAL_OPENED',
          );
        });

        it('track when refer a friend modal closed', () => {
          analyticsService.trackReferAFriendModalClosed();

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'REFER_A_FRIEND_MODAL_CLOSED',
          );
        });

        it('track user explores more collections on homepage', () => {
          analyticsService.trackHomepageExploreCollections();

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'HOMEPAGE_EXPLORE_COLLECTIONS',
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'HOMEPAGE_EXPLORE_COLLECTIONS',
              undefined,
            );
          }
        });

        it('track when user applies search filters', () => {
          const data = { some: 'data' };
          analyticsService.trackSearchFiltersApplied(data);

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'SEARCH_FILTERS_APPLIED',
            data,
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'SEARCH_FILTERS_APPLIED',
              data,
            );
          }
        });

        it('tracks subject tags clicked', () => {
          analyticsService.trackSubjectTagClicked('1234');

          const expectedPayload = {
            subject_id: '1234',
          };

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'SUBJECT_TAG_CLICKED',
            expectedPayload,
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'SUBJECT_TAG_CLICKED',
              expectedPayload,
            );
          }
        });

        it('tracks my collections icon clicked', () => {
          analyticsService.trackMyCollectionsNavbarButtonClicked();

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED',
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED',
              undefined,
            );
          }
        });

        it('tracks collections icon clicked', () => {
          analyticsService.trackCollectionsNavbarButtonClicked();

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'COLLECTIONS_NAVBAR_BUTTON_CLICKED',
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'COLLECTIONS_NAVBAR_BUTTON_CLICKED',
              undefined,
            );
          }
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

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'COLLECTION_ATTACHMENT_VISITED',
            expectedPayload,
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'COLLECTION_ATTACHMENT_VISITED',
              expectedPayload,
            );
          }
        });

        it('tracks onboarding being started', () => {
          analyticsService.trackOnboardingStarted();

          expect(mockMixpanel.track).toHaveBeenCalledWith('ONBOARDING_STARTED');
          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'ONBOARDING_STARTED',
              undefined,
            );
          }
        });

        it('tracks onboarding being finished', () => {
          analyticsService.trackOnboardingCompleted();

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'ONBOARDING_COMPLETED',
          );
          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'ACTIVATION_COMPLETE',
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'ONBOARDING_COMPLETED',
              undefined,
            );
          }
          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'ACTIVATION_COMPLETE',
              undefined,
            );
          }
        });

        it('tracks onboarding page changing', () => {
          const pageIndex = 3;
          analyticsService.trackOnboardingPageChanged(pageIndex);

          expect(mockMixpanel.track).toHaveBeenCalledWith(
            'ONBOARDING_PAGE_CHANGED',
            {
              page_index: pageIndex,
            },
          );

          if (appcuesInitialised) {
            expect(mockAppcues.track).toHaveBeenCalledWith(
              'ONBOARDING_PAGE_CHANGED',
              {
                page_index: pageIndex,
              },
            );
          }
        });

        it('triggers Appcues page change', () => {
          analyticsService.pageChange();

          if (appcuesInitialised) {
            expect(mockAppcues.page).toHaveBeenCalled();
          }
        });
      });
    },
  );
});

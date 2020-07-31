import { BoclipsAnalytics } from 'src/services/analytics/boclips/BoclipsAnalytics';
import AnalyticsService from '../src/services/analytics/AnalyticsService';

export const analyticsMock = ({
  trackOnboardingCompleted: jest.fn(),
  trackOnboardingStarted: jest.fn(),
  trackOnboardingPageChanged: jest.fn(),
  trackSearch: jest.fn(),
  setUserId: jest.fn(),
  createUserProfile: jest.fn(),
  trackVideoAddedToDefaultCollection: jest.fn(),
  trackVideoRemovedFromDefaultCollection: jest.fn(),
  trackVideoRatingModalOpened: jest.fn(),
  trackDefaultCollectionVisited: jest.fn(),
  trackVideoVisited: jest.fn(),
  trackCollectionAttachmentLinkVisited: jest.fn(),
  trackAccountRegistration: jest.fn(),
} as any) as AnalyticsService;

export const internalAnalyticsMock = ({
  trackVideoSharedInGoogle: jest.fn(),
  trackVideoLinkCopied: jest.fn(),
  trackVideoLinkClicked: jest.fn(),
  trackRateThisVideoLinkClicked: jest.fn(),
  trackVideoTranscriptDownloaded: jest.fn(),
  trackPageRendered: jest.fn(),
  trackCollectionInteractedWith: jest.fn(),
  trackUserExpired: jest.fn(),
  trackAccountRegistration: jest.fn(),
  trackSearchQueryCompletionsSuggested: jest.fn(),
} as any) as BoclipsAnalytics;

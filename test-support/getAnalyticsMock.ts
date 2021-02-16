import { BoclipsAnalytics } from 'src/services/analytics/boclips/BoclipsAnalytics';

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

import MixpanelAnalytics from '../src/services/analytics/MixpanelAnalytics';

export const analyticsMock = ({
  trackOnboardingCompleted: jest.fn(),
  trackOnboardingStarted: jest.fn(),
  trackOnboardingPageChanged: jest.fn(),
  trackSearch: jest.fn(),
  setUserId: jest.fn(),
  createUserProfile: jest.fn(),
  trackVideoAddedToDefaultCollection: jest.fn(),
  trackVideoRemovedFromDefaultCollection: jest.fn(),
  trackDefaultCollectionVisited: jest.fn(),
  trackVideoVisited: jest.fn(),
  trackCollectionAttachmentLinkVisited: jest.fn(),
  trackAccountRegistration: jest.fn(),
} as any) as MixpanelAnalytics;

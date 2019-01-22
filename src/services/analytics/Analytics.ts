import { SearchRequest } from '../../types/SearchRequest';
import { SearchResults } from '../../types/State';
import { UserProfile } from './MixpanelAnalytics';

export default interface Analytics {
  setUserId(userId: string): void;
  createUserProfile(userProfile: UserProfile): void;
  trackAccountActivation(): void;
  trackSearch(searchRequest: SearchRequest, searchResults: SearchResults): void;
  trackVideoAddedToDefaultCollection(): void;
  trackVideoRemovedFromDefaultCollection(): void;
  trackDefaultCollectionVisited(): void;
}

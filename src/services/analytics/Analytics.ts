import { UserProfile } from './MixpanelAnalytics';
import {SearchRequest} from "../../types/SearchRequest";
import {SearchResults} from "../../types/State";

export default interface Analytics {
  setUserId(userId: string): void;
  createUserProfile(userProfile: UserProfile): void;

  publish(event: EventTypes): void;
  trackSearch(searchRequest: SearchRequest, searchResults: SearchResults): void;
}

export enum EventTypes {
  ACTIVATION_COMPLETE = 'ACTIVATION_COMPLETE',
  VIDEO_SEARCH = 'VIDEO_SEARCH',
}

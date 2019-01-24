import SegmentWatchedEvent from 'boclips-react-player/dist/src/SegmentWatchedEvent';
import { SearchRequest } from '../../types/SearchRequest';
import { SearchResults } from '../../types/State';
import { Video } from '../../types/Video';
import { UserProfile } from './UserProfile';

export default interface Analytics {
  setUserId(userId: string): void;
  createUserProfile(userProfile: UserProfile): void;
  trackAccountActivation(): void;
  trackSearch(searchRequest: SearchRequest, searchResults: SearchResults): void;
  trackVideoAddedToDefaultCollection(): void;
  trackVideoRemovedFromDefaultCollection(): void;
  trackDefaultCollectionVisited(): void;
  trackVideoVisited(video: Video): void;
  trackVideoLinkCopied(video: Video): void;
  trackVideoPlayback(video: Video, segmentWatched: SegmentWatchedEvent): void;
  reset(): void;
  getCurrentUserId(): string;
}

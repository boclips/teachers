import { CollectionInteractionType } from 'boclips-api-client/dist/sub-clients/events/model/CollectionInteractedWithRequest';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import HttpBoclipsAnalytics from './HttpBoclipsAnalytics';

export interface BoclipsAnalytics {
  trackVideoSharedInGoogle(video: Video): Promise<void>;

  trackVideoLinkCopied(video: Video): Promise<void>;

  trackVideoLinkClicked(video: Video): Promise<void>;

  trackPageRendered(url: string): Promise<void>;

  trackCollectionInteractedWith(
    collection: VideoCollection,
    subtype: keyof typeof CollectionInteractionType,
  ): Promise<void>;

  trackUserExpired(): Promise<void>;
}

export default new HttpBoclipsAnalytics();

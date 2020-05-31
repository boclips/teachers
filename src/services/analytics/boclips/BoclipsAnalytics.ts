import { CollectionInteractionType } from 'boclips-api-client/dist/sub-clients/events/model/CollectionInteractedWithRequest';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import HttpBoclipsAnalytics from './HttpBoclipsAnalytics';

export interface BoclipsAnalytics {
  trackVideoSharedInGoogle(video: Video): Promise<void>;

  trackVideoLinkCopied(video: Video): Promise<void>;

  trackVideoLinkClicked(video: Video): Promise<void>;

  trackRateThisVideoLinkClicked(video: Video): Promise<void>;

  trackVideoTranscriptDownloaded(video: Video): Promise<void>;

  trackVideoActivityClicked(video: Video): Promise<void>;

  trackPageRendered(url: string): Promise<void>;

  trackCollectionInteractedWith(
    collection: VideoCollection,
    subtype: keyof typeof CollectionInteractionType,
  ): Promise<void>;

  trackUserExpired(): Promise<void>;

  trackPlatformInteraction(
    subtype: PlatformInteractionType,
    anonymous?: boolean,
  ): Promise<void>;
}

export default new HttpBoclipsAnalytics();

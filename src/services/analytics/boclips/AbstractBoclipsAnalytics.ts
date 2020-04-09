import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { BoclipsAnalytics } from './BoclipsAnalytics';

export default abstract class AbstractBoclipsAnalytics
  implements BoclipsAnalytics {
  public trackVideoSharedInGoogle(video: Video): Promise<void> {
    return this.logInteraction(video, 'VIDEO_SHARED_TO_GOOGLE_CLASSROOM');
  }

  public trackVideoLinkCopied(video: Video): Promise<void> {
    return this.logInteraction(video, 'VIDEO_LINK_COPIED');
  }

  public trackVideoLinkClicked(video: Video): Promise<void> {
    return this.logInteraction(video, 'NAVIGATE_TO_VIDEO_DETAILS');
  }

  public trackRateThisVideoLinkClicked(video: Video): Promise<void> {
    return this.logInteraction(video, 'RATE_LINK_CLICKED');
  }

  public trackVideoActivityClicked(video: Video): Promise<void> {
    return this.logInteraction(video, 'VIDEO_ACTIVITY_CLICKED');
  }

  public trackVideoTranscriptDownloaded(video: Video): Promise<void> {
    return this.logInteraction(video, 'TRANSCRIPT_DOWNLOADED');
  }

  public abstract trackPageRendered(url: string): Promise<void>;

  abstract trackCollectionInteractedWith(
    collection: VideoCollection,
    subtype: string,
  ): Promise<void>;

  public abstract trackUserExpired(): Promise<void>;

  public abstract logInteraction(
    video: Video,
    interactionType: string,
  ): Promise<void>;
}

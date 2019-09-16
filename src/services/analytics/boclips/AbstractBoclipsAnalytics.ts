import { Video } from '../../../types/Video';
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

  public abstract logInteraction(
    video: Video,
    interactionType: string,
  ): Promise<void>;
}
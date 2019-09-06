import { Video } from '../../../types/Video';
import { BoclipsAnalytics } from './BoclipsAnalytics';

export default abstract class AbstractBoclipsAnalytics
  implements BoclipsAnalytics {
  public trackVideoSharedInGoogle(video: Video): Promise<void> {
    return this.logInteraction(video, 'VIDEO_SHARED_TO_GOOGLE_CLASSROOM');
  }

  public abstract logInteraction(
    video: Video,
    interactionType: string,
  ): Promise<void>;
}

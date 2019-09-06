import { Video } from '../../../types/Video';
import AbstractBoclipsAnalytics from './AbstractBoclipsAnalytics';

interface VideoInteractionEvent {
  video: Video;
  interactionType: string;
}

class FakeBoclipsAnalytics extends AbstractBoclipsAnalytics {
  public videoInteractedWithEvents: VideoInteractionEvent[] = [];

  public reset() {
    this.videoInteractedWithEvents.length = 0;
  }

  public logInteraction(video: Video, interactionType: string): Promise<void> {
    this.videoInteractedWithEvents.push({ video, interactionType });
    return Promise.resolve();
  }
}

export default new FakeBoclipsAnalytics();

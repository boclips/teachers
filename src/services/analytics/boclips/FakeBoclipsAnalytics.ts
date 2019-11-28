import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { Video } from '../../../types/Video';
import { getBoclipsClient } from '../../apiClient';
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

  public async trackPageRendered(url: string): Promise<void> {
    const client = (await getBoclipsClient()) as FakeBoclipsClient;

    return client.eventsClient.trackPageRendered({ url });
  }

  public async trackUserExpired(): Promise<void> {
    const client = (await getBoclipsClient()) as FakeBoclipsClient;

    return client.eventsClient.trackUserExpired();
  }
}

export default new FakeBoclipsAnalytics();

import { CollectionInteractionType } from 'boclips-api-client/dist/sub-clients/events/model/CollectionInteractedWithRequest';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { convertToApiClientLink } from '../../../types/Link';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
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

  public async trackCollectionInteractedWith(
    collection: VideoCollection,
    subtype: keyof typeof CollectionInteractionType,
  ) {
    const client = (await getBoclipsClient()) as FakeBoclipsClient;

    return client.eventsClient.trackCollectionInteraction(
      {
        id: collection.id,
        links: {
          self: convertToApiClientLink(collection.links.self),
          interactedWith: convertToApiClientLink(
            collection.links.interactedWith,
          ),
        },
      },
      { subtype: CollectionInteractionType[subtype] },
    );
  }

  public async trackUserExpired(): Promise<void> {
    const client = (await getBoclipsClient()) as FakeBoclipsClient;

    return client.eventsClient.trackUserExpired();
  }

  public async trackPlatformInteraction(
    subtype: PlatformInteractionType,
  ): Promise<void> {
    const client = (await getBoclipsClient()) as FakeBoclipsClient;

    return client.eventsClient.trackPlatformInteraction(subtype);
  }
}

export default new FakeBoclipsAnalytics();

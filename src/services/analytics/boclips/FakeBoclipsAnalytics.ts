import { CollectionInteractionType } from 'boclips-api-client/dist/sub-clients/events/model/CollectionInteractedWithRequest';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { ApiClientWrapper } from 'src/services/apiClient';
import { SearchQueryCompletionsSuggestedRequest } from 'boclips-api-client/dist/sub-clients/events/model/SearchQueryCompletionsSuggestedRequest';
import { convertToApiClientLink } from '../../../types/Link';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
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

  public trackVideoInteraction(
    video: Video,
    interactionType: string,
  ): Promise<void> {
    this.videoInteractedWithEvents.push({ video, interactionType });
    return Promise.resolve();
  }

  public trackPageRendered = async (url: string): Promise<void> => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    return client.events.trackPageRendered({ url });
  };

  public trackCollectionInteractedWith = async (
    collection: VideoCollection,
    subtype: keyof typeof CollectionInteractionType,
  ) => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    return client.events.trackCollectionInteraction(
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
      'www.test.com',
    );
  };

  public trackUserExpired = async (): Promise<void> => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

    return client.events.trackUserExpired();
  };

  public trackPlatformInteraction = async (
    subtype: PlatformInteractionType,
    anonymous: boolean = false,
  ): Promise<void> => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    return client.events.trackPlatformInteraction(subtype, anonymous);
  };

  public trackSearchSuggestionImpression = async (
    request: SearchQueryCompletionsSuggestedRequest,
  ): Promise<void> => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    return client.events.trackSearchQueryCompletionsSuggested(request);
  };
}

export default new FakeBoclipsAnalytics();

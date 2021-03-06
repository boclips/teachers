import axios from 'axios';
import { CollectionInteractionType } from 'boclips-api-client/dist/sub-clients/events/model/CollectionInteractedWithRequest';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { ApiClientWrapper } from 'src/services/apiClient';
import { SearchQueryCompletionsSuggestedRequest } from 'boclips-api-client/dist/sub-clients/events/model/SearchQueryCompletionsSuggestedRequest';
import { convertToApiClientLink } from '../../../types/Link';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import AbstractBoclipsAnalytics from './AbstractBoclipsAnalytics';

export default class HttpBoclipsAnalytics extends AbstractBoclipsAnalytics {
  public trackVideoInteraction = (
    video: Video,
    interactionType: string,
  ): Promise<void> => {
    const link = video.links.logInteraction;

    if (!link) {
      return Promise.reject(
        new Error(`Video ${video.id} has no logInteraction link`),
      );
    }

    return axios.post(
      link.getTemplatedLink({
        type: interactionType,
      }),
      {},
      {
        headers: { 'Boclips-Referer': window.location.href },
      },
    );
  };

  public trackPageRendered = async (url: string): Promise<void> => {
    const client = await ApiClientWrapper.get();

    return client.events.trackPageRendered({ url });
  };

  public trackCollectionInteractedWith = async (
    collection: VideoCollection,
    subtype: keyof typeof CollectionInteractionType,
  ): Promise<void> => {
    const client = await ApiClientWrapper.get();

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
      window.location.href,
    );
  };

  public trackUserExpired = async (): Promise<void> => {
    const client = await ApiClientWrapper.get();

    return client.events.trackUserExpired();
  };

  public trackPlatformInteraction = async (
    subtype: PlatformInteractionType,
    anonymous: boolean = false,
  ): Promise<void> => {
    const client = await ApiClientWrapper.get();

    return client.events.trackPlatformInteraction(subtype, anonymous);
  };

  public trackSearchSuggestionImpression = async (
    request: SearchQueryCompletionsSuggestedRequest,
  ): Promise<void> => {
    const client = await ApiClientWrapper.get();

    return client.events.trackSearchQueryCompletionsSuggested(request);
  };
}

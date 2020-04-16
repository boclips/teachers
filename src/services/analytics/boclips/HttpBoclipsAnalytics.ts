import axios from 'axios';
import { CollectionInteractionType } from 'boclips-api-client/dist/sub-clients/events/model/CollectionInteractedWithRequest';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { convertToApiClientLink } from '../../../types/Link';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { getBoclipsClient } from '../../apiClient';
import AbstractBoclipsAnalytics from './AbstractBoclipsAnalytics';

export default class HttpBoclipsAnalytics extends AbstractBoclipsAnalytics {
  public logInteraction(video: Video, interactionType: string): Promise<void> {
    const link = video.links.logInteraction;

    if (!link) {
      return Promise.reject(`Video ${video.id} has no logInteraction link`);
    }

    return axios.post(
      link.getTemplatedLink({
        type: interactionType,
      }),
    );
  }

  public async trackPageRendered(url: string): Promise<void> {
    const client = await getBoclipsClient();

    return client.events.trackPageRendered({ url });
  }

  public async trackCollectionInteractedWith(
    collection: VideoCollection,
    subtype: keyof typeof CollectionInteractionType,
  ): Promise<void> {
    const client = await getBoclipsClient();

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
    );
  }

  public async trackUserExpired(): Promise<void> {
    const client = await getBoclipsClient();

    return client.events.trackUserExpired();
  }

  public async trackPlatformInteraction(
    subtype: PlatformInteractionType,
  ): Promise<void> {
    const client = await getBoclipsClient();

    return client.events.trackPlatformInteraction(subtype);
  }
}

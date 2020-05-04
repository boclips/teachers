import { Video as ClientVideo } from 'boclips-api-client/dist/sub-clients/videos/model/Video';
import { convertFromApiClientLink } from 'src/types/Link';
import { Video } from 'src/types/Video';
import { AgeRange } from 'src/types/AgeRange';
import { getEffectiveThumbnailUrl } from 'src/services/videos/convertVideoResource';

export function convertApiClientVideo(clientVideo: ClientVideo): Video {
  const { ageRange, bestFor, links } = clientVideo;
  console.log(links)

  const convertedProperties: Partial<Video> = {
    thumbnailUrl: clientVideo.playback?.links?.thumbnail
      ? getEffectiveThumbnailUrl(
          convertFromApiClientLink(clientVideo.playback.links.thumbnail),
        )
      : undefined,
    ageRange: ageRange && new AgeRange(ageRange.min, ageRange.max),
    bestFor: bestFor?.[0]?.label || null,
    links: {
      self: convertFromApiClientLink(links.self),
      rate: convertFromApiClientLink(links.rate),
      tag: convertFromApiClientLink(links.tag),
      logInteraction: convertFromApiClientLink(links.logInteraction),
    },
  };

  if (links.transcript) {
    convertedProperties.links.transcript = convertFromApiClientLink(
      links.transcript,
    );
  }

  const video: Video = {
    id: clientVideo.id,
    title: clientVideo.title,
    description: clientVideo.description,
    duration: clientVideo.playback.duration,
    releasedOn: clientVideo.releasedOn,
    createdBy: clientVideo.createdBy,
    playback: clientVideo.playback,
    subjects: clientVideo.subjects,
    badges: clientVideo.badges,
    rating: clientVideo.rating,
    yourRating: clientVideo.yourRating,
    promoted: clientVideo.promoted,
    thumbnailUrl: convertedProperties.thumbnailUrl,
    ageRange: convertedProperties.ageRange,
    bestFor: convertedProperties.bestFor,
    attachments: clientVideo.attachments,
    links: convertedProperties.links,
  };

  return video;
}

import moment = require('moment');
import { boclipsFetch } from '../../fetch/FetchProvider';
import { Links } from '../../links/Links';

export default function searchVideos(query: string, links: Links) {
  return boclipsFetch(links.videos.getLink({ query }))
    .then(response => response.json())
    .then(body =>
      body._embedded.videos.map(video => ({
        title: video.title,
        description: video.description,
        duration: moment.duration(video.duration),
        releasedOn: new Date(video.releasedOn),
        contentProvider: video.contentProvider,
        thumbnailUrl: video.thumbnailUrl,
      })),
    );
}

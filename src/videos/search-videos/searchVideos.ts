import axios from 'axios';
import moment = require('moment');
import { Links } from '../../links/Links';

export default function searchVideos(query: string, links: Links) {
  return axios
    .get(links.videos.getLink({ query }))
    .then(response => response.data)
    .then(body =>
      body._embedded.videos.map(video => ({
        title: video.title,
        description: video.description,
        duration: moment.duration(video.duration),
        releasedOn: new Date(video.releasedOn),
        contentProvider: video.contentProvider,
        thumbnailUrl: video.thumbnailUrl,
        streamUrl: video.streamUrl,
      })),
    );
}

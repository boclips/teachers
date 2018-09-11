import moment = require('moment');
import { Links } from '../links/Links';
import { UserCredentials } from '../login/UserCredentials';

export default function searchVideos(
  query: string,
  links: Links,
  user: UserCredentials,
) {
  const headers = {
    Authorization: 'Basic ' + btoa(user.username + ':' + user.password),
  };

  return fetch(links.videos.getLink({ query }), { headers })
    .then(response => response.json())
    .then(body =>
      body._embedded.videos.map(video => ({
        title: video.title,
        description: video.description,
        duration: moment.duration(video.duration),
        releasedOn: new Date(video.releasedOn),
        contentProvider: video.contentProvider,
      })),
    );
}

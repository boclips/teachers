import axios from 'axios';
import { Link } from './Link';
import { Links } from './Links';

export default function fetchLinks() {
  return axios
    .get('/v1/')
    .then(response => response.data)
    .then(
      (body): Links => {
        const links: Links = {
          videos: new Link(body._links.search),
          video: new Link(body._links.video),
          createPlaybackEvent: new Link(body._links.createPlaybackEvent),
          createNoSearchResultsEvent: new Link(
            body._links.createNoSearchResultsEvent,
          ),
        };

        if (body._links.activate) {
          links.activate = new Link(body._links.activate);
        }

        if (body._links.profile) {
          links.profile = new Link(body._links.profile);
        }

        return links;
      },
    );
}

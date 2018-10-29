import axios from 'axios';
import { Link } from './Link';

export default function fetchLinks() {
  return axios
    .get('/v1/')
    .then(response => response.data)
    .then(body => ({
      videos: new Link(body._links.search),
      video: new Link(body._links.video),
      createPlaybackEvent: new Link(body._links.createPlaybackEvent),
      createNoSearchResultsEvent: new Link(
        body._links.createNoSearchResultsEvent,
      ),
    }));
}

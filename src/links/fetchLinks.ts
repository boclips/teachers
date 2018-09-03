import {Link} from './Link';

export default function fetchLinks() {
  return fetch('/')
    .then((response) => response.json())
    .then((body) => ({videos: new Link(body._links.videos)}));
}

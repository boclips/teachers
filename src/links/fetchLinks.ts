import { Link } from './Link';

export default function fetchLinks() {
  return fetch('/v1/')
    .then(response => response.json())
    .then(body => ({
      videos: new Link(body._links.search),
      user: new Link(body._links.user),
    }));
}

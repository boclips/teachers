import axios from 'axios';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';

export default function fetchLinks() {
  return axios
    .get('/v1/')
    .then(response => response.data)
    .then(
      (body): Links => {
        const links: Links = {
          video: new Link(body._links.video),
          createPlaybackEvent: new Link(body._links.createPlaybackEvent),
          createNoSearchResultsEvent: new Link(
            body._links.createNoSearchResultsEvent,
          ),
        };

        if (body._links.userCollection) {
          links.collection = new Link(body._links.userCollection);
        }

        if (body._links.search) {
          links.videos = new Link(body._links.search);
        }

        if (body._links.collections) {
          links.collections = new Link(body._links.collections);
        }

        if (body._links.collection) {
          links.collection = new Link(body._links.collection);
        }

        if (body._links.myCollections) {
          links.myCollections = new Link(body._links.myCollections);
        }

        if (body._links.publicCollections) {
          links.publicCollections = new Link(body._links.publicCollections);
        }

        if (body._links.bookmarkedCollections) {
          links.bookmarkedCollections = new Link(
            body._links.bookmarkedCollections,
          );
        }

        if (body._links.activate) {
          links.activate = new Link(body._links.activate);
        }

        if (body._links.profile) {
          links.profile = new Link(body._links.profile);
        }

        if (body._links.createAccount) {
          links.createAccount = new Link(body._links.createAccount);
        }

        if (body._links.subjects) {
          links.subjects = new Link(body._links.subjects);
        }

        return links;
      },
    )
    .catch(console.error);
}

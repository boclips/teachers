import axios from 'axios';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';

export default function fetchLinks(prefix: string) {
  return axios
    .get(`${prefix}/v1/`)
    .then((response) => response.data)
    .then(
      (body): Links => {
        const links: Links = {
          video: new Link(body._links.video),
          createNoSearchResultsEvent: new Link(
            body._links.createNoSearchResultsEvent,
          ),
        };

        if (body._links.searchVideos) {
          links.videos = new Link(body._links.searchVideos);
        }

        if (body._links.searchCollections) {
          links.searchCollections = new Link(body._links.searchCollections);
        }

        if (body._links.createCollection) {
          links.createCollection = new Link(body._links.createCollection);
        }

        if (body._links.collection) {
          links.collection = new Link(body._links.collection);
        }

        if (body._links.mySavedCollections) {
          links.mySavedCollections = new Link(body._links.mySavedCollections);
        }

        if (body._links.myCollections) {
          links.myCollections = new Link(body._links.myCollections);
        }

        if (body._links.discoverCollections) {
          links.discoverCollections = new Link(body._links.discoverCollections);
        }

        if (body._links.promotedCollections) {
          links.promotedCollections = new Link(body._links.promotedCollections);
        }

        if (body._links.activate) {
          links.activate = new Link(body._links.activate);
        }

        if (body._links.reportAccessExpired) {
          links.reportAccessExpired = new Link(body._links.reportAccessExpired);
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
        if (body._links.disciplines) {
          links.disciplines = new Link(body._links.disciplines);
        }

        if (body._links.countries) {
          links.countries = new Link(body._links.countries);
        }

        if (body._links.tags) {
          links.tags = new Link(body._links.tags);
        }

        if (body._links.validateShareCode) {
          links.validateShareCode = new Link(body._links.validateShareCode);
        }

        return links;
      },
    );
}

import axios from 'axios';
import { Links } from '../../types/Links';
import { Pageable } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import { CollectionKey } from './../../types/CollectionKey';
import { parseScrollableCollectionsListResponse } from './collectionParser';

export const fetchPageableCollections = (
  links: Links,
  key: CollectionKey,
): Promise<Pageable<VideoCollection>> => {
  return axios
    .get(links[key].getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};

export const fetchNextCollectionsPage = (
  collections: Pageable<VideoCollection>,
): Promise<Pageable<VideoCollection>> => {
  if (!collections.links.next) {
    return Promise.reject();
  }
  return axios
    .get(collections.links.next.getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};

import { RawLink } from './Link';

export interface RawLinks {
  search: RawLink;
  video: RawLink;
  createPlaybackEvent: RawLink;
  createNoSearchResultsEvent: RawLink;
  activate?: RawLink;
  profile?: RawLink;
  userCollection: RawLink;
  userCollections: RawLink;
}

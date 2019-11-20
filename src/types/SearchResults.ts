import PageSpec from './PageSpec';
import { Video } from './Video';
import { VideoCollection } from './VideoCollection';

export interface VideoSearchResult extends SearchResult {
  videos: Video[];
  paging: PageSpec;
}

export interface CollectionSearchResult extends SearchResult {
  collections: VideoCollection[];
}

export interface SearchResult {
  query: string;
}

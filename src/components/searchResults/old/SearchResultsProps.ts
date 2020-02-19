import {
  CollectionSearchResult,
  VideoSearchResult,
} from 'src/types/SearchResults';

export default interface SearchResultsProps {
  videoResults: VideoSearchResult;
  collectionResults: CollectionSearchResult;
  userId: string | null;
}

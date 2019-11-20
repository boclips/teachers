import {
  CollectionSearchResult,
  VideoSearchResult,
} from '../../types/SearchResults';

export default interface SearchResultsProps {
  videoResults: VideoSearchResult;
  collectionResults: CollectionSearchResult;
  userId: string | null;
}

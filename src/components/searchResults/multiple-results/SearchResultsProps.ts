import {
  CollectionSearchResults,
  VideoSearchResults,
} from '../../../types/State';

export default interface SearchResultsProps {
  videoResults: VideoSearchResults;
  collectionResults: CollectionSearchResults;
  onNavigate: () => void;
  userId: string | null;
}

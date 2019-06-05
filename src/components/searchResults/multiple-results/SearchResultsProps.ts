import { VideoSearchResults } from '../../../types/State';

export default interface SearchResultsProps {
  results: VideoSearchResults;
  onNavigate: () => void;
}

import { SearchResults } from '../../../types/State';

export default interface SearchResultsProps {
  results: SearchResults;
  onNavigate: () => void;
}

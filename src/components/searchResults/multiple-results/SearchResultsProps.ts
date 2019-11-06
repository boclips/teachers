import { VideoResults } from '../../../types/SearchResults';
import { VideoCollection } from '../../../types/VideoCollection';

export default interface SearchResultsProps {
  videoResults: VideoResults;
  collectionResults: VideoCollection[];
  onNavigate: () => void;
  userId: string | null;
}

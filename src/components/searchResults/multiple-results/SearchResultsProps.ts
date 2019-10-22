import { VideoSearchResults } from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';

export default interface SearchResultsProps {
  videoResults: VideoSearchResults;
  collectionResults: VideoCollection[];
  onNavigate: () => void;
  userId: string | null;
}

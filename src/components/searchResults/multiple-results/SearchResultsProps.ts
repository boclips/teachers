import { Video } from '../../../types/Video';

export default interface SearchResultsProps {
  query: string;
  videos: Video[];
  searchId: string;
  onNavigate: () => void;
}

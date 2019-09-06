import { Video } from '../../../types/Video';
import HttpBoclipsAnalytics from './HttpBoclipsAnalytics';

export interface BoclipsAnalytics {
  trackVideoSharedInGoogle(video: Video): Promise<void>;

  trackVideoLinkCopied(video: Video): Promise<void>;
}

export default new HttpBoclipsAnalytics();

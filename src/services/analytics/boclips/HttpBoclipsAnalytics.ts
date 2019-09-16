import axios from 'axios';
import { Video } from '../../../types/Video';
import AbstractBoclipsAnalytics from './AbstractBoclipsAnalytics';

export default class HttpBoclipsAnalytics extends AbstractBoclipsAnalytics {
  public logInteraction(video: Video, interactionType: string): Promise<void> {
    const link = video.links.logInteraction;

    if (!link) {
      return Promise.reject(`Video ${video.id} has no logInteraction link`);
    }

    return axios.post(
      link.getTemplatedLink({
        type: interactionType,
      }),
    );
  }
}
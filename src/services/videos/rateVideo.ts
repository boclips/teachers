import axios from 'axios';
import { Video } from '../../types/Video';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import convertVideoResource from './convertVideoResource';

export default function rateVideo(
  video: Video,
  rating: number,
): Promise<Video> {
  return axios
    .patch(video.links.rate.getTemplatedLink({ rating }))
    .then(response => response.data)
    .then(convertVideoResource)
    .then(resource => {
      AnalyticsFactory.externalAnalytics().trackVideoRating(video, rating);
      return resource;
    });
}

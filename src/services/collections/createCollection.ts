import axios from 'axios';
import { Links } from '../../types/Links';
import { Video } from '../../types/Video';

export interface CreateCollectionRequest {
  title: string;
  videos: Video[];
}

export const createCollection = (
  links: Links,
  request: CreateCollectionRequest,
): Promise<boolean> => {
  if (!links.collections) {
    return;
  }
  return axios
    .post(links.collections.getOriginalLink(), toResource(request))
    .then(() => true);
};

function toResource(request: CreateCollectionRequest) {
  return {
    title: request.title,
    videos: request.videos.map(video => video.links.self.getOriginalLink()),
  };
}

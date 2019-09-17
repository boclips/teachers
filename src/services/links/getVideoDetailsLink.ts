import queryString from 'querystring';
import { Constants } from '../../app/AppConstants';
import { Segment } from '../../types/Video';
/* tslint:disable:no-string-literal */

export default ({
  videoId,
  userId,
  segment,
  absolute,
}: {
  videoId: string;
  userId: string | null;
  segment: Segment | null;
  absolute: boolean;
}): string => {
  const path = `/videos/${videoId}`;
  const baseUrl = absolute ? `${Constants.HOST}${path}` : path;

  const params: { [key: string]: string | number } = {};

  if (userId !== null) {
    params['referer'] = userId;
  }

  if (segment !== null) {
    params['segmentStart'] = segment.start;
    params['segmentEnd'] = segment.end;
  }

  const queryParams = queryString.stringify(params);

  if (queryParams === '') {
    return baseUrl;
  }

  return `${baseUrl}?${queryParams}`;
};

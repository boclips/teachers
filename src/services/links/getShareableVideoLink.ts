import queryString from 'querystring';
import { Constants } from '../../app/AppConstants';
import { Segment } from '../../types/Video';

export const getShareableVideoLink = (
  videoId: string,
  userId: string,
  segment: Segment = null,
): string => {
  const params: { [key: string]: any } = {
    share: true,
    referer: userId,
  };

  if (segment?.start) {
    params.segmentStart = segment.start;
  }

  if (segment?.end) {
    params.segmentEnd = segment.end;
  }

  const queryParams = queryString.stringify(params);

  return `${Constants.HOST}/videos/${videoId}?${queryParams}`;
};

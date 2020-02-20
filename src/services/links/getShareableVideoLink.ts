import queryString from 'querystring';
import { Constants } from '../../app/AppConstants';
import { Segment } from '../../types/Video';

export const getShareableVideoLink = (
  videoId: string,
  userId: string,
  segment: Segment = null,
): string => {
  const params: { [key: string]: any } = {
    // Uncomment when feature is safe for release
    // share: true,
    referer: userId,
  };

  if (segment && segment.start) {
    params.segmentStart = segment.start;
  }

  if (segment && segment.end) {
    params.segmentEnd = segment.end;
  }

  const queryParams = queryString.stringify(params);

  return `${Constants.HOST}/videos/${videoId}?${queryParams}`;
};

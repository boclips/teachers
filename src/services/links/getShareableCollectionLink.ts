import queryString from 'querystring';
import { Constants } from '../../app/AppConstants';

export const getShareableCollectionLink = (
  collectionId: string,
  userId: string,
): string => {
  const params: { [key: string]: any } = {
    referer: userId,
  };

  const queryParams = queryString.stringify(params);

  return `${Constants.HOST}/collections/${collectionId}?${queryParams}`;
};

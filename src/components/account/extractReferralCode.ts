import * as queryString from 'querystring';

export const extractReferralCode = (queryParam: string) => {
  let queryParamWithoutQuestionMark = queryParam;

  if (queryParam[0] === '?') {
    queryParamWithoutQuestionMark = queryParam.substring(1);
  }
  const queryParams = queryString.parse(queryParamWithoutQuestionMark);
  const referralCode = queryParams.REFERRALCODE as string;
  return referralCode;
};

import * as queryString from 'querystring';

export const extractQueryParam = (query: string, paramName: string): string => {
  if (!query) {
    return undefined;
  }

  const normalisedQuery = normaliseQuery(query);
  const queryParams = queryString.parse(normalisedQuery);
  const paramValue = queryParams[paramName] as string;

  return paramValue;
};

const normaliseQuery = (query: string) => {
  let queryParamWithoutQuestionMark = query;

  if (query[0] === '?') {
    queryParamWithoutQuestionMark = query.substring(1);
  }

  return queryParamWithoutQuestionMark;
};

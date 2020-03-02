import React from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import {
  getNumberOfSearchFilters,
  parseSearchParametersFromUrl,
} from 'src/services/searchFilters/searchFiltersConverter';
import { Range } from 'src/types/Range';

export interface WithAppliedSearchParametersProps {
  query: string | undefined;
  numberOfFiltersApplied: number | undefined;
  duration: Range[];
  ageRangeMax: number | undefined;
  ageRangeMin: number | undefined;
  subjectIds: string[] | undefined;
}

export const withAppliedSearchParameters = <
  P extends WithAppliedSearchParametersProps
>(
  Component: React.ComponentType<P>,
) => (props: Omit<P, keyof WithAppliedSearchParametersProps>) => {
  const queryParams = useSelector(
    (state: State) => state.router.location.search,
  );
  const searchParameters = parseSearchParametersFromUrl(queryParams);
  const numberOfFiltersApplied = getNumberOfSearchFilters(searchParameters);

  const appliedFiltersProps: WithAppliedSearchParametersProps = {
    query: searchParameters.query,
    duration: searchParameters.duration,
    ageRangeMax: searchParameters.ageRangeMax,
    ageRangeMin: searchParameters.ageRangeMin,
    subjectIds: searchParameters.subject,
    numberOfFiltersApplied,
  };

  return <Component {...(props as P)} {...appliedFiltersProps} />;
};

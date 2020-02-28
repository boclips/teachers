import React from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import {
  getNumberOfSearchFilters,
  parseSearchParametersFromUrl,
} from 'src/services/searchFilters/searchFiltersConverter';

export interface WithAppliedSearchParametersProps {
  query: string | undefined;
  numberOfFiltersApplied: number | undefined;
  durationMin: number | undefined;
  durationMax: number | undefined;
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
    durationMin: searchParameters.durationMin,
    durationMax: searchParameters.durationMax,
    ageRangeMax: searchParameters.ageRangeMax,
    ageRangeMin: searchParameters.ageRangeMin,
    subjectIds: searchParameters.subject,
    numberOfFiltersApplied,
  };

  return <Component {...(props as P)} {...appliedFiltersProps} />;
};

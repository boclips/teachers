import React from 'react';
import { useSelector } from 'react-redux';
import {
  countSearchFilters,
  convertQueryToSearchParameters,
} from 'src/services/searchParameters/searchParametersConverter';
import { DurationRange } from 'src/types/DurationRange';
import { getSearch } from 'connected-react-router';
import { AgeRange } from 'src/types/AgeRange';

export interface WithAppliedSearchParametersProps {
  query: string | undefined;
  numberOfFiltersApplied: number | undefined;
  duration: DurationRange[];
  ageRange: AgeRange[];
  ageRangeMax: number | undefined;
  ageRangeMin: number | undefined;
  subjectIds: string[] | undefined;
}

export const withAppliedSearchParameters = <
  P extends WithAppliedSearchParametersProps
>(
  Component: React.ComponentType<P>,
) => (props: Omit<P, keyof WithAppliedSearchParametersProps>) => {
  const queryParams = useSelector(getSearch);

  const searchParameters = convertQueryToSearchParameters(queryParams);
  const numberOfFiltersApplied = countSearchFilters(searchParameters);

  const appliedFiltersProps: WithAppliedSearchParametersProps = {
    query: searchParameters.query,
    duration: searchParameters.duration,
    ageRange: searchParameters.ageRange,
    ageRangeMax: searchParameters.ageRangeMax,
    ageRangeMin: searchParameters.ageRangeMin,
    subjectIds: searchParameters.subject,
    numberOfFiltersApplied,
  };

  return <Component {...(props as P)} {...appliedFiltersProps} />;
};

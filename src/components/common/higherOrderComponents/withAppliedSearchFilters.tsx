import React from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import {
  getNumberOfSearchFilters,
  parseSearchFiltersFromUrl,
} from 'src/services/searchFilters/searchFiltersConverter';
import { Range } from 'src/types/Range';

export interface WithAppliedSearchFiltersProps {
  numberOfFiltersApplied: number | undefined;
  duration: Range[];
  ageRangeMax: number | undefined;
  ageRangeMin: number | undefined;
  subjectIds: string[] | undefined;
}

export const withAppliedSearchFilters = <
  P extends WithAppliedSearchFiltersProps
>(
  Component: React.ComponentType<P>,
) => (props: Omit<P, keyof WithAppliedSearchFiltersProps>) => {
  const queryParams = useSelector(
    (state: State) => state.router.location.search,
  );
  const searchFilters = parseSearchFiltersFromUrl(queryParams);
  const numberOfFiltersApplied = getNumberOfSearchFilters(searchFilters);

  const appliedFiltersProps: WithAppliedSearchFiltersProps = {
    duration: searchFilters.duration,
    ageRangeMax: searchFilters.ageRangeMax,
    ageRangeMin: searchFilters.ageRangeMin,
    subjectIds: searchFilters.subject,
    numberOfFiltersApplied,
  };

  return <Component {...(props as P)} {...appliedFiltersProps} />;
};

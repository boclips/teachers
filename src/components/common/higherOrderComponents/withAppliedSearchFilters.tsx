import React from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import {
  getNumberOfSearchFilters,
  parseSearchFiltersFromUrl,
} from 'src/services/searchFilters/searchFiltersConverter';

export interface WithAppliedSearchFiltersProps {
  numberOfFiltersApplied: number | undefined;
  durationMin: number | undefined;
  durationMax: number | undefined;
  ageRangeMax: number | undefined;
  ageRangeMin: number | undefined;
  subjectIds: string[] | undefined;
}

export const withAppliedSearchFilters = <
  P extends WithAppliedSearchFiltersProps
>(
  Component: React.ComponentType<P>,
) => (props: Omit<P, keyof WithAppliedSearchFiltersProps>) => {
  const location = useSelector((state: State) => state.router.location);
  const searchFilters = parseSearchFiltersFromUrl(location.search);
  const numberOfFiltersApplied = getNumberOfSearchFilters(searchFilters);

  const appliedFiltersProps: WithAppliedSearchFiltersProps = {
    durationMin: searchFilters.durationMin,
    durationMax: searchFilters.durationMax,
    ageRangeMax: searchFilters.ageRangeMax,
    ageRangeMin: searchFilters.ageRangeMin,
    subjectIds: searchFilters.subject,
    numberOfFiltersApplied,
  };

  return <Component {...(props as P)} {...appliedFiltersProps} />;
};

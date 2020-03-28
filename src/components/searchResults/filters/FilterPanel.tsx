import React, { useRef } from 'react';
import { bulkUpdateSearchParamsAction } from 'src/components/searchResults/redux/actions/updateSearchParametersActions';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { DurationRange } from 'src/types/DurationRange';
import { convertAgeRangesFromString } from 'src/components/ageRanges/convertAgeRangesFromString';
import { AppliedFilters } from './AppliedFilters';
import { FilterOptions, FiltersWithForm } from './Filters';
import './FilterPanel.less';

export const FilterPanel = () => {
  const dispatch = useDispatch();

  const applySearchFilters = (filterOptions: FilterOptions) => {
    dispatch(
      bulkUpdateSearchParamsAction([
        {
          duration: DurationRange.fromStrings(filterOptions.duration),
        },
        {
          age_range: convertAgeRangesFromString(filterOptions.ageRange),
        },
        {
          subject: filterOptions.subjects,
        },
      ]),
    );
  };

  const debouncedSearch = useRef(
    debounce(
      (filterOptions: FilterOptions) => applySearchFilters(filterOptions),
      1000,
    ),
  ).current;

  return (
    <div data-qa={'search-filters-menu'} className="search-filters-menu">
      <h1>Filter results</h1>
      <AppliedFilters />
      <FiltersWithForm onApplyFilters={debouncedSearch} />
    </div>
  );
};

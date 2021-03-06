import React, { useRef } from 'react';
import { bulkUpdateSearchParamsAction } from 'src/components/searchResults/redux/actions/updateSearchParametersActions';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { DurationRange } from 'src/types/DurationRange';
import { FilterKey } from 'src/components/searchResults/filters/FilterKey';
import { convertAgeRangesFromString } from 'src/components/ageRanges/convertAgeRangesFromString';
import { FilterOptions } from 'src/components/searchResults/filters/FilterOptions';
import { AppliedFilters } from './AppliedFilters';
import { Filters } from './Filters';
import './FilterPanel.less';

export interface FilterPanelProps {
  hiddenFilterKeys?: FilterKey[];
}

export const FilterPanel = ({ hiddenFilterKeys }: FilterPanelProps) => {
  const dispatch = useDispatch();

  const applySearchFilters = (filterOptions: FilterOptions) => {
    dispatch(
      bulkUpdateSearchParamsAction([
        {
          duration: DurationRange.newFromStrings(filterOptions.duration),
        },
        {
          age_range: convertAgeRangesFromString(filterOptions.ageRange),
        },
        {
          subject: filterOptions.subjects,
        },
        {
          resource_types: filterOptions.resourceTypes,
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
    <div data-qa="search-filters-menu" className="search-filters-menu">
      <h1>Filter results</h1>
      <AppliedFilters />
      <Filters
        onApplyFilters={debouncedSearch}
        hiddenFilterKeys={hiddenFilterKeys}
      />
    </div>
  );
};

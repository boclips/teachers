import React from 'react';
import AppliedFiltersProvider from '../../filters/AppliedFiltersProvider';
import { AppliedFilters } from './AppliedFilters';
import { FiltersWithForm } from './Filters';
import './FilterPanel.less';

interface Props {
  onApplyFilters?: () => void;
}
export const FilterPanel = (props: Props) => (
  <div data-qa={'search-filters-menu'} className="search-filters-menu">
    <h1>Filter results</h1>
    <AppliedFiltersProvider>
      <AppliedFilters />
    </AppliedFiltersProvider>

    <AppliedFiltersProvider>
      <FiltersWithForm onApplyFilters={props.onApplyFilters} />
    </AppliedFiltersProvider>
  </div>
);

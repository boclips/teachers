import { CheckboxGroupFilter } from 'src/components/searchResults/filters/CheckboxGroupFilter';
import React from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import { extractFacetHits } from 'src/components/searchResults/filters/utils/extractFacetHits';
import { DurationRange } from 'src/types/DurationRange';

interface Props {
  duration: DurationRange[];
  name: string;
}

export const DurationFilter = ({ duration, name }: Props) => {
  const facets = useSelector(
    (state: State) => state.search.videoSearch.facets?.durations,
  );
  const durations = useSelector((state: State) => state.durations);
  const durationFilters = durations
    .map((d) => ({
      value: d.toString(),
      label: d.getLabel(),
      count: extractFacetHits(d.toIso(), facets),
    }))
    .filter((filter) => filter.count > 0);

  return (
    <CheckboxGroupFilter
      filterOptions={durationFilters}
      formItemProps={{
        name,
        initialValue: duration?.map((range) => range.toString()),
      }}
    />
  );
};

import { CheckboxGroupFilter } from 'src/components/searchResults/filters/CheckboxGroupFilter';
import React from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import { extractFacetHits } from 'src/components/searchResults/filters/utils/extractFacetHits';
import { AgeRange } from 'src/types/AgeRange';

interface Props {
  ageRange: AgeRange[];
  name: string;
}

export const AgeFilter = ({ ageRange, name }: Props) => {
  const facets = useSelector(
    (state: State) => state.search.videoSearch.facets?.ageRanges,
  );
  const allAgeRanges = useSelector((state: State) => state.ageRanges);
  const ageRangeFilters = allAgeRanges.map((a) => ({
    label: a.getLabel(),
    value: a.getId(),
    count: extractFacetHits(a.getId(), facets),
  }));

  return (
    <CheckboxGroupFilter
      filterOptions={ageRangeFilters}
      formItemProps={{
        name,
        initialValue: ageRange?.map((range) => range.getId()),
      }}
    />
  );
};

import { CheckboxGroupFilter } from 'src/components/searchResults/filters/CheckboxGroupFilter';
import React from 'react';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import { extractFacetHits } from 'src/components/searchResults/filters/utils/extractFacetHits';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { DurationRange } from 'src/types/DurationRange';

interface Props {
  duration: DurationRange[];
  formFieldId: string;
}

export const DurationFilter = (props: Props & FormComponentProps) => {
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
      form={props.form}
      fieldId={props.formFieldId}
      fieldOptions={{
        initialValue: props.duration
          ? props.duration.map((range) => range.toString())
          : [],
      }}
    />
  );
};

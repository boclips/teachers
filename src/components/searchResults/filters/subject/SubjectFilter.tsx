import { FormComponentProps } from 'antd/lib/form';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import { extractFacetHits } from 'src/components/searchResults/filters/utils/extractFacetHits';
import { CheckboxGroupFilter } from 'src/components/searchResults/filters/CheckboxGroupFilter';
import React from 'react';

interface Props {
  subjectIds: string[] | undefined;
  formFieldId: string;
}

export const SubjectFilter = (props: Props & FormComponentProps) => {
  const facets = useSelector(
    (state: State) => state.search.videoSearch.facets?.subjects,
  );
  const subjects = useSelector((state: State) => state.subjects);
  const subjectFilters = subjects
    .map((subject) => ({
      value: subject.id,
      label: subject.name,
      count: extractFacetHits(subject.id, facets),
    }))
    .filter((filter) => filter.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <CheckboxGroupFilter
      filterOptions={subjectFilters}
      form={props.form}
      fieldId={props.formFieldId}
      fieldOptions={{
        rules: [{ type: 'array' }],
        initialValue: props.subjectIds,
      }}
    />
  );
};

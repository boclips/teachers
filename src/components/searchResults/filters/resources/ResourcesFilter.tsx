import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import { extractFacetHits } from 'src/components/searchResults/filters/utils/extractFacetHits';
import { CheckboxGroupFilter } from 'src/components/searchResults/filters/CheckboxGroupFilter';
import React from 'react';
import { getCollectionsFromSearchResult } from 'src/components/searchBar/redux/reducers/searchReducer';
import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';

interface Props {
  resourceTypes: string[];
  formFieldId: string;
}

export const ResourcesFilter = (props: Props & FormComponentProps) => {
  const facets = useSelector(
    (state: State) => state.search.videoSearch.facets?.resourceTypes,
  );

  /*
  This is a quick and dirty workaround to the fact that we don't have facets for
  the collection search just now. When we add this, please remove this and forgive me
   */
  const lessonPlanFacet = useSelector(
    (state: State) =>
      getCollectionsFromSearchResult(state).filter(
        (collection) =>
          collection.attachments &&
          collection.attachments.length > 0 &&
          collection.attachments[0].type === AttachmentType.LESSON_PLAN,
      ).length,
  );

  const allResourceTypes = useSelector((state: State) => state.resourceTypes);

  const resourceTypeFilters = allResourceTypes
    .map((type) => ({
      value: type.value,
      label: type.label,
      count:
        type.value === AttachmentType.LESSON_PLAN
          ? lessonPlanFacet
          : extractFacetHits(type.label, facets),
    }))
    .filter((filter) => filter.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));
  return (
    <CheckboxGroupFilter
      filterOptions={resourceTypeFilters}
      form={props.form}
      fieldId={props.formFieldId}
      fieldOptions={{
        initialValue: props.resourceTypes,
      }}
    />
  );
};

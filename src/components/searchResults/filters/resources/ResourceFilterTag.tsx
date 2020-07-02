import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import State from 'src/types/State';
import { ClosableTag } from '../../../common/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';

interface Props {
  resource: string;
  activeFilters: string[];
}

export const ResourceTypeFilterTag = (props: Props) => {
  const dispatch = useDispatch();
  const resourceTypes = useSelector((state: State) => state.resourceTypes);
  const label = resourceTypes.find((it) => it.value === props.resource).label;
  return (
    <span data-qa="resource-type-filter-tag">
      <ClosableTag
        label="Resources"
        value={label}
        onClose={() =>
          dispatch(
            updateSearchParamsAction({
              resource_types: props.activeFilters.filter(
                (resourceType) => resourceType !== props.resource,
              ),
            }),
          )
        }
      />
    </span>
  );
};

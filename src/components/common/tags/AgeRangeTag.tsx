import React from 'react';
import { AgeRange } from 'src/types/AgeRange';
import { Tag } from './Tag';

interface AgeRangeProps {
  ageRange: AgeRange;
  hideLabel?: boolean;
}

export const AgeRangeTag = (props: AgeRangeProps) => {
  return (
    <span data-qa="age-range">
      <Tag
        value={props.ageRange.getShortLabel()}
        label={props.hideLabel ? null : 'Ages'}
      />
    </span>
  );
};

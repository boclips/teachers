import React from 'react';
import { AgeRange } from 'src/types/AgeRange';
import { Authenticated } from 'src/components/common/Authenticated/Authenticated';
import { Tag } from './Tag';

interface AgeRangeProps {
  ageRange: AgeRange;
  hideLabel?: boolean;
}

export const AuthenticatedAgeRangeTag = (props: AgeRangeProps) => {
  return (
    <Authenticated>
      <span data-qa="age-range">
        <Tag
          value={props.ageRange.getShortLabel()}
          label={props.hideLabel ? null : 'Ages'}
        />
      </span>
    </Authenticated>
  );
};

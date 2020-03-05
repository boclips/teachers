import React from 'react';
import { AgeRange } from 'src/types/AgeRange';
import { Tag } from './Tag';

interface AgeRangeProps {
  ageRange: AgeRange;
  hideLabel?: boolean;
}

export class AgeRangeTag extends React.Component<AgeRangeProps> {
  public render(): React.ReactNode {
    return (
      <span data-qa="age-range">
        <Tag
          value={this.props.ageRange.getLabel()}
          label={this.props.hideLabel ? null : 'Ages'}
        />
      </span>
    );
  }
}

import React from 'react';
import { Tag } from './Tag';

interface AgeRangeProps {
  ageRange: string;
  hideLabel?: boolean;
}

export class AgeRangeTag extends React.Component<AgeRangeProps> {
  public render(): React.ReactNode {
    return (
      <span data-qa="age-range">
        <Tag
          value={this.props.ageRange}
          label={this.props.hideLabel ? null : 'Ages'}
        />
      </span>
    );
  }
}

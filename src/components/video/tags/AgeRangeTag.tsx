import React from 'react';
import { Tag } from './Tag';

interface AgeRangeProps {
  ageRange: string;
}

export class AgeRangeTag extends React.Component<AgeRangeProps> {
  public render(): React.ReactNode {
    return <Tag value={this.props.ageRange} dataQa="age-range" label="Ages" />;
  }
}

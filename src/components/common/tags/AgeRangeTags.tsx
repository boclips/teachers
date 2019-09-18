import React from 'react';
import { AgeRange } from '../../../types/AgeRange';
import { AgeRangeTag } from './AgeRangeTag';

interface Props {
  ageRanges: number[];
  hideLabel: boolean;
}

export default class AgeRangeTags extends React.Component<Props> {
  public render(): React.ReactNode {
    return AgeRange.generateAgeRanges(this.props.ageRanges).map(
      (range, index) => (
        <AgeRangeTag
          key={index}
          ageRange={range.getLabel()}
          hideLabel={this.props.hideLabel}
        />
      ),
    );
  }
}

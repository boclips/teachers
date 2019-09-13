import React from 'react';
import { connect } from 'react-redux';
import { AgeRange } from '../../../types/AgeRange';
import State from '../../../types/State';
import { AgeRangeTag } from './AgeRangeTag';

interface Props {
  ageRanges: AgeRange[];
}

class AgeRangeTags extends React.Component<Props> {
  public render(): React.ReactNode {
    return this.props.ageRanges.map((range, index) => (
      <AgeRangeTag key={index} ageRange={range.getLabel()} />
    ));
  }
}

const getAgeRanges = (state: State, ages: number[]): AgeRange[] | undefined => {
  return state.ageRanges.filter(range => ages.indexOf(range.resolveMin()) >= 0);
};

const mapStateToProps = (state: State, ownProps: { ages: number[] }) => {
  const ageRanges = getAgeRanges(state, ownProps.ages);
  return {
    ageRanges,
  };
};

export default connect(mapStateToProps)(AgeRangeTags);

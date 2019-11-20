import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AgeRange } from '../../../types/AgeRange';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';

interface Props {
  ageRangeMin?: number;
  ageRangeMax?: number;
}

interface DispatchProps {
  onClose: () => void;
}

class AgeRangeFilterTag extends React.Component<Props & DispatchProps> {
  private ageRange = new AgeRange(
    this.props.ageRangeMin,
    this.props.ageRangeMax,
  );
  public render() {
    return this.props.ageRangeMin == null &&
      this.props.ageRangeMax == null ? null : (
      <span data-qa="age-range-filter-tag">
        <ClosableTag
          label="Age"
          value={this.ageRange.getLabel()}
          onClose={this.props.onClose}
        />
      </span>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => {
    dispatch(
      updateSearchParamsAction({
        age_range_min: undefined,
        age_range_max: undefined,
      }),
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(AgeRangeFilterTag);

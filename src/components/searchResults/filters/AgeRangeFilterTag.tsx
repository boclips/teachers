import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AgeRange } from '../../../types/AgeRange';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';

interface Props {
  ageRangeMin?: number;
  ageRangeMax?: number;
  ageRange?: AgeRange[];
}

interface DispatchProps {
  onClose: (ageRanges: AgeRange[]) => void;
}

class AgeRangeFilterTag extends React.Component<Props & DispatchProps> {
  public render() {
    const ageRange = new AgeRange(
      this.props.ageRangeMin,
      this.props.ageRangeMax,
    );

    return this.props.ageRangeMin == null &&
      this.props.ageRangeMax == null ? null : (
      <span data-qa="age-range-filter-tag">
        <ClosableTag
          label="Age"
          value={ageRange.getLabel()}
          onClose={() => this.props.onClose(this.updateAgeRanges(ageRange))}
        />
      </span>
    );
  }

  private updateAgeRanges(ageRange: AgeRange) {
    if (!this.props.ageRange) {
      return;
    }

    return this.props.ageRange.filter(
      item => !(item.getId() === ageRange.getId()),
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: (ageRanges: AgeRange[]) => {
    dispatch(
      updateSearchParamsAction({
        age_range: ageRanges,
        age_range_min: undefined,
        age_range_max: undefined,
      }),
    );
  },
});

export default connect(null, mapDispatchToProps)(AgeRangeFilterTag);

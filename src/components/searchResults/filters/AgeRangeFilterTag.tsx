import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AgeRange } from '../../../types/AgeRange';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';

interface Props {
  activeAgeRanges: AgeRange[];
  ageRange: AgeRange;
}

interface DispatchProps {
  onClose: (ageRanges: AgeRange[]) => void;
}

class AgeRangeFilterTag extends React.Component<Props & DispatchProps> {
  public render() {
    return (
      <span data-qa="age-range-filter-tag">
        <ClosableTag
          label="Age"
          value={this.props.ageRange.getLabel()}
          onClose={() =>
            this.props.onClose(this.updateAgeRanges(this.props.ageRange))
          }
        />
      </span>
    );
  }

  private updateAgeRanges(ageRange: AgeRange) {
    return this.props.activeAgeRanges.filter(
      item => !(item.getLabel() === ageRange.getLabel()),
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: (ageRanges: AgeRange[]) => {
    dispatch(
      updateSearchParamsAction({
        age_range: ageRanges,
      }),
    );
  },
});

export default connect(null, mapDispatchToProps)(AgeRangeFilterTag);

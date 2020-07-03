import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AgeRange } from '../../../../types/AgeRange';
import { ClosableTag } from '../../../common/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';

interface Props {
  activeAgeRanges: AgeRange[];
  ageRange: AgeRange;
}

interface DispatchProps {
  onClose: (ageRanges: AgeRange[]) => void;
}

class AgeRangeFilterTag extends React.Component<Props & DispatchProps> {
  private updateAgeRanges(ageRange: AgeRange) {
    const { activeAgeRanges } = this.props;

    return activeAgeRanges.filter(
      (item) => !(item.getLabel() === ageRange.getLabel()),
    );
  }

  public render() {
    const { onClose, ageRange } = this.props;

    return (
      <span data-qa="age-range-filter-tag">
        <ClosableTag
          label="Age"
          value={ageRange.getShortLabel()}
          onClose={() => onClose(this.updateAgeRanges(ageRange))}
        />
      </span>
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

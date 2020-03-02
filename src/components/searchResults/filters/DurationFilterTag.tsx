import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Range } from 'src/types/Range';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';
import DurationBounds from './DurationBounds';

interface Props {
  range: Range;
}

interface DispatchProps {
  onClose: () => void;
}
const durationBounds = new DurationBounds();

class DurationFilterTag extends React.Component<Props & DispatchProps> {
  private getDurationLabel = () => {
    const min = durationBounds.resolveMin(this.props.range.min / 60);
    const max = durationBounds.resolveMax(this.props.range.max / 60);

    return max === durationBounds.MAX_DURATION ? `${min}m+` : `${min}m-${max}m`;
  };

  public shouldRender = () =>
    this.props.range.min == null && this.props.range.max == null;

  public render() {
    return this.shouldRender() ? null : (
      <span data-qa="duration-filter-tag">
        <ClosableTag
          label="Duration"
          value={this.getDurationLabel()}
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
        duration: undefined,
      }),
    );
  },
});

export default connect(null, mapDispatchToProps)(DurationFilterTag);

import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ClosableTag } from '../../../video/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import DurationBounds from './DurationBounds';

interface Props {
  minDuration?: number;
  maxDuration?: number;
}

interface DispatchProps {
  onClose: () => void;
}
const durationBounds = new DurationBounds();

class DurationFilterTag extends React.Component<Props & DispatchProps> {
  private getDurationLabel = () => {
    const min = durationBounds.resolveMin(this.props.minDuration / 60);
    const max = durationBounds.resolveMax(this.props.maxDuration / 60);

    return max === durationBounds.MAX_DURATION ? `${min}m+` : `${min}m-${max}m`;
  };

  public shouldRender = () =>
    this.props.minDuration == null && this.props.maxDuration == null;

  public render() {
    return this.shouldRender() ? null : (
      <ClosableTag
        dataQa="duration-filter-tag"
        label="Duration"
        value={this.getDurationLabel()}
        onClose={this.props.onClose}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => {
    dispatch(
      updateSearchParamsAction({
        min_duration: undefined,
        max_duration: undefined,
      }),
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DurationFilterTag);

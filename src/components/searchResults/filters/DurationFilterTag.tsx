import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';
import DurationBounds from './DurationBounds';

interface Props {
  durationMin?: number;
  durationMax?: number;
}

interface DispatchProps {
  onClose: () => void;
}
const durationBounds = new DurationBounds();

class DurationFilterTag extends React.Component<Props & DispatchProps> {
  private getDurationLabel = () => {
    const min = durationBounds.resolveMin(this.props.durationMin / 60);
    const max = durationBounds.resolveMax(this.props.durationMax / 60);

    return max === durationBounds.MAX_DURATION ? `${min}m+` : `${min}m-${max}m`;
  };

  public shouldRender = () =>
    this.props.durationMin == null && this.props.durationMax == null;

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
        duration_min: undefined,
        duration_max: undefined,
      }),
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DurationFilterTag);

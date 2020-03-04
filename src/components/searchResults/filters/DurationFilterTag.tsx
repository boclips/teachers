import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Range, rangeToString } from 'src/types/Range';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';

interface Props {
  range: Range;
}

interface DispatchProps {
  onClose: () => void;
}

class DurationFilterTag extends React.Component<Props & DispatchProps> {
  public shouldRender = () =>
    this.props.range.min == null && this.props.range.max == null;

  public render() {
    return this.shouldRender() ? null : (
      <span data-qa="duration-filter-tag">
        <ClosableTag
          label="Duration"
          value={rangeToString(
            this.props.range,
            seconds => `${seconds / 60}m`,
            ' - ',
          )}
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

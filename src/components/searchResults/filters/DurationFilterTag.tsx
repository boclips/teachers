import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { DurationRange } from 'src/types/DurationRange';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';

interface Props extends WithAppliedSearchParametersProps {
  range: DurationRange;
}

interface DispatchProps {
  onClose: () => void;
}

class DurationFilterTag extends React.Component<Props & DispatchProps> {
  public render() {
    return (
      <span data-qa="duration-filter-tag">
        <ClosableTag
          label="Duration"
          value={this.props.range.getLabel()}
          onClose={this.props.onClose}
        />
      </span>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: Props,
): DispatchProps => ({
  onClose: () => {
    dispatch(
      updateSearchParamsAction({
        duration: ownProps.duration.filter(
          range => range.toString() !== ownProps.range.toString(),
        ),
      }),
    );
  },
});

export default withAppliedSearchParameters(
  connect(null, mapDispatchToProps)(DurationFilterTag),
);

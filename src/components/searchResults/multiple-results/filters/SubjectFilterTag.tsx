import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Subject } from '../../../../types/Subject';
import { ClosableTag } from '../../../video/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';

interface Props {
  subject?: Subject;
}

interface DispatchProps {
  onClose: () => void;
}

class SubjectFilterTag extends React.Component<Props & DispatchProps> {
  public render() {
    return this.props.subject == null ? null : (
      <ClosableTag
        dataQa="subject-filter-tag"
        label="Subject"
        value={this.props.subject.name}
        onClose={this.props.onClose}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => {
    dispatch(
      updateSearchParamsAction({
        subject: undefined,
      }),
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(SubjectFilterTag);

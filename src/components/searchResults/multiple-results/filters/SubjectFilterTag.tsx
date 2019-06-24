import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../../types/State';
import { Subject } from '../../../../types/Subject';
import { ClosableTag } from '../../../video/tags/Tag';
import { updateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';

interface Props {
  subjectId?: string;
  subjectIds: string[];
}

interface StateProps {
  subject?: Subject;
}

interface DispatchProps {
  onClose: () => void;
}

class SubjectFilterTag extends React.Component<
  Props & DispatchProps & StateProps
> {
  public render() {
    return this.props.subjectId == null &&
      this.props.subject === undefined ? null : (
      <ClosableTag
        dataQa="subject-filter-tag"
        label="Subject"
        value={this.props.subject.name}
        onClose={this.props.onClose}
      />
    );
  }
}

function mapStateToProps(state: State, ownProps: Props): StateProps {
  return {
    subject: state.subjects.filter(
      subject => subject.id === ownProps.subjectId,
    )[0],
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: Props,
): DispatchProps => ({
  onClose: () => {
    dispatch(
      updateSearchParamsAction({
        subjects: ownProps.subjectIds.filter(
          item => item !== ownProps.subjectId,
        ),
      }),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubjectFilterTag);

import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from 'src/types/State';
import { Subject } from 'src/types/Subject';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';

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
    return this.props.subject ? (
      <span data-qa="subject-filter-tag">
        <ClosableTag
          label="Subject"
          value={this.props.subject.name}
          onClose={this.props.onClose}
        />
      </span>
    ) : null;
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
        subject: ownProps.subjectIds.filter(
          item => item !== ownProps.subjectId,
        ),
      }),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectFilterTag);

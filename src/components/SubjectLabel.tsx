import React from 'react';
import { connect } from 'react-redux';
import State from '../types/State';
import { Subject } from '../types/Subject';

interface Props {
  subjectId: string;
}

interface StateProps {
  subject?: Subject;
}

class SubjectLabel extends React.PureComponent<Props & StateProps> {
  public render() {
    return (this.props.subject && this.props.subject.name) || null;
  }
}

function mapStateToProps({ subjects }: State, ownProps: Props): StateProps {
  return {
    subject: subjects.find(s => s.id === ownProps.subjectId),
  };
}

export default connect(
  mapStateToProps,
  null,
)(SubjectLabel);

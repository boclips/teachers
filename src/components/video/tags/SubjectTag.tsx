import React from 'react';
import { connect } from 'react-redux';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import './SubjectTag.less';

interface Props {
  subject: string;
}

export default class SubjectTag extends React.Component<Props> {
  public render() {
    return (
      <div className="subject-tag">
        <span className="tag-type">Subject:</span>
        <span data-qa="subject">{this.props.subject}</span>
      </div>
    );
  }
}

const getSubject = (state: State, id: any): Subject | undefined => {
  return state.subjects.filter(subject => subject.id === id)[0];
};

const mapStateToProps = (state: State, ownProps: { id: string }) => {
  const subject = getSubject(state, ownProps.id);
  if (subject) {
    return { subject: subject.name };
  }
  return {};
};

export const ConnectedSubjectTag = connect(mapStateToProps)(SubjectTag);

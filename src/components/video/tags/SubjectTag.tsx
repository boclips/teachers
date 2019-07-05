import React from 'react';
import { connect } from 'react-redux';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import { Tag } from './Tag';

interface SubjectTagProps {
  subject: string;
}

export class SubjectTag extends React.Component<SubjectTagProps> {
  public render(): React.ReactNode {
    return (
      <span data-qa="subject">
        <Tag value={this.props.subject} label="Subject" />
      </span>
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

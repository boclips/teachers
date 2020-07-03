import React from 'react';
import { connect } from 'react-redux';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import { Tag } from './Tag';

interface SubjectTagProps {
  subjectName?: string;
  hideLabel?: boolean;
}

export const SubjectTag = (props: SubjectTagProps) => {
  if (props.subjectName) {
    return (
      <span data-qa="subject-tag">
        <Tag
          value={props.subjectName}
          label={props.hideLabel ? null : 'Subject'}
        />
      </span>
    );
  }
  return null;
};

const getSubject = (state: State, id: any): Subject | undefined =>
  state.subjects.filter((subject) => subject.id === id)[0];

const mapStateToProps = (state: State, ownProps: { id: string }) => {
  const subject = getSubject(state, ownProps.id);
  if (subject) {
    return {
      subjectName: subject.name,
    };
  }
  return {};
};

export const ConnectedSubjectTag = connect(mapStateToProps)(SubjectTag);

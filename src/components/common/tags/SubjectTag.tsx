import React from 'react';
import { connect } from 'react-redux';
import State from 'src/types/State';
import { Subject } from 'src/types/Subject';
import { Tag } from './Tag';

interface SubjectTagProps {
  subjectName?: string;
  hideLabel?: boolean;
}

export class SubjectTag extends React.Component<SubjectTagProps> {
  public render(): React.ReactNode {
    if (this.props.subjectName) {
      return (
        <span data-qa={'subject-tag'}>
          <Tag
            value={this.props.subjectName}
            label={this.props.hideLabel ? null : 'Subject'}
          />
        </span>
      );
    } else {
      return null;
    }
  }
}

const getSubject = (state: State, id: any): Subject | undefined =>
  state.subjects.filter(subject => subject.id === id)[0];

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

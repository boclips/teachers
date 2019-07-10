import React from 'react';
import { connect } from 'react-redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import { ClickableTag } from './Tag';

interface SubjectTagProps {
  subjectName: string;
  subjectId?: string;
}

export class SubjectTag extends React.Component<SubjectTagProps> {
  public render(): React.ReactNode {
    return (
      <ClickableTag
        dataQa={'subject-tag'}
        value={this.props.subjectName}
        label="Subject"
        link={`/discover-collections?subject=${this.props.subjectId}`}
        onClick={this.trackClick}
      />
    );
  }

  private trackClick = () => {
    AnalyticsFactory.getInstance().trackSubjectTagClicked(this.props.subjectId);
  };
}

const getSubject = (state: State, id: any): Subject | undefined => {
  return state.subjects.filter(subject => subject.id === id)[0];
};

const mapStateToProps = (state: State, ownProps: { id: string }) => {
  const subject = getSubject(state, ownProps.id);
  if (subject) {
    return { subjectName: subject.name, subjectId: subject.id };
  }
  return {};
};

export const ConnectedSubjectTag = connect(mapStateToProps)(SubjectTag);

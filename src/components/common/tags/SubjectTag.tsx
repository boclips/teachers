import React from 'react';
import { connect } from 'react-redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import { ClickableTag, Tag } from './Tag';

interface SubjectTagProps {
  subjectName?: string;
  subjectId?: string;
  clickable: boolean;
  hideLabel?: boolean;
}

export class SubjectTag extends React.Component<SubjectTagProps> {
  public render(): React.ReactNode {
    if (this.props.subjectName) {
      return this.props.clickable ? (
        <ClickableTag
          dataQa={'subject-tag'}
          value={this.props.subjectName}
          label={this.props.hideLabel ? null : 'Subject'}
          link={`/discover-collections?subject=${this.props.subjectId}`}
          onClick={this.trackClick}
        />
      ) : (
        <Tag
          value={this.props.subjectName}
          label={this.props.hideLabel ? null : 'Subject'}
        />
      );
    } else {
      return null;
    }
  }

  private trackClick = () => {
    AnalyticsFactory.externalAnalytics().trackSubjectTagClicked(
      this.props.subjectId,
    );
  };
}

const getSubject = (state: State, id: any): Subject | undefined =>
  state.subjects.filter(subject => subject.id === id)[0];

const mapStateToProps = (
  state: State,
  ownProps: { id: string; clickable: boolean },
) => {
  const subject = getSubject(state, ownProps.id);
  if (subject) {
    return {
      subjectName: subject.name,
      subjectId: subject.id,
      clickable: ownProps.clickable,
    };
  }
  return {};
};

export const ConnectedSubjectTag = connect(mapStateToProps)(SubjectTag);

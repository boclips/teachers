import React from 'react';
import LessonPlanSVG from '../../../resources/images/lesson-plan-icon.svg';
import { VideoCollection } from '../../types/VideoCollection';
import DateFormatter from '../common/formatters/DateFormatter';
import './CollectionSubtitle.less';

export interface Props {
  collection: VideoCollection;
  classname: string;
}

export class CollectionSubtitle extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <span className={this.props.classname}>
        {this.props.collection.attachments &&
          this.props.collection.attachments.length > 0 && (
            <span>
              <span
                className={'collection-subtitle__lesson-plan-tag'}
                data-qa={'collection-lesson-plan'}
              >
                <strong>
                  <LessonPlanSVG />
                  Lesson Plan
                </strong>
              </span>{' '}
              •{' '}
            </span>
          )}
        <span>
          <span data-qa="collection-number-of-videos">
            {this.props.collection.videoIds.length}
          </span>{' '}
          videos
        </span>
        {this.renderUpdatedAt(this.props.collection.updatedAt)}
      </span>
    );
  }

  private renderUpdatedAt(updatedAt: string) {
    return (
      <span className="last-updated">
        {` · Last updated: `}
        <span data-qa="collection-updated-at">
          <DateFormatter date={updatedAt} />
        </span>
      </span>
    );
  }
}

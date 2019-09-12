import React from 'react';
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
          this.props.collection.attachments.length && (
            <span>
              <strong>Lesson Plan</strong> •{' '}
            </span>
          )}
        <span>
          <span data-qa="collection-number-of-videos">
            {this.props.collection.videoIds.length}
          </span>{' '}
          videos
        </span>
        <span>
          &nbsp;• Created by{' '}
          <span
            data-qa="collection-created-by"
            className="collection-subtitle__created-by"
          >
            {this.props.collection.createdBy}
          </span>
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

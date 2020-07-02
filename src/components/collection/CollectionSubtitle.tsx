import React from 'react';
import { VideoCollection } from '../../types/VideoCollection';
import DateFormatter from '../common/formatters/DateFormatter';
import './CollectionSubtitle.less';

export interface Props {
  collection: VideoCollection;
  classname: string;
}

export class CollectionSubtitle extends React.Component<Props> {
  private renderUpdatedAt = (updatedAt: string) => (
    <span className="last-updated">
      {' · Last updated: '}
      <span data-qa="collection-updated-at">
        <DateFormatter date={updatedAt} />
      </span>
    </span>
  );

  public render(): React.ReactNode {
    return (
      <span className={this.props.classname}>
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
}

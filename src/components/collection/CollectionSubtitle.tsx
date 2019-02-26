import React from 'react';
import { VideoCollection } from '../../types/VideoCollection';
import DateFormatter from '../common/formatters/DateFormatter';

export interface Props {
  collection: VideoCollection;
}

export class CollectionSubtitle extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <span className="highlight">
        <span>
          <span data-qa="collection-number-of-videos">
            {this.props.collection.videos.length}
          </span>{' '}
          videos
        </span>
        {this.renderUpdatedAt(this.props.collection.updatedAt)}
      </span>
    );
  }

  private renderUpdatedAt(updatedAt: string) {
    return (
      <span>
        {` · Last updated: `}
        <span data-qa="collection-updated-at">
          <DateFormatter date={updatedAt} />
        </span>
      </span>
    );
  }
}

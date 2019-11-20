import React from 'react';
import CollectionCardContainer from '../collection/card/CollectionCardContainer';
import { VideoCard } from '../video/card/VideoCard';

interface Props {
  searchIndex: number;
  content: any;
}

export class CardContainer extends React.PureComponent<Props> {
  public render() {
    return (
      <div>
        {this.props.content && this.props.content.playback && (
          <VideoCard
            video={this.props.content}
            videoIndex={this.props.searchIndex}
          />
        )}
        {this.props.content && this.props.content.videoIds && (
          <CollectionCardContainer collection={this.props.content} />
        )}
      </div>
    );
  }
}

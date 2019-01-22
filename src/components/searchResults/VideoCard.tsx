import * as React from 'react';
import { Video } from '../../types/Video';
import SearchResult from './multiple-results/SearchResult';

interface Props {
  video: Video;
  searchId: string;
  isInCollection: boolean;
}

export default class VideoCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section data-qa="search-result">
        <SearchResult
          loading={false}
          video={this.props.video}
          searchId={this.props.searchId}
          isInCollection={this.props.isInCollection}
        />
      </section>
    );
  }
}

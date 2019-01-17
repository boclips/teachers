import Row from 'antd/lib/grid/row';
import React from 'react';
import { NewsBoxHeader } from '../NewsBoxHeader';
import VideoCard from '../VideoCard';
import SearchResultsProps from './SearchResultsProps';

export default class SearchResultsWithHeader extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    return (
      <React.Fragment>
        <Row>
          <NewsBoxHeader
            onButtonClick={this.props.onNavigate}
            resultsQuery={this.props.query}
          />
        </Row>
        <Row>
          {this.props.videos.map(video => {
            return (
              <VideoCard
                key={video.id}
                video={video}
                searchId={this.props.searchId}
              />
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
}

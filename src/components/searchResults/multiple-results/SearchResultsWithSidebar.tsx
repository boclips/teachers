import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { NewsBoxSidebar } from '../NewsBoxSidebar';
import VideoCard from '../VideoCard';
import SearchResultsProps from './SearchResultsProps';

export default class SearchResultsWithSidebar extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 18 }}>
          {this.props.videos.map(video => (
            <VideoCard
              video={video}
              searchId={this.props.searchId}
              key={video.id}
            />
          ))}
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 6 }}>
          <NewsBoxSidebar
            onButtonClick={this.props.onNavigate}
            resultsQuery={this.props.query}
          />
        </Col>
      </Row>
    );
  }
}

import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { SearchVideoCardList } from '../../video/list/VideoCardList';
import { NewsBoxSidebar } from '../NewsBoxSidebar';
import SearchResultsProps from './SearchResultsProps';

export default class SearchResultsWithSidebar extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 18 }}>
          <SearchVideoCardList
            videos={this.props.videos}
            searchId={this.props.searchId}
            isInCollection={this.props.isInCollection}
          />
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

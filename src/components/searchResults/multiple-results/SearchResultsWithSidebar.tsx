import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { SearchVideoCardList } from '../../video/list/VideoCardList';
import { SearchResultsSidebar } from '../SearchResultsSidebar';
import FiltersBar from './filters/FiltersBar';
import SearchResultsHeader from './SearchResultsHeader';
import SearchResultsProps from './SearchResultsProps';

export default class SearchResultsWithSidebar extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    const { videos, paging, query } = this.props.videoResults;
    return (
      <>
        <Row>
          <SearchResultsHeader totalElements={paging && paging.totalElements} />
        </Row>
        <Row>
          <FiltersBar />
        </Row>
        <Row>
          <Col xs={{ span: 24 }} xl={{ span: 18 }}>
            <SearchVideoCardList
              totalElements={paging && paging.totalElements}
              videos={videos}
              userId={this.props.userId}
            />
          </Col>
          <Col xs={{ span: 0 }} xl={{ span: 6 }}>
            <SearchResultsSidebar
              onButtonClick={this.props.onNavigate}
              resultsQuery={query}
              collections={this.props.collectionResults}
            />
          </Col>
        </Row>
      </>
    );
  }
}

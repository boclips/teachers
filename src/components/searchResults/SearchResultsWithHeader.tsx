import { Row } from 'antd';
import React from 'react';
import { SearchResultsCardList } from '../searchResults/SeachResultsCardList';
import FiltersBar from './filters/FiltersBar';
import SearchResultsHeader from './SearchResultsHeader';
import SearchResultsProps from './SearchResultsProps';

import './SearchResultsWithHeader.less';

export default class SearchResultsWithHeader extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    const { videos, paging: videoPaging } = this.props.videoResults;
    let { collections } = this.props.collectionResults;
    if (videoPaging.number > 0) {
      collections = [];
    }
    const totalElements =
      collections &&
      videoPaging &&
      collections.length + videoPaging.totalElements;
    return (
      <React.Fragment>
        <Row>
          <SearchResultsHeader totalElements={totalElements} />
        </Row>
        <Row>
          <FiltersBar />
        </Row>
        <Row className="search-results__list">
          <SearchResultsCardList
            totalElements={totalElements}
            videos={videos}
            collections={collections}
          />
        </Row>
      </React.Fragment>
    );
  }
}

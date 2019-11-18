import { Row } from 'antd';
import React from 'react';
import { SearchVideoCardList } from '../../video/list/VideoCardList';
import FiltersBar from './filters/FiltersBar';
import SearchResultsHeader from './SearchResultsHeader';
import SearchResultsProps from './SearchResultsProps';

export default class SearchResultsWithHeader extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    const { videos, paging } = this.props.videoResults;
    return (
      <React.Fragment>
        <Row>
          <SearchResultsHeader totalElements={paging && paging.totalElements} />
        </Row>
        <Row>
          <FiltersBar />
        </Row>
        <Row>
          <SearchVideoCardList
            totalElements={paging && paging.totalElements}
            videos={videos}
            userId={this.props.userId}
          />
        </Row>
      </React.Fragment>
    );
  }
}

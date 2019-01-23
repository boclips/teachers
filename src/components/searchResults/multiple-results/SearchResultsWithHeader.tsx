import Row from 'antd/lib/grid/row';
import React from 'react';
import { SearchVideoCardList } from '../../video/list/VideoCardList';
import { NewsBoxHeader } from '../NewsBoxHeader';
import SearchResultsProps from './SearchResultsProps';

export default class SearchResultsWithHeader extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    const { videos, searchId, paging, query } = this.props.results;
    return (
      <React.Fragment>
        <Row>
          <NewsBoxHeader
            onButtonClick={this.props.onNavigate}
            resultsQuery={query}
          />
        </Row>
        <Row>
          <SearchVideoCardList
            totalElements={paging && paging.totalElements}
            videos={videos}
            searchId={searchId}
            isInCollection={this.props.isInCollection}
          />
        </Row>
      </React.Fragment>
    );
  }
}

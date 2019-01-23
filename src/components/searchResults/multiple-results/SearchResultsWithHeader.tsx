import Row from 'antd/lib/grid/row';
import React from 'react';
import { SearchVideoCardList } from '../../video/list/VideoCardList';
import { NewsBoxHeader } from '../NewsBoxHeader';
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
          <SearchVideoCardList
            videos={this.props.videos}
            searchId={this.props.searchId}
            isInCollection={this.props.isInCollection}
          />
        </Row>
      </React.Fragment>
    );
  }
}

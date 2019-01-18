import Row from 'antd/lib/grid/row';
import React from 'react';
import { NewsBoxHeader } from '../NewsBoxHeader';
import { VideoCardList } from '../VideoCardList';
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
          <VideoCardList
            videos={this.props.videos}
            searchId={this.props.searchId}
            collectionVideoIds={this.props.collectionVideoIds}
          />
        </Row>
      </React.Fragment>
    );
  }
}

import { Col, Row } from 'antd';
import React from 'react';
import { SearchVideoCardList } from '../../video/list/VideoCardList';
import { NewsBoxHeader } from '../NewsBoxHeader';
import SearchResultsProps from './SearchResultsProps';

export default class SearchResultsWithHeader extends React.PureComponent<
  SearchResultsProps
> {
  public render() {
    const { videos, paging, query } = this.props.videoResults;
    return (
      <React.Fragment>
        <Row>
          <Col xl={24} span={0}>
            <NewsBoxHeader
              onButtonClick={this.props.onNavigate}
              resultsQuery={query}
            />
          </Col>
        </Row>
        <Row>
          <SearchVideoCardList
            totalElements={paging && paging.totalElements}
            videos={videos}
          />
        </Row>
      </React.Fragment>
    );
  }
}

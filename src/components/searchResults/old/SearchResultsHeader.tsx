import { Col, Row } from 'antd';
import React from 'react';
import SearchResultsCount from '../SearchResultsCount';
import FilterButton from './filters/FilterButton';
import './SearchResultsHeader.less';

interface Props {
  totalElements: number;
}

class SearchResultsHeader extends React.Component<Props> {
  public render() {
    return (
      <Row
        justify="space-between"
        // type="flex"
        className="search-results-header"
      >
        <Col>
          <SearchResultsCount count={this.props.totalElements} />
        </Col>
        <Col>
          <FilterButton />
        </Col>
      </Row>
    );
  }
}

export default SearchResultsHeader;

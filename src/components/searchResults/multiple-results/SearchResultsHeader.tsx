import { Col, Row } from 'antd';
import React from 'react';
import FilterButton from './filters/FilterButton';
import SearchResultsCount from './SearchResultsCount';
import './SearchResultsHeader.less';

interface Props {
  totalElements: number;
}

class SearchResultsHeader extends React.Component<Props> {
  public render() {
    return (
      <Row
        justify="space-between"
        type="flex"
        className="search-results-header"
      >
        <Col>
          <SearchResultsCount count={this.props.totalElements} />
        </Col>
        <Col>
          <FilterButton data-qa="filter-button" />
        </Col>
      </Row>
    );
  }
}

export default SearchResultsHeader;

import { Button, Col, Icon, Row } from 'antd';
import React from 'react';
import SearchResultsCount from '../SearchResultsCount';
import './SearchResultsHeader.less';
import FilterIconSVG from '../../../../resources/images/filter-icon.svg';

interface Props {
  totalElements: number;
  onOpenFilterDrawer: () => void;
}

export class SearchPanelHeader extends React.Component<Props> {
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
        <Col lg={{ span: 0 }}>
          <Button
            onClick={this.props.onOpenFilterDrawer}
            className="filter-button"
          >
            <Icon component={FilterIconSVG} />
            <span data-qa="filter-button-text">Filter</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

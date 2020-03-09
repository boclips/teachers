import { Button, Col, Row } from 'antd';
import Icon from '@ant-design/icons';
import React from 'react';
import SearchResultsCount from '../SearchResultsCount';
import '../old/SearchResultsHeader.less';
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
        // type="flex"
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

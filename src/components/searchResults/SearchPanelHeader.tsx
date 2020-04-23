import { Button, Col, Icon, Row } from 'antd';
import React from 'react';
import FilterIconSVG from 'resources/images/filter-icon.svg';
import './SearchResultsHeader.less';
import { MaxElementCount } from 'src/services/videos/parseVideosResponse';
import { formatCount } from 'src/components/searchResults/filters/Filters';

interface Props {
  totalElements: number;
  onOpenFilterDrawer: () => void;
}

export class SearchPanelHeader extends React.Component<Props> {
  private createResultString = (resultCount) => {
    const count = Math.min(resultCount, MaxElementCount);

    const plural = count > 1 ? 's' : '';

    return `${formatCount(count)} result${plural} found`;
  };

  public render() {
    return (
      <Row
        justify="space-between"
        type="flex"
        className="search-results-header"
      >
        <Col>
          {!!this.props.totalElements && (
            <div className="results-count" data-qa="search-count">
              {this.createResultString(this.props.totalElements)}
            </div>
          )}
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

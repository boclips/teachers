import { Row, Pagination } from 'antd';
import React from 'react';
import { SearchResultsCardList } from '../SeachResultsCardList';

import '../old/SearchResultsWithHeader.less';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from '../../../types/SearchResults';
import { SearchPanelHeader } from './SearchPanelHeader';

interface DrawerFilterProps {
  onOpenFilterDrawer: () => void;
}

interface Props {
  videoResults: VideoSearchResult;
  collectionResults: CollectionSearchResult;
  userId: string | null;
  currentPage: number;
  onPageChange: (number) => void;
}

export class SearchPanel extends React.PureComponent<
  Props & DrawerFilterProps
> {
  public render() {
    const { videos, paging: videoPaging } = this.props.videoResults;
    let { collections } = this.props.collectionResults;
    if (videoPaging.number > 0) {
      collections = [];
    }
    const totalElements =
      collections &&
      videoPaging &&
      collections.length + videoPaging.totalElements;
    return (
      <React.Fragment>
        <Row>
          <SearchPanelHeader
            totalElements={totalElements}
            onOpenFilterDrawer={this.props.onOpenFilterDrawer}
          />
        </Row>
        <Row className="search-results__list">
          <SearchResultsCardList
            totalElements={totalElements}
            videos={videos}
            collections={collections}
          />
        </Row>
        <Row>{this.showPagination()}</Row>
      </React.Fragment>
    );
  }

  private showPagination() {
    if (
      !this.props.videoResults.paging ||
      this.props.videoResults.paging.totalPages === 0
    ) {
      return null;
    }

    return (
      <section className={'results-pagination'} data-qa="pagination">
        <Pagination
          current={this.props.currentPage}
          defaultCurrent={this.props.currentPage}
          defaultPageSize={this.props.videoResults.paging.size}
          total={this.props.videoResults.paging.totalElements}
          onChange={this.props.onPageChange}
        />
      </section>
    );
  }
}

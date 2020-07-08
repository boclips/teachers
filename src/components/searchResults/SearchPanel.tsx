import { Pagination, Row } from 'antd';
import React from 'react';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from 'src/types/SearchResults';

import { SearchResultsCardList } from './SeachResultsCardList';
import './SearchResultsWithHeader.less';
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
  private showPagination() {
    const { videoResults, currentPage, onPageChange } = this.props;

    if (!videoResults.paging || videoResults.paging.totalPages === 0) {
      return null;
    }

    return (
      <section className="results-pagination" data-qa="pagination">
        <Pagination
          current={currentPage}
          defaultCurrent={currentPage}
          defaultPageSize={videoResults.paging.size}
          total={videoResults.paging.totalElements}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </section>
    );
  }

  public render() {
    const { collectionResults, videoResults, onOpenFilterDrawer } = this.props;
    const { videos, paging: videoPaging } = videoResults;
    let { collections } = collectionResults;

    if (videoPaging.number > 0) {
      collections = [];
    }
    const totalElements =
      collections &&
      videoPaging &&
      collections.length + videoPaging.totalElements;
    return (
      <>
        <Row>
          <SearchPanelHeader
            totalElements={totalElements}
            onOpenFilterDrawer={onOpenFilterDrawer}
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
      </>
    );
  }
}

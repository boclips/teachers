import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Col, Drawer, Skeleton } from 'antd';
import { FiniteGrid } from '../../components/common/Grid/FiniteGrid';
import PageLayout from '../../components/layout/PageLayout';
import {
  getCollectionsFromSearchResult,
  getVideosFromSearchResult,
} from '../../components/searchBar/redux/reducers/searchReducer';
import { updatePageAction } from '../../components/searchResults/redux/actions/updatePageAction';
import { VideoCardsPlaceholder } from '../../components/searchResults/VideoCardsPlaceholder';
import { Links } from '../../types/Links';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from '../../types/SearchResults';
import State from '../../types/State';
import { FilterPanel } from '../../components/searchResults/new/filters/FilterPanel';
import { SearchPanel } from '../../components/searchResults/new/SearchPanel';
import NoResultsView from './noResults/NoResultsView';
import './NewSearchResultsView.less';

interface InternalState {
  filterDrawerVisible: boolean;
}

interface StateProps {
  loading: boolean;
  videoResults: VideoSearchResult;
  collectionResults: CollectionSearchResult;
  links: Links;
  currentPage: number;
  userId: string | null;
}

interface DispatchProps {
  onPageChange: (page: number) => void;
}

class NewSearchResultsView extends React.PureComponent<
  StateProps & DispatchProps,
  InternalState
> {
  public constructor(props: StateProps & DispatchProps) {
    super(props);
    this.state = {
      filterDrawerVisible: false,
    };
  }
  public render() {
    return (
      <PageLayout
        title={`"${this.props.videoResults.query}"`}
        showTabs={true}
        showNavigation={true}
        showFooter={true}
        showSearchBar={true}
      >
        {this.renderContent()}
      </PageLayout>
    );
  }

  private renderContent() {
    if (this.props.loading) {
      return this.showPlaceholders();
    }

    if (this.hasSearchResults()) {
      return this.showSearchResults();
    }

    if (this.props.videoResults.query.length > 0) {
      return this.showZeroResultsMessage();
    }

    return null;
  }

  private renderSearchLayout(resultContent: JSX.Element) {
    return (
      <React.Fragment>
        <section className={'search-results-container'} data-qa="search-page">
          <Col xs={{ span: 0 }} lg={{ span: 6 }}>
            <FilterPanel />
          </Col>
          <Drawer
            className={'display-mobile-and-tablet filters-drawer'}
            visible={this.state.filterDrawerVisible}
            closable={true}
            onClose={this.onCloseFilterDrawer}
            placement={'left'}
            width={'auto'}
          >
            <FilterPanel onApplyFilters={this.onCloseFilterDrawer} />
          </Drawer>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            {resultContent}
          </Col>
        </section>
      </React.Fragment>
    );
  }

  private showSearchResults() {
    const props = {
      videoResults: this.props.videoResults,
      collectionResults: this.props.collectionResults,
      userId: this.props.userId,
      currentPage: this.props.currentPage,
      onPageChange: this.props.onPageChange,
    };

    return this.renderSearchLayout(
      <React.Fragment>
        <SearchPanel {...props} onOpenFilterDrawer={this.onOpenFilterDrawer} />
      </React.Fragment>,
    );
  }

  private showZeroResultsMessage() {
    return this.renderSearchLayout(
      <NoResultsView query={this.props.videoResults.query} />,
    );
  }

  private showPlaceholders() {
    return (
      <section
        className="search-results-placeholders"
        data-qa="search-results-placeholders"
      >
        <Col lg={{ span: 5 }}>
          <Skeleton />
        </Col>
        <Col lg={{ span: 18 }}>
          <FiniteGrid>
            <VideoCardsPlaceholder />
          </FiniteGrid>
        </Col>
      </section>
    );
  }

  private onCloseFilterDrawer = () => {
    this.setState({ filterDrawerVisible: false });
  };

  private onOpenFilterDrawer = () => {
    this.setState({ filterDrawerVisible: true });
  };

  private hasSearchResults = () =>
    this.props.videoResults.videos.length > 0 ||
    this.props.collectionResults.collections.length > 0;
}

function mapStateToProps(state: State): StateProps {
  const { search, links, router, user } = state;
  return {
    loading: search.videoSearch.loading || search.collectionSearch.loading,
    videoResults: {
      ...search.videoSearch,
      videos: getVideosFromSearchResult(state),
    },
    collectionResults: {
      ...search.collectionSearch,
      collections: getCollectionsFromSearchResult(state),
    },
    links: links ? links.entries : null,
    currentPage: +queryString.parse(router.location.search).page || 1,
    userId: user ? user.id : null,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onPageChange: (page: number) => {
      dispatch(updatePageAction({ page }));
    },
  };
}

export const ConnectedNewSearchResultsView = connect<
  StateProps,
  DispatchProps,
  {}
>(
  mapStateToProps,
  mapDispatchToProps,
)(NewSearchResultsView);

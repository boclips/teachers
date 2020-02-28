import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Col, Drawer } from 'antd';
import { NewNoResultsView } from 'src/views/searchResults/noResults/NewNoResultsView';
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
            <FilterPanel />
          </Drawer>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 18 }}
            className={'search-results-container__results'}
          >
            {this.renderResults()}
          </Col>
        </section>
      </PageLayout>
    );
  }

  private renderResults = () => {
    if (this.props.loading) {
      return (
        <FiniteGrid>
          <VideoCardsPlaceholder />
        </FiniteGrid>
      );
    }

    if (this.hasSearchResults()) {
      return (
        <SearchPanel
          videoResults={this.props.videoResults}
          collectionResults={this.props.collectionResults}
          userId={this.props.userId}
          currentPage={this.props.currentPage}
          onPageChange={this.props.onPageChange}
          onOpenFilterDrawer={this.onOpenFilterDrawer}
        />
      );
    }
    if (this.props.videoResults.query.length > 0) {
      return <NewNoResultsView onOpenFilterDrawer={this.onOpenFilterDrawer} />;
    }

    return null;
  };

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

import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Col, Drawer } from 'antd';
import { NewNoResultsView } from 'src/views/searchResults/noResults/NewNoResultsView';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { FiniteGrid } from 'src/components/common/Grid/FiniteGrid';
import {
  getCollectionsFromSearchResult,
  getVideosFromSearchResult,
} from 'src/components/searchBar/redux/reducers/searchReducer';
import { updatePageAction } from 'src/components/searchResults/redux/actions/updatePageAction';
import { VideoCardsPlaceholder } from 'src/components/searchResults/VideoCardsPlaceholder';
import { Links } from 'src/types/Links';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from 'src/types/SearchResults';
import { FilterPanel } from 'src/components/searchResults/new/filters/FilterPanel';
import { SearchPanel } from 'src/components/searchResults/new/SearchPanel';
import State from '../../types/State';
import PageLayout from '../../components/layout/PageLayout';
import './SearchResultsView.less';

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

class SearchResultsView extends React.PureComponent<
  StateProps & DispatchProps & WithAppliedSearchParametersProps,
  InternalState
> {
  public constructor(
    props: StateProps & DispatchProps & WithAppliedSearchParametersProps,
  ) {
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
          {this.renderResults()}
        </section>
      </PageLayout>
    );
  }

  private renderResults = () => {
    if (this.props.loading) {
      return this.renderBasicLayoutWithFilterPanel(
        <FiniteGrid>
          <VideoCardsPlaceholder />
        </FiniteGrid>,
      );
    }

    if (this.hasSearchResults()) {
      return this.renderBasicLayoutWithFilterPanel(
        <SearchPanel
          videoResults={this.props.videoResults}
          collectionResults={this.props.collectionResults}
          userId={this.props.userId}
          currentPage={this.props.currentPage}
          onPageChange={this.props.onPageChange}
          onOpenFilterDrawer={this.onOpenFilterDrawer}
        />,
      );
    }
    if (this.noResultsFound()) {
      if (this.canUseFilters()) {
        return this.renderBasicLayoutWithFilterPanel(
          <NewNoResultsView
            onOpenFilterDrawer={this.onOpenFilterDrawer}
            canUseFilters={true}
          />,
        );
      } else {
        return (
          <NewNoResultsView
            onOpenFilterDrawer={this.onOpenFilterDrawer}
            canUseFilters={false}
          />
        );
      }
    }
    return null;
  };

  private renderBasicLayoutWithFilterPanel = (
    content: JSX.Element,
  ): JSX.Element => (
    <React.Fragment>
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
        {content}
      </Col>
    </React.Fragment>
  );

  private onCloseFilterDrawer = () => {
    this.setState({ filterDrawerVisible: false });
  };

  private onOpenFilterDrawer = () => {
    this.setState({ filterDrawerVisible: true });
  };

  private hasSearchResults = () =>
    this.props.videoResults.videos.length > 0 ||
    this.props.collectionResults.collections.length > 0;

  private noResultsFound = () =>
    !this.props.loading && !this.hasSearchResults() && this.props.query;

  private canUseFilters = () =>
    this.props.loading ||
    this.hasSearchResults() ||
    this.props.numberOfFiltersApplied > 0;
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

export const ConnectedNewSearchResultsView = withAppliedSearchParameters(
  connect<StateProps, DispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchResultsView),
);

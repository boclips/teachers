import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import State, { VideoSearchResults } from '../../../types/State';
import { bulkOverrideSearchParamsAction } from '../../searchResults/redux/actions/updateSearchParametersActions';

interface StateProps {
  isNewsMode: boolean;
  results: VideoSearchResults;
}

interface DispatchProps {
  onPageChange: (isNews: boolean, query: string) => void;
}

export interface NewsNavigationProps {
  goToNewsResults: () => void;
  goToSearchResults: () => void;
  isNewsMode: boolean;
}

const withNewsNavigation = Component => (props: StateProps & DispatchProps) => {
  const goToSearchResults = () => {
    props.onPageChange(false, props.results.query);
  };

  const goToNewsResults = () => {
    props.onPageChange(true, props.results.query);
  };

  const componentProps: NewsNavigationProps = {
    goToNewsResults,
    goToSearchResults,
    isNewsMode: props.isNewsMode,
  };

  return <Component {...componentProps} />;
};

const mapStateToProps = ({ router, search }: State): StateProps => {
  return {
    isNewsMode:
      // tslint:disable-next-line:no-string-literal
      queryString.parse(router.location.search).mode === 'news' || false,
    results: search.videoSearch,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onPageChange: (isNews: boolean, query: string) => {
    const mode = isNews ? 'news' : undefined;
    dispatch(
      bulkOverrideSearchParamsAction([{ page: 1 }, { mode }, { q: query }]),
    );
  },
});

export default compose(
  connect<StateProps, {}, {}>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNewsNavigation,
);

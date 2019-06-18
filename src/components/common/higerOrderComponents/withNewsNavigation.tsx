import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import State, { VideoSearchResults } from '../../../types/State';
import { bulkUpdateSearchParamsAction } from '../../searchResults/redux/actions/updateSearchParametersActions';

interface StateProps {
  isNewsMode: boolean;
  results: VideoSearchResults;
}

interface DispatchProps {
  onPageChange: (isNews: boolean) => void;
}

export interface NewsNavigationProps {
  goToNewsResults: () => void;
  goToSearchResults: () => void;
  isNewsMode: boolean;
}

const withNewsNavigation = Component => (props: StateProps & DispatchProps) => {
  const goToSearchResults = () => {
    props.onPageChange(false);
  };

  const goToNewsResults = () => {
    props.onPageChange(true);
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
  onPageChange: (isNews: boolean) => {
    const mode = isNews ? 'news' : undefined;
    dispatch(bulkUpdateSearchParamsAction([{ page: 1 }, { mode }]));
  },
});

export default compose(
  connect<StateProps, {}, {}>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNewsNavigation,
);

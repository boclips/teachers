import { push } from 'connected-react-router';
import * as queryString from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { SearchResults } from '../../../types/State';

interface StateProps {
  isNewsMode: boolean;
  results: SearchResults;
}

interface DispatchProps {
  onPageChange: (page: number, query: string, isNewsMode: boolean) => void;
}

export interface NewsNavigationProps {
  goToNewsResults: () => void;
  goToSearchResults: () => void;
  isNewsMode: boolean;
}

const withNewsNavigation = Component => (props: StateProps & DispatchProps) => {
  const goToSearchResults = () => {
    props.onPageChange(1, props.results.query, false);
  };

  const goToNewsResults = () => {
    props.onPageChange(1, props.results.query, true);
  };

  const componentProps: NewsNavigationProps = {
    goToNewsResults,
    goToSearchResults,
    isNewsMode: props.isNewsMode,
  };

  return <Component {...componentProps} />;
};

const mapStateToProps = ({ router, search }): StateProps => ({
  isNewsMode:
    queryString.parse(router.location.search).mode === 'news' || false,
  results: search,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onPageChange: (page: number, query: string, isNewsMode: boolean) => {
    const queryParams = queryString.stringify({
      q: query,
      page,
      mode: isNewsMode ? 'news' : undefined,
    });

    dispatch(push(`/videos?${queryParams}`));
  },
});

export default compose(
  connect<StateProps, {}, {}>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNewsNavigation,
);

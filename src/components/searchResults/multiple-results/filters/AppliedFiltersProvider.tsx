import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import State from '../../../../types/State';

export interface StateProps {
  minDuration?: number;
  maxDuration?: number;
}

export interface AppliedFiltersInjectedProps extends StateProps {
  numberOfFiltersApplied?: number;
}

interface Props {
  children: React.ReactElement<AppliedFiltersInjectedProps>;
}

class AppliedFiltersProvider extends React.Component<StateProps & Props> {
  public render() {
    const { children, minDuration, maxDuration } = this.props;

    let numberOfFiltersApplied = 0;

    if (minDuration !== null || maxDuration !== null) {
      numberOfFiltersApplied += 1;
    }

    return React.cloneElement(children, {
      minDuration,
      maxDuration,
      numberOfFiltersApplied,
    });
  }
}

const mapStateToProps = ({ router }: State): StateProps => ({
  minDuration: +queryString.parse(router.location.search).duration_min || null,

  maxDuration: +queryString.parse(router.location.search).duration_max || null,
});

export default connect(
  mapStateToProps,
  null,
)(AppliedFiltersProvider);

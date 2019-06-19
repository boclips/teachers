import React from 'react';
import { connect } from 'react-redux';
import SearchFiltersConverter from '../../../../services/searchFilters/searchFiltersConverter';
import State from '../../../../types/State';

export interface StateProps {
  durationMin?: number;
  durationMax?: number;
}

export interface AppliedFiltersInjectedProps extends StateProps {
  numberOfFiltersApplied?: number;
}

interface Props {
  children: React.ReactElement<AppliedFiltersInjectedProps>;
}

class AppliedFiltersProvider extends React.Component<StateProps & Props> {
  public render() {
    const { children, durationMin, durationMax } = this.props;

    let numberOfFiltersApplied = 0;

    if (durationMin !== null || durationMax !== null) {
      numberOfFiltersApplied += 1;
    }

    return React.cloneElement(children, {
      durationMin,
      durationMax,
      numberOfFiltersApplied,
    });
  }
}

const searchFiltersConverter = new SearchFiltersConverter();

const mapStateToProps = ({ router }: State): StateProps => {
  const searchFilters = searchFiltersConverter.fromSearchUrl(
    router.location.search,
  );

  return {
    durationMin: searchFilters.durationMin,
    durationMax: searchFilters.durationMax,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AppliedFiltersProvider);

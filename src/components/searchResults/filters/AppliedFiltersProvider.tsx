import React from 'react';
import { connect } from 'react-redux';
import SearchFiltersConverter from '../../../services/searchFilters/searchFiltersConverter';
import State from '../../../types/State';

export interface StateProps {
  durationMin?: number;
  durationMax?: number;
  ageRangeMax?: number;
  ageRangeMin?: number;
  subjectIds?: string[];
}

export interface AppliedFiltersInjectedProps extends StateProps {
  numberOfFiltersApplied?: number;
}

interface Props {
  children: React.ReactElement<AppliedFiltersInjectedProps>;
}

class AppliedFiltersProvider extends React.Component<StateProps & Props> {
  public render() {
    const {
      children,
      durationMin,
      durationMax,
      ageRangeMax,
      ageRangeMin,
      subjectIds,
    } = this.props;

    let numberOfFiltersApplied = 0;

    if (durationMin !== null || durationMax !== null) {
      numberOfFiltersApplied += 1;
    }

    if (ageRangeMin !== null || ageRangeMax != null) {
      numberOfFiltersApplied += 1;
    }
    if (subjectIds != null && subjectIds.length > 0) {
      numberOfFiltersApplied += subjectIds.length;
    }

    return React.cloneElement(children, {
      durationMin,
      durationMax,
      ageRangeMax,
      ageRangeMin,
      subjectIds,
      numberOfFiltersApplied,
    });
  }
}

const searchFiltersConverter = new SearchFiltersConverter();

const mapStateToProps = (state: State): StateProps => {
  const searchFilters = searchFiltersConverter.fromSearchUrl(
    state.router.location.search,
  );

  return {
    durationMin: searchFilters.durationMin,
    durationMax: searchFilters.durationMax,
    ageRangeMax: searchFilters.ageRangeMax,
    ageRangeMin: searchFilters.ageRangeMin,
    subjectIds: searchFilters.subject,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AppliedFiltersProvider);

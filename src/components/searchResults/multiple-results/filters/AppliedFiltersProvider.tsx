import React from 'react';
import { connect } from 'react-redux';
import SearchFiltersConverter from '../../../../services/searchFilters/searchFiltersConverter';
import State from '../../../../types/State';

export interface StateProps {
  durationMin?: number;
  durationMax?: number;
  ageRangeMax?: number;
  ageRangeMin?: number;
  subjects?: string[];
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
      subjects,
    } = this.props;

    let numberOfFiltersApplied = 0;

    if (durationMin !== null || durationMax !== null) {
      numberOfFiltersApplied += 1;
    }

    if (ageRangeMin !== null || ageRangeMax != null) {
      numberOfFiltersApplied += 1;
    }
    if (subjects != null && subjects.length > 0) {
      numberOfFiltersApplied += subjects.length;
    }

    return React.cloneElement(children, {
      durationMin,
      durationMax,
      ageRangeMax,
      ageRangeMin,
      subjects,
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
    ageRangeMax: searchFilters.ageRangeMax,
    ageRangeMin: searchFilters.ageRangeMin,
    subjects: searchFilters.subjects,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AppliedFiltersProvider);

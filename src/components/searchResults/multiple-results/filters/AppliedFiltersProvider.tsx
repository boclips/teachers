import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import State from '../../../../types/State';
import { AgeRange } from '../../../../types/AgeRange';

export interface StateProps {
  minDuration?: number;
  maxDuration?: number;
  ageRange?: AgeRange;
}

export interface AppliedFiltersInjectedProps extends StateProps {
  numberOfFiltersApplied?: number;
}

interface Props {
  children: React.ReactElement<AppliedFiltersInjectedProps>;
}

class AppliedFiltersProvider extends React.Component<StateProps & Props> {
  public render() {
    const { children, minDuration, maxDuration, ageRange } = this.props;

    let numberOfFiltersApplied = 0;

    if (minDuration !== null || maxDuration !== null) {
      numberOfFiltersApplied += 1;
    }

    if (ageRange !== null) {
      numberOfFiltersApplied += 1;
    }

    return React.cloneElement(children, {
      minDuration,
      maxDuration,
      ageRange,
      numberOfFiltersApplied,
    });
  }
}

const parseAgeRange = (parameters: string) => {
  let min = +queryString.parse(parameters).age_range_min || null
  let max = +queryString.parse(parameters).age_range_max || null

  if (min == null && max == null) {
    return null
  }
  else {
    return new AgeRange({ min: min, max: max })
  }
}

const mapStateToProps = ({ router }: State): StateProps => ({
  minDuration: +queryString.parse(router.location.search).duration_min || null,
  maxDuration: +queryString.parse(router.location.search).duration_max || null,
  ageRange: parseAgeRange(router.location.search),
});

export default connect(
  mapStateToProps,
  null,
)(AppliedFiltersProvider);

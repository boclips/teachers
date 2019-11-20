import { Row } from 'antd';
import React from 'react';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../common/higerOrderComponents/withMediaBreakPoint';
import AgeRangeFilterTag from './AgeRangeFilterTag';
import AppliedFiltersProvider, {
  AppliedFiltersInjectedProps,
} from './AppliedFiltersProvider';
import ClearAllButton from './ClearAllButton';
import DurationFilterTag from './DurationFilterTag';
import './FiltersBar.less';
import SubjectFilterTag from './SubjectFilterTag';

export class FiltersBar extends React.Component<AppliedFiltersInjectedProps> {
  public render() {
    if (this.props.numberOfFiltersApplied === 0) {
      return null;
    }

    return (
      <div className="filters-bar">
        <Row>
          <span data-qa="filters-bar-label" className="filters-bar__label">
            Filters applied:
          </span>
        </Row>
        <Row className="filters-bar__tags" align="middle" type="flex">
          <DurationFilterTag
            durationMin={this.props.durationMin}
            durationMax={this.props.durationMax}
          />
          <AgeRangeFilterTag
            ageRangeMin={this.props.ageRangeMin}
            ageRangeMax={this.props.ageRangeMax}
          />
          {this.props.subjectIds &&
            this.props.subjectIds.map(subjectId => (
              <SubjectFilterTag
                subjectIds={this.props.subjectIds}
                key={subjectId}
                subjectId={subjectId}
              />
            ))}
          <ClearAllButton />
        </Row>
      </div>
    );
  }
}

class FilterBarWrapper extends React.Component<WithMediaBreakPointProps> {
  public render() {
    return this.props.mediaBreakpoint.width <=
      MediaBreakpoints.md.width ? null : (
      <AppliedFiltersProvider>
        <FiltersBar />
      </AppliedFiltersProvider>
    );
  }
}

export default withMediaBreakPoint(FilterBarWrapper);

import { Row } from 'antd';
import React from 'react';
import AgeRangeFilterTag from '../../filters/AgeRangeFilterTag';
import { AppliedFiltersInjectedProps } from '../../filters/AppliedFiltersProvider';
import ClearAllButton from '../../filters/ClearAllButton';
import DurationFilterTag from '../../filters/DurationFilterTag';
import './AppliedFilters.less';
import SubjectFilterTag from '../../filters/SubjectFilterTag';

export class AppliedFilters extends React.Component<
  AppliedFiltersInjectedProps
> {
  public render() {
    if (this.props.numberOfFiltersApplied === 0) {
      return null;
    }

    return (
      <div className="filters-bar" data-qa={'filters-bar'}>
        <div className={'filters-bar__headings'}>
          <span data-qa="filters-bar-title" className="filters-bar__title">
            Filters applied
          </span>
          <ClearAllButton />
        </div>
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
        </Row>
      </div>
    );
  }
}

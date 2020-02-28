import { Row } from 'antd';
import React from 'react';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../../common/higherOrderComponents/withMediaBreakPoint';
import AgeRangeFilterTag from '../../filters/AgeRangeFilterTag';
import ClearAllButton from '../../filters/ClearAllButton';
import DurationFilterTag from '../../filters/DurationFilterTag';
import './FiltersBar.less';
import SubjectFilterTag from '../../filters/SubjectFilterTag';

export const FiltersBar = withAppliedSearchParameters(
  (props: WithAppliedSearchParametersProps) => {
    if (props.numberOfFiltersApplied === 0) {
      return null;
    }

    return (
      <div className="filters-bar" data-qa={'filters-bar'}>
        <Row>
          <span data-qa="filters-bar-label" className="filters-bar__label">
            Filters applied:
          </span>
        </Row>
        <Row className="filters-bar__tags" align="middle" type="flex">
          <DurationFilterTag
            durationMin={props.durationMin}
            durationMax={props.durationMax}
          />
          <AgeRangeFilterTag
            ageRangeMin={props.ageRangeMin}
            ageRangeMax={props.ageRangeMax}
          />
          {props.subjectIds &&
            props.subjectIds.map(subjectId => (
              <SubjectFilterTag
                subjectIds={props.subjectIds}
                key={subjectId}
                subjectId={subjectId}
              />
            ))}
          <ClearAllButton />
        </Row>
      </div>
    );
  },
);

class FilterBarWrapper extends React.Component<WithMediaBreakPointProps> {
  public render() {
    return this.props.mediaBreakpoint.width <=
      MediaBreakpoints.md.width ? null : (
      <FiltersBar />
    );
  }
}

export default withMediaBreakPoint(FilterBarWrapper);

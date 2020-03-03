import { Row } from 'antd';
import React from 'react';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import AgeRangeFilterTag from '../../filters/AgeRangeFilterTag';
import ClearAllButton from '../../filters/ClearAllButton';
import DurationFilterTag from '../../filters/DurationFilterTag';
import './AppliedFilters.less';
import SubjectFilterTag from '../../filters/SubjectFilterTag';

export const AppliedFilters = withAppliedSearchParameters(
  (props: WithAppliedSearchParametersProps) =>
    props.numberOfFiltersApplied > 0 ? (
      <div className="filters-bar" data-qa={'filters-bar'}>
        <div className={'filters-bar__headings'}>
          <span data-qa="filters-bar-title" className="filters-bar__title">
            Filters applied
          </span>
          <ClearAllButton />
        </div>
        <Row className="filters-bar__tags" align="middle" type="flex">
          {props.duration &&
            props.duration.map((durationRange, index) => (
              <DurationFilterTag key={index} range={durationRange} />
            ))}
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
        </Row>
      </div>
    ) : null,
);

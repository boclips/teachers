import { Row } from 'antd';
import React from 'react';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { ResourceTypeFilterTag } from 'src/components/searchResults/filters/resources/ResourceFilterTag';
import SubjectFilterTag from 'src/components/searchResults/filters/subject/SubjectFilterTag';
import AgeRangeFilterTag from './age/AgeRangeFilterTag';
import ClearAllButton from './ClearAllButton';
import DurationFilterTag from './duration/DurationFilterTag';
import './AppliedFilters.less';

export const AppliedFilters = withAppliedSearchParameters(
  (props: WithAppliedSearchParametersProps) =>
    props.numberOfFiltersApplied > 0 ? (
      <div className="applied-filters-bar" data-qa={'filters-bar'}>
        <div className={'applied-filters-bar__headings'}>
          <span
            data-qa="filters-bar-title"
            className="applied-filters-bar__title"
          >
            Filters applied
          </span>
          <ClearAllButton />
        </div>
        <Row className="applied-filters-bar__tags" align="middle" type="flex">
          {props.ageRange &&
            props.ageRange.map((ageRange, index) => (
              <AgeRangeFilterTag
                key={index}
                activeAgeRanges={props.ageRange}
                ageRange={ageRange}
              />
            ))}
          {props.subjectIds &&
            props.subjectIds.map((subjectId) => (
              <SubjectFilterTag
                subjectIds={props.subjectIds}
                key={subjectId}
                subjectId={subjectId}
              />
            ))}
          {props.duration &&
            props.duration.map((durationRange, index) => (
              <DurationFilterTag key={index} range={durationRange} />
            ))}
          {props.resourceTypes &&
            props.resourceTypes.map((resorceType, index) => (
              <ResourceTypeFilterTag
                key={index}
                resource={resorceType}
                activeFilters={props.resourceTypes}
              />
            ))}
        </Row>
      </div>
    ) : null,
);

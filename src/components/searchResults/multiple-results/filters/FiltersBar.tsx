import { Row } from 'antd';
import React from 'react';
import MediaBreakpoints from '../../../../types/MediaBreakpoints';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../../common/higerOrderComponents/withMediaBreakPoint';
import AppliedFiltersProvider, {
  AppliedFiltersInjectedProps,
} from './AppliedFiltersProvider';
import DurationFilterTag from './DurationFilterTag';
import './FiltersBar.less';

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
        <Row>
          <span className="filters-bar__tags">
            <DurationFilterTag
              durationMin={this.props.durationMin}
              durationMax={this.props.durationMax}
            />
          </span>
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

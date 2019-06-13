import React from 'react';
import FilterButton from './FilterButton';

interface Props {
  count: number;
}

export default class SearchResultsCount extends React.PureComponent<Props> {
  public render() {
    return this.props.count ? (
      <div className="results-count">
        <FilterButton />
        <span className={'count'} data-qa="search-count">
          {this.props.count}
        </span>
        result(s) found
      </div>
    ) : null;
  }
}

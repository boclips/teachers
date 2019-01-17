import React from 'react';

interface Props {
  count: number;
}

export default class SearchResultsCount extends React.PureComponent<Props> {
  public render() {
    return (
      <div className="results-count">
        <span className={'count'} data-qa="search-count">
          {this.props.count}
        </span>
        result(s) found
      </div>
    );
  }
}

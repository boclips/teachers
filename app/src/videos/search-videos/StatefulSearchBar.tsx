import Search from 'antd/lib/input/Search';
import React from 'react';

interface Props {
  onQuerySubmitted: (query: string) => void;
  onSearch: (query: string) => void;
  value?: string;
}

class FreshSearchOnValueChange extends React.Component<Props> {
  public render() {
    return (
      <Search
        defaultValue={this.props.value}
        placeholder="Enter your search term"
        type="text"
        data-qa="search-input"
        aria-label="search"
        onSearch={this.props.onQuerySubmitted}
        enterButton="Search"
      />
    );
  }

  public componentDidMount() {
    if (this.props.value) {
      this.props.onSearch(this.props.value);
    }
  }
}

export default class StatefulSearchBar extends React.Component<Props> {
  public render() {
    return [
      <FreshSearchOnValueChange
        key={this.props.value || ''}
        onSearch={this.props.onSearch}
        onQuerySubmitted={this.props.onQuerySubmitted}
        value={this.props.value}
      />,
    ];
  }
}

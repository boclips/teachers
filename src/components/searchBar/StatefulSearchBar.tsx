import Search from 'antd/lib/input/Search';
import React from 'react';
import logo from '../../../resources/images/search-icon.png';

interface Props {
  onSubmit: (query: string) => void;
  value?: string;
}

class FreshSearchOnValueChange extends React.Component<Props> {
  public render() {
    const onsubmit = e => e.preventDefault();
    return (
      <form action="" onSubmit={onsubmit}>
        <Search
          defaultValue={this.props.value}
          prefix={<img src={logo} />}
          placeholder="Enter your search term"
          type="search"
          data-qa="search-input"
          aria-label="search"
          onSearch={this.props.onSubmit}
          enterButton="Search"
          size="large"
        />
      </form>
    );
  }
}

export default class StatefulSearchBar extends React.Component<Props> {
  public render() {
    return [
      <FreshSearchOnValueChange
        key={this.props.value || ''}
        onSubmit={this.props.onSubmit}
        value={this.props.value}
      />,
    ];
  }
}

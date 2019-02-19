import { AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import logo from '../../../resources/images/search-icon.png';
import { completionsFor } from './completions';
import completionsContentPartners from './completionsContentPartners.json';
import completionsTopics from './completionsTopics.json';

const getCompletions = completionsFor([
  ...completionsTopics,
  ...completionsContentPartners,
]);

interface Props {
  onSubmit: (query: string) => void;
  value?: string;
}

interface State {
  completions: string[];
}

class FreshSearchOnValueChange extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      completions: [],
    };
  }

  public render() {
    const onsubmit = e => e.preventDefault();
    const setDataSource = (txt: string) => {
      this.setState({
        completions: getCompletions(txt),
      });
    };

    return (
      <form action="" onSubmit={onsubmit}>
        <AutoComplete
          dropdownClassName="search-completions"
          dataSource={this.state.completions}
          defaultValue={this.props.value}
          onSearch={setDataSource}
          onSelect={this.props.onSubmit}
          optionLabelProp="text"
          size="large"
          style={{ width: '100%' }}
        >
          <Search
            prefix={<img src={logo} />}
            placeholder="Enter your search term"
            type="search"
            data-qa="search-input"
            aria-label="search"
            onSearch={this.props.onSubmit}
            enterButton="Search"
            size="large"
          />
        </AutoComplete>
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

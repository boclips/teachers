import { AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import logo from '../../../resources/images/search-icon.png';
import { Completion, CompletionChunk, completionsFor } from './completions';
import completionsSources from './completionsSources.json';
import completionsTopics from './completionsTopics.json';
import './StatefulSearchBar.less';

const { Option } = AutoComplete;

const getCompletions = completionsFor([
  ...completionsTopics,
  ...completionsSources,
]);

interface Props {
  onSubmit: (query: string) => void;
  value?: string;
}

interface State {
  completions: Completion[];
}

class AutocompleteOption extends React.Component<{
  children: CompletionChunk[];
}> {
  public render() {
    return this.props.children.map((chunk, i) => (
      <span className={chunk.matches ? '' : 'completion-affix'} key={i + ''}>
        {chunk.text}
      </span>
    ));
  }
}

class FreshSearchOnValueChange extends React.Component<Props, State> {
  private submittedText = '';

  constructor(props: Props) {
    super(props);
    this.state = {
      completions: [],
    };
    this.submit = this.submit.bind(this);
  }

  public render() {
    const onsubmit = e => e.preventDefault();
    const setDataSource = (txt: string) => {
      this.setState({
        completions: getCompletions(txt),
      });
    };

    return (
      <form action="" onSubmit={onsubmit} className="searchbar">
        <AutoComplete
          defaultActiveFirstOption={false}
          backfill={true}
          dropdownClassName="search-completions"
          dataSource={this.renderOptions()}
          defaultValue={this.props.value}
          onSearch={setDataSource}
          onSelect={this.submit}
          optionLabelProp="text"
          size="large"
          style={{ width: '100%' }}
        >
          <Search
            prefix={<img src={logo} alt="" />}
            placeholder="Enter your search term"
            type="search"
            data-qa="search-input"
            aria-label="search"
            onSearch={this.submit}
            enterButton="Search"
            size="large"
          />
        </AutoComplete>
      </form>
    );
  }

  private renderOptions() {
    return this.state.completions.map(completion => (
      <Option key={completion.text} value={completion.text}>
        <AutocompleteOption>{completion.textWithHighlights}</AutocompleteOption>
      </Option>
    ));
  }

  private submit(value: string) {
    if (this.submittedText === value) {
      return;
    }
    this.submittedText = value;
    this.props.onSubmit(value);
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

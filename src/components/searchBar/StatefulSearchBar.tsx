import { AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import { SearchProps } from 'antd/es/input';
import React, { Ref } from 'react';
import SearchIcon from 'resources/images/search-icon.png';
import CloseSVG from 'resources/images/close.svg';
import { DataSourceItemType } from 'antd/lib/auto-complete';
import { Completion, completionsFor } from './completions';
import completionsCreatedBy from './completionsCreatedBy.json';
import completionsTopics from './completionsTopics.json';
import './StatefulSearchBar.less';

const getCompletions = completionsFor({
  topics: completionsTopics,
  channels: completionsCreatedBy,
});

interface Props {
  onSubmit: (query: string) => void;
  value?: string;
}

interface State {
  completions: Completion[];
}

class FreshSearchOnValueChange extends React.Component<Props, State> {
  private submittedText = '';

  public constructor(props: Props) {
    super(props);
    this.state = {
      completions: [],
    };
    this.submit = this.submit.bind(this);
  }

  public render() {
    const onsubmit = (e) => e.preventDefault();
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
          dataSource={this.renderDatasource()}
          defaultValue={this.props.value}
          onChange={setDataSource}
          onSelect={this.submit}
          size="large"
          style={{ width: '100%' }}
        >
          <MySearch
            prefix={<img src={SearchIcon} alt="" />}
            placeholder="Enter your search term"
            type="search"
            data-qa="search-input"
            aria-label="search"
            onSearch={this.submit}
            enterButton="Search"
            className='search-bar'
            size="large"
          />
        </AutoComplete>
      </form>
    );
  }

  private renderDatasource(): DataSourceItemType[] {
    return this.state.completions.map((completion) => ({
      value: completion.text,
      text:
        completion.list === 'channels'
          ? `Channel: ${completion.text}`
          : completion.text,
    }));
  }

  private submit(value: string) {
    if (this.submittedText === value) {
      return;
    }
    this.submittedText = value;
    this.props.onSubmit(value);
  }
}

const MySearch = React.forwardRef((props: SearchProps, ref: Ref<any>) => {
  const Clear = props.value !== '' && (
    <CloseSVG
      data-qa="clear-search-button"
      onClick={() => {
        props.onChange({ target: { value: '' } as any } as any);
      }}
    />
  );

  return <Search ref={ref} {...props} suffix={Clear} />;
});

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

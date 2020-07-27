/* eslint-disable */
import { AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import { SearchProps } from 'antd/es/input';
import React, { Ref } from 'react';
import SearchIcon from 'resources/images/search-icon.png';
import CloseSVG from 'resources/images/close.svg';
import { Completion, completionsFor } from './completions';
import completionsCreatedBy from './completionsCreatedBy.json';
import completionsTopics from './completionsTopics.json';
import './StatefulSearchBar.less';
import { v4 as uuidv4 } from 'uuid';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';

const getCompletions = completionsFor({
  topics: completionsTopics,
  channels: completionsCreatedBy,
});

const sendPublishSearchSuggestion = (
  searchQuery: string,
  suggestions: Completion[],
  completionId: string,
  componentId: string,
): void => {
  AnalyticsFactory.internalAnalytics().trackSearchSuggestionImpression({
    searchQuery,
    impressions: suggestions.map((suggestion) => suggestion.text),
    completionId,
    componentId,
  });
};

interface Props {
  onSubmit: (query: string, completionId?: string) => void;
  value?: string;
}

interface State {
  completions: Completion[];
  completionId: string;
  componentId: string;
}

class FreshSearchOnValueChange extends React.Component<Props, State> {
  private submittedText = '';

  public constructor(props: Props) {
    super(props);
    this.state = {
      completions: [],
      completionId: undefined,
      componentId: uuidv4(),
    };
    this.submit = this.submit.bind(this);
  }

  public render() {
    const onsubmit = (e) => e.preventDefault();
    const setDataSource = (query: string) => {
      const suggestions = getCompletions(query);
      const completionId = uuidv4();

      this.setState({
        completions: suggestions,
        completionId,
      });
      suggestions?.length > 0 &&
        sendPublishSearchSuggestion(
          query,
          suggestions,
          completionId,
          this.state.componentId,
        );
    };

    return (
      <form
        action=""
        onSubmit={onsubmit}
        className="searchbar"
        data-qa={'testing-form'}
      >
        <AutoComplete
          defaultActiveFirstOption={false}
          backfill
          dropdownAlign={{ offset:[0,0] }}
          dropdownClassName="search-completions"
          options={this.optionsRender()}
          defaultValue={this.props.value}
          onSearch={setDataSource}
          onSelect={(suggestion) =>
            this.submit(suggestion, this.state.completionId)
          }
          size="large"
          style={{ width: '100%' }}
          data-qa={'testing-autocomplete'}
        >
          <MySearch
            prefix={<img src={SearchIcon} alt="" />}
            placeholder="Enter your search term"
            type="search"
            data-qa={`search-input-${this.state.componentId}`}
            aria-label="search"
            onSearch={(value) => this.submit(value)}
            enterButton="Search"
            size="large"
          />
        </AutoComplete>
      </form>
    );
  }

  private optionsRender() {
    return this.state.completions
      .sort((r) => (r.list === 'topics' ? -1 : 1))
      .map((r) => ({
        key: r.text,
        value: r.text,
        label: this.renderResult(r),
        className: r.list === 'topics' ? 'topics' : 'channels',
      }));
  }

  private renderResult(r: Completion) {
    return (
      <div
        data-qa={`result-${
          r.list === 'channels' ? 'channel-' : ''
        }${r.text.replace(/\s+/g, '-').toLowerCase()}`}
        className="result"
      >
        {r.list === 'channels' && (
          <span className="autocomplete--channel">Channel: </span>
        )}

        {r.textWithHighlights.map((chunk) => (
          <span
            className={chunk.matches ? '' : 'completion-affix'}
            key={chunk.text}
          >
            {chunk.text}
          </span>
        ))}
      </div>
    );
  }

  private submit(value: string, completionId?: string) {
    if (this.submittedText === value) {
      return;
    }
    this.submittedText = value;
    this.props.onSubmit(value, completionId);
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

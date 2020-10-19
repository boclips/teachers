/* eslint-disable */
import { AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import { SearchProps } from 'antd/es/input';
import React, { Ref } from 'react';
import SearchIcon from 'resources/images/search-icon.png';
import CloseSVG from 'resources/images/close.svg';
import { Completion, completionsFor } from './completions';
import completionsTopics from './completionsTopics.json';
import './StatefulSearchBar.less';
import { v4 as uuidv4 } from 'uuid';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { fetchSuggestions } from 'src/services/suggestions/fetchSuggestions';

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
  onSubmit: (
    query: string,
    completionId?: string,
    completion?: Completion,
  ) => void;
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

  public findCompletions = async (query: string) => {
    if (query.length < 3) {
      this.setState({
        completions: [],
      });
      return;
    }

    const suggestions = await fetchSuggestions(query);

    console.log(query);

    const completionId = uuidv4();

    const getCompletions = completionsFor({
      topics: completionsTopics.map((text) => ({ value: text })),
      channels: suggestions.channels.map((channel) => ({
        value: channel.name,
        id: channel.id,
      })),
      subjects: suggestions.subjects.map((subject) => ({
        value: subject.name,
        id: subject.id,
      })),
    });

    const foundCompletions = getCompletions(query);

    this.setState({
      completions: foundCompletions,
      completionId,
    });

    this.state.completions?.length > 0 &&
      sendPublishSearchSuggestion(
        query,
        foundCompletions,
        completionId,
        this.state.componentId,
      );
  };

  public onSubmit = (e) => e.preventDefault();

  public render() {
    return (
      <form
        action=""
        onSubmit={this.onSubmit}
        className="searchbar"
        data-qa={'testing-form'}
      >
        <AutoComplete
          defaultActiveFirstOption={false}
          backfill
          dropdownAlign={{ offset: [0, 0] }}
          dropdownClassName="search-completions"
          options={this.optionsRender()}
          defaultValue={this.props.value}
          onSearch={this.findCompletions}
          onSelect={(suggestion) =>
            this.submit(
              suggestion,
              this.state.completionId,
              this.findSuggestionType(suggestion),
            )
          }
          style={{ width: '100%' }}
          data-qa={'testing-autocomplete'}
          listHeight={288}
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

  private findSuggestionType(value: string) {
    return this.state.completions.find(
      (completion) => completion.value === value,
    );
  }

  private optionsRender() {
    return this.state.completions.map((completion) => ({
      key: completion.text,
      value: completion.text,
      label: this.renderResult(completion),
      className: `${completion.list} completions`,
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

        {r.list === 'subjects' && (
          <span className="autocomplete--subject">Subject: </span>
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

  private submit(
    value: string,
    completionId?: string,
    completion?: Completion,
  ) {
    if (this.submittedText === value) {
      return;
    }
    this.submittedText = value;
    this.props.onSubmit(value, completionId, completion);
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

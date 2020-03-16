import queryString from 'query-string';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import SearchIconImg from 'resources/images/search-icon.png';
import {
  Completion,
  completionsFor,
} from 'src/components/searchBar/completions';
import completionsTopics from 'src/components/searchBar/completionsTopics.json';
import completionsCreatedBy from 'src/components/searchBar/completionsCreatedBy.json';
import { updateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import State from '../../types/State';
import './SearchBar.less';
import CloseSVG from '../../../resources/images/close.svg';

const getCompletions = completionsFor({
  topics: completionsTopics,
  channels: completionsCreatedBy,
});

const SearchBar = () => {
  const dispatch = useDispatch();
  const query: string = useSelector(
    (state: State) =>
      queryString.parse(state.router.location.search).q as string,
  );
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [value, setValue] = useState<string>(query || '');

  const handleSubmit = (search: string) => {
    if (value !== query) {
      dispatch(updateSearchParamsAction({ q: search }));
    }
  };

  const setDataSource = (txt: string) => {
    setCompletions(getCompletions(txt));
  };

  const ClearIcon = () =>
    value && (
      <span
        data-qa="clear-search-button"
        onClick={() => {
          setValue('');
          setDataSource('');
        }}
      >
        <CloseSVG />
      </span>
    );

  const options = completions.map(completion => (
    <AutoComplete.Option key={completion.text} value={completion.text}>
      {completion.list === 'channels' && (
        <span className="autocomplete--channel">Channel:&nbsp;</span>
      )}
      {completion.textWithHighlights.map((chunk, i) => (
        <span className={chunk.matches ? '' : 'completion-affix'} key={i + ''}>
          {chunk.text}
        </span>
      ))}
    </AutoComplete.Option>
  ));

  return (
    <form action="#" onSubmit={e => e.preventDefault()} className="searchbar">
      <AutoComplete
        defaultActiveFirstOption={false}
        backfill={true}
        dropdownClassName="search-completions"
        dataSource={options}
        onSearch={setDataSource}
        onSelect={handleSubmit}
        optionLabelProp="text"
        size="large"
        style={{ width: '100%' }}
        value={value}
        onChange={(newValue: string) => {
          setValue(newValue);
        }}
      >
        <Search
          prefix={<img src={SearchIconImg} alt="" />}
          placeholder="Enter your search term"
          type="search"
          data-qa="search-input"
          aria-label="search"
          onSearch={handleSubmit}
          enterButton="Search"
          size="large"
          suffix={ClearIcon()}
        />
      </AutoComplete>
    </form>
  );
};

const FreshSearchBar = () => {
  /**
   * We believe that ant-d Autocomplete renders the child with props that have
   * been mutated. It seems that when you select an autocompleted value that the
   * value passed to the input field is set to an empty string. Despite several
   * attempts we have been unable to correctly set the value on that input field.
   *
   * In order to mitigate this, we instead render a brand new SearchBar each
   * time the query changes in the URL. We do this by assigning a key to the
   * component which forces react to destroy the old and create a new.
   */
  const urlParams = useSelector((state: State) => state.router.location.search);

  const searchQuery = queryString.parse(urlParams).q as string;

  return <React.Fragment>{[<SearchBar key={searchQuery} />]}</React.Fragment>;
};

export default FreshSearchBar;

import queryString from 'query-string';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete } from 'antd';
import Search from 'antd/lib/input/Search';
import SearchIconImg from 'resources/images/search-icon.png';
import { completionsFor } from 'src/components/searchBar/completions';
import completionsTopics from 'src/components/searchBar/completionsTopics.json';
import completionsCreatedBy from 'src/components/searchBar/completionsCreatedBy.json';
import { updateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import State from '../../types/State';
import './SearchBar.less';

const getCompletions = completionsFor([
  ...completionsTopics,
  ...completionsCreatedBy,
]);

const SearchBar = () => {
  const dispatch = useDispatch();
  const query: string = useSelector(
    (state: State) =>
      queryString.parse(state.router.location.search).q as string,
  );
  const [completions, setCompletions] = useState([]);
  const [value, setValue] = useState<string>(query || '');

  const handleSubmit = (search: string) => {
    if (value !== query) {
      dispatch(updateSearchParamsAction({ q: search }));
    }
  };

  const setDataSource = (txt: string) => {
    setCompletions(getCompletions(txt));
  };

  const options = completions.map(completion => (
    <AutoComplete.Option key={completion.text} value={completion.text}>
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
        />
      </AutoComplete>
    </form>
  );
};

export default SearchBar;

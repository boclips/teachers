import Search from 'antd/lib/input/Search';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {actionCreatorFactory} from '../redux/actions';

export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface Props {
  onSearch: (query: string) => void
}

export class SearchView extends PureComponent<Props> {
  render() {
    return <section data-qa="search-page">
      <Search type="text" data-qa="search-input" onSearch={this.props.onSearch}></Search>

      <section>
        <div data-qa="search-result"><span data-qa="search-result-title"></span></div>
      </section>
    </section>;
  }
}

function mapDispatchToProps(dispatch: Dispatch): Props {
  return {onSearch: query => dispatch(searchVideosAction(query))};
}

export default connect(null, mapDispatchToProps)(SearchView);
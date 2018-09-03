import Search from 'antd/lib/input/Search';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {actionCreatorFactory} from '../redux/actions';
import {VideosState} from '../State';
import {Video} from './Video';

export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface DispatchProps {
  onSearch: (query: string) => void;
}

interface StateProps {
  videos: Video[];
}

export class SearchView extends PureComponent<DispatchProps & StateProps> {
  public render() {
    return (
      <section data-qa="search-page">
        <Search type="text" data-qa="search-input" onSearch={this.props.onSearch}/>
        <section>
          {this.renderVideos()}
        </section>
      </section>
    );
  }

  public renderVideos() {
    return this.props.videos.map(this.renderVideo);
  }

  public renderVideo(video: Video, index: number) {
    return (
      <div key={index} data-qa="search-result">
        <span data-qa="search-result-title">{video.title}</span>
      </div>
    );
  }
}

function mapStateToProps({videos}: VideosState): StateProps {
  return {videos};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {onSearch: (query) => dispatch(searchVideosAction(query))};
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(SearchView);

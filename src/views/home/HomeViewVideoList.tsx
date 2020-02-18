import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import HeaderLogoSVG from 'resources/images/recommendations-logo.svg';
import { SectionHeader } from 'src/components/common/SectionHeader';
import { fetchPromotedVideosAction } from 'src/components/video/redux/actions/fetchPromotedVideosAction';
import { getPromotedVideoIds } from 'src/components/video/redux/reducers/videoReducer';
import State from 'src/types/State';
import './HomeViewVideoList.less';
import { VideoType } from 'src/types/Video';
import VerticalVideoList from '../../components/video/list/VerticalVideoList';

interface DispatchProps {
  fetchPromotedVideos: () => void;
}

interface StateProps {
  videoIds: string[];
}

export class HomeViewVideoList extends React.PureComponent<
  DispatchProps & StateProps
> {
  public componentDidMount(): void {
    this.props.fetchPromotedVideos();
  }

  public render() {
    return (
      this.props.videoIds &&
      this.props.videoIds.length > 0 && (
        <section data-qa="home-view-videos" className="home-view-video-list">
          <SectionHeader
            title={'Videos for you'}
            description={'Watch a selection of some of our best videos'}
            image={HeaderLogoSVG}
          />
          <VerticalVideoList videoIds={this.props.videoIds} />
        </section>
      )
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  videoIds: getPromotedVideoIds(state),
});

export const linkFetchPromotedVideosToDispatch = (dispatch: Dispatch) => () => {
  dispatch(
    fetchPromotedVideosAction({
      filters: {
        promoted: true,
        isClassroom: true,
        type: [VideoType.STOCK, VideoType.INSTRUCTIONAL],
      },
      page: 1,
      size: 3,
      sortBy: 'RANDOM',
    }),
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchPromotedVideos: linkFetchPromotedVideosToDispatch(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeViewVideoList);

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import HeaderLogoSVG from '../../../resources/images/recommendations-logo.svg';
import { SectionHeader } from '../../components/common/SectionHeader';
import VerticalVideoList from '../../components/video/list/VerticalVideoList';
import { fetchPromotedVideosAction } from '../../components/video/redux/actions/fetchPromotedVideosAction';
import { getPromotedVideoIds } from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import './HomeViewVideoList.less';
import { VideoType } from '../../types/Video';

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
    const { fetchPromotedVideos } = this.props;
    fetchPromotedVideos();
  }

  public render() {
    const { videoIds } = this.props;
    return (
      videoIds &&
      videoIds.length > 0 && (
        <section data-qa="home-view-videos" className="home-view-video-list">
          <SectionHeader
            title="Videos for you"
            description="Watch a selection of some of our best videos"
            image={HeaderLogoSVG}
          />
          <VerticalVideoList videoIds={videoIds} />
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

const HomeViewVideoListView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeViewVideoList);

export default HomeViewVideoListView;

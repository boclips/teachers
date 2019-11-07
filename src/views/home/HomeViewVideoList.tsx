import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import HeaderLogoSVG from '../../../resources/images/recommendations-logo.svg';
import { Constants } from '../../app/AppConstants';
import { SectionHeader } from '../../components/common/SectionHeader';
import VerticalVideoList from '../../components/video/list/VerticalVideoList';
import { fetchPromotedVideosAction } from '../../components/video/redux/actions/fetchPromotedVideosAction';
import { getPromotedVideoIds } from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import './HomeViewVideoList.less';

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

const mapStateToProps = (state: State): StateProps => {
  return { videoIds: getPromotedVideoIds(state) };
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchPromotedVideos: () => {
      dispatch(
        fetchPromotedVideosAction({
          filters: {
            promoted: true,
            includeTags: [Constants.CLASSROOM],
            excludeTags: [Constants.NEWS],
          },
          page: 1,
          size: 3,
          sortBy: 'RANDOM',
        }),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeViewVideoList);

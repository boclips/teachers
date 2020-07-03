import Icon from '@ant-design/icons';
import { Button } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RemoveBookmarkSVG from '../../../../../resources/images/remove-video.svg';
import SaveBookmarkSVG from '../../../../../resources/images/save.svg';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { VideoCollection } from '../../../../types/VideoCollection';
import { A11yButton } from '../../../common/a11y/A11yButton';
import { bookmarkCollectionAction } from '../../redux/actions/bookmarkCollectionAction';
import { unbookmarkCollectionAction } from '../../redux/actions/unbookmarkCollectionAction';
import './BookmarkCollectionButton.less';

interface OwnProps {
  collection: VideoCollection;
}

interface DispatchProps {
  onBookmarkCollectionAction: (VideoCollection) => void;
  onUnbookmarkCollectionAction: (VideoCollection) => void;
}

export class BookmarkCollectionButtonInner extends PureComponent<
  OwnProps & DispatchProps
> {
  private onClick = (event: React.SyntheticEvent<HTMLElement>) => {
    if (this.props.collection.links.bookmark) {
      this.bookmarkCollection();
    } else {
      this.unBookmarkCollection();
    }

    if (event.type === 'click') {
      event.currentTarget.blur();
    }
  };

  private bookmarkCollection = () => {
    AnalyticsFactory.externalAnalytics().trackCollectionBookmarked(
      this.props.collection,
    );
    this.props.onBookmarkCollectionAction(this.props.collection);
  };

  private unBookmarkCollection = () => {
    AnalyticsFactory.externalAnalytics().trackCollectionUnbookmarked(
      this.props.collection,
    );
    this.props.onUnbookmarkCollectionAction(this.props.collection);
  };

  public render() {
    if (this.props.collection.links.bookmark) {
      return (
        <A11yButton callback={this.onClick}>
          <Button
            className="bookmark-icon bookmark-button"
            data-qa="bookmark-collection"
          >
            <>
              <Icon
                component={SaveBookmarkSVG}
                aria-label="Bookmark a collection"
                title="Button to bookmark a collection"
                className="bookmark-button__icon"
              />
              <span>Save</span>
            </>
          </Button>
        </A11yButton>
      );
    }
    if (this.props.collection.links.unbookmark) {
      return (
        <A11yButton callback={this.onClick}>
          <Button
            className="bookmark-icon bookmark-button"
            data-qa="unbookmark-collection"
          >
            <>
              <Icon
                component={RemoveBookmarkSVG}
                aria-label="Remove collection bookmark"
                title="Button to remove the collection bookmark"
                className="bookmark-button__icon"
              />
              <span>Remove</span>
            </>
          </Button>
        </A11yButton>
      );
    }
    return null;
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onBookmarkCollectionAction: (collection: VideoCollection) =>
      dispatch(bookmarkCollectionAction(collection)),
    onUnbookmarkCollectionAction: (collection: VideoCollection) =>
      dispatch(unbookmarkCollectionAction(collection)),
  };
}

export default connect<{}, DispatchProps, OwnProps>(
  undefined,
  mapDispatchToProps,
)(BookmarkCollectionButtonInner);

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import BookmarkEmptySVG from '../../../../../resources/images/bookmarked.svg';
import BookmarkFilledSVG from '../../../../../resources/images/unbookmarked.svg';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { VideoCollection } from '../../../../types/VideoCollection';
import { A11yButton } from '../../../common/A11yButton';
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
  public render() {
    if (
      !this.props.collection.links.bookmark &&
      !this.props.collection.links.unbookmark
    ) {
      return null;
    }
    return (
      <A11yButton callback={this.onClick}>
        <section
          tabIndex={0}
          role="button"
          className="top-right-icon bookmark-icon bookmark-button"
        >
          {this.props.collection.links.bookmark && (
            <BookmarkFilledSVG
              data-qa="bookmark-collection"
              aria-label="Bookmark a collection"
              title="Button to bookmark a collection"
            />
          )}

          {this.props.collection.links.unbookmark && (
            <BookmarkEmptySVG
              data-qa="unbookmark-collection"
              aria-label="Unbookmark a collection"
              title="Button to unbookmark a collection"
            />
          )}
        </section>
      </A11yButton>
    );
  }

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

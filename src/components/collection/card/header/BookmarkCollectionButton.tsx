import React, { PureComponent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import BookmarkEmpty from '../../../../../resources/images/bookmarked.svg';
import BookmarkFilled from '../../../../../resources/images/unbookmarked.svg';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { VideoCollection } from '../../../../types/VideoCollection';
import { A11yButton } from '../../../common/A11yButton';
import { bookmarkCollectionAction } from '../../redux/actions/bookmarkCollectionAction';
import { unbookmarkCollectionAction } from '../../redux/actions/unbookmarkCollectionAction';
import './BookmarkCollectionButton.less';
import './RemoveCollectionButton.less';

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
    return (
      <A11yButton callback={this.onClick}>
        <section
          tabIndex={0}
          role="button"
          className="top-right-icon bookmark-icon bookmark-button"
        >
          {this.props.collection.links.bookmark && (
            <BookmarkFilled
              data-qa="bookmark-collection"
              aria-label="Bookmark a collection"
            />
          )}

          {this.props.collection.links.unbookmark && (
            <BookmarkEmpty
              data-qa="unbookmark-collection"
              aria-label="Unbookmark a collection"
            />
          )}
        </section>
      </A11yButton>
    );
  }

  private onClick = (e: SyntheticEvent) => {
    if (this.props.collection.links.bookmark) {
      this.bookmarkCollection(e);
    } else {
      this.unbookmarkCollection(e);
    }
  };

  private bookmarkCollection = (e: SyntheticEvent) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    AnalyticsFactory.getInstance().trackCollectionBookmarked(
      this.props.collection,
    );
    this.props.onBookmarkCollectionAction(this.props.collection);
  };

  private unbookmarkCollection = (e: SyntheticEvent) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    AnalyticsFactory.getInstance().trackCollectionUnbookmarked(
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

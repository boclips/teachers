import React, { PureComponent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import bookmarkEmpty from '../../../../resources/images/bookmarked.svg';
import bookmarkFilled from '../../../../resources/images/unbookmarked.svg';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { VideoCollection } from '../../../types/VideoCollection';
import { bookmarkCollectionAction } from '../redux/actions/bookmarkCollectionAction';
import { unbookmarkCollectionAction } from '../redux/actions/unbookmarkCollectionAction';
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
      <section className={'bookmark-button'}>
        {this.props.collection.links.bookmark ? (
          <img
            data-qa="bookmark-collection"
            className="top-right-icon bookmark-icon"
            onClick={this.bookmarkCollection}
            src={bookmarkFilled}
            alt=""
            tabIndex={0}
            role="button"
            aria-label="Bookmark a collection"
          />
        ) : null}

        {this.props.collection.links.unbookmark ? (
          <img
            data-qa="unbookmark-collection"
            className="top-right-icon bookmark-icon"
            onClick={this.unbookmarkCollection}
            src={bookmarkEmpty}
            alt=""
            tabIndex={0}
            role="button"
            aria-label="Unbookmark a collection"
          />
        ) : null}
      </section>
    );
  }

  public bookmarkCollection = (e: SyntheticEvent) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    AnalyticsFactory.getInstance().trackCollectionBookmarked(
      this.props.collection,
    );
    this.props.onBookmarkCollectionAction(this.props.collection);
  };

  public unbookmarkCollection = (e: SyntheticEvent) => {
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

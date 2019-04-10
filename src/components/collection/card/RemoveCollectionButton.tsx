import { Icon, Modal } from 'antd';
import React, { PureComponent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { VideoCollection } from '../../../types/VideoCollection';
import { deleteCollectionAction } from '../redux/actions/deleteCollectionAction';
import './RemoveCollectionButton.less';

interface OwnProps {
  collection: VideoCollection;
}

interface DispatchProps {
  onDeleteCollectionAction: (VideoCollection) => void;
}

export class RemoveCollectionButtonInner extends PureComponent<
  OwnProps & DispatchProps
> {
  public render() {
    return this.props.collection.links.remove ? (
      <Icon
        data-qa="delete-collection"
        className="delete-collection__icon top-right-icon"
        onClick={this.removeCollection}
        type="delete"
        theme="filled"
      />
    ) : null;
  }

  public removeCollection = (e: SyntheticEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const confirm = Modal.confirm;

    confirm({
      title: `Are you sure you want to delete the collection "${
        this.props.collection.title
      }"?`,
      onOk: this.confirmRemoveCollection,
      okText: 'Delete',
      okButtonProps: {
        size: 'large',
        style: {
          width: '120px',
          marginRight: '4px',
        },
      },
      cancelButtonProps: {
        size: 'large',
        style: {
          width: '120px',
          marginRight: '12px',
        },
      },
    });
  };
  public doggy() {}
  public confirmRemoveCollection = () => {
    AnalyticsFactory.getInstance().trackCollectionRemoved(
      this.props.collection,
    );
    this.props.onDeleteCollectionAction(this.props.collection);
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onDeleteCollectionAction: (colleciton: VideoCollection) =>
      dispatch(deleteCollectionAction(colleciton)),
  };
}

export default connect<{}, DispatchProps, OwnProps>(
  undefined,
  mapDispatchToProps,
)(RemoveCollectionButtonInner);

import { Icon, Modal } from 'antd';
import Button from 'antd/lib/button';
import React, { PureComponent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import DeleteIconSVG from '../../../../resources/images/delete-collection.svg';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { VideoCollection } from '../../../types/VideoCollection';
import { deleteCollectionAction } from '../redux/actions/deleteCollectionAction';
import './RemoveCollectionButton.less';

interface OwnProps {
  collection: VideoCollection;
  classNameModifier?: string;
}

interface DispatchProps {
  onDeleteCollectionAction: (VideoCollection) => void;
}

export class RemoveCollectionButtonInner extends PureComponent<
  OwnProps & DispatchProps
> {
  public render() {
    return this.props.collection.links.remove ? (
      <Button
        onClick={this.removeCollection}
        data-qa="delete-collection"
        size={'large'}
        aria-label="Delete collection"
        className={`collection-edit__button ${this.props.classNameModifier ||
          ''}`}
      >
        <Icon component={DeleteIconSVG} aria-label="Delete collection" />
        Delete
      </Button>
    ) : null;
  }

  public removeCollection = (e: SyntheticEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const confirm = Modal.confirm;

    confirm({
      title: (
        <span>
          Are you sure you want to delete the collection{' '}
          <i>{this.props.collection.title}</i>?
        </span>
      ),
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
  public confirmRemoveCollection = () => {
    AnalyticsFactory.mixpanel().trackCollectionRemoved(this.props.collection);
    this.props.onDeleteCollectionAction(this.props.collection);
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onDeleteCollectionAction: (collection: VideoCollection) => {
      dispatch(deleteCollectionAction(collection));
    },
  };
}

export default connect<{}, DispatchProps, OwnProps>(
  undefined,
  mapDispatchToProps,
)(RemoveCollectionButtonInner);

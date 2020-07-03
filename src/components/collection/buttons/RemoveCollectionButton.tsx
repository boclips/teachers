import Icon from '@ant-design/icons';
import { Modal } from 'antd';
import Button from 'antd/lib/button';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIconSVG from '../../../../resources/images/delete-collection.svg';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { VideoCollection } from '../../../types/VideoCollection';
import { deleteCollectionAction } from '../redux/actions/deleteCollectionAction';
import './RemoveCollectionButton.less';

interface Props {
  collection: VideoCollection;
  onOpen?: () => void;
  onClose?: () => void;
}

export const RemoveCollectionButton = React.memo((props: Props) => {
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (props.onOpen) {
      props.onOpen();
    }

    const { confirm } = Modal;

    confirm({
      title: (
        <span>
          Are you sure you want to delete the collection{' '}
          <i>{props.collection.title}</i>?
        </span>
      ),
      onOk: () => {
        AnalyticsFactory.externalAnalytics().trackCollectionRemoved(
          props.collection,
        );
        dispatch(deleteCollectionAction(props.collection));
      },
      onCancel: () => {
        if (props.onClose) {
          props.onClose();
        }
      },
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

  if (props.collection.links.remove) {
    return (
      <Button
        onClick={handleClick}
        data-qa="delete-collection"
        size="large"
        aria-label="Delete collection"
        type="link"
        className="delete"
      >
        <Icon component={DeleteIconSVG} aria-label="Delete collection" />
        Delete Collection
      </Button>
    );
  }
  return null;
});

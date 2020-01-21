import { Icon, Modal } from 'antd';
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
}

export const RemoveCollectionButton = React.memo(({ collection }: Props) => {
  if (!collection.links.remove) {
    return null;
  }

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const confirm = Modal.confirm;

    confirm({
      title: (
        <span>
          Are you sure you want to delete the collection{' '}
          <i>{collection.title}</i>?
        </span>
      ),
      onOk: () => {
        AnalyticsFactory.externalAnalytics().trackCollectionRemoved(collection);
        dispatch(deleteCollectionAction(collection));
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

  return (
    <Button
      onClick={handleClick}
      data-qa="delete-collection"
      size="large"
      aria-label="Delete collection"
      className="collection-edit__button"
    >
      <Icon component={DeleteIconSVG} aria-label="Delete collection" />
      Delete
    </Button>
  );
});

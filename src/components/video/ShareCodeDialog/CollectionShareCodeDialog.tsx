import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Bodal from '../../common/Bodal';
import './ShareCodeDialog.less';
import { fetchCollectionAction } from '../../collection/redux/actions/fetchCollectionAction';
import State from '../../../types/State';
import { useRefererIdInjector } from '../../../hooks/useRefererIdInjector';

interface Props {
  collectionId: string;
}

export const CollectionShareCodeDialog = React.memo((props: Props) => {
  const referer = useRefererIdInjector();

  if (!referer || referer === 'anonymous') {
    return null;
  }

  const [shareCode, setShareCode] = useState('');
  const [visible, setVisible] = useState(true);
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const collection = useSelector(
    (state: State) => state.entities.collections.byId[props.collectionId],
  );
  const collectionsLoading = useSelector(
    (state: State) => state.collections.loading,
  );

  useEffect(() => {
    if (collection) {
      setVisible(false);
    } else {
      setVisible(true);
      if (submitted && !collectionsLoading) {
        setCodeInvalid(true);
      }
    }
  }, [collection, collectionsLoading, setVisible, submitted]);

  const handleSubmit = event => {
    dispatch(
      fetchCollectionAction({
        id: props.collectionId,
        referer,
        shareCode,
      }),
    );
    // Start loading spinner
    setSubmitted(true);
    event.preventDefault();
    return false;
  };

  const handleOnChange = event => {
    setShareCode(event.currentTarget.value);
  };

  return (
    <Bodal
      closable={false}
      destroyOnClose={true}
      visible={visible}
      footer={null}
      title={`Enter code to view collection`}
      width="360px"
      className={classnames('share-code-dialog', {
        'share-code-dialog--invalid': codeInvalid,
      })}
    >
      <form action="#" onSubmit={handleSubmit}>
        <Input
          size={'large'}
          type="text"
          className="share-code-dialog__input"
          placeholder="Enter code"
          value={shareCode}
          onChange={handleOnChange}
        />
        <Button
          className="share-code-dialog__button"
          type={'primary'}
          size={'large'}
          disabled={shareCode.length === 0}
          htmlType="submit"
        >
          View collection
        </Button>
      </form>
      {codeInvalid && (
        <p className="share-code-dialog__validation">Invalid code</p>
      )}
    </Bodal>
  );
});

import queryString from 'querystring';
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import validateShareCode from '../../../services/videos/validateShareCode';
import Bodal from '../../common/Bodal';
import State from '../../../types/State';
import './ShareCodeDialog.less';

export const ShareCodeDialog = React.memo(() => {
  const validationLink = useSelector(
    (state: State) => state.links.validateShareCode,
  );
  const [shareCode, setShareCode] = useState('');
  const [visible, setVisible] = useState(true);
  const [codeInvalid, setCodeInvalid] = useState(false);

  const search = useSelector((state: State) => state.router.location.search);
  const refererId = queryString.decode(search.substr(1)).referer as string;

  if (!refererId) {
    return null;
  }

  const handleSubmit = event => {
    validateShareCode(validationLink, refererId, shareCode).then(valid => {
      if (valid) {
        setVisible(false);
      } else {
        setCodeInvalid(true);
      }
    });
    event.preventDefault();
    return false;
  };

  const handleOnChange = event => {
    setShareCode(event.currentTarget.value);
    setCodeInvalid(false);
  };

  return (
    <Bodal
      closable={false}
      destroyOnClose={true}
      visible={visible}
      footer={null}
      title="Enter code to watch video"
      width="360px"
      className={classnames('share-code-dialog', {
        'share-code-dialog--invalid': codeInvalid,
      })}
    >
      <form onSubmit={handleSubmit}>
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
          Watch video
        </Button>
      </form>
      <p className="share-code-dialog__validation">Invalid code</p>
    </Bodal>
  );
});

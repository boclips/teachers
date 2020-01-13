import queryString from 'querystring';
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import validateShareCode from '../../../services/videos/validateShareCode';
import Bodal from '../../common/Bodal';
import State from '../../../types/State';

export const ShareCodeDialog = React.memo(() => {
  const validationLink = useSelector(
    (state: State) => state.links.validateShareCode,
  );
  const [shareCode, setShareCode] = useState('');
  const [visible, setVisible] = useState(true);

  const search = useSelector((state: State) => state.router.location.search);
  const refererId = queryString.decode(search.substr(1)).referer as string;

  if (!refererId) {
    return null;
  }

  const handleOnClick = () => {
    validateShareCode(validationLink, refererId, shareCode).then(valid => {
      if (valid) {
        setVisible(false);
      }
    });
  };

  return (
    <Bodal
      closable={false}
      destroyOnClose={true}
      visible={visible}
      footer={null}
      title="Enter code to watch video"
      width="360px"
      className="share-code-dialog"
    >
      <Input
        type="text"
        placeholder="Enter code"
        value={shareCode}
        onChange={event => setShareCode(event.currentTarget.value)}
      />
      <Button disabled={shareCode.length === 0} onClick={handleOnClick}>
        Watch video
      </Button>
    </Bodal>
  );
});

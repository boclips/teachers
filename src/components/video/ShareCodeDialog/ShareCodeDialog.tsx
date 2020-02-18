import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import validateShareCode from 'src/services/videos/validateShareCode';
import State from 'src/types/State';
import Bodal from '../../common/Bodal';
import './ShareCodeDialog.less';

interface Props {
  userId: string;
}

export const ShareCodeDialog = React.memo((props: Props) => {
  const validationLink = useSelector(
    (state: State) => state.links.entries.validateShareCode,
  );
  const [shareCode, setShareCode] = useState('');
  const [visible, setVisible] = useState(true);
  const [codeInvalid, setCodeInvalid] = useState(false);

  const handleSubmit = event => {
    validateShareCode(validationLink, props.userId, shareCode).then(valid => {
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
          Watch video
        </Button>
      </form>
      <p className="share-code-dialog__validation">Invalid code</p>
    </Bodal>
  );
});

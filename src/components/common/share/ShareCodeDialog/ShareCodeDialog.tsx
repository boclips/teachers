import { Button, Input } from 'antd';
import React, { useState } from 'react';
import classnames from 'classnames';
import Bodal from '../../Bodal';
import './ShareCodeDialog.less';

interface Props {
  title: string;
  cta: string;
  onSubmit: (shareCode: string) => void;
  visible: boolean;
  codeInvalid: boolean;
}

export const ShareCodeDialog = (props: Props) => {
  const [shareCode, setShareCode] = useState('');

  return (
    <Bodal
      closable={false}
      destroyOnClose={true}
      visible={props.visible}
      footer={null}
      title={props.title}
      width="360px"
      className="share-code-dialog"
    >
      <form
        action="#"
        onSubmit={event => {
          props.onSubmit(shareCode);

          event.preventDefault();
          return false;
        }}
      >
        <Input
          size={'large'}
          type="text"
          className={classnames('share-code-dialog__input', {
            'share-code-dialog__input--invalid': props.codeInvalid,
          })}
          placeholder="Enter code"
          data-qa="share-code-input"
          value={shareCode}
          onChange={event => {
            setShareCode(event.currentTarget.value);
          }}
        />
        <Button
          className="share-code-dialog__button"
          data-qa="share-code-submit"
          type={'primary'}
          size={'large'}
          disabled={shareCode.length === 0}
          htmlType="submit"
        >
          {props.cta}
        </Button>
      </form>
      <p
        className="share-code-dialog__validation"
        style={{ visibility: props.codeInvalid ? 'visible' : 'hidden' }}
      >
        Invalid code
      </p>
    </Bodal>
  );
};

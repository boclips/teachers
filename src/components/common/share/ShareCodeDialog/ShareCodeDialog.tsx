import { Button, Input } from 'antd';
import React, { useState } from 'react';
import classnames from 'classnames';
import './ShareCodeDialog.less';
import { storeReferrerShareCodeAction } from 'src/app/redux/authentication/actions/storeReferrerShareCodeAction';
import { useRefererIdInjector } from 'src/hooks/useRefererIdInjector';
import { checkShareCode } from 'src/services/shareCodes/checkShareCode';
import { useDispatch } from 'react-redux';
import Bodal from '../../Bodal';

interface Props {
  title: string;
  cta: string;
}

export const ShareCodeDialog = (props: Props) => {
  const [shareCode, setShareCode] = useState('');
  const [codeInvalid, setCodeInvalid] = useState(false);
  const [visible, setVisible] = useState(true);
  const referrer = useRefererIdInjector();
  const dispatch = useDispatch();

  const handleSubmit = (code: string) => {
    checkShareCode(referrer, code).then((valid) => {
      if (valid) {
        dispatch(
          storeReferrerShareCodeAction({
            shareCode: code,
            refererId: referrer,
          }),
        );
        setVisible(false);
      } else {
        setCodeInvalid(true);
      }
    });
  };

  return (
    <Bodal
      closable={false}
      destroyOnClose={true}
      visible={visible}
      footer={null}
      title={props.title}
      width="360px"
      className="share-code-dialog"
    >
      <div className={'share-code-dialog__explainer'}>
        {"Don't have a code? Ask your teacher."}
      </div>
      <form
        action="#"
        onSubmit={(event) => {
          handleSubmit(shareCode);

          event.preventDefault();
          return false;
        }}
      >
        <Input
          size={'large'}
          type="text"
          className={classnames('share-code-dialog__input', {
            'share-code-dialog__input--invalid': codeInvalid,
          })}
          placeholder="Enter code"
          data-qa="share-code-input"
          value={shareCode}
          onChange={(event) => {
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
      {codeInvalid && (
        <p className="share-code-dialog__validation">Invalid code</p>
      )}
    </Bodal>
  );
};

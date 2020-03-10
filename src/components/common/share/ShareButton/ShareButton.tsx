import React, { useState } from 'react';
import Icon from '@ant-design/icons';
import { Button } from 'antd';
import ShareSVG from 'resources/images/share.svg';
import Bodal from 'src/components/common/Bodal';
import './ShareButton.less';

interface Props {
  title: string;
  children: React.ReactNode;
  shareCode?: string;
}

export const ShareButton = (props: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)} data-qa={'share-button'}>
        <Icon component={ShareSVG} />
        <span>Share</span>
      </Button>
      <Bodal
        title={props.title}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={
          <section className="share-code">
            <p className="share-code__explainer">
              Share this code with the link for access:
            </p>
            <span className="share-code__code">{props.shareCode}</span>
          </section>
        }
        wrapClassName="share-modal"
      >
        {props.children}
      </Bodal>
    </React.Fragment>
  );
};

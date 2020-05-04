import React from 'react';
import Bodal from '../Bodal';
import { ShareModelProps } from './ShareButton/ShareButton';

interface Props extends ShareModelProps {
  visible: boolean;
  onCancel: () => void;
}

export const ShareModal = (props: Props) => (
  <Bodal
    title={props.title}
    visible={props.visible}
    onCancel={props.onCancel}
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
);

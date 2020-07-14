import React from 'react';
import Bodal from '../Bodal';
import { ShareModelProps } from './ShareButton/ShareButton';

interface Props extends ShareModelProps {
  visible: boolean;
  onCancel: () => void;
  getContainer?: string | HTMLElement | GetContainer | false | null;
}

type GetContainer = () => HTMLElement;

export const ShareModal = (props: Props) => (
  <Bodal
    title={props.title}
    visible={props.visible}
    onCancel={props.onCancel}
    getContainer={props.getContainer}
    width={610}
    footer={
      <section className="share-code">
        <p className="share-code__explainer">
          <span className="share-code__explainer__bold">
            Share your unique teacher code with students
          </span>
          &nbsp;to give them access
          <br />
          <span className="share-code__explainer__sub-info">
            (teachers logged into Boclips will not need to use this)
          </span>
        </p>
        <span className="share-code__code">{props.shareCode}</span>
      </section>
    }
    wrapClassName="share-modal"
  >
    {props.children}
  </Bodal>
);

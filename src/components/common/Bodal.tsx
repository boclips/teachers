import Modal, { ModalProps } from 'antd/lib/modal';
import React from 'react';
import './Bodal.less';

export default class Bodal extends React.Component<ModalProps> {
  public render() {
    return (
      <Modal wrapClassName="generic-modal" {...this.props}>
        {this.props.children}
      </Modal>
    );
  }
}

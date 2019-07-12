import Modal, { ModalProps } from 'antd/lib/modal';
import classnames from 'classnames';
import React from 'react';
import './Bodal.less';

export default class Bodal extends React.Component<ModalProps> {
  public render() {
    return (
      <Modal
        {...this.props}
        wrapClassName={classnames('generic-modal', this.props.wrapClassName)}
      >
        {this.props.children}
      </Modal>
    );
  }
}

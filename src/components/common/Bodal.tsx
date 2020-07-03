import Modal, { ModalProps } from 'antd/lib/modal';
import React, { ReactNode } from 'react';
import c from 'classnames';
import './Bodal.less';

interface BodalProps extends ModalProps {
  children?: ReactNode;
}

const Bodal = (props: BodalProps) => {
  return (
    // eslint-disable-next-line
    <Modal {...props} wrapClassName={c('generic-modal', props.wrapClassName)}>
      {props.children}
    </Modal>
  );
};

export default Bodal;

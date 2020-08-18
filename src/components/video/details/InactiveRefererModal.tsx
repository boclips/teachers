import Bodal from 'src/components/common/Bodal';
import SadStudentSVG from 'resources/images/sad-student.svg';
import React from 'react';
import './InactiveRefererModal.less';

export const InactiveRefererModal = () => (
  <Bodal
    closable={false}
    destroyOnClose
    visible
    footer={null}
    width="380px"
    className="invalid-referer-popup"
  >
    <div className="body-wrapper">
      <SadStudentSVG />
      <span className="message">
        This video needs an up to date code to be watched, please get in touch
        with your teacher.
      </span>
    </div>
  </Bodal>
);

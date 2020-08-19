import Bodal from 'src/components/common/Bodal';
import SadStudentSVG from 'resources/images/sad-student.svg';
import React from 'react';
import './InactiveRefererModal.less';

interface Props {
  resourceType: string;
}
export const InactiveRefererModal = ({ resourceType }: Props) => (
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
        This {resourceType} needs an up to date code to be watched, please get
        in touch with your teacher.
      </span>
    </div>
  </Bodal>
);

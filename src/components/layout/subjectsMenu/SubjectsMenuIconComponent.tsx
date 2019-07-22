import classnames from 'classnames';
import React from 'react';
import MySubjectSVG from '../../../../resources/images/subjects.svg';
import { A11yButton } from '../../common/A11yButton';

interface Props {
  onClick?: () => void;
  className?: string;
}

const SubjectsMenuIconComponent = React.memo((props: Props) => (
  <A11yButton callback={props.onClick}>
    <div className={classnames('navbar-buttons__button', props.className)}>
      <MySubjectSVG
        className="account-menu-icon ant-dropdown-link"
        data-qa="subjects-menu-open"
        tabIndex={0}
        aria-haspopup="true"
        aria-hidden="true"
      />
      <span className={'icon-label'}>Subjects</span>
    </div>
  </A11yButton>
));

export default SubjectsMenuIconComponent;

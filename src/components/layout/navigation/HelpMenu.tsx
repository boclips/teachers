import { Dropdown, Menu } from 'antd';
import React, { useCallback, useState } from 'react';
import DropdownMenuIconComponent from 'src/components/layout/navigation/DropdownMenuIconComponent';
import HelpIcon from 'resources/images/help-rollover.svg';
import TeacherTrainingIcon from 'resources/images/teacher-training.svg';
import RemoteLearningIcon from 'resources/images/remote-learning.svg';
import TutorialsIcon from 'resources/images/tutorials.svg';
import { Link } from 'react-router-dom';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';

export const HelpMenu = () => {
  const [visible, setVisible] = useState(false);
  const trackHelpOpened = useCallback(
    () =>
      AnalyticsFactory.internalAnalytics().trackPlatformInteraction(
        PlatformInteractionType.HELP_MENU_CLICKED,
      ),
    [],
  );

  const menuContent = () => (
    <Menu className="button-menu button-menu--desktop">
      <Menu.Item>
        <a href="https://www.boclips.com/training" target="_blank">
          <span className="icon-container">
            <TutorialsIcon aria-hidden="true" />
          </span>
          <span>Tutorials</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href="https://www.boclips.com/remote-learning-with-video-resources-for-teachers"
          target="_blank"
        >
          <span className="icon-container">
            <RemoteLearningIcon aria-hidden="true" />
          </span>
          <span>Remote learning</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link to="/discover-collections?subject=5cb1f6ba5c9cb675c59df37e">
          <span className="icon-container">
            <TeacherTrainingIcon aria-hidden="true" />
          </span>
          <span>Teacher training</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="display-desktop">
      <Dropdown
        overlay={menuContent}
        trigger={['click']}
        placement="bottomRight"
        onVisibleChange={setVisible}
      >
        <DropdownMenuIconComponent
          dataQa={'tutorial-menu-open'}
          active={visible}
          icon={<HelpIcon />}
          label="Help"
          onClick={trackHelpOpened}
        />
      </Dropdown>
    </div>
  );
};

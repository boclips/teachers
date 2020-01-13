import { Button, Icon } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShareSVG from '../../../../../resources/images/share.svg';
import { Video } from '../../../../types/Video';
import { ShareModal } from '../../sharing/ShareModal';
import './ShareButton.less';
import State from '../../../../types/State';

interface Props {
  video: Video;
  mobileView: boolean;
}

export const ShareButton = React.memo<Props>(props => {
  const [visible, setVisible] = useState(false);
  const isAuthenticated = useSelector((state: State) => !!state.user);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)}>
        <Icon component={ShareSVG} />
        <span>Share</span>
      </Button>
      <ShareModal
        video={props.video}
        handleClose={() => setVisible(false)}
        mobileView={props.mobileView}
        visible={visible}
      />
    </React.Fragment>
  );
});

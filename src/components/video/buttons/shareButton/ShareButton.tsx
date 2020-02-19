import { Button, Icon } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShareSVG from '../../../../../resources/images/share.svg';
import { Video } from '../../../../types/Video';
import { VideoShareModal } from '../../sharing/VideoShareModal/VideoShareModal';
import './ShareButton.less';
import State from '../../../../types/State';

interface Props {
  video: Video;
}

export const ShareButton = React.memo<Props>(props => {
  const [visible, setVisible] = useState(false);
  const isAuthenticated = useSelector((state: State) => !!state.user);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <React.Fragment>
      <Button onClick={() => setVisible(true)} data-qa={'share-button'}>
        <Icon component={ShareSVG} />
        <span>Share</span>
      </Button>
      <VideoShareModal
        video={props.video}
        handleClose={() => setVisible(false)}
        visible={visible}
      />
    </React.Fragment>
  );
});

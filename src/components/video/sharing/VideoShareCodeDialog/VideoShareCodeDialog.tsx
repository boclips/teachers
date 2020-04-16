import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import validateShareCode from '../../../../services/videos/validateShareCode';
import State from '../../../../types/State';
import { ShareCodeDialog } from '../../../common/share/ShareCodeDialog/ShareCodeDialog';

interface Props {
  userId: string;
}

export const VideoShareCodeDialog = React.memo((props: Props) => {
  const validationLink = useSelector(
    (state: State) => state.links.entries.validateShareCode,
  );
  const [visible, setVisible] = useState(true);
  const [codeInvalid, setCodeInvalid] = useState(false);

  const handleSubmit = (shareCode) => {
    validateShareCode(validationLink, props.userId, shareCode).then((valid) => {
      if (valid) {
        setVisible(false);
      } else {
        setCodeInvalid(true);
      }
    });
  };

  return (
    <ShareCodeDialog
      visible={visible}
      codeInvalid={codeInvalid}
      onSubmit={handleSubmit}
      title="Enter code to watch video"
      cta="Watch video"
    />
  );
});

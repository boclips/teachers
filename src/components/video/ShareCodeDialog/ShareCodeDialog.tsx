import React from 'react';
import { Button, Input } from 'antd';
import { Video } from '../../../types/Video';
import validateShareCode from '../../../services/videos/validateShareCode';
import Bodal from '../../common/Bodal';

interface Props {
  video: Video;
}

interface State {
  shareCode: string;
  modalVisible: boolean;
}

export class ShareCodeDialog extends React.Component<Props, State> {
  public state = {
    shareCode: '',
    modalVisible: true,
  };
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ shareCode: event.currentTarget.value });
  };

  public render() {
    return (
      <Bodal
        closable={false}
        destroyOnClose={true}
        visible={this.state.modalVisible}
        footer={null}
        title="Enter code to watch video"
        width="360px"
        className="share-code-dialog"
      >
        <Input
          type={'text'}
          placeholder={'Enter code'}
          value={this.state.shareCode}
          onChange={this.handleChange}
        />
        <Button onClick={this.validateCode}>Watch video</Button>
      </Bodal>
    );
  }
  private validateCode = async () => {
    if (await validateShareCode(this.props.video, this.state.shareCode)) {
      this.setState({ modalVisible: false });
    }
  };
}

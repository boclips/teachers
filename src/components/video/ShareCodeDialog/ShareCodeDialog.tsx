import React from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import validateShareCode from '../../../services/videos/validateShareCode';
import Bodal from '../../common/Bodal';
import State from '../../../types/State';
import { Link } from '../../../types/Link';

interface StateProps {
  shareCode: string;
  modalVisible: boolean;
}

interface OwnProps {
  validateShareCodeLink: Link;
}

class ShareCodeDialogComponent extends React.Component<OwnProps, StateProps> {
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
    if (
      await validateShareCode(
        this.props.validateShareCodeLink,
        this.state.shareCode,
      )
    ) {
      this.setState({ modalVisible: false });
    }
  };
}
const mapStateToProps = (state: State): OwnProps => ({
  validateShareCodeLink: state.links.validateShareCode,
});
export const ShareCodeDialog = connect(
  mapStateToProps,
  null,
)(ShareCodeDialogComponent);

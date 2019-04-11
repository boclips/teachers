import { Button } from 'antd';
import React from 'react';
import Bodal from './common/Bodal';
import AnalyticsFactory from "../services/analytics/AnalyticsFactory";

interface Props {
  text: string;
}

interface State {
  visible: boolean;
}

export default class ReferAFriend extends React.Component<Props, State> {
  public iframe = {
    __html:
      '<iframe src="https://boclips.referralrock.com/promotion/1/?widget=1" style="background-color: white; height:800px; width:100%;" />',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  public render() {
    return (
      <React.Fragment>
        <a href="#" onClick={this.openModal}>
          {this.props.text}
        </a>

        <Bodal
          title="Refer a friend"
          closable={false}
          visible={this.state.visible}
          onOk={this.closeModal}
          okText="Close"
          width={655}
          footer={[
            <Button key="submit" type="primary" onClick={this.closeModal}>
              Close
            </Button>,
          ]}
        >
          <div dangerouslySetInnerHTML={this.iframe} />
        </Bodal>
      </React.Fragment>
    );
  }

  private openModal = () => {
    this.setState({ visible: true });
    AnalyticsFactory.getInstance().trackReferAFriendModalOpened()
  };

  private closeModal = () => {
    this.setState({ visible: false });
    AnalyticsFactory.getInstance().trackReferAFriendModalClosed()
  };
}

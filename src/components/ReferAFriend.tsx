import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import AnalyticsFactory from '../services/analytics/AnalyticsFactory';
import { UserProfile } from '../services/users/UserProfile';
import { LoginState } from '../types/State';
import { A11yButton } from './common/A11yButton';
import Bodal from './common/Bodal';
import ReferAFriendUrlBuilder from './ReferAFriendUrlBuilder';

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

interface State {
  visible: boolean;
}

interface StateProps {
  user: UserProfile;
}

class ReferAFriend extends React.Component<Props & StateProps, State> {
  constructor(props: Props & StateProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  private buildReferralUrl() {
    const user = this.props.user;
    return new ReferAFriendUrlBuilder()
      .setFirstName(user.firstName)
      .setLastName(user.lastName)
      .setEmail(user.email)
      .setUserId(user.id)
      .setBaseUrl(
        'https://boclips.referralrock.com/access/?programidentifier=adf9b438-bfa6-4d55-a9d7-418d8d520333',
      )
      .build();
  }

  private getIFrame() {
    return {
      __html: `<iframe src="${this.buildReferralUrl()}" style="background-color: white; height:800px; width:100%;" />`,
    };
  }

  public render() {
    return (
      <React.Fragment>
        <A11yButton callback={this.openModal}>{this.props.children}</A11yButton>

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
          <div
            className="iframeWrapper"
            dangerouslySetInnerHTML={this.getIFrame()}
          />
        </Bodal>
      </React.Fragment>
    );
  }

  private openModal = () => {
    this.setState({ visible: true });
    AnalyticsFactory.getInstance().trackReferAFriendModalOpened();
  };

  private closeModal = () => {
    this.setState({ visible: false });
    AnalyticsFactory.getInstance().trackReferAFriendModalClosed();
  };
}

function mapStateToProps(state: LoginState): StateProps {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(ReferAFriend);

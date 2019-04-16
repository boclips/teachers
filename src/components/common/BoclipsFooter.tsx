import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import State from '../../types/State';
import ReferAFriend from '../ReferAFriend';
import './BoclipsFooter.less';

interface StateProps {
  isAuthenticated: boolean;
}

class BoclipsFooter extends PureComponent<StateProps> {
  private getCurrentYear() {
    return new Date().getFullYear();
  }

  public render() {
    return (
      <section className="boclips-footer ant-layout-content">
        <p>Copyright © {this.getCurrentYear()} Boclips. All rights reserved.</p>
        <p>
          All trademarks, service marks, trade names, product names and logos
          appearing on the site are the property of their respective owners. Any
          rights not expressly granted herein are reserved.
        </p>
        <p>
          {this.props.isAuthenticated && <ReferAFriend text="Refer a friend" />}
        </p>
      </section>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const user = state.user;
  const isAuthenticated = user ? user.authenticated : false;
  return {
    isAuthenticated,
  };
}

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  null,
)(BoclipsFooter);

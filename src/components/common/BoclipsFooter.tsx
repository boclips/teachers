import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import ReferAFriend from '../ReferAFriend';

const { Footer } = Layout;
export class BoclipsFooter extends PureComponent {
  private getCurrentYear() {
    return new Date().getFullYear();
  }

  public render() {
    return (
      <Footer className="boclips-footer">
        <p>Copyright © {this.getCurrentYear()} Boclips. All rights reserved.</p>
        <p>
          All trademarks, service marks, trade names, product names and logos
          appearing on the site are the property of their respective owners. Any
          rights not expressly granted herein are reserved.
        </p>
        <p>
          <ReferAFriend text="Refer a friend" />
        </p>
      </Footer>
    );
  }
}

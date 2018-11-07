import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';

const { Footer } = Layout;
export class BoclipsFooter extends PureComponent {
  public render() {
    return (
      <Footer className="boclips-footer">
        <p>Copyright © 2018 Boclips. All rights reserved.</p>
        <p>
          All trademarks, service marks, trade names, product names and logos
          appearing on the site are the property of their respective owners. Any
          rights not expressly granted herein are reserved.
        </p>
      </Footer>
    );
  }
}

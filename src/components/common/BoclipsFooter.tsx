import React from 'react';
import './BoclipsFooter.less';

export default class BoclipsFooter extends React.PureComponent {
  public render() {
    return (
      <footer className="boclips-footer ant-layout-content">
        <p>
          Copyright © {new Date().getFullYear()} Boclips. All rights reserved.
        </p>
        <p>
          All trademarks, service marks, trade names, product names and logos
          appearing on the site are the property of their respective owners. Any
          rights not expressly granted herein are reserved.
        </p>
      </footer>
    );
  }
}

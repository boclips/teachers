import { Col, Row, Tabs } from 'antd';
import React from 'react';
import './TabsComponent.less';

interface Props {
  isNewsMode: boolean;
  onTabChange: (activeKey: string) => void;
  tabs: string[];
}

export enum TabNames {
  MAIN = 'Main',
  NEWS = 'News',
}

export const TabsComponent = React.memo((props: Props) => (
  <Row>
    <Col span={24} md={0}>
      <Tabs
        className="tabs"
        size="large"
        onChange={props.onTabChange}
        activeKey={props.isNewsMode ? TabNames.NEWS : TabNames.MAIN}
      >
        {props.tabs.map(tab => (
          <Tabs.TabPane tab={tab} key={tab} />
        ))}
      </Tabs>
    </Col>
  </Row>
));

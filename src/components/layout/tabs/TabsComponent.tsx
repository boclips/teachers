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

interface TabElementProps {
  text: string;
}

const TabElement = React.memo((props: TabElementProps) => (
  <span data-qa="tab" data-state={props.text}>
    {props.text}
  </span>
));

export const TabsComponent = React.memo((props: Props) => (
  <Row>
    <Col span={24} xl={0}>
      <Tabs
        className="tabs"
        size="large"
        onChange={props.onTabChange}
        activeKey={props.isNewsMode ? TabNames.NEWS : TabNames.MAIN}
      >
        {props.tabs.map(tab => (
          <Tabs.TabPane tab={<TabElement text={tab} />} key={tab} />
        ))}
      </Tabs>
    </Col>
  </Row>
));

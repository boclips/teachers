import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import BoclipsFooter from '../common/BoclipsFooter';
import './PageLayout.less';
import TopNavbarContainer from './TopNavbarContainer';

const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
  showTabs?: boolean;
  showSearchBar?: boolean;
  hideFooter?: boolean;
}

class PageLayout extends PureComponent<Props> {
  public render() {
    return (
      <Layout>
        <section>
          <Header className="top-search-bar fixed">
            <TopNavbarContainer
              showSearchBar={this.props.showSearchBar}
              showTabs={this.props.showTabs}
            />
          </Header>
          <Content>
            <Row>
              <Col sm={{ span: 24 }} md={{ span: 24 }}>
                {this.props.children}
              </Col>
            </Row>
          </Content>
          {!this.props.hideFooter && <BoclipsFooter />}
        </section>
      </Layout>
    );
  }
}

export default PageLayout;

import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import BoclipsFooter from '../common/BoclipsFooter';
import MobileBottomNavbar from './navigation/MobileBottomNavbar';
import TopNavbarContainer from './navigation/TopNavbarContainer';
import './PageLayout.less';

const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
  showTabs?: boolean;
  showSearchBar?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
  subheader?: React.ReactFragment;
}

class PageLayout extends PureComponent<Props> {
  public render() {
    return (
      <Layout className="page-layout">
        <section>
          <Header className="top-search-bar fixed">
            <TopNavbarContainer
              showNavigation={this.props.showNavigation}
              showSearchBar={this.props.showSearchBar}
              showTabs={this.props.showTabs}
            />
          </Header>
          {this.props.subheader && (
            <section className="subheader">{this.props.subheader}</section>
          )}
          <Content>
            <Row>
              <Col sm={{ span: 24 }} md={{ span: 24 }}>
                {this.props.children}
              </Col>
            </Row>
          </Content>
          <Row>{this.props.showNavigation && <MobileBottomNavbar />}</Row>
          {this.props.showFooter && <BoclipsFooter />}
        </section>
      </Layout>
    );
  }
}

export default PageLayout;

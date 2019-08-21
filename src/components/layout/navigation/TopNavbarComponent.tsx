import { Col, Row } from 'antd';
import Layout from 'antd/lib/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import boclipsLogo from '../../../../resources/images/boclips-logo.png';
import BoclipsMobileLogo from '../../../../resources/images/boclips-mobile-logo.svg';
import SearchBar from '../../searchBar/SearchBar';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import ConnectedTabsContainer from '../tabs/TabsContainer';
import NavbarButtonsContainer from './NavbarButtonsContainer';
import './TopNavbarComponent.less';

interface Props {
  showTabs: boolean;
  authorized: boolean;
  showSearchBar: boolean;
  isMobile: boolean;
}

const { Content } = Layout;

const TopNavbarComponent = React.memo((props: Props) => (
  <React.Fragment>
    <Content className="top-navbar">
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 4 }}>
          <section className="logo-wrapper">
            <Link to="/" data-qa="boclips-logo" className="link--tabbable">
              <img className="logo" src={boclipsLogo} alt="Boclips" />
            </Link>
          </section>
          {!props.showSearchBar && props.isMobile && (
            <section className="mobile-logo-wrapper">
              <Link to="/" data-qa="boclips-logo" className="link--tabbable">
                <BoclipsMobileLogo alt="Boclips" />
              </Link>
            </section>
          )}
        </Col>
        <Col
          xs={{ span: 18 }}
          sm={{ span: 20 }}
          md={{ span: 20 }}
          lg={{ span: 12 }}
        >
          {props.showSearchBar ? <SearchBar /> : null}
        </Col>
        <Col
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 4 }}
          lg={{ span: 8 }}
        >
          {props.authorized && (
            <div>
              {props.isMobile ? (
                <AccountMenuContainer />
              ) : (
                <NavbarButtonsContainer />
              )}
            </div>
          )}
        </Col>
      </Row>
      {props.showTabs && <ConnectedTabsContainer data-qa="navbar-tabs" />}
    </Content>
  </React.Fragment>
));

export default TopNavbarComponent;

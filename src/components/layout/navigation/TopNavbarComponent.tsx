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
  hideNavigation?: boolean;
}

const { Content } = Layout;

const TopNavbarComponent = React.memo((props: Props) => (
  <React.Fragment>
    <Content className="top-navbar">
      <Row>
        <Col
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: props.showSearchBar ? 4 : 16 }}
        >
          <section className="logo-wrapper">
            {props.hideNavigation ? (
              <img className="logo" src={boclipsLogo} alt="Boclips" />
            ) : (
              <Link to="/" data-qa="boclips-logo" className="link--tabbable">
                <img className="logo" src={boclipsLogo} alt="Boclips" />
              </Link>
            )}
          </section>
        </Col>
        {!props.showSearchBar && props.isMobile && (
          <Col xs={{ span: 18 }} md={{ span: 20 }}>
            <section className="mobile-logo-wrapper">
              {!props.hideNavigation ? (
                <Link to="/" data-qa="boclips-logo" className="link--tabbable">
                  <BoclipsMobileLogo alt="Boclips" />
                </Link>
              ) : (
                <BoclipsMobileLogo alt="Boclips" />
              )}
            </section>
          </Col>
        )}
        {props.showSearchBar && !props.hideNavigation ? (
          <Col
            xs={{ span: 18 }}
            sm={{ span: 20 }}
            md={{ span: 20 }}
            lg={{ span: 12 }}
          >
            <SearchBar />
          </Col>
        ) : null}
        <Col
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 4 }}
          lg={{ span: 8 }}
        >
          {props.authorized && !props.hideNavigation && (
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
